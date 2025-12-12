import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Check if this is the Custom Product
  const isCustomProduct = String(id) === "4";

  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Handle Redirection for Custom Pack
  const handleCustomize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/custom-pack');
  };

  return (
    <>
      <div
        className="product-card relative group overflow-hidden p-2 md:p-6 max-w-full md:max-w-sm flex flex-row md:flex-col items-center md:items-start h-auto hover:shadow-xl transition-all duration-300 bg-white rounded-lg border border-transparent hover:border-manorBorder/50"
        onMouseEnter={() => setShowQuickAdd(true)}
        onMouseLeave={() => setShowQuickAdd(false)}
      >
        <LikeButton product={{ id, name, description, price, originalPrice, discountPercent, isBestSeller, isSoldOut, weight, image, rating, reviews }} />
        
        {/* Badges - Kept Dark Charcoal for Contrast */}
        {discountPercent > 0 && !isSoldOut && (
          <div className="discount-badge absolute top-0.5 left-0.5 bg-manorDark text-white font-bold text-[8px] px-1.5 py-0.5 rounded uppercase z-10">
            {discountPercent}% OFF
          </div>
        )}
        {isBestSeller && !isSoldOut && (
          <div className="best-seller-badge absolute top-6 left-0.5 bg-manorOrange text-white font-bold text-[8px] px-1.5 py-0.5 rounded uppercase z-10 shadow-sm">
            BEST SELLER
          </div>
        )}
        {isSoldOut && (
          <div className="sold-out-badge absolute top-0.5 left-0.5 bg-gray-500 text-white font-bold text-[8px] px-1.5 py-0.5 rounded uppercase z-10">
            SOLD OUT
          </div>
        )}

        <div className="flex flex-row md:flex-col items-center md:items-start flex-grow min-w-0 relative w-full">
          
          {/* Main Click Area */}
          <Link 
            to={isCustomProduct ? "/custom-pack" : `/product/${id}`} 
            className="flex flex-row md:flex-col items-center md:items-start flex-grow min-w-0 w-full" 
            onClick={(e) => {
               trackInteraction(id, 'click');
            }}
          >
            <div className="image-container overflow-hidden rounded-md mb-0 md:mb-4 w-24 h-24 md:w-full md:h-48 flex-shrink-0 relative" onClick={!isCustomProduct ? openModal : undefined}>
              <picture>
                <source srcSet={image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </picture>
              
              {/* Quick Add Button (Small +) - CHANGED TO ORANGE */}
              {showQuickAdd && !isSoldOut && !isCustomProduct && (
                <button
                  className="absolute top-2 right-2 bg-manorOrange text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-manorOrangeHover transition-all duration-200 shadow-lg transform hover:scale-110"
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

            <div className="flex flex-col flex-grow ml-3 md:ml-0 min-w-0 w-full">
              <h3 className="font-serif font-bold text-xs md:text-base mb-1 md:mb-2 text-manorText tracking-wide truncate">{name}</h3>
              <p className="font-serif text-[10px] md:text-xs text-manorText/70 mb-1 md:mb-3 truncate">{description}</p>
              
              {rating && (
                <div className="flex items-center mb-1 md:mb-2">
                  <div className="flex text-manorGold text-[10px] md:text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(rating) ? 'text-manorGold' : 'text-gray-200'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] md:text-xs text-manorText/50 ml-1">
                    {rating} ({reviews})
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center font-serif mb-1 md:mb-3 min-w-0 w-full">
                <span className="font-bold text-manorDark text-sm md:text-lg truncate">₹{price > 0 ? price : 'N/A'}</span>
                <div className="flex items-center gap-2">
                    {originalPrice > price && originalPrice > 0 && (
                    <span className="text-[10px] md:text-xs text-gray-400 line-through truncate">₹{originalPrice}</span>
                    )}
                    <span className="text-[10px] md:text-xs text-manorText/60 bg-manorBg px-1.5 py-0.5 rounded">{weight}g</span>
                </div>
              </div>
            </div>
          </Link>

          {/* === BUTTONS LOGIC (UPDATED TO ORANGE) === */}
          
          {/* MOBILE VIEW BUTTON */}
          <div className="ml-3 md:ml-0 md:hidden flex-shrink-0">
            {isCustomProduct ? (
              <button 
                onClick={handleCustomize}
                className="bg-manorOrange text-white px-3 py-1.5 text-[10px] font-bold rounded shadow-sm hover:bg-manorOrangeHover transition-colors"
              >
                Customize
              </button>
            ) : (
              // Passing orange class to AddToCartButton
              <AddToCartButton 
                className="!bg-manorOrange hover:!bg-manorOrangeHover text-white px-3 py-1.5 text-xs rounded shadow-sm min-h-[32px]" 
                product={{ id, name, price, rating, reviews, isSoldOut }} 
              />
            )}
          </div>

          {/* DESKTOP VIEW BUTTON */}
          <div className="hidden md:block w-full mt-auto">
            {isCustomProduct ? (
              <button 
                onClick={handleCustomize}
                className="w-full bg-manorOrange hover:bg-manorOrangeHover text-white font-bold py-2.5 px-4 rounded transition-all duration-300 shadow-sm text-sm tracking-wide uppercase"
              >
                Customize Now
              </button>
            ) : (
              // Passing orange class to AddToCartButton
              <AddToCartButton 
                className="w-full !bg-manorOrange hover:!bg-manorOrangeHover text-white font-bold py-2.5 rounded shadow-sm transition-all duration-300" 
                product={{ id, name, price, rating, reviews, isSoldOut }} 
              />
            )}
          </div>

        </div>
      </div>
      {modalOpen && <ImageModal image={image} name={name} onClose={closeModal} />}
    </>
  );
};

export default ProductCard;