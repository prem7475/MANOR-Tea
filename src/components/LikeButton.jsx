import React from 'react';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const LikeButton = ({ product }) => {
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();
  const { trackInteraction } = useRecommendations();
  const favourite = isFavourite(product.id);

  const handleToggleFavourite = () => {
    if (favourite) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
      trackInteraction(product.id, 'like');
    }
  };

  return (
    <button
      onClick={handleToggleFavourite}
      className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 z-20 ${
        favourite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-100'
      }`}
      aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 fill-current"
        viewBox="0 0 24 24"
        stroke="none"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default LikeButton;
