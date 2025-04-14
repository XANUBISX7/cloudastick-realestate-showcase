
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchProperties } from "@/utils/salesforceApi";
import { motion } from "framer-motion";

interface PropertySearchProps {
  onSearch: (properties: any[]) => void;
}

const PropertySearch = ({ onSearch }: PropertySearchProps) => {
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([500000, 2000000]);
  const [bedrooms, setBedrooms] = useState("2");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const properties = await fetchProperties({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        bedrooms: parseInt(bedrooms),
        location: location,
        propertyType: propertyType
      });
      
      onSearch(properties);
    } catch (error) {
      console.error("Error searching properties:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="search" className="bg-black py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading text-white">Find Your Dream Property</h2>
          <p className="section-subheading text-white/70">
            Search through our exclusive listings to find the perfect property that matches your needs
          </p>
        </motion.div>
        
        <div className="bg-zinc-900 p-8 rounded-xl max-w-5xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-full">
                <Label htmlFor="price-range" className="text-white mb-2 block">
                  Price Range: ${(priceRange[0]/1000).toFixed(0)}k - ${(priceRange[1]/1000).toFixed(0)}k
                </Label>
                <Slider
                  id="price-range"
                  defaultValue={[500000, 2000000]}
                  max={5000000}
                  min={100000}
                  step={50000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label htmlFor="bedrooms" className="text-white mb-2 block">
                  Bedrooms
                </Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger id="bedrooms" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location" className="text-white mb-2 block">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City or neighborhood"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="property-type" className="text-white mb-2 block">
                  Property Type
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="mt-8 w-full md:w-auto bg-cloudastick-gold text-black hover:bg-cloudastick-gold/90"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search Properties"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
