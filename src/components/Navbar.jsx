import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { Heart, ShoppingCart, X, Menu, Search } from 'lucide-react'; 

const Navbar = ({ openCart }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCartSummary, setShowCartSummary] = useState(false);
  
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
    const textColor = "text-[#2B221F]"; 
    
    // Desktop Styling
    if (!isMobile) {
      const baseClasses = `${textColor} font-medium transition-colors duration-200 rounded-full px-5 py-2`; // slightly more padding
      const activeState = isActive(path) ? "bg-[#E69536] text-[#2B221F] shadow-sm" : "hover:text-[#E69536]";
      return `${baseClasses} ${activeState}`;
    }

    // Mobile Styling (Vertical List Item)
    const baseClasses = `${textColor} flex w-full items-center justify-start text-lg font-medium py-4 border-b border-[#EACAA5]/30 transition-colors duration-200`; // py-4 for mobile
    const activeState = isActive(path) ? "text-[#E69536] pl-2 border-l-4 border-[#E69536]" : "hover:text-[#E69536] hover:pl-2";
    return `${baseClasses} ${activeState}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 font-serif text-[#2B221F] transition-all duration-300 ease-in-out px-4 md:px-8 flex items-center justify-between
        ${isScrolled ? 'shadow-md py-3' : 'py-5 shadow-none'} 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'} 
        `}
        style={{
          backgroundColor: isScrolled ? 'rgba(243, 224, 198, 0.95)' : '#F3E0C6',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none', 
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none', 
        }}
      >
        {/* 1. Company Logo - BIGGER */}
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
              <span className="text-2xl md:text-3xl font-bold tracking-wide leading-none text-[#2B221F]">MANOR</span>
              <span className="text-[11px] tracking-[0.2em] uppercase opacity-80 mt-1 text-[#2B221F]">The tea of your morning</span>
          </div>
        </Link>

        {/* 2. Desktop Navigation Links - BIGGER FONT */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-10 text-lg">
          <Link to="/" className={getNavClasses('/')}>Home</Link>
          <Link to="/products" className={getNavClasses('/products')}>Products</Link>
          <Link to="/gifts" className={getNavClasses('/gifts')}>Gifts</Link>
          <Link to="/about" className={getNavClasses('/about')}>About Us</Link>
          <Link to="/leadership" className={getNavClasses('/leadership')}>Leadership</Link>
        </div>

        {/* 3. Right Side Icons - BIGGER ICONS */}
        <div className="flex items-center gap-5 md:gap-8 flex-shrink-0">
          
          {/* Search Icon */}
          <button onClick={() => setShowSearch(!showSearch)} className="hover:text-[#E69536] transition-colors">
            <Search className="w-6 h-6 text-[#2B221F]" strokeWidth={1.5} />
          </button>

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
            onClick={(e) => { e.preventDefault(); openCart(); }}
            onMouseEnter={() => setShowCartSummary(true)}
            onMouseLeave={() => setShowCartSummary(false)}
          >
            <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="bg-[#E69536] text-white rounded-full text-[11px] w-5 h-5 flex items-center justify-center font-bold absolute -top-2 -right-2">
                {cart.length}
              </span>
            )}

            {/* Cart Summary */}
            {showCartSummary && cart.length > 0 && (
              <div className="absolute top-full right-0 mt-6 w-80 bg-white border border-gray-100 rounded-lg shadow-xl z-50 p-6 animate-fade-in-up font-sans cursor-default text-[#2B221F]">
                <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">Cart Summary</h4>
                <ul className="space-y-3 max-h-56 overflow-y-auto custom-scrollbar pr-2">
                  {cart.slice(0, 3).map(({ id, name, price, quantity }) => (
                    <li key={id} className="text-sm flex justify-between items-center gap-3">
                      <span className="truncate font-medium">{name}</span>
                      <span className="font-semibold whitespace-nowrap">₹{price} x {quantity}</span>
                    </li>
                  ))}
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
            className="md:hidden flex items-center justify-center p-1 focus:outline-none hover:text-[#E69536] transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" strokeWidth={1.5} /> : <Menu className="w-8 h-8" strokeWidth={1.5} />}
          </button>
        </div>

        {/* 4. Mobile Menu Dropdown */}
        <div 
          className={`md:hidden fixed left-0 right-0 bg-[#F3E0C6] shadow-xl z-40 flex flex-col items-start justify-start px-8 pt-8 pb-12 gap-3 transition-all duration-300 ease-in-out border-t border-[#EACAA5]/50 ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          style={{ top: isScrolled ? '72px' : '96px' }}
        >
          <Link to="/" className={getNavClasses('/', true)} onClick={closeMobileMenu}>Home</Link>
          <Link to="/products" className={getNavClasses('/products', true)} onClick={closeMobileMenu}>Products</Link>
          <Link to="/gifts" className={getNavClasses('/gifts', true)} onClick={closeMobileMenu}>Gifts</Link>
          <Link to="/about" className={getNavClasses('/about', true)} onClick={closeMobileMenu}>About Us</Link>
          <Link to="/leadership" className={getNavClasses('/leadership', true)} onClick={closeMobileMenu}>Leadership</Link>
          
          <Link to="/favourites" className={`${getNavClasses('/favourites', true)} gap-3`} onClick={closeMobileMenu}>
             Favourites <Heart className="w-6 h-6 text-[#E69536]" strokeWidth={1.5} />
          </Link>
        </div>
      </nav>

      {/* Search Bar Overlay */}
      {showSearch && (
          <div className="fixed top-[96px] left-0 right-0 bg-white p-5 shadow-md z-40 flex justify-center animate-fade-in">
              <input type="text" placeholder="Search tea..." className="w-full max-w-lg border border-gray-300 rounded-full px-6 py-3 text-lg focus:outline-none focus:border-[#E69536] text-[#2B221F]" />
          </div>
      )}

      {/* === SPACER DIV === 
          Increased height to prevent overlap with the bigger navbar.
      */}
      <div className="h-[80px] md:h-[96px] w-full bg-transparent"></div>
    </>
  );
};

export default Navbar;