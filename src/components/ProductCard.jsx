import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton.jsx";
import LikeButton from "./LikeButton.jsx";
import ImageModal from "./ImageModal.jsx";
import { useRecommendations } from "../context/RecommendationContext.jsx";

const ProductCard = ({
  id,
  name,
  description,
  price,
  originalPrice,
  discountPercent,
  isBestSeller,
  isSoldOut,
  weight,
  image,
  rating,
  reviews,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { trackInteraction } = useRecommendations();
  const navigate = useNavigate();
  const isCustomProduct = String(id) === "4";

  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleCustomize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/custom-pack");
  };

  return (
    <>
      {/* 1. Increased height to 'h-60' (approx 240px) to make the card BIGGER 
         2. Keeps horizontal layout (flex-row)
      */}
      <div className="w-full h-60 md:h-64 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-row">
        
        {/* --- LEFT: Image (40% width) --- */}
        <div className="relative w-[40%] h-full bg-gray-50 border-r border-gray-100 flex-shrink-0">
          
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
            {discountPercent > 0 && !isSoldOut && (
              <span className="bg-[#2B221F] text-white font-bold text-[10px] leading-none px-2 py-1 rounded">
                {discountPercent}% OFF
              </span>
            )}
            {isBestSeller && !isSoldOut && (
              <span className="bg-[#E69536] text-white font-bold text-[10px] leading-none px-2 py-1 rounded">
                BEST SELLER
              </span>
            )}
            {isSoldOut && (
              <span className="bg-gray-500 text-white font-bold text-[10px] leading-none px-2 py-1 rounded">
                SOLD OUT
              </span>
            )}
          </div>

          {/* Like Button */}
          <div className="absolute top-2 right-2 z-10">
            <button className="bg-white/90 rounded-full p-2 shadow-sm hover:bg-white transition-all">
              <LikeButton product={{ id }} />
            </button>
          </div>

          {/* Product Image */}
          <Link
            to={isCustomProduct ? "/custom-pack" : `/product/${id}`}
            className="block w-full h-full"
            onClick={() => trackInteraction(id, "click")}
          >
            <img
              src={image}
              alt={name}
              loading="lazy"
              onClick={!isCustomProduct ? openModal : undefined}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        </div>

        {/* --- RIGHT: Content (60% width) --- */}
        <div className="w-[60%] h-full bg-white px-5 py-4 flex flex-col justify-between overflow-hidden">
          
          {/* Title & Rating */}
          <Link
            to={isCustomProduct ? "/custom-pack" : `/product/${id}`}
            className="block"
          >
            {/* Bigger Title Font */}
            <h3 className="font-serif font-bold text-lg text-[#2B221F] leading-snug line-clamp-2 mb-2">
              {name}
            </h3>

            {rating && (
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[#E69536] text-sm">★</span>
                <span className="text-xs text-gray-500 font-medium">
                  {rating} ({reviews})
                </span>
              </div>
            )}
          </Link>

          {/* Price & Weight Row */}
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col leading-none">
              {originalPrice > price && (
                <span className="text-xs text-gray-400 line-through mb-1">
                  ₹{originalPrice}
                </span>
              )}
              {/* Bigger Price Font */}
              <span className="text-xl font-bold text-[#2B221F]">
                ₹{price}
              </span>
            </div>

            <span className="text-xs text-gray-600 font-medium bg-gray-50 border border-gray-100 px-2 py-1 rounded whitespace-nowrap">
              {weight} g
            </span>
          </div>

          {/* BUTTON: Bigger & clearly separated at the bottom */}
          <div className="mt-auto w-full">
            {isCustomProduct ? (
              <button
                onClick={handleCustomize}
                className="w-full bg-[#E69536] hover:bg-[#CC8430] text-white font-bold text-sm py-3 rounded-lg shadow-sm uppercase tracking-wide transition-all"
              >
                Customize
              </button>
            ) : (
              <AddToCartButton
                className="w-full !bg-[#E69536] hover:!bg-[#CC8430] !text-white !font-bold !text-sm !py-3 !rounded-lg !shadow-sm uppercase tracking-wide transition-all"
                product={{ id, name, price, rating, reviews, isSoldOut }}
                label="Add to Cart"
              />
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <ImageModal image={image} name={name} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductCard;