import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterBar from "../components/FilterBar.jsx";

import teaData from '../data/teaData.js';

const GIFT_HAMPERS = teaData.filter(item => item.id.startsWith('g'));

const Gifts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  let filteredGifts = GIFT_HAMPERS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filter === 'weight') {
    filteredGifts = filteredGifts.sort((a, b) => a.weight - b.weight);
  } else if (filter === 'priceLowHigh') {
    filteredGifts = filteredGifts.sort((a, b) => a.price - b.price);
  } else if (filter === 'priceHighLow') {
    filteredGifts = filteredGifts.sort((a, b) => b.price - a.price);
  }

  return (
    <section className="p-2 sm:p-4 bg-manorBg min-h-screen font-serif text-manorText animate-fade-in">
      <h1 className="header-title text-lg sm:text-2xl animate-bounce-in">Gifts from MANOR</h1>

      {/* Custom Hamper CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 mb-6 text-center">
        <h2 className="text-2xl font-serif text-manorText mb-2">Create Your Perfect Gift</h2>
        <p className="text-gray-600 mb-4">Build a custom hamper with your choice of teas and add-ons</p>
        <Link
          to="/custom-hamper"
          className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
        >
          Build Custom Hamper
        </Link>
      </div>

      <SearchBar placeholder="Search gifts..." value={searchTerm} onChange={setSearchTerm} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 justify-center">
        {filteredGifts.map(gift => (
          <ProductCard key={gift.id} {...gift} />
        ))}
      </div>
    </section>
  );
};

export default Gifts;
