import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserMenu from './UserMenu.jsx';
import { FaShoppingCart, FaHeart, FaBars, FaTimes, FaHome, FaBox, FaGift, FaInfo, FaUsers, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = ({ openCart, openAuthModal }) => {
  const location = useLocation();
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cart, cartAnimation } = useCart();
  const { favourites } = useFavourites();
  const { user } = useAuth();

  const toggleDropdown = () => setCompanyDropdownOpen(!companyDropdownOpen);
  const closeDropdown = () => setCompanyDropdownOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/products', label: 'Products', icon: FaBox },
    { path: '/gifts', label: 'Gifts', icon: FaGift },
    { path: '/about', label: 'About Us', icon: FaInfo },
    { path: '/leadership', label: 'Leadership', icon: FaUsers },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-morphism text-white px-2 sm:px-4 md:px-8 py-4 shadow-2xl flex items-center justify-between font-bold relative sticky top-0 z-50"
      style={{
        background: 'rgba(42, 42, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Company Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="flex items-center relative group" onClick={closeMobileMenu}>
          <motion.img
            src="/ManorLogo.png"
            alt="ManorLogo"
            className="h-12 md:h-16 w-auto"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          />
          <motion.span
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl font-bold text-yellow-400 opacity-0"
            initial={{ x: 0 }}
            whileHover={{ x: 60, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            MANOR
          </motion.span>
        </Link>
      </motion.div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6 relative text-xl">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Link
              to={item.path}
              className={`relative hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive(item.path) ? 'text-yellow-400 bg-yellow-400/10' : 'text-white'
              }`}
              onClick={closeMobileMenu}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="text-lg" />
              </motion.div>
              <span className="relative">
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </span>
            </Link>
          </motion.div>
        ))}

        {/* Favourites */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/favourites"
            className={`relative hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/favourites') ? 'text-yellow-400 bg-yellow-400/10' : 'text-white'
            }`}
            aria-label="Favourites"
            onClick={closeMobileMenu}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              animate={{
                color: favourites.length > 0 ? '#ef4444' : '#ffffff'
              }}
            >
              <FaHeart className="text-lg" />
            </motion.div>
            <span>Your Fav</span>
            {favourites.length > 0 && (
              <motion.span
                className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {favourites.length}
              </motion.span>
            )}
          </Link>
        </motion.div>

        {/* Cart */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative"
        >
          <motion.button
            className={`hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
              location.pathname === '/cart' ? 'text-yellow-400 bg-yellow-400/10' : 'text-white'
            }`}
            aria-label="Cart"
            onClick={(e) => {
              e.preventDefault();
              openCart();
              closeMobileMenu();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={cartAnimation ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              <FaShoppingCart className="text-lg" />
            </motion.div>
            <span>Your CART</span>
            {cart.length > 0 && (
              <motion.span
                className="bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                key={cart.length}
              >
                {cart.length}
              </motion.span>
            )}
          </motion.button>
        </motion.div>

        {/* Auth Buttons or User Menu */}
        {user ? (
          <UserMenu />
        ) : (
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors duration-300 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignInAlt className="text-sm" />
              <span>Login</span>
            </motion.button>
            <motion.button
              onClick={() => openAuthModal('register')}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus className="text-sm" />
              <span>Sign Up</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile Cart and Menu */}
      <div className="md:hidden flex items-center gap-4 text-xl">
        <motion.button
          className="relative hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg text-white"
          aria-label="Cart"
          onClick={openCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={cartAnimation ? {
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.2, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <FaShoppingCart className="text-lg" />
          </motion.div>
          {cart.length > 0 && (
            <motion.span
              className="bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              key={cart.length}
            >
              {cart.length}
            </motion.span>
          )}
        </motion.button>

        <motion.button
          className="flex flex-col justify-center items-center w-10 h-10 space-y-1 p-2 rounded-lg glass-morphism"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
            animate={{ backgroundColor: mobileMenuOpen ? '#ef4444' : '#fbbf24' }}
          />
          <motion.span
            className={`block w-6 h-0.5 bg-yellow-400 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
            animate={{ backgroundColor: '#fbbf24' }}
          />
          <motion.span
            className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
            animate={{ backgroundColor: mobileMenuOpen ? '#ef4444' : '#fbbf24' }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 glass-morphism shadow-2xl z-50 flex flex-col items-center py-6 space-y-4"
            style={{
              background: 'rgba(42, 42, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`hover:text-yellow-400 transition-all duration-300 flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                    isActive(item.path) ? 'text-yellow-400 bg-yellow-400/10' : 'text-white'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="text-lg" />
                  </motion.div>
                  <span className="font-semibold">{item.label}</span>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/favourites"
                className={`relative hover:text-yellow-400 transition-all duration-300 flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                  isActive('/favourites') ? 'text-yellow-400 bg-yellow-400/10' : 'text-white'
                }`}
                aria-label="Favourites"
                onClick={closeMobileMenu}
              >
                <motion.div
                  animate={{
                    color: favourites.length > 0 ? '#ef4444' : '#ffffff'
                  }}
                >
                  <FaHeart className="text-lg" />
                </motion.div>
                <span className="font-semibold">Your Fav</span>
                {favourites.length > 0 && (
                  <motion.span
                    className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {favourites.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="flex flex-col gap-3 w-full px-4">
                <motion.button
                  onClick={() => {
                    openAuthModal('login');
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:text-yellow-400 transition-colors duration-300 rounded-lg w-full justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignInAlt className="text-lg" />
                  <span className="font-semibold">Login</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    openAuthModal('register');
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg w-full justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserPlus className="text-lg" />
                  <span>Sign Up</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
