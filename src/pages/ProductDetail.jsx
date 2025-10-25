import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton.jsx';
import { useCart } from '../hooks/useCart.jsx';
import teaData from '../data/teaData.js';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { trackInteraction, getRecommendations } = useRecommendations();
  const [showStickyBar, setShowStickyBar] = useState(false);

  const product = teaData.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  // Mock flavor profile data - in real app this would come from product data
  const flavorProfile = {
    strength: product.strength || 7,
    aroma: product.aroma || 8,
    spiciness: product.spiciness || 3
  };

  // Frequently bought together items
  const frequentlyBought = [
    { id: 'tea-jar', name: 'MANOR Tea Jar', price: 450, image: '/images/tea-jar.jpg' },
    { id: 'strainer', name: 'Premium Tea Strainer', price: 250, image: '/images/strainer.jpg' },
    { id: 'cups', name: 'Tea Cups Set', price: 350, image: '/images/cups.jpg' }
  ];

  const bundlePrice = product.price + frequentlyBought.reduce((sum, item) => sum + item.price, 0);
  const individualPrice = bundlePrice + 150; // Mock savings

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 400; // Show sticky bar after scrolling 400px
      setShowStickyBar(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track view interaction
  useEffect(() => {
    trackInteraction(id, 'view');
  }, [id, trackInteraction]);

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  const handleAddBundle = () => {
    addToCart(product);
    frequentlyBought.forEach(item => addToCart(item));
  };

  return (
    <div className="p-4 bg-manorBg min-h-screen font-serif text-manorText">
      <div className="max-w-4xl mx-auto">
        {/* Main Content: Horizontal Layout */}
        <div className="flex flex-col md:flex-row bg-manorBg border border-manorAccent/20 rounded-lg shadow-md p-4 mb-6">
          {/* Product Image on Left */}
          <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
            <div className="image-container overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          {/* Product Details on Right */}
          <div className="flex-1 md:ml-6">
            <h1 className="font-serif font-bold text-xl mb-2 text-manorText uppercase tracking-wide">{product.name}</h1>
            <p className="font-serif text-sm text-manorText/80 mb-3">{product.description}</p>
            {product.rating && (
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-manorText/60 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}
            <div className="flex justify-between items-center font-serif mb-4">
              <span className="font-semibold text-gray-800 text-xl">₹{product.price > 0 ? product.price : 'N/A'}</span>
              {product.originalPrice > product.price && product.originalPrice > 0 && (
                <span className="text-sm text-manorText/60 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-sm text-manorText/60">{product.weight} gm</span>
            </div>

            {/* Additional Information - Tabbed/Accordion */}
            <div className="bg-manorBg border border-manorAccent/20 rounded-lg shadow-md p-4">
              <details className="mb-4">
                <summary className="font-serif font-bold text-lg cursor-pointer mb-2">Description</summary>
                <p className="font-serif text-sm text-manorText/80">{product.description}</p>
              </details>
              <details className="mb-4">
                <summary className="font-serif font-bold text-lg cursor-pointer mb-2">Brewing Instructions</summary>
                <p className="font-serif text-sm text-manorText/80">Use 1 tsp of tea per cup. Brew with hot water (80-90°C) for {product.brewingTime || '3-5 minutes'}. Add milk and sugar to taste.</p>
              </details>
              <details className="mb-4">
                <summary className="font-serif font-bold text-lg cursor-pointer mb-2">Ingredients & Health Benefits</summary>
                <p className="font-serif text-sm text-manorText/80 mb-2">Origin: {product.origin || 'Premium Estates'}</p>
                <p className="font-serif text-sm text-manorText/80 mb-2">Type: {product.type || 'Black Tea'}</p>
                <p className="font-serif text-sm text-manorText/80 mb-2">Caffeine: {product.caffeine || 'Medium'}</p>
                <p className="font-serif text-sm text-manorText/80">Rich in antioxidants, may help with digestion and provide a natural energy boost.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Flavor Profile Visualizer */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-serif font-bold text-manorText mb-6">Flavor Profile</h2>
          <div className="space-y-4">
            <div className="flavor-profile-item">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-manorText">Strength</span>
                <span className="text-sm text-manorText/70">{flavorProfile.strength}/10</span>
              </div>
              <div className="flavor-bar">
                <div
                  className="flavor-bar-fill strength"
                  style={{ width: `${flavorProfile.strength * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="flavor-profile-item">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-manorText">Aroma</span>
                <span className="text-sm text-manorText/70">{flavorProfile.aroma}/10</span>
              </div>
              <div className="flavor-bar">
                <div
                  className="flavor-bar-fill aroma"
                  style={{ width: `${flavorProfile.aroma * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="flavor-profile-item">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-manorText">Spiciness</span>
                <span className="text-sm text-manorText/70">{flavorProfile.spiciness}/10</span>
              </div>
              <div className="flavor-bar">
                <div
                  className="flavor-bar-fill spiciness"
                  style={{ width: `${flavorProfile.spiciness * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-serif font-bold text-manorText mb-6">Frequently Bought Together</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            {/* Main Product */}
            <div className="flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded mb-2" />
              <span className="text-sm text-center font-medium">{product.name}</span>
              <span className="text-sm text-manorAccent">₹{product.price}</span>
            </div>

            <span className="text-2xl text-manorText/50">+</span>

            {/* Bundle Items */}
            {frequentlyBought.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex flex-col items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mb-2" />
                  <span className="text-sm text-center font-medium">{item.name}</span>
                  <span className="text-sm text-manorAccent">₹{item.price}</span>
                </div>
                {index < frequentlyBought.length - 1 && <span className="text-2xl text-manorText/50">+</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="text-center">
            <div className="mb-4">
              <span className="text-manorText/60 line-through text-lg">₹{individualPrice}</span>
              <span className="text-2xl font-bold text-manorAccent ml-3">₹{bundlePrice}</span>
              <span className="text-green-600 font-semibold ml-2">Save ₹150</span>
            </div>
            <button
              onClick={handleAddBundle}
              className="bg-manorAccent text-white px-8 py-3 rounded-lg font-semibold hover:bg-manorDark transition-colors"
            >
              Add All to Cart
            </button>
          </div>
        </div>

        {/* Buttons Below */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-accentGreen text-white font-semibold py-3 px-4 rounded-lg hover:bg-accentHover transition-colors"
          >
            BUY NOW
          </button>
          <AddToCartButton product={product} className="flex-1" />
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-manorBg border border-manorAccent/20 rounded-lg shadow-md p-4">
          <h2 className="font-serif font-bold text-lg mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold">John D.</span>
                <span className="ml-2 text-yellow-500">★★★★★</span>
              </div>
              <p className="text-sm text-manorText/80">Excellent tea! Rich flavor and perfect for my morning routine.</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold">Sarah M.</span>
                <span className="ml-2 text-yellow-500">★★★★☆</span>
              </div>
              <p className="text-sm text-manorText/80">Great quality, but a bit strong for my taste. Still, highly recommend!</p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="font-semibold">Mike R.</span>
                <span className="ml-2 text-yellow-500">★★★★★</span>
              </div>
              <p className="text-sm text-manorText/80">Love the packaging and the freshness. Will buy again.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar for Mobile */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-manorAccent/20 p-4 shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-manorAccent font-bold">₹{product.price}</p>
              </div>
            </div>
            <AddToCartButton product={product} className="bg-manorAccent text-white px-4 py-2 rounded-lg text-sm font-semibold" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;