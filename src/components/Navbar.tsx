
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white mr-1">Cloud</span>
            <span className="text-2xl font-bold text-cloudastick-gold">astick</span>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#properties">Properties</NavLink>
          <NavLink href="#search">Search</NavLink>
          <NavLink href="#payment-plans">Payment Plans</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#crm">CRM Benefits</NavLink>
          
          <Button
            className="bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90 ml-4"
          >
            Book a Demo
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#properties" onClick={() => setMobileMenuOpen(false)}>
              Properties
            </MobileNavLink>
            <MobileNavLink href="#search" onClick={() => setMobileMenuOpen(false)}>
              Search
            </MobileNavLink>
            <MobileNavLink href="#payment-plans" onClick={() => setMobileMenuOpen(false)}>
              Payment Plans
            </MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
              Testimonials
            </MobileNavLink>
            <MobileNavLink href="#crm" onClick={() => setMobileMenuOpen(false)}>
              CRM Benefits
            </MobileNavLink>
            <Button
              className="bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90 w-full mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Demo
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-white/80 hover:text-cloudastick-gold transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-cloudastick-gold after:transition-all"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <a
    href={href}
    className="text-white/80 hover:text-cloudastick-gold transition-colors text-lg py-2 block border-b border-white/10"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
