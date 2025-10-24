import React from 'react';
import { useFavourites } from '../context/FavouritesContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

const Favourites = () => {
  const { favourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <section className="p-8 font-serif text-manorText">
        <h1 className="text-4xl font-bold mb-6">Your Favourites</h1>
        <p>You have no favourite products yet.</p>
      </section>
    );
  }

  return (
    <section className="p-8 font-serif text-manorText">
      <h1 className="text-4xl font-bold mb-6">Your Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {favourites.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Favourites;
