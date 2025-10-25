import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Marquee from './components/Marquee.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SearchBar from './components/SearchBar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Leadership from './pages/Leadership.jsx';
import Contact from './pages/Contact.jsx';
import Products from './pages/Products.jsx';
import Gifts from './pages/Gifts.jsx';
import CustomHamper from './pages/CustomHamper.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Favourites from './pages/Favourites.jsx';
import HelpDesk from './pages/HelpDesk.jsx';
import Offers from './pages/Offers.jsx';

import Cart from './pages/Cart.jsx';
import Checkout from './pages/Chcekout.jsx';
import Payment from './pages/Payment.jsx';
import Toast from './components/Toast.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import { useCart } from './hooks/useCart.jsx';

const CartPage = () => {
  const { setIsCartOpen } = useCart();
  useEffect(() => {
    setIsCartOpen(true);
  }, [setIsCartOpen]);
  return null; // Sidebar will be rendered in AppContent
};

const AppContent = () => {
  const { toast, setToast, isCartOpen, setIsCartOpen } = useCart();

  const openCart = () => setIsCartOpen(true);

  return (
    <div className="bg-manorLight text-manorText font-serif min-h-screen flex flex-col">
      <Marquee />
      <Navbar openCart={openCart} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/custom-hamper" element={<CustomHamper />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/helpdesk" element={<HelpDesk />} />
          <Route path="/offers" element={<Offers />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <AppContent />
  </ErrorBoundary>
);

export default App;
