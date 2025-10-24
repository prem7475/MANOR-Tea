 import React, { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, appliedOffer, setAppliedOffer, clearAppliedOffer, getSubtotal, getTotal } = useCart();
  const [coupon, setCoupon] = useState('');

  const subtotal = getSubtotal();
  const gst = subtotal * 0.05;
  const delivery = subtotal >= 500 ? 0 : 50;
  const [showOffers, setShowOffers] = useState(false);
  const total = getTotal();

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

  const applyOffer = (offer) => {
    setAppliedOffer(offer);
    setShowOffers(false);
  };

  const isEligible = (offer) => subtotal >= offer.minOrder;

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

  if (cart.length === 0) return <p className="p-4 md:p-8 font-serif text-manorText animate-fade-in">Your cart is empty.</p>;

  return (
    <section className="relative p-4 md:p-8 min-h-screen font-serif text-manorText animate-fade-in">
      <video autoPlay muted loop className="absolute inset-0 w-screen h-screen object-cover z-0 pointer-events-none">
        <source src="/2.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Your Cart</h1>
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4 md:space-y-6">
            {cart.map(({ id, name, price, quantity, image }) => (
              <li key={id} className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row md:items-center md:space-x-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <img src={image || '/imgtea.jpeg'} alt={name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm md:text-xl font-semibold leading-tight">{name}</h2>
                    <p className="text-manorAccent text-xs md:text-base">₹{price} x {quantity}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 md:mt-0 md:space-x-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-manorAccent text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-manorDark disabled:opacity-50 text-sm"
                      onClick={() => updateQuantity(id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-2 md:px-3 text-sm md:text-base">{quantity}</span>
                    <button
                      className="bg-manorAccent text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-manorDark text-sm"
                      onClick={() => updateQuantity(id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-red-600 transition-colors text-sm md:text-base"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Coupon Section */}
          <div className="mt-6 md:mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-2">Apply Coupon</h3>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 border border-gray-300 rounded p-2 text-sm"
              />
              <button
                onClick={applyCoupon}
                className="bg-[#c68e53] text-white px-4 py-2 rounded hover:bg-[#82512f] transition-colors font-semibold text-sm"
                disabled={!!appliedOffer}
              >
                Apply
              </button>
            </div>
            {appliedOffer && (
              <div className="mb-4 p-3 bg-green-100 rounded border border-green-300 text-green-800 text-sm">
                Applied: {appliedOffer.title} (-₹{appliedOffer.discount.toFixed(2)})
                <button
                  onClick={clearAppliedOffer}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                >
                  Remove
                </button>
              </div>
            )}
            <button
              onClick={() => setShowOffers(true)}
              className="text-[#c68e53] underline text-sm hover:text-[#82512f] mb-4 w-full text-left border border-[#c68e53] p-2 rounded bg-[#fff8ea]"
            >
              Show all Offers
            </button>
            <div className="text-right space-y-1 mb-4">
              <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
              <div>GST (5%): ₹{gst.toFixed(2)}</div>
              <div>Delivery: {delivery === 0 ? 'Free' : `₹${delivery}`}</div>
              {appliedOffer && <div>Discount: -₹{appliedOffer.discount.toFixed(2)}</div>}
              <div className="text-xl md:text-2xl font-bold">Total: ₹{total.toFixed(2)}</div>
            </div>

            <Link
              to="/payment"
              className="block mt-6 bg-[#c68e53] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-center hover:bg-[#82512f] transition-colors font-semibold text-sm md:text-base"
            >
              Proceed to Checkout
            </Link>
          </div>

          {/* Offers Sidebar */}
          {showOffers && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 right-0 flex max-w-full">
                  <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                      <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2 className="text-lg font-medium text-[#82512f]" id="slide-over-title">
                            Available Offers
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c68e53] focus:ring-offset-2"
                              onClick={() => setShowOffers(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        <div className="space-y-4 p-4">
                          {offers.map(offer => {
                            const eligible = isEligible(offer);
                            return (
                              <div key={offer.code} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-[#82512f] text-sm">{offer.title}</h4>
                                  <button
                                    onClick={() => applyOffer(offer)}
                                    disabled={appliedOffer && appliedOffer.code === offer.code || !eligible}
                                    className="bg-[#c68e53] text-white px-3 py-1 rounded text-xs hover:bg-[#82512f] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                                  >
                                    {appliedOffer && appliedOffer.code === offer.code ? 'Applied' : eligible ? 'Apply' : `Min ₹${offer.minOrder}`}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowOffers(false)}></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
