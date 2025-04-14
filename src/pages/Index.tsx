
import React, { useState, useEffect } from 'react';
import ApartmentModel from '@/components/ApartmentModel';
import Navbar from '@/components/Navbar';
import PropertySearch from '@/components/PropertySearch';
import PropertyList from '@/components/PropertyList';
import PaymentPlanCalculator from '@/components/PaymentPlanCalculator';
import Testimonials from '@/components/Testimonials';
import CrmBenefits from '@/components/CrmBenefits';
import Footer from '@/components/Footer';
import { fetchProperties } from '@/utils/salesforceApi';
import { motion } from 'framer-motion';

const Index = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialProperties = async () => {
      try {
        const initialProperties = await fetchProperties();
        setProperties(initialProperties);
      } catch (error) {
        console.error("Error loading initial properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialProperties();
  }, []);

  const handleSearch = (searchResults: any[]) => {
    setProperties(searchResults);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section with 3D Model */}
      <section className="pt-16 bg-black">
        <ApartmentModel />
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-cloudastick-gold">Salesforce-Powered</span> Real Estate Experience
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Cloudastick connects property seekers with their dream homes while offering real estate professionals powerful CRM tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#search" className="cta-button">
                Find Properties
              </a>
              <a href="#crm" className="bg-zinc-800 text-white px-6 py-3 font-bold rounded-md transition-all hover:bg-zinc-700">
                Business Solutions
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Properties Section */}
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center bg-zinc-900">
          <div className="w-16 h-16 border-4 border-t-cloudastick-gold border-zinc-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <PropertyList properties={properties} />
      )}
      
      {/* Property Search */}
      <PropertySearch onSearch={handleSearch} />
      
      {/* Payment Plan Calculator */}
      <PaymentPlanCalculator />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* CRM Benefits */}
      <CrmBenefits />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
