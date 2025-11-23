import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
        {/* Trust Badge */}
        <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <Star className="w-4 h-4 text-manorGold fill-manorGold" />
          <span className="text-sm text-white font-medium">Premium Tea Since 2020</span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          MANOR – The Tea of Your Morning
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
          Experience the rich aroma and robust flavor of our premium black tea, sourced from the finest plantations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/products"
            className="bg-manorGreen text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-manorGreen/90 transition-all duration-300 flex items-center gap-2 group min-h-[44px] min-w-[44px] touch-manipulation"
          >
            Shop Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="border-2 border-manorGold text-manorGold font-semibold px-8 py-4 rounded-lg hover:bg-manorGold hover:text-white transition-all duration-300 min-h-[44px] min-w-[44px] touch-manipulation"
          >
            Learn More
          </a>
        </div>

        {/* Free Delivery Banner */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-manorGold text-manorDark px-6 py-3 rounded-full font-semibold shadow-lg">
          🚚 Free Delivery in Nagpur
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
