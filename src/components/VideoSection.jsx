import React from 'react';

const VideoSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-2">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-yellow-400 mb-4">
          MANOR – The Tea of Your Morning
        </h2>
        <a
          href="/products"
          className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded shadow hover:bg-yellow-300 transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default VideoSection;
