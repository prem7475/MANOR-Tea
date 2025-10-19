import React from 'react';

const Dropdown = ({ options, selected, onSelect }) => {
  return (
    <select
      className="border border-[#c68e53] rounded p-2 font-serif text-[#82512f]"
      value={selected}
      onChange={e => onSelect(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
