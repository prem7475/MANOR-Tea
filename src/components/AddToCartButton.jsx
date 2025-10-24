import React, { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';

const AddToCartButton = ({ product, className = '' }) => {
  const { addToCart, cartAnimation } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  if (product.isSoldOut) {
    return (
      <button
        className={`mt-4 px-4 py-1 rounded bg-gray-400 text-white cursor-not-allowed ${className}`}
        disabled
      >
        Sold Out
      </button>
    );
  }

  const handleAddToCart = () => {
    if (product.isSoldOut) {
      return;
    }
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <button
      className={`mt-4 px-4 py-1 rounded transition-all duration-300 hover:scale-105 ${isAdding ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white font-semibold ${cartAnimation ? 'animate-bounce scale-110' : ''} ${className}`}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
