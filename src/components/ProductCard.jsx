import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton.jsx';
import LikeButton from './LikeButton.jsx';
import ImageModal from './ImageModal.jsx';
import { useCart } from '../hooks/useCart.jsx';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const ProductCard = ({ id, name, description, price, originalPrice, discountPercent, isBestSeller, isSoldOut, weight, image, rating, reviews }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { addToCart } = useCart();
  const { trackInteraction } = useRecommendations();

  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div
        className="product-card relative group overflow-hidden p-2 md:p-6 max-w-full md:max-w-sm flex flex-row md:flex-col items-center md:items-start h-auto hover:shadow-lg"
        onMouseEnter={() => setShowQuickAdd(true)}
        onMouseLeave={() => setShowQuickAdd(false)}
      >
        <LikeButton product={{ id, name, description, price, originalPrice, discountPercent, isBestSeller, isSoldOut, weight, image, rating, reviews }} />
        {discountPercent > 0 && !isSoldOut && (
          <div className="discount-badge absolute top-0.5 left-0.5 bg-manorDark text-white font-bold text-[8px] px-1 py-0.5 rounded uppercase z-10">
            {discountPercent}% OFF
          </div>
        )}
        {isBestSeller && !isSoldOut && (
          <div className="best-seller-badge absolute top-6 left-0.5 bg-manorDark text-white font-bold text-[8px] px-1 py-0.5 rounded uppercase z-10">
            BEST SELLER
          </div>
        )}
        {isSoldOut && (
          <div className="sold-out-badge absolute top-0.5 left-0.5 bg-manorDark text-white font-bold text-[8px] px-1 py-0.5 rounded uppercase z-10">
            SOLD OUT
          </div>
        )}
        <div className="flex flex-row md:flex-col items-center md:items-start flex-grow min-w-0 relative">
          <Link to={`/product/${id}`} className="flex flex-row md:flex-col items-center md:items-start flex-grow min-w-0" onClick={() => trackInteraction(id, 'click')}>
            <div className="image-container overflow-hidden rounded-md mb-0 md:mb-4 w-24 h-24 md:w-full md:h-48 flex-shrink-0 relative" onClick={openModal}>
              <picture>
                <source srcSet={image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 hover:cursor-zoom-in"
                  loading="lazy"
                />
              </picture>
              {/* Quick Add Button */}
              {showQuickAdd && !isSoldOut && (
                <button
                  className="absolute top-2 right-2 bg-manorGreen text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-manorGreen/80 transition-all duration-200 shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({ id, name, price, rating, reviews });
                  }}
                  title="Quick Add to Cart"
                >
                  +
                </button>
              )}
            </div>
            <div className="flex flex-col flex-grow ml-2 md:ml-0 min-w-0">
              <h3 className="font-serif font-semibold text-[10px] md:text-sm mb-1 md:mb-2 text-manorText uppercase tracking-wide truncate">{name}</h3>
              <p className="font-serif text-[8px] md:text-xs text-manorText/80 mb-1 md:mb-3 truncate">{description}</p>
              {rating && (
                <div className="flex items-center mb-1 md:mb-2">
                  <div className="flex text-yellow-400 text-[8px] md:text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[8px] md:text-xs text-manorText/60 ml-1">
                    {rating} ({reviews})
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center font-serif mb-1 md:mb-2 min-w-0">
                <span className="font-semibold text-gray-800 text-xs md:text-sm truncate">₹{price > 0 ? price : 'N/A'}</span>
                {originalPrice > price && originalPrice > 0 && (
                  <span className="text-[8px] md:text-xs text-manorText/60 line-through truncate">₹{originalPrice}</span>
                )}
                <span className="text-[8px] md:text-xs text-manorText/60 truncate">{weight} gm</span>
              </div>
            </div>
          </Link>
          {/* Add to Cart Button on right for mobile, below for desktop */}
          <div className="ml-2 md:ml-0 md:hidden">
            <AddToCartButton className="px-2 py-1 text-xs rounded-md min-h-[32px] min-w-[32px]" product={{ id, name, price, rating, reviews, isSoldOut }} />
          </div>
          <div className="hidden md:block w-full">
            <AddToCartButton className="w-full" product={{ id, name, price, rating, reviews, isSoldOut }} />
          </div>
        </div>
      </div>
      {modalOpen && <ImageModal image={image} name={name} onClose={closeModal} />}
    </>
  );
};

export default ProductCard;
