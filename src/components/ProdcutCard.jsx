import React from 'react';
import AddToCartButton from './AddToCartButton.jsx';

const ProductCard = ({ id, name, description, price, weight, image }) => {
  return (
    <div className="bg-[#fff8ea] rounded-lg shadow-md p-4 max-w-xs hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="font-bold text-lg mb-1 text-[#82512f]">{name}</h3>
      <p className="text-sm text-[#82512f] mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-800">₹{price}</span>
        <span className="text-sm text-gray-600">{weight} gm</span>
      </div>
      <AddToCartButton product={{ id, name, price }} />
    </div>
  );
};

export default ProductCard;
