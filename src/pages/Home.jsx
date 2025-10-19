import React from 'react';
import { motion } from 'framer-motion';
import VideoSection from '../components/VideoSection.jsx';
import BestProductsSection from '../components/BestProductsSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import OurServicesSection from '../components/OurServicesSection.jsx';
import ProductCard from '../components/ProductCard.jsx';
import teaData from '../data/teaData.js';

const Home = () => {
  // Improved recommendations: based on best sellers and high ratings
  const recommendations = teaData
    .filter(product => product.isBestSeller || product.price > 200)
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.main
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-serif relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <VideoSection />
        <BestProductsSection />
        <OurServicesSection />

        {/* Recommended Products Section */}
        <motion.section
          className="py-8 sm:py-12 md:py-16 px-2 sm:px-4 md:px-8 relative"
          variants={itemVariants}
        >
          {/* Section Background with 3D Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,115,85,0.1)_0%,transparent_70%)]" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4 glow-text"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Recommended for You
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.p
                className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Discover our premium selection of handpicked teas, curated just for you
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {recommendations.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="transform-gpu"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating Tea Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 12 }, (_, i) => (
                <motion.div
                  key={`tea-${i}`}
                  className="absolute text-4xl opacity-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                >
                  {['☕', '🍵', '🫖', '🌿'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <ContactSection />
      </motion.div>
    </motion.main>
  );
};

export default Home;
