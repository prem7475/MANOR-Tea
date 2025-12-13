import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const VideoSection = () => {
  return (
    // 1. Container: w-full (Broad), h-[85vh] for Mobile, h-screen for Desktop
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-black">
      
      {/* 2. Video Background: object-cover forces full width/height filling */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
      >
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
        
        {/* Trust Badge */}
        <div className="flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 animate-fade-in">
          <Star className="w-4 h-4 text-[#C8A870] fill-[#C8A870]" />
          <span className="text-sm text-white font-medium tracking-wide">Premium Tea Since 2023</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-lg">
          MANOR
        </h2>
        <p className="text-lg md:text-2xl text-white/90 font-light tracking-[0.2em] uppercase mb-8 drop-shadow-md">
          The Tea of Your Morning
        </p>

        {/* Description */}
        <p className="text-base md:text-xl text-gray-100 mb-10 max-w-2xl leading-relaxed drop-shadow-md hidden md:block">
          Experience the rich aroma and robust flavor of our premium black tea, sourced from the finest plantations.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0">
          <Link
            to="/products"
            className="bg-[#E69536] hover:bg-[#CC8430] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group min-h-[50px]"
          >
            Shop Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/about"
            className="border-2 border-white text-white hover:bg-white hover:text-[#2B221F] font-semibold px-8 py-4 rounded-full transition-all duration-300 min-h-[50px] flex items-center justify-center"
          >
            Learn More
          </Link>
        </div>

        {/* Free Delivery Banner (Floating at Bottom) - MADE BIGGER */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-max max-w-[90%]">
          <div className="bg-[#C8A870] text-[#2B221F] px-8 py-3 rounded-full font-bold text-sm md:text-lg shadow-xl flex items-center gap-3 animate-bounce-in border-2 border-white/20">
             <span className="text-xl">🚚</span> Free Delivery in Nagpur
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default VideoSection;