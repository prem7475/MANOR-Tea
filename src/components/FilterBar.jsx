import React from 'react';

const FilterBar = ({ filter, onFilterChange }) => {
  return (
    <select
      // COLORS: Restored original (#374151 background, #f9fafb text, #4b5563 border)
      // SIZE: Changed 'p-2' to 'py-1 px-2' and added 'text-sm' to make it smaller
      className="mt-4 border-2 border-[#4b5563] rounded py-1 px-2 text-sm bg-[#374151] text-[#f9fafb] focus:border-[#6b7280] focus:outline-none cursor-pointer"
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