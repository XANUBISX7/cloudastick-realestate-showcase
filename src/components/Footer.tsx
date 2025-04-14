
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white/70">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white mr-1">Cloud</span>
              <span className="text-2xl font-bold text-cloudastick-gold">astick</span>
            </div>
            <p className="mb-6">
              Revolutionizing real estate technology with Salesforce-powered solutions for agents, brokers, and property developers.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="#properties">Properties</FooterLink>
              <FooterLink href="#search">Property Search</FooterLink>
              <FooterLink href="#payment-plans">Payment Plans</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
              <FooterLink href="#crm">CRM Solution</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-cloudastick-gold flex-shrink-0 mt-0.5" />
                <span>123 Technology Drive, Suite 400, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-cloudastick-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-cloudastick-gold flex-shrink-0" />
                <span>info@cloudastick.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Subscribe</h3>
            <p className="mb-4">
              Stay updated with our latest properties and features.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-zinc-800 border border-zinc-700 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-cloudastick-gold"
              />
              <Button className="bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90 rounded-l-none">
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Cloudastick. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cloudastick-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cloudastick-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cloudastick-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
      
      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md p-4 z-30 border-t border-zinc-800">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h4 className="text-white font-bold">Ready to transform your real estate business?</h4>
            <p className="text-white/70">Connect with our team for a personalized demo</p>
          </div>
          <div className="flex space-x-4">
            <Button className="bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-cloudastick-gold hover:text-black transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="hover:text-cloudastick-gold transition-colors flex items-center"
    >
      <ChevronRight size={16} className="mr-2" />
      {children}
    </a>
  </li>
);

export default Footer;
