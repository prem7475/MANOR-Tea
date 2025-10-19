import React, { useState } from 'react';
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
    <section className="p-2 sm:p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen font-serif text-white animate-fade-in">
      <h1 className="header-title text-lg sm:text-2xl animate-bounce-in">Gifts from MANOR</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
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
