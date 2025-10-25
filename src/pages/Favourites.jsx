import React from 'react';
import { useFavourites } from '../context/FavouritesContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ReferralProgram from '../components/ReferralProgram.jsx';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const { favourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <section className="empty-state-container p-8 font-serif text-manorText min-h-[60vh] flex flex-col items-center justify-center text-center">
        <Heart className="w-16 h-16 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-manorText">Your Favourites is Empty</h1>
        <p className="text-lg text-manorText/70 mb-8 max-w-md">
          Tap the heart on any product to save it here for later. Build your perfect tea collection!
        </p>
        <Link
          to="/products"
          className="primary-cta-button bg-manorGreen hover:bg-manorGreen/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="p-8 font-serif text-manorText">
      <h1 className="text-4xl font-bold mb-6">Your Favourites</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {favourites.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <ReferralProgram />
        </div>
      </div>
    </section>
  );
};

export default Favourites;
