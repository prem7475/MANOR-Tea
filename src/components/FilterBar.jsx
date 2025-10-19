import React from 'react';

const FilterBar = ({ filter, onFilterChange }) => {
  return (
    <select
      className="mt-4 border-2 border-[#4b5563] rounded p-2 bg-[#374151] text-[#f9fafb] font-serif focus:border-[#6b7280] focus:outline-none"
      value={filter}
      onChange={e => onFilterChange(e.target.value)}
    >
      <option value="">-- Filter by --</option>
      <option value="weight">Weight</option>
      <option value="priceLowHigh">Price: Low to High</option>
      <option value="priceHighLow">Price: High to Low</option>
    </select>
  );
};

export default FilterBar;
