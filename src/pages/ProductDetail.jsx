import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton.jsx';
import Reviews from '../components/Reviews.jsx';
import teaData from '../data/teaData.js';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const product = teaData.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const handleBuyNow = () => {
    // Add to cart and navigate to checkout
    // For now, just navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="p-4 bg-manorBg min-h-screen font-serif text-manorText">
      <div className="max-w-4xl mx-auto">
        {/* Main Content: Horizontal Layout */}
        <div className="flex flex-col md:flex-row bg-manorBg border border-manorAccent/20 rounded-lg shadow-md p-4 mb-6">
          {/* Product Image on Left */}
          <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
            <div className="image-container overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          {/* Product Details on Right */}
          <div className="flex-1 md:ml-6">
            <h1 className="font-serif font-bold text-xl mb-2 text-manorText uppercase tracking-wide">{product.name}</h1>
            <p className="font-serif text-sm text-manorText/80 mb-3">{product.description}</p>
            <div className="flex justify-between items-center font-serif mb-4">
              <span className="font-semibold text-gray-800 text-xl">₹{product.price > 0 ? product.price : 'N/A'}</span>
              {product.originalPrice > product.price && product.originalPrice > 0 && (
                <span className="text-sm text-manorText/60 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-sm text-manorText/60">{product.weight} gm</span>
            </div>

            {/* Additional Information */}
            <div className="bg-manorBg border border-manorAccent/20 rounded-lg shadow-md p-4">
              <h2 className="font-serif font-bold text-lg mb-2">Additional Information</h2>
              <p className="font-serif text-sm text-manorText/80 mb-2">Origin: {product.origin || 'Premium Estates'}</p>
              <p className="font-serif text-sm text-manorText/80 mb-2">Type: {product.type || 'Black Tea'}</p>
              <p className="font-serif text-sm text-manorText/80 mb-2">Caffeine: {product.caffeine || 'Medium'}</p>
              <p className="font-serif text-sm text-manorText/80">Brewing Time: {product.brewingTime || '3-5 minutes'}</p>
            </div>
          </div>
        </div>

        {/* Buttons Below */}
        <div className="flex gap-4">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-accentGreen text-white font-semibold py-3 px-4 rounded-lg hover:bg-accentHover transition-colors"
          >
            BUY NOW
          </button>
          <AddToCartButton product={product} className="flex-1" />
        </div>

        {/* Reviews Section */}
        <Reviews productId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;