import React from 'react';

const About = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-serif min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Our Story</h2>
      <p className="mb-8">
        Manor Tea Company has been crafting exquisite tea for over a century, producing the finest leaves sourced from our plantations.
      </p>

      {/* Factory and Shop Photos Section */}
      <h3 className="text-2xl font-semibold mb-4">Our Factory and Shop</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <img
          src="/factory.jpg"
          alt="Factory building of Manor Tea Company"
          className="rounded-lg shadow-md object-cover w-full h-64"
        />
        <img
          src="/shop.jpg"
          alt="Manor Tea retail shop"
          className="rounded-lg shadow-md object-cover w-full h-64"
        />
      </div>

      {/* Preparation and Packing Information Section */}
      <h3 className="text-2xl font-semibold mb-4">How MANOR Tea is Prepared and Packed</h3>
      <p className="mb-4">
        At MANOR Tea, we carefully handpick the finest tea leaves from our plantations. The leaves are then processed using traditional methods combined with modern technology to preserve their rich flavor and aroma.
      </p>
      <p>
        Our packing process ensures that every tea pouch retains its freshness and quality until it reaches your cup. We take pride in maintaining the highest standards throughout every step of production.
      </p>
    </div>
  );
};

export default About;
