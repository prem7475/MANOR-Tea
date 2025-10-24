import React from 'react';
import ProductCard from './ProductCard.jsx';
import teaData from '../data/teaData.js';

const BestProductsSection = () => {
  const bestSellingTeas = teaData.filter(tea => tea.isBestSeller && !tea.isSoldOut);

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-2">
        <h2 className="text-xl md:text-3xl font-serif font-bold text-center text-gray-900 mb-6">
          Best Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestSellingTeas.map(tea => (
            <div key={tea.id} className="transform hover:scale-105 transition-transform duration-300">
              <ProductCard {...tea} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestProductsSection;
