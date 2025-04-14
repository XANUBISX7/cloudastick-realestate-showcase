
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Bed, Bath, SquareFoot } from "lucide-react";

interface Property {
  Id: string;
  Name: string;
  Description__c: string;
  Price__c: number;
  Bedrooms__c: number;
  Bathrooms__c: number;
  Square_Feet__c: number;
  Location__c: string;
  Type__c: string;
  Status__c: string;
  ImageUrl__c: string;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList = ({ properties }: PropertyListProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-cloudastick-gold mb-2">No properties found</h3>
        <p className="text-white/70">Try adjusting your search criteria</p>
      </div>
    );
  }
  
  return (
    <section id="properties" className="bg-zinc-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-heading text-white">Featured Properties</h2>
          <p className="section-subheading text-white/70">
            Explore our collection of premium real estate opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.Id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PropertyCard = ({ property, index }: { property: Property; index: number }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden bg-zinc-800 border-zinc-700 h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={property.ImageUrl__c} 
            alt={property.Name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <Badge className="absolute top-4 right-4 bg-cloudastick-gold text-black">
            {property.Status__c}
          </Badge>
        </div>
        
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl text-white">{property.Name}</CardTitle>
            <p className="text-lg font-bold text-cloudastick-gold">
              {formatPrice(property.Price__c)}
            </p>
          </div>
          <div className="flex items-center text-white/70 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{property.Location__c}</span>
          </div>
          <CardDescription className="text-white/70 line-clamp-2 h-12">
            {property.Description__c}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-white/70">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <Bed size={18} className="mr-1" />
                <span className="font-medium">{property.Bedrooms__c}</span>
              </div>
              <span className="text-xs">Bedrooms</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <Bath size={18} className="mr-1" />
                <span className="font-medium">{property.Bathrooms__c}</span>
              </div>
              <span className="text-xs">Bathrooms</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <SquareFoot size={18} className="mr-1" />
                <span className="font-medium">{property.Square_Feet__c}</span>
              </div>
              <span className="text-xs">Sq Ft</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs border-zinc-600 text-white/70">
            {property.Type__c}
          </Badge>
        </CardContent>
        
        <CardFooter className="mt-auto">
          <Button className="w-full bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyList;
