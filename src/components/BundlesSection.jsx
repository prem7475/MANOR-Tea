import React from 'react';
import { Link } from 'react-router-dom';

const BundlesSection = () => {
  const bundles = [
    {
      id: 'morning-ritual',
      title: 'The Perfect Morning',
      description: 'Start your day with our premium Assam tea, paired with a handcrafted ceramic mug and a fine mesh strainer.',
      image: '/images/morning-bundle.jpg',
      items: ['Premium Assam Tea (250g)', 'Ceramic Tea Mug', 'Mesh Strainer'],
      originalPrice: 1200,
      bundlePrice: 950,
      savings: 250
    },
    {
      id: 'afternoon-unwind',
      title: 'Afternoon Unwind',
      description: 'Relax with our soothing herbal blend, complete with a travel mug and infuser for on-the-go comfort.',
      image: '/images/afternoon-bundle.jpg',
      items: ['Herbal Relaxation Blend (200g)', 'Insulated Travel Mug', 'Silicone Infuser'],
      originalPrice: 1400,
      bundlePrice: 1100,
      savings: 300
    },
    {
      id: 'gifting-set',
      title: 'Thoughtful Gifting',
      description: 'Perfect for gifting - our signature collection with elegant packaging and premium accessories.',
      image: '/images/gift-bundle.jpg',
      items: ['Signature Tea Collection (500g)', 'Gift Box & Packaging', 'Branded Tea Spoons (Set of 2)'],
      originalPrice: 1800,
      bundlePrice: 1450,
      savings: 350
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-manorLight to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-manorText mb-4">
            Shop Our Rituals
          </h2>
          <p className="text-lg text-manorText/80 max-w-2xl mx-auto">
            Curated experiences that bring the art of tea-making to your daily life.
            Each bundle tells a story and creates lasting memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bundle-card group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-manorAccent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹{bundle.savings}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-serif font-bold text-manorText mb-2">
                  {bundle.title}
                </h3>
                <p className="text-manorText/70 mb-4 text-sm leading-relaxed">
                  {bundle.description}
                </p>

                <div className="mb-4">
                  <ul className="text-sm text-manorText/80 space-y-1">
                    {bundle.items.map((item, index) => (
                      <li key={index} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-manorAccent rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-manorText/60 line-through text-sm">
                    ₹{bundle.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-manorAccent">
                    ₹{bundle.bundlePrice}
                  </span>
                </div>

                <Link
                  to={`/bundle/${bundle.id}`}
                  className="inline-block bg-manorAccent text-white px-6 py-3 rounded-lg font-semibold hover:bg-manorDark transition-colors duration-300"
                >
                  Shop This Ritual
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundlesSection;
