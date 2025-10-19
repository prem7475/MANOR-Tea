import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { FavouritesProvider } from './context/FavouritesContext.jsx';
import { CartProvider } from './hooks/useCart.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Chcekout.jsx';
import Payment from './pages/Payment.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Leadership from './pages/Leadership.jsx';
import HelpDesk from './pages/HelpDesk.jsx';
import Favourites from './pages/Favourites.jsx';
import Gifts from './pages/Gifts.jsx';

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import AuthModal from './components/AuthModal.jsx';

// Styles
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 20,
      rotateX: -5
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0
    },
    out: {
      opacity: 0,
      scale: 1.02,
      y: -20,
      rotateX: 5
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <FavouritesProvider>
          <CartProvider>
            <Router>
          <motion.div
            className="min-h-screen bg-black text-white relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Lightweight Background */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]"></div>
            </div>

            {/* Simplified Background Elements */}
            <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
              {/* Static tea icons for visual appeal */}
              <div className="absolute top-20 left-10 text-4xl text-yellow-400/30">☕</div>
              <div className="absolute top-40 right-20 text-3xl text-amber-400/20">🍵</div>
              <div className="absolute bottom-32 left-1/4 text-2xl text-yellow-500/25">🫖</div>
              <div className="absolute bottom-20 right-1/3 text-3xl text-amber-300/20">☕</div>
            </div>

            {/* Main Content with Page Transitions */}
            <motion.div
              className="relative z-20"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Navbar openCart={openCart} openAuthModal={openAuthModal} />
              <motion.main
                className="min-h-screen"
                key={window.location.pathname}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Home />
                      </motion.div>
                    } />
                    <Route path="/products" element={
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Products />
                      </motion.div>
                    } />
                    <Route path="/product/:id" element={
                      <motion.div
                        initial={{ opacity: 0, rotateY: -45 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 45 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ProductDetail />
                      </motion.div>
                    } />
                    <Route path="/cart" element={
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Cart />
                      </motion.div>
                    } />
                    <Route path="/checkout" element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Checkout />
                      </motion.div>
                    } />
                    <Route path="/payment" element={
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Payment />
                      </motion.div>
                    } />
                    <Route path="/about" element={
                      <motion.div
                        initial={{ opacity: 0, rotateX: -30 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        exit={{ opacity: 0, rotateX: 30 }}
                        transition={{ duration: 0.5 }}
                      >
                        <About />
                      </motion.div>
                    } />
                    <Route path="/contact" element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, rotate: -3 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.02, rotate: 3 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Contact />
                      </motion.div>
                    } />
                    <Route path="/leadership" element={
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Leadership />
                      </motion.div>
                    } />
                    <Route path="/help" element={
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.4 }}
                      >
                        <HelpDesk />
                      </motion.div>
                    } />
                    <Route path="/favourites" element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.05, rotate: -5 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Favourites />
                      </motion.div>
                    } />
                    <Route path="/gifts" element={
                      <motion.div
                        initial={{ opacity: 0, rotateY: 45 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -45 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gifts />
                      </motion.div>
                    } />
                  </Routes>
                </AnimatePresence>
              </motion.main>
              <Footer />
            </motion.div>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={closeCart} />

            {/* Auth Modal */}
            <AuthModal
              isOpen={authModalOpen}
              onClose={closeAuthModal}
              initialMode={authModalMode}
            />

            {/* Enhanced Toast Notifications */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Toast />
            </motion.div>

            {/* Optimized Loading Screen Animation */}
            <motion.div
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              style={{ pointerEvents: 'none' }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  ☕
                </motion.div>
                <motion.h1
                  className="text-xl font-bold text-yellow-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Manor Tea
                </motion.h1>
              </motion.div>
            </motion.div>
          </motion.div>
            </Router>
          </CartProvider>
        </FavouritesProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
