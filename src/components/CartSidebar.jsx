import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getSubtotal, getTotal, appliedOffers, applyOffer, removeOffer } = useCart();
  const [form, setForm] = useState({ phone: '', email: '', address: '' });
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

  const handleApplyOffer = async (offer) => {
    await applyOffer(offer);
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
      applyOffer(offer);
      setCoupon('');
    } else {
      alert(`Minimum order value for ${offer.code} is ₹${offer.minOrder}`);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ phone: '', email: '', address: '' });
    onClose(); // Close sidebar after submit
    navigate('/payment');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        <div className="sidebar-container">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart & Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
                <ul className="space-y-2">
                  {cart.map(({ id, name, price, quantity, image }) => (
                    <li key={id} className="flex items-center space-x-2 border-b pb-2">
                      <img
                        src={image || '/imgtea.jpeg'}
                        alt={name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{name}</h4>
                        <p className="text-xs text-gray-600">₹{price} x {quantity}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-base min-h-[44px] min-w-[44px]"
                          onClick={() => updateQuantity(id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 text-base min-h-[44px] flex items-center">{quantity}</span>
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-base min-h-[44px] min-w-[44px]"
                          onClick={() => updateQuantity(id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-red-500 text-xs"
                        onClick={() => removeFromCart(id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right space-y-1">
                  <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
                  <div>GST (5%): ₹{gst.toFixed(2)}</div>
                  <div>Delivery: {delivery === 0 ? 'Free' : `₹${delivery}`}</div>
                  {appliedOffers.length > 0 && <div>Discount: -₹{appliedOffers.reduce((total, offer) => total + offer.discount, 0).toFixed(2)}</div>}
                  <div className="font-bold text-lg">Total: ₹{total.toFixed(2)}</div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Apply Coupon</h3>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border border-gray-300 rounded p-3 text-base min-h-[44px]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-[#c68e53] text-white px-4 py-3 rounded hover:bg-[#82512f] transition-colors font-semibold text-base min-h-[44px]"
                    disabled={appliedOffers.length > 0}
                  >
                    Apply
                  </button>
                </div>
                {appliedOffers.map(offer => (
                  <div key={offer.code} className="mb-4 p-3 bg-green-100 rounded border border-green-300 text-green-800 text-sm">
                    Applied: {offer.title} (-₹{offer.discount.toFixed(2)})
                    <button
                      onClick={() => removeOffer(offer.code)}
                      className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setShowOffers(true)}
                  className="text-[#c68e53] underline text-sm hover:text-[#82512f] mb-4 w-full text-left border border-[#c68e53] p-2 rounded bg-[#fff8ea]"
                >
                  Show all Offers
                </button>
                {showOffers && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-[#82512f]">Available Offers</h4>
                      <button
                        onClick={() => setShowOffers(false)}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Close
                      </button>
                    </div>
                    {offers.map(offer => {
                      const eligible = isEligible(offer);
                      const isApplied = appliedOffers.some(applied => applied.code === offer.code);
                      return (
                        <div key={offer.code} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-[#82512f] text-sm">{offer.title}</h5>
                            <button
                              onClick={() => handleApplyOffer(offer)}
                              disabled={appliedOffers.length > 0 || !eligible}
                              className="bg-[#c68e53] text-white px-3 py-1 rounded text-xs hover:bg-[#82512f] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                              {isApplied ? 'Applied' : eligible ? 'Apply' : `Min ₹${offer.minOrder}`}
                            </button>
                          </div>
                          <p className="text-sm mb-2 text-gray-700">{offer.desc}</p>
                          {!eligible && <p className="text-xs text-red-600 mb-2">Minimum order: ₹{offer.minOrder}</p>}
                          <ul className="text-xs text-gray-600 space-y-1">
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

              {/* Proceed to Checkout Button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full bg-manorGold text-white py-3 rounded hover:bg-manorGold/80 transition-colors font-semibold text-lg min-h-[44px]"
                >
                  Proceed to Checkout
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
