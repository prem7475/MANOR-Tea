import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getSubtotal, getTotal, appliedOffer, setAppliedOffer, clearAppliedOffer } = useCart();
  const [coupon, setCoupon] = useState('');
  const [showOffers, setShowOffers] = useState(false);
  const navigate = useNavigate();

  const offers = [
    {
      code: 'PAYTM100',
      title: 'Paytm UPI - Up to ₹100 Cashback',
      desc: 'Up to ₹100 cashback if paid from Paytm UPI (on orders above ₹500)',
      minOrder: 500,
      type: 'flat',
      value: 100,
      terms: ['Valid on Paytm UPI', 'Orders above ₹500', 'Terms and conditions apply']
    },
    {
      code: 'BHIM30',
      title: 'BHIM UPI - ₹30 Off',
      desc: '₹30 discount if paid from BHIM UPI (on order above ₹500)',
      minOrder: 500,
      type: 'flat',
      value: 30,
      terms: ['Valid on BHIM UPI payments', 'Orders above ₹500', 'Terms and conditions apply']
    },
    {
      code: 'NAV30',
      title: 'Nav UPI - ₹30 Off',
      desc: 'Get ₹30 discount using Nav UPI on orders above ₹500',
      minOrder: 500,
      type: 'flat',
      value: 30,
      terms: ['Valid on Nav UPI payments', 'Orders above ₹500', 'Terms and conditions apply']
    },
    {
      code: 'MANOR10',
      title: 'MANOR10 - 10% Off',
      desc: '10% discount on orders above ₹500',
      minOrder: 500,
      type: 'percent',
      value: 0.1,
      terms: ['Valid on all items', 'One per order', 'Terms and conditions apply']
    },
    {
      code: 'MANOR20',
      title: 'MANOR20 - 20% Off',
      desc: '20% discount on orders above ₹1000',
      minOrder: 1000,
      type: 'percent',
      value: 0.2,
      terms: ['Valid on all items', 'One per order', 'Terms and conditions apply']
    },
    {
      code: 'BANK10',
      title: 'Bank Offer - 10% Off',
      desc: '10% discount on selected banks on order above ₹500',
      minOrder: 500,
      type: 'percent',
      value: 0.1,
      terms: ['Valid on selected banks', 'One per order', 'Terms and conditions apply']
    }
  ];

  const subtotal = getSubtotal();
  const gst = subtotal * 0.05;
  const delivery = subtotal >= 500 ? 0 : 50;
  const total = getTotal();

  const isEligible = (offer) => subtotal >= offer.minOrder;

  const applyOffer = (offer) => {
    setAppliedOffer(offer);
    setShowOffers(false);
  };

  const applyCoupon = () => {
    const upper = coupon.toUpperCase();
    let offer = null;
    if (upper === 'MANOR10') {
      offer = offers.find(o => o.code === 'MANOR10');
    } else if (upper === 'MANOR20') {
      offer = offers.find(o => o.code === 'MANOR20');
    } else {
      alert('Invalid coupon code');
      return;
    }
    if (subtotal >= offer.minOrder) {
      setAppliedOffer(offer);
      setCoupon('');
    } else {
      alert(`Minimum order value for ${offer.code} is ₹${offer.minOrder}`);
    }
  };

  const handleBuyNow = () => {
    // Navigate to checkout page without clearing cart
    onClose(); // Close sidebar
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 max-w-full bg-black shadow-lg z-60 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '100vw' }}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-400">Your Cart & Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 text-2xl"
            >
              &times;
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-amber-400">Cart Items</h3>
                <ul className="space-y-2">
                  {cart.map(({ id, name, price, quantity, image }) => (
                    <li key={id} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 border-b border-gray-600 pb-2">
                      <div className="flex items-center space-x-2 flex-1">
                        <img
                          src={image || '/imgtea.jpeg'}
                          alt={name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate">{name}</h4>
                          <p className="text-xs text-amber-400">₹{price} x {quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-2">
                        <div className="flex items-center space-x-1">
                          <button
                            className="bg-amber-600 text-white px-2 py-1 rounded text-xs hover:bg-amber-700 transition-colors"
                            onClick={() => updateQuantity(id, quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2 text-xs text-white min-w-[24px] text-center">{quantity}</span>
                          <button
                            className="bg-amber-600 text-white px-2 py-1 rounded text-xs hover:bg-amber-700 transition-colors"
                            onClick={() => updateQuantity(id, quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-red-400 text-xs hover:text-red-300 transition-colors whitespace-nowrap"
                          onClick={() => removeFromCart(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right space-y-1 text-white">
                  <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
                  <div>GST (5%): ₹{gst.toFixed(2)}</div>
                  <div>Delivery: {delivery === 0 ? 'Free' : `₹${delivery}`}</div>
                  {appliedOffer && <div>Discount: -₹{appliedOffer.discount.toFixed(2)}</div>}
                  <div className="font-bold text-lg text-amber-400">Total: ₹{total.toFixed(2)}</div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-amber-400">Apply Coupon</h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border border-gray-600 rounded p-2 text-sm bg-gray-800 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded hover:from-amber-700 hover:to-amber-800 transition-colors font-semibold text-sm whitespace-nowrap"
                    disabled={!!appliedOffer}
                  >
                    Apply
                  </button>
                </div>
                {appliedOffer && (
                  <div className="mb-4 p-3 bg-green-900 rounded border border-green-600 text-green-300 text-sm">
                    Applied: {appliedOffer.title} (-₹{appliedOffer.discount.toFixed(2)})
                    <button
                      onClick={clearAppliedOffer}
                      className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setShowOffers(true)}
                  className="text-amber-400 underline text-sm hover:text-amber-300 mb-4 w-full text-left border border-amber-400 p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Show all Offers
                </button>
                {showOffers && (
                  <div className="border-t border-gray-600 pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-amber-400">Available Offers</h4>
                      <button
                        onClick={() => setShowOffers(false)}
                        className="text-gray-400 hover:text-gray-300 text-sm"
                      >
                        Close
                      </button>
                    </div>
                    {offers.map(offer => {
                      const eligible = isEligible(offer);
                      return (
                        <div key={offer.code} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-amber-400 text-sm">{offer.title}</h5>
                            <button
                              onClick={() => applyOffer(offer)}
                              disabled={appliedOffer && appliedOffer.code === offer.code || !eligible}
                              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded text-xs hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 transition-colors"
                            >
                              {appliedOffer && appliedOffer.code === offer.code ? 'Applied' : eligible ? 'Apply' : `Min ₹${offer.minOrder}`}
                            </button>
                          </div>
                          <p className="text-sm mb-2 text-gray-300">{offer.desc}</p>
                          {!eligible && <p className="text-xs text-red-400 mb-2">Minimum order: ₹{offer.minOrder}</p>}
                          <ul className="text-xs text-gray-400 space-y-1">
                            {offer.terms.map(term => (
                              <li key={term}>• {term}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Buy Now Button */}
              <div>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded hover:from-amber-700 hover:to-amber-800 transition-colors font-semibold text-lg"
                >
                  BUY NOW
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
