import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaLeaf, FaTruck, FaGift, FaStar, FaUtensils } from 'react-icons/fa';

const OurServicesSection = () => {
  const services = [
    {
      title: 'All Grocery Items',
      description: 'Discover our premium grocery selection, carefully curated for quality and taste.',
      icon: FaShoppingCart,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Different types of TEA',
      description: 'Explore our exquisite collection of premium teas from around the world.',
      icon: FaLeaf,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Free Home Delivery in Nagpur',
      description: 'Enjoy complimentary home delivery service within Nagpur city limits.',
      icon: FaTruck,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Dry Fruits',
      description: 'Premium quality dry fruits, nuts, and healthy snacks for your wellness.',
      icon: FaUtensils,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Gift Hampers',
      description: 'Beautifully curated gift hampers perfect for any special occasion.',
      icon: FaGift,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Special Requests Orders',
      description: 'Custom orders and special requests fulfilled with care and attention.',
      icon: FaStar,
      color: 'from-amber-500 to-amber-600'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.section
      id="services"
      className="relative py-8 sm:py-12 md:py-16 overflow-hidden"
      style={{
        backgroundImage: "url('/manor%20bg%201.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 7 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 glow-text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Experience excellence in every service we provide, crafted with passion and delivered with care
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="transform-gpu"
            >
              <motion.div
                className="glass-morphism p-6 rounded-2xl shadow-2xl h-full border border-white/10 hover:border-amber-400/50 transition-all duration-300"
                whileHover={{
                  boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)',
                  y: -5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 mx-auto`}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="text-2xl text-white" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-xl font-serif font-bold text-white mb-3 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-sm text-center leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.description}
                </motion.p>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-amber-400/0"
                  whileHover={{ borderColor: 'rgba(251, 191, 36, 0.5)' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-8xl opacity-5 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            ☕
          </motion.div>
        </div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-5 pointer-events-none">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            🍵
          </motion.div>
        </div>

        {/* Floating Tea Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`service-tea-${i}`}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 25 - 12.5, 0],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 6,
              }}
            >
              {['🍵', '🫖', '🌿', '☕', '🥥'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default OurServicesSection;
