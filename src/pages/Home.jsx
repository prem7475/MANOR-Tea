import React from 'react';
import VideoSection from '../components/VideoSection.jsx';
import BestProductsSection from '../components/BestProductsSection.jsx';
import OurServicesSection from '../components/OurServicesSection.jsx';
import BundlesSection from '../components/BundlesSection.jsx';
import FoundersNote from '../components/FoundersNote.jsx';
import ProcessStepper from '../components/ProcessStepper.jsx';
import ProductCard from '../components/ProductCard.jsx';
import teaData from '../data/teaData.js';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const Home = () => {
  const { getRecommendations } = useRecommendations();
  // Ensure we have data before trying to get recommendations
  const recommendations = getRecommendations ? getRecommendations(teaData) : teaData.slice(0, 4);

  return (
    <main className="bg-gray-900 text-white font-serif">
      {/* Hero Video Section */}
      <VideoSection />

      {/* Main Content Sections */}
      <BestProductsSection />
      <OurServicesSection />
      <BundlesSection />
      <FoundersNote />
      <ProcessStepper />

      {/* Recommended Products Section */}
      <section className="py-16 px-4 md:px-8 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {recommendations.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;