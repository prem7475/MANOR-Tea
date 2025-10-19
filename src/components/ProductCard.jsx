import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AddToCartButton from './AddToCartButton.jsx';
import LikeButton from './LikeButton.jsx';
import ImageModal from './ImageModal.jsx';

const ProductCard = ({ id, name, description, price, originalPrice, discountPercent, isBestSeller, isSoldOut, weight, image }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <motion.div
        className="three-d-card relative group overflow-hidden p-2 sm:p-4 md:p-6 max-w-full md:max-w-sm flex flex-row md:flex-col items-center md:items-start h-auto cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
          border: '1px solid #444444',
          borderRadius: '16px'
        }}
      >
        <motion.div
          animate={{ rotateY: isHovered ? 5 : 0, rotateX: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <LikeButton product={{ id, name, description, price, originalPrice, discountPercent, isBestSeller, isSoldOut, weight, image }} />

          {/* Badges with 3D effect */}
          {discountPercent > 0 && !isSoldOut && (
            <motion.div
              className="discount-badge absolute top-2 left-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs px-2 py-1 rounded-lg uppercase z-10 glow-border"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {discountPercent}% OFF
            </motion.div>
          )}
          {isBestSeller && !isSoldOut && (
            <motion.div
              className="best-seller-badge absolute top-12 left-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs px-2 py-1 rounded-lg uppercase z-10 glow-border"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              BEST SELLER
            </motion.div>
          )}
          {isSoldOut && (
            <motion.div
              className="sold-out-badge absolute top-2 left-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-xs px-2 py-1 rounded-lg uppercase z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              SOLD OUT
            </motion.div>
          )}

          <Link to={`/product/${id}`} className="flex flex-row md:flex-col items-center md:items-start flex-grow min-w-0">
            <motion.div
              className="image-container overflow-hidden rounded-lg mb-0 md:mb-4 w-20 h-20 md:w-full md:h-48 flex-shrink-0 relative"
              onClick={openModal}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <picture>
                <source srcSet={image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <motion.img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              </picture>

              {/* 3D Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col flex-grow ml-2 md:ml-0 min-w-0"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-sm md:text-lg mb-2 text-white uppercase tracking-wide truncate glow-text">
                {name}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 mb-3 truncate">
                {description}
              </p>
              <div className="flex justify-between items-center mb-3 min-w-0">
                <motion.span
                  className="font-bold text-lg md:text-xl text-yellow-400 truncate"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ₹{price > 0 ? price : 'N/A'}
                </motion.span>
                {originalPrice > price && originalPrice > 0 && (
                  <span className="text-xs md:text-sm text-gray-500 line-through truncate">
                    ₹{originalPrice}
                  </span>
                )}
                <span className="text-xs md:text-sm text-gray-400 truncate">
                  {weight} gm
                </span>
              </div>
            </motion.div>
          </Link>

          <motion.div
            animate={{ y: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddToCartButton
              className="w-full btn-3d text-sm font-semibold"
              product={{ id, name, price }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {modalOpen && <ImageModal image={image} name={name} onClose={closeModal} />}
    </>
  );
};

export default ProductCard;
