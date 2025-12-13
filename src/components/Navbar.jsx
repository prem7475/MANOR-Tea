import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { Heart, ShoppingBag, X, Menu, Search } from 'lucide-react'; 

const Navbar = ({ openCart }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  
  const lastScrollY = useRef(0);
  const { cart } = useCart();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  // Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Transparency Logic
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Smart Visibility Logic (Hide on Down, Show on Up)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper for Link Styling
  const getNavClasses = (path, isMobile = false) => {
    // Desktop: Black Text, Gold Active State
    if (!isMobile) {
      const baseClasses = `font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 px-4 py-2 rounded-full`;
      const activeState = isActive(path) 
        ? "text-[#D4AF37] bg-[#2B221F]/5 font-bold" 
        : "text-[#2B221F] hover:text-[#D4AF37] hover:bg-[#2B221F]/5";
      return `${baseClasses} ${activeState}`;
    }

    // Mobile
    const baseClasses = `flex w-full items-center justify-start text-lg font-medium py-4 border-b border-[#EACAA5]/30 transition-colors duration-200`;
    const activeState = isActive(path) 
      ? "text-[#D4AF37] pl-4 border-l-2 border-[#D4AF37]" 
      : "text-[#2B221F] hover:text-[#D4AF37] hover:pl-2";
    return `${baseClasses} ${activeState}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 flex items-center justify-between
        ${isScrolled ? 'py-4 bg-[#FFF9F2]/95 backdrop-blur-md shadow-md border-b border-[#EACAA5]/50' : 'py-6 bg-[#FFF9F2] border-b border-transparent'} 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'} 
        `}
      >
        {/* 1. Company Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 flex-shrink-0 group" 
          onClick={closeMobileMenu}
        >
          <img
            src="/ManorLogo.png"
            alt="ManorLogo"
            // No invert class -> keeps original logo colors
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col justify-center">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-widest text-[#2B221F] group-hover:text-[#D4AF37] transition-colors duration-300">
                MANOR
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase opacity-80 mt-0.5 text-[#2B221F] hidden lg:block">
                The tea of your morning
              </span>
          </div>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-2 lg:gap-6">
          <Link to="/" className={getNavClasses('/')}>Home</Link>
          <Link to="/products" className={getNavClasses('/products')}>Products</Link>
          <Link to="/gifts" className={getNavClasses('/gifts')}>Gifts</Link>
          <Link to="/about" className={getNavClasses('/about')}>About Us</Link>
          <Link to="/leadership" className={getNavClasses('/leadership')}>Leadership</Link>
        </div>

        {/* 3. Right Side Icons (Black Colors) */}
        <div className="flex items-center gap-6 flex-shrink-0">
          
          <button onClick={() => setShowSearch(!showSearch)} className="text-[#2B221F] hover:text-[#D4AF37] transition-colors duration-300">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <Link
            to="/favourites"
            className={`hidden sm:flex items-center gap-2 transition-colors duration-300 ${isActive('/favourites') ? 'text-[#D4AF37]' : 'text-[#2B221F] hover:text-[#D4AF37]'}`}
          >
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </Link>

          {/* Cart Icon */}
          <div
            className="relative flex items-center gap-2 cursor-pointer text-[#2B221F] hover:text-[#D4AF37] transition-colors duration-300"
            onClick={(e) => { e.preventDefault(); openCart(); }}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="bg-[#D4AF37] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold absolute -top-1.5 -right-1.5 animate-bounce-in shadow-md">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center text-[#2B221F] hover:text-[#D4AF37] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>

        {/* 4. Mobile Menu Dropdown */}
        <div 
          className={`md:hidden fixed inset-x-0 bg-[#FFF9F2] shadow-2xl z-40 flex flex-col px-8 pt-8 pb-12 gap-2 transition-all duration-300 ease-in-out border-b border-[#D4AF37]/30 ${
            mobileMenuOpen ? 'top-[72px] opacity-100' : '-top-[400px] opacity-0 pointer-events-none'
          }`}
        >
          <Link to="/" className={getNavClasses('/', true)} onClick={closeMobileMenu}>Home</Link>
          <Link to="/products" className={getNavClasses('/products', true)} onClick={closeMobileMenu}>Products</Link>
          <Link to="/gifts" className={getNavClasses('/gifts', true)} onClick={closeMobileMenu}>Gifts</Link>
          <Link to="/about" className={getNavClasses('/about', true)} onClick={closeMobileMenu}>About Us</Link>
          <Link to="/leadership" className={getNavClasses('/leadership', true)} onClick={closeMobileMenu}>Leadership</Link>
        </div>
      </nav>

      {/* Search Bar Overlay */}
      {showSearch && (
          <div className="fixed top-[80px] left-0 right-0 bg-[#FFF9F2] p-6 shadow-2xl z-40 flex justify-center animate-fade-in border-b border-[#EACAA5]">
              <input 
                type="text" 
                placeholder="Search for premium teas..." 
                className="w-full max-w-lg bg-white border border-[#EACAA5] rounded-full px-6 py-3 text-[#2B221F] focus:border-[#D4AF37] placeholder-gray-400 focus:outline-none transition-colors" 
                autoFocus
              />
          </div>
      )}

      {/* === SPACER DIV === 
         This pushes the page content down by exactly 100px.
         This prevents the Home page from hiding behind the Navbar.
      */}
      <div className="w-full h-[100px] bg-[#FFF9F2]"></div>
    </>
  );
};

export default Navbar;