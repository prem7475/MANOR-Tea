import React from 'react';

const LeadershipCard = ({ id, name, designation, photo, details, isBlurred, onCardClick, isExpanded, onShowMore, index }) => {

  const handleCardClick = () => {
    onCardClick(id);
  };

  const toggleShowMore = () => {
    onShowMore(id);
  };

  return (
    <>
      <div
        className={`product-card relative group overflow-visible p-2 md:p-6 max-w-full md:max-w-sm flex flex-col items-center md:items-start h-auto hover:shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-500 ${isBlurred ? 'md:blur-sm md:opacity-50' : ''} fade-in-up`}
        onClick={handleCardClick}
      >
        <div className="image-container overflow-hidden rounded-md mb-0 md:mb-4 w-48 h-72 flex-shrink-0 border border-manorText/30">
          <picture>
            <source srcSet={photo.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </picture>
        </div>
        <div className="flex flex-col flex-grow min-w-0">
          <h3 className="font-serif font-semibold text-sm md:text-base mb-1 md:mb-2 text-manorText uppercase tracking-wide truncate">{name}</h3>
          <p className="font-serif text-xs md:text-sm text-manorText/80 mb-1 md:mb-3 line-clamp-3">{designation}</p>
          <p className={`font-serif text-xs md:text-sm text-manorText/60 mb-1 md:mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {details}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleShowMore();
            }}
            className="font-serif text-sm md:text-base text-manorText hover:text-manorText/80 underline self-start mt-2 px-2 py-1 bg-white/20 rounded border border-manorText/20"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LeadershipCard;
