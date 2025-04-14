
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Layers, BarChart, Users, Lock, Database, ArrowRight } from "lucide-react";
import { submitLead } from "@/utils/salesforceApi";
import { toast } from "sonner";

const crmFeatures = [
  {
    title: "Real-time Property Data",
    description: "Access live property information directly from your Salesforce instance, ensuring all team members have the latest data.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: "Lead Management",
    description: "Capture, assign, and track leads throughout the sales funnel with automated follow-up sequences.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into market trends, conversion rates, and team performance with customizable dashboards.",
    icon: <BarChart className="w-6 h-6" />,
  },
  {
    title: "Multi-level Security",
    description: "Enterprise-grade security with role-based access controls and data encryption at rest and in transit.",
    icon: <Lock className="w-6 h-6" />,
  },
  {
    title: "Seamless Integration",
    description: "Connect with your existing tech stack including marketing automation, accounting, and document management systems.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: "Compliance Ready",
    description: "Built-in compliance features for real estate regulations, with audit trails and documentation management.",
    icon: <Check className="w-6 h-6" />,
  },
];

const CrmBenefits = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !company) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitLead({
        FirstName: name.split(' ')[0],
        LastName: name.includes(' ') ? name.split(' ').slice(1).join(' ') : name,
        Email: email,
        Company: company,
        LeadSource: "B2B Landing Page",
        Lead_Type__c: "B2B",
        Description: message || "Interested in Cloudastick CRM solution."
      });
      
      if (result.success) {
        toast.success("Your information has been submitted. We'll be in touch soon!");
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        toast.error(result.error || "Error submitting your information");
      }
    } catch (error) {
      toast.error("Failed to submit your information");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="crm" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-white">Salesforce-Powered CRM</h2>
          <p className="section-subheading text-white/70">
            Discover how our Salesforce integration can transform your real estate business
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {crmFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-cloudastick-gold/20 flex items-center justify-center mb-4 text-cloudastick-gold">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-zinc-900 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-white">Request a Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name *</Label>
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
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="john@company.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-white">Company *</Label>
                <Input 
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Your Company"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Demo"}
              </Button>
            </form>
          </div>
          
          <div className="bg-zinc-900 rounded-xl p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4 text-white">Admin Dashboard Preview</h3>
            <p className="text-white/70 mb-6">
              Get a glimpse of the powerful admin interface that connects directly to your Salesforce organization.
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90">
                  View Dashboard Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">Cloudastick Admin Dashboard</DialogTitle>
                  <DialogDescription className="text-white/70">
                    A preview of the Salesforce-integrated admin interface
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <img 
                    src="https://images.ctfassets.net/7jw9uvgmirpt/5svKFHRWvgWJ8EUCJlcGv9/c6ca7e1daa6a6f9f5d1d95c686d1e6c5/Salesforce-Real-Estate-Dashboard.png" 
                    alt="Admin Dashboard Preview" 
                    className="rounded-md w-full object-cover border border-zinc-700"
                  />
                </div>
                
                <div className="mt-4 text-white/70">
                  <h4 className="font-medium text-white mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="text-cloudastick-gold mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                      <span>Real-time property inventory tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-cloudastick-gold mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                      <span>Lead qualification and routing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-cloudastick-gold mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                      <span>Performance analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-cloudastick-gold mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                      <span>Document management and e-signatures</span>
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrmBenefits;
