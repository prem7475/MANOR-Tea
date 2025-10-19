import React, { createContext, useContext, useState } from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = product => {
    setFavourites(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavourites = productId => {
    setFavourites(prev => prev.filter(p => p.id !== productId));
  };

  const isFavourite = productId => {
    return favourites.some(p => p.id === productId);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
