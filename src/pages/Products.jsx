import React, { useState } from 'react';
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterBar from "../components/FilterBar.jsx";

import teaData from '../data/teaData.js';

const PRODUCTS = teaData.filter(p => !p.id.startsWith('g')); // Only tea products, not gift hampers

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  let filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting filters
  if (filter === 'weight') {
    filteredProducts = filteredProducts.sort((a, b) => a.weight - b.weight);
  } else if (filter === 'priceLowHigh') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filter === 'priceHighLow') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <section className="p-2 sm:p-4 bg-manorBg min-h-screen font-serif text-manorText animate-fade-in">
      <h1 className="header-title text-lg sm:text-2xl animate-bounce-in">LEAF TEA</h1>
      <SearchBar placeholder="Search products..." value={searchTerm} onChange={setSearchTerm} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 justify-center">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
