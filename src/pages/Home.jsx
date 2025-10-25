import React from 'react';
import VideoSection from '../components/VideoSection.jsx';
import BestProductsSection from '../components/BestProductsSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import OurServicesSection from '../components/OurServicesSection.jsx';
import BundlesSection from '../components/BundlesSection.jsx';
import FoundersNote from '../components/FoundersNote.jsx';
import ProcessStepper from '../components/ProcessStepper.jsx';
import ProductCard from '../components/ProductCard.jsx';
import teaData from '../data/teaData.js';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const Home = () => {
  const { getRecommendations } = useRecommendations();
  const recommendations = getRecommendations(teaData);

  return (
    <main className="bg-gray-900 text-white font-serif">
      <VideoSection />
      <BestProductsSection />
      <OurServicesSection />
      <BundlesSection />
      <FoundersNote />
      <ProcessStepper />

      {/* Recommended Products Section */}
      <section className="py-16 px-4 md:px-8 bg-manorBg text-manorText">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {recommendations.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default Home;
