
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { calculatePaymentPlan, submitLead } from "@/utils/salesforceApi";
import { toast } from "sonner";

const PaymentPlanCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [paymentPlan, setPaymentPlan] = useState<any>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const calculatePlan = () => {
    const plan = calculatePaymentPlan(
      propertyPrice,
      downPaymentPercent,
      loanTermYears,
      interestRate
    );
    
    setPaymentPlan(plan);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentPlan) {
      toast.error("Please calculate a payment plan first");
      return;
    }
    
    if (!name || !email) {
      toast.error("Please provide your name and email");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitLead({
        FirstName: name.split(' ')[0],
        LastName: name.includes(' ') ? name.split(' ').slice(1).join(' ') : name,
        Email: email,
        Phone: phone,
        LeadSource: "Payment Plan Generator",
        Lead_Type__c: "B2C",
        Description: `Interest in property with price: $${propertyPrice}. Payment plan: ${loanTermYears} years, ${interestRate}% interest, ${downPaymentPercent}% down payment.`
      });
      
      if (result.success) {
        toast.success("Payment plan sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
      } else {
        toast.error(result.error || "Error sending payment plan");
      }
    } catch (error) {
      toast.error("Failed to submit your information");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <section id="payment-plans" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading text-white">Payment Plan Generator</h2>
          <p className="section-subheading text-white/70">
            Calculate your monthly payments and explore financing options that fit your budget
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-zinc-900 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-white">Configure Your Terms</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="property-price" className="text-white mb-2 block">
                  Property Price: {formatCurrency(propertyPrice)}
                </Label>
                <Slider
                  id="property-price"
                  defaultValue={[1000000]}
                  max={5000000}
                  min={100000}
                  step={50000}
                  value={[propertyPrice]}
                  onValueChange={(value) => setPropertyPrice(value[0])}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label htmlFor="down-payment" className="text-white mb-2 block">
                  Down Payment: {downPaymentPercent}% ({formatCurrency(propertyPrice * downPaymentPercent / 100)})
                </Label>
                <Slider
                  id="down-payment"
                  defaultValue={[20]}
                  max={50}
                  min={5}
                  step={5}
                  value={[downPaymentPercent]}
                  onValueChange={(value) => setDownPaymentPercent(value[0])}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label htmlFor="loan-term" className="text-white mb-2 block">
                  Loan Term: {loanTermYears} years
                </Label>
                <Slider
                  id="loan-term"
                  defaultValue={[30]}
                  max={30}
                  min={5}
                  step={5}
                  value={[loanTermYears]}
                  onValueChange={(value) => setLoanTermYears(value[0])}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label htmlFor="interest-rate" className="text-white mb-2 block">
                  Interest Rate: {interestRate}%
                </Label>
                <Slider
                  id="interest-rate"
                  defaultValue={[4.5]}
                  max={10}
                  min={1}
                  step={0.25}
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="py-4"
                />
              </div>
              
              <Button 
                className="w-full bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90"
                onClick={calculatePlan}
              >
                Calculate Payment Plan
              </Button>
            </div>
          </div>
          
          <div className="bg-zinc-900 p-8 rounded-xl">
            {paymentPlan ? (
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">Your Payment Plan</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-white/70">Property Price:</span>
                    <span className="text-white font-medium">{formatCurrency(paymentPlan.propertyPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-white/70">Down Payment:</span>
                    <span className="text-white font-medium">{formatCurrency(paymentPlan.downPayment)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-white/70">Loan Amount:</span>
                    <span className="text-white font-medium">{formatCurrency(paymentPlan.loanAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-white/70">Monthly Payment:</span>
                    <span className="text-cloudastick-gold font-bold">
                      {formatCurrency(paymentPlan.monthlyPayment)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-white/70">Total Interest Paid:</span>
                    <span className="text-white font-medium">{formatCurrency(paymentPlan.interestPaid)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-white/70">Total Cost:</span>
                    <span className="text-white font-medium">{formatCurrency(paymentPlan.totalPaid)}</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Email me this payment plan</h4>
                  
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone (optional)</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Payment Plan"}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="py-10">
                  <h3 className="text-xl font-bold mb-4 text-white">Your Payment Summary</h3>
                  <p className="text-white/70 mb-6">
                    Configure your terms on the left and click "Calculate Payment Plan" to see your monthly payments and financing options.
                  </p>
                  <div className="w-16 h-16 mx-auto border-4 border-t-cloudastick-gold border-zinc-700 rounded-full animate-spin"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPlanCalculator;
