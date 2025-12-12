import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { Heart, ShoppingCart, X } from 'lucide-react'; 

const Navbar = ({ openCart }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCartSummary, setShowCartSummary] = useState(false);
  
  // State for appearance (Faded vs Flat)
  const [isScrolled, setIsScrolled] = useState(false);
  // State for visibility (Smart Roll Up/Down)
  const [isVisible, setIsVisible] = useState(true);
  
  // Ref to track scroll direction
  const lastScrollY = useRef(0);

  const { cart } = useCart();
  // const { favourites } = useFavourites(); 

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  // Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Transparency Logic (Faded Glass Effect)
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Smart Visibility Logic (Hide on Down, Show on Up)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling DOWN -> Hide Navbar
        setIsVisible(false);
      } else {
        // Scrolling UP -> Show Navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper for Link Styling (Updated to Manor Orange #E69536)
  const getNavClasses = (path, isMobile = false) => {
    const textColor = "text-[#2B221F]"; 
    const baseClasses = `${textColor} font-medium transition-colors duration-200 rounded-full`;
    const padding = isMobile ? "px-6 py-2 my-1" : "px-5 py-1.5";
    
    // Active state uses Orange + White text
    const activeState = isActive(path) 
      ? "bg-[#E69536] text-white shadow-sm" 
      : "hover:text-[#E69536]";

    return `${baseClasses} ${padding} ${activeState}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-serif text-[#2B221F] transition-all duration-300 ease-in-out px-6 md:px-12 flex items-center justify-between
      ${isScrolled ? 'shadow-lg py-2' : 'py-5 shadow-none'}
      ${isVisible ? 'translate-y-0' : '-translate-y-full'} 
      `}
      // Inline styles for reliable Transparency/Glass effect
      style={{
        backgroundColor: isScrolled ? 'rgba(243, 224, 198, 0.3)' : '#F3E0C6', // 0.3 Opacity (Very Faded)
        backdropFilter: isScrolled ? 'blur(12px)' : 'none', 
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none', 
      }}
    >
      {/* 1. Company Logo & Text */}
      <Link 
        to="/" 
        className="flex items-center gap-3 flex-shrink-0" 
        onClick={closeMobileMenu}
      >
        <img
          src="/ManorLogo.png"
          alt="ManorLogo"
          className="h-12 md:h-14 w-auto object-contain"
        />
        <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold tracking-wide leading-none">MANOR</span>
            <span className="text-[10px] tracking-[0.2em] uppercase opacity-80 mt-1">The tea of your morning</span>
        </div>
      </Link>

      {/* 2. Desktop Navigation Links */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-8 text-base">
        <Link to="/" className={getNavClasses('/')}>Home</Link>
        <Link to="/products" className={getNavClasses('/products')}>Products</Link>
        <Link to="/gifts" className={getNavClasses('/gifts')}>Gifts</Link>
        <Link to="/about" className={getNavClasses('/about')}>About Us</Link>
        <Link to="/leadership" className={getNavClasses('/leadership')}>Leadership</Link>
      </div>

      {/* 3. Right Side Icons */}
      <div className="flex items-center gap-6 flex-shrink-0">
        {/* Favourites */}
        <Link
          to="/favourites"
          className={`hidden sm:flex items-center gap-2 transition-colors ${isActive('/favourites') ? 'text-[#E69536]' : 'hover:text-[#E69536]'}`}
          aria-label="Favourites"
        >
          <Heart className="w-6 h-6" strokeWidth={1.5} />
        </Link>

        {/* Cart Icon */}
        <div
          className="relative flex items-center gap-2 cursor-pointer hover:text-[#E69536] transition-colors"
          aria-label="Cart"
          onClick={(e) => {
            e.preventDefault();
            openCart();
          }}
          onMouseEnter={() => setShowCartSummary(true)}
          onMouseLeave={() => setShowCartSummary(false)}
        >
          <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
          
          {cart.length > 0 && (
            <span className="bg-[#E69536] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold absolute -top-1 -right-1">
              {cart.length}
            </span>
          )}

          {/* Cart Summary Hover Dropdown */}
          {showCartSummary && cart.length > 0 && (
            <div className="absolute top-full right-0 mt-5 w-72 bg-white border border-gray-100 rounded-lg shadow-xl z-50 p-5 animate-fade-in-up font-sans cursor-default text-[#2B221F]">
              <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
              
              <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">Cart Summary</h4>
              <ul className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                {cart.slice(0, 3).map(({ id, name, price, quantity }) => (
                  <li key={id} className="text-sm flex justify-between items-center gap-3">
                    <span className="truncate font-medium">{name}</span>
                    <span className="font-semibold whitespace-nowrap">₹{price} x {quantity}</span>
                  </li>
                ))}
                {cart.length > 3 && <li className="text-xs text-gray-500 italic text-center pt-2">...and {cart.length - 3} more</li>}
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100 text-base font-bold flex justify-between">
                <span>Total:</span>
                <span>₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden flex items-center justify-center p-1 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
             <X className="w-7 h-7 text-[#2B221F]" strokeWidth={1.5} />
          ) : (
             <span className="flex flex-col space-y-1.5">
                <span className="block w-7 h-0.5 bg-[#2B221F]"></span>
                <span className="block w-7 h-0.5 bg-[#2B221F]"></span>
                <span className="block w-5 h-0.5 bg-[#2B221F] self-end"></span>
             </span>
          )}
        </button>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      <div 
        className={`md:hidden fixed left-0 right-0 bg-[#F3E0C6] shadow-lg z-40 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen py-8 opacity-100 border-t border-[#EACAA5]' : 'max-h-0 py-0 opacity-0'
        }`}
        style={{ top: isScrolled ? '60px' : '88px' }} 
      >
        <Link to="/" className={getNavClasses('/', true)} onClick={closeMobileMenu}>Home</Link>
        <Link to="/products" className={getNavClasses('/products', true)} onClick={closeMobileMenu}>Products</Link>
        <Link to="/gifts" className={getNavClasses('/gifts', true)} onClick={closeMobileMenu}>Gifts</Link>
        <Link to="/about" className={getNavClasses('/about', true)} onClick={closeMobileMenu}>About Us</Link>
        <Link to="/leadership" className={getNavClasses('/leadership', true)} onClick={closeMobileMenu}>Leadership</Link>
        <Link to="/favourites" className={`${getNavClasses('/favourites', true)} flex items-center gap-2 mt-2`} onClick={closeMobileMenu}>
          <Heart className="w-5 h-5" strokeWidth={1.5} /> Favourites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;