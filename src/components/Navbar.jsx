import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { Heart, ShoppingCart, Menu, User } from 'lucide-react';

const Navbar = ({ openCart }) => {
  const location = useLocation();
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCartSummary, setShowCartSummary] = useState(false);
  const { cart, cartAnimation } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { favourites } = useFavourites();

  const toggleDropdown = () => setCompanyDropdownOpen(!companyDropdownOpen);
  const closeDropdown = () => setCompanyDropdownOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white text-black px-4 md:px-8 py-2 shadow-lg flex items-center justify-between font-serif font-bold relative sticky top-0 z-50">
      {/* Company Logo */}
      <Link to="/" className="flex items-center relative group" onClick={closeMobileMenu}>
        <img
          src="/ManorLogo.png"
          alt="ManorLogo"
          className="h-8 md:h-12 w-auto"
        />
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-xl md:text-2xl font-bold text-black opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:left-full">
          MANOR
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-4 relative text-lg">
        <Link
          to="/"
          className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/') ? 'text-yellow-400' : ''}`}
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/products') ? 'text-yellow-400' : ''}`}
          onClick={closeMobileMenu}
        >
          Products
        </Link>
        <Link
          to="/gifts"
          className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/gifts') ? 'text-yellow-400' : ''}`}
          onClick={closeMobileMenu}
        >
          Gifts
        </Link>
        <Link
          to="/about"
          className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/about') ? 'text-yellow-400' : ''}`}
          onClick={closeMobileMenu}
        >
          About Us
        </Link>
        <Link
          to="/leadership"
          className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/leadership') ? 'text-yellow-400' : ''}`}
          onClick={closeMobileMenu}
        >
          Leadership
        </Link>
        <Link
          to="/offers"
          className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/offers') ? 'text-yellow-400' : ''}`}
          onClick={closeMobileMenu}
        >
          Offers
        </Link>

        {/* Favourites with Icon */}
        <Link
          to="/favourites"
          className={`relative hover:text-manorGold transition-colors duration-300 flex items-center gap-2 ${isActive('/favourites') ? 'text-manorGold' : ''}`}
          aria-label="Favourites"
          onClick={closeMobileMenu}
        >
          <Heart className="w-5 h-5" />
          <span className="hidden lg:inline">Favourites</span>
        </Link>

        {/* Cart with Icon */}
        <div
          className={`relative hover:text-manorGold transition-colors duration-300 flex items-center gap-2 cursor-pointer ${location.pathname === '/cart' ? 'text-manorGold' : ''}`}
          aria-label="Cart"
          onClick={(e) => {
            e.preventDefault();
            openCart();
            closeMobileMenu();
          }}
          onMouseEnter={() => setShowCartSummary(true)}
          onMouseLeave={() => setShowCartSummary(false)}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden lg:inline">Cart</span>
          {cart.length > 0 && (
            <span className="bg-manorGreen text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold animate-bounce-in">
              {cart.length}
            </span>
          )}
          {showCartSummary && cart.length > 0 && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
              <h4 className="font-bold text-sm mb-2">Cart Summary</h4>
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {cart.slice(0, 3).map(({ id, name, price, quantity }) => (
                  <li key={id} className="text-xs flex justify-between">
                    <span className="truncate">{name}</span>
                    <span>₹{price} x {quantity}</span>
                  </li>
                ))}
                {cart.length > 3 && <li className="text-xs text-gray-500">...and {cart.length - 3} more</li>}
              </ul>
              <div className="mt-2 text-sm font-semibold">Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cart and Menu */}
      <div className="md:hidden flex items-center gap-6 text-xl">
        <div
          className="relative hover:text-manorGold transition-colors duration-300 flex items-center gap-2 cursor-pointer"
          aria-label="Cart"
          onClick={openCart}
        >
          <ShoppingCart className="w-8 h-8" />
          {cart.length > 0 && (
            <span className="bg-manorGreen text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold animate-bounce-in">
              {cart.length}
            </span>
          )}
        </div>
        <button
          className="flex flex-col justify-center items-center w-10 h-10 space-y-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-8 h-1 bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-8 h-1 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-1 bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 flex flex-col items-center py-3 space-y-3">
          <Link
            to="/"
            className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/') ? 'text-yellow-400' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/products') ? 'text-yellow-400' : ''}`}
            onClick={closeMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/gifts"
            className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/gifts') ? 'text-yellow-400' : ''}`}
            onClick={closeMobileMenu}
          >
            Gifts
          </Link>
          <Link
            to="/about"
            className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/about') ? 'text-yellow-400' : ''}`}
            onClick={closeMobileMenu}
          >
            About Us
          </Link>
          <Link
            to="/leadership"
            className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/leadership') ? 'text-yellow-400' : ''}`}
            onClick={closeMobileMenu}
          >
            Leadership
          </Link>
          <Link
            to="/offers"
            className={`hover:text-yellow-400 transition-colors duration-300 ${isActive('/offers') ? 'text-yellow-400' : ''}`}
            onClick={closeMobileMenu}
          >
            Offers
          </Link>
          <Link
            to="/favourites"
            className={`relative hover:text-manorGold transition-colors duration-300 flex items-center gap-2 ${isActive('/favourites') ? 'text-manorGold' : ''}`}
            aria-label="Favourites"
            onClick={closeMobileMenu}
          >
            <Heart className="w-5 h-5" />
            Favourites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
