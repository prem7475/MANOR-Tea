import React, { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const AddToCartButton = ({ product, className = '' }) => {
  const { addToCart, cartAnimation } = useCart();
  const { trackInteraction } = useRecommendations();
  const [isAdding, setIsAdding] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [email, setEmail] = useState('');

  if (product.isSoldOut) {
    return (
      <>
        <button
          className={`mt-4 px-4 py-1 rounded bg-gray-400 text-white cursor-not-allowed ${className}`}
          onClick={() => setShowNotifyModal(true)}
        >
          Notify me when available
        </button>
        {showNotifyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Get notified when {product.name} is back in stock</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Here you would typically send the email to your backend
                    alert(`We'll notify ${email} when ${product.name} is available!`);
                    setShowNotifyModal(false);
                    setEmail('');
                  }}
                  className="flex-1 bg-manorGreen text-white py-2 rounded hover:bg-manorGreen/80"
                  disabled={!email}
                >
                  Notify Me
                </button>
                <button
                  onClick={() => setShowNotifyModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const handleAddToCart = () => {
    if (product.isSoldOut) {
      return;
    }
    setIsAdding(true);
    addToCart(product);
    trackInteraction(product.id, 'add_to_cart');
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <button
      className={`px-4 py-1 rounded transition-all duration-300 hover:scale-105 ${isAdding ? 'bg-manorGold' : 'bg-manorGreen hover:bg-manorGreen/80'} text-white font-semibold ${cartAnimation ? 'animate-bounce scale-110' : ''} ${className}`}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
