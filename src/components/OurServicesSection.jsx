import React from 'react';

const OurServicesSection = () => {
  const services = [
    'All Grocery Items',
    'Different types of TEA',
    'Free Home Delivery in Nagpur',
    'Dry Fruits',
    'Gift Hampers',
    'Special Requests Orders',
  ];

  return (
    <section
      id="services"
      className="relative py-8 bg-gray-100"
      style={{ backgroundImage: "url('/manor%20bg%201.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-2">
        <h2 className="text-xl md:text-3xl font-serif font-bold text-center text-yellow-400 mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            >
              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3">{service}</h3>
              <p className="text-gray-600 text-sm">
                Discover our premium {service.toLowerCase()} selection, carefully curated for quality and taste.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
