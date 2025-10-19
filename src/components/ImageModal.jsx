import React from 'react';

const ImageModal = ({ image, name, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="relative max-w-4xl max-h-full p-4">
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
