
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VolumeX, Volume2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Michael Richards",
    role: "Property Investor",
    company: "Urban Capital",
    content: "Cloudastick has revolutionized how we manage our real estate portfolio. The Salesforce integration provides real-time insights that have genuinely transformed our business operations.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sophia Williams",
    role: "Real Estate Agent",
    company: "Prestige Homes",
    content: "I've been in the real estate industry for over 15 years, and Cloudastick is by far the most impressive CRM solution I've used. The payment plan generator has helped close deals faster than ever before.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Director of Sales",
    company: "Skyline Properties",
    content: "The integration with Salesforce has streamlined our entire sales process. We're capturing more leads and converting them at a higher rate. The ROI has been exceptional.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
];

const Testimonials = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <section id="testimonials" className="py-16 bg-zinc-900 relative overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 opacity-20">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-buildings-5769-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-10 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading text-white">What Our Clients Say</h2>
          <p className="section-subheading text-white/70">
            Hear from industry professionals and property buyers who use our platform
          </p>
        </motion.div>
        
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="testimonial-swiper pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="mt-16 text-center">
          <a href="#" className="cta-button inline-flex">
            Read More Success Stories
          </a>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-black/50 backdrop-blur-md border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4 border-2 border-cloudastick-gold">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold text-white">{testimonial.name}</h4>
              <p className="text-sm text-white/70">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
          
          <div className="relative">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-4 -left-2 text-cloudastick-gold/20">
              <path d="M9.83268 17.3333C7.61398 17.3333 5.83268 19.1146 5.83268 21.3333C5.83268 23.552 7.61398 25.3333 9.83268 25.3333C12.0514 25.3333 13.8327 23.552 13.8327 21.3333C13.8327 19.1146 12.0514 17.3333 9.83268 17.3333ZM9.83268 6.66667C7.61398 6.66667 5.83268 8.44797 5.83268 10.6667C5.83268 12.8853 7.61398 14.6667 9.83268 14.6667C12.0514 14.6667 13.8327 12.8853 13.8327 10.6667C13.8327 8.44797 12.0514 6.66667 9.83268 6.66667ZM21.166 6.66667C18.9473 6.66667 17.166 8.44797 17.166 10.6667C17.166 12.8853 18.9473 14.6667 21.166 14.6667C23.3847 14.6667 25.166 12.8853 25.166 10.6667C25.166 8.44797 23.3847 6.66667 21.166 6.66667ZM21.166 17.3333C18.9473 17.3333 17.166 19.1146 17.166 21.3333C17.166 23.552 18.9473 25.3333 21.166 25.3333C23.3847 25.3333 25.166 23.552 25.166 21.3333C25.166 19.1146 23.3847 17.3333 21.166 17.3333Z" fill="#F6D984" fillOpacity="0.2"/>
            </svg>
            <p className="text-white/80 mt-2 relative z-10">{testimonial.content}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Testimonials;
