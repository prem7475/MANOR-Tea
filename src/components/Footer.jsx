import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com', color: 'hover:text-pink-400' },
    { icon: FaFacebook, href: 'https://facebook.com', color: 'hover:text-blue-400' },
    { icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-500' },
  ];

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-morphism text-white p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center font-serif relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderTop: '1px solid rgba(139, 115, 85, 0.3)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center md:items-start gap-3 text-sm text-center md:text-left relative z-10"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="text-gray-300"
          whileHover={{ scale: 1.05, color: '#fbbf24' }}
          transition={{ duration: 0.2 }}
        >
          GST No. :- 27ADRPN3696H1ZT
        </motion.span>

        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.img
            src="/fsssai logo.png"
            alt="FSSAI Logo"
            className="h-8 w-auto"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          />
          <span className="text-gray-300">11523078000114</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.p
            className="text-sm text-gray-300"
            whileHover={{ color: '#fbbf24' }}
          >
            © MANOR Tea 2025 | All Rights Reserved
          </motion.p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaHeart className="text-red-500 text-xs" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center gap-6 mt-4 md:mt-0 relative z-10"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-yellow-400 ${social.color} transition-all duration-300 p-2 rounded-full glass-morphism`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{
              scale: 1.2,
              rotate: [0, -10, 10, 0],
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <social.icon className="text-2xl" />
          </motion.a>
        ))}
      </motion.div>

      {/* Floating Tea Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-yellow-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;
