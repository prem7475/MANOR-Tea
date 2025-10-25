import React, { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { Link } from 'react-router-dom';
import { useRecommendations } from '../context/RecommendationContext.jsx';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, appliedOffers, applyOffer, removeOffer, getSubtotal, getTotal } = useCart();
  const { trackInteraction } = useRecommendations();
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

  // Define discount tiers for progress bar
  const discountTiers = [
    { threshold: 500, discount: 10, label: '10% OFF' },
    { threshold: 1000, discount: 20, label: '20% OFF' },
    { threshold: 1500, discount: 30, label: '30% OFF' }
  ];

  // Calculate current tier and progress
  const currentTier = discountTiers.find(tier => subtotal < tier.threshold) || discountTiers[discountTiers.length - 1];
  const prevTier = discountTiers[discountTiers.indexOf(currentTier) - 1] || { threshold: 0 };
  const progress = ((subtotal - prevTier.threshold) / (currentTier.threshold - prevTier.threshold)) * 100;
  const amountAway = currentTier.threshold - subtotal;

  // Get best offer for user
  const getBestOffer = () => {
    const eligibleOffers = offers.filter(offer => isEligible(offer) && !appliedOffers.some(applied => applied.code === offer.code));
    if (eligibleOffers.length === 0) return null;
    // Prioritize percent offers over flat, then highest value
    const percentOffers = eligibleOffers.filter(o => o.type === 'percent').sort((a, b) => b.value - a.value);
    if (percentOffers.length > 0) return percentOffers[0];
    return eligibleOffers.sort((a, b) => b.value - a.value)[0];
  };

  const bestOffer = getBestOffer();

  const handleApplyOffer = (offer) => {
    applyOffer(offer);
    setShowOffers(false);
    // Force re-render to update totals
    setTimeout(() => {
      // This will trigger a re-render of the component
    }, 100);
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
      applyOffer(offer);
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
          <ul className="cart-list">
            {cart.map(({ id, name, price, quantity, image }) => (
              <li key={id} className="cart-item bg-white rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:space-x-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 md:space-x-6">
                  <img src={image || '/imgtea.jpeg'} alt={name} className="cart-image object-cover rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h2 className="cart-name font-semibold leading-tight">{name}</h2>
                    <p className="cart-price text-manorAccent">₹{price} x {quantity}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between cart-controls md:space-x-2">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <button
                      className="cart-button bg-manorAccent text-white rounded hover:bg-manorDark disabled:opacity-50 min-h-[44px] min-w-[44px]"
                      onClick={() => updateQuantity(id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="cart-quantity min-h-[44px] flex items-center">{quantity}</span>
                    <button
                      className="cart-button bg-manorAccent text-white rounded hover:bg-manorDark min-h-[44px] min-w-[44px]"
                      onClick={() => updateQuantity(id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove bg-red-500 text-white rounded hover:bg-red-600 transition-colors min-h-[44px]"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Offers Section */}
          <div className="mt-6 md:mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Available Offers</h3>

            {/* Applied Offers */}
            {appliedOffers.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-green-700 mb-2">Applied Offers</h4>
                {appliedOffers.map((offer) => (
                  <div key={offer.id} className="p-3 bg-green-100 rounded border border-green-300 text-green-800 text-sm mb-2 flex justify-between items-center">
                    <div>
                      ✅ {offer.title} (-₹{offer.discount.toFixed(2)})
                    </div>
                    <button
                      onClick={() => removeOffer(offer.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* All Available Offers */}
            <div className="space-y-3 mb-6">
              {offers.map(offer => {
                const eligible = isEligible(offer);
                const isApplied = appliedOffers.some(applied => applied.code === offer.code);
                return (
                  <div key={offer.code} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-[#82512f] text-sm">{offer.title}</h4>
                      <button
                        onClick={() => handleApplyOffer(offer)}
                        disabled={isApplied || !eligible}
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

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
                </div>
                {appliedOffers.map((offer) => (
                  <div key={offer.id} className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({offer.title}):</span>
                    <span>-₹{offer.discount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/payment"
              className="block mt-6 bg-manorGold text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-center hover:bg-manorGold/80 transition-colors font-semibold text-sm md:text-base"
              onClick={() => {
                cart.forEach(item => trackInteraction(item.id, 'checkout'));
              }}
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
                        {/* Gamified Tiered Offer Bar */}
                        <div className="p-4 bg-gradient-to-r from-[#c68e53]/10 to-[#82512f]/10 rounded-lg mb-4">
                          <div className="text-center mb-2">
                            <p className="text-sm font-semibold text-[#82512f]">
                              {amountAway > 0 ? `You're ₹${amountAway.toFixed(2)} away from ${currentTier.label}!` : `Congratulations! You've unlocked ${currentTier.label}!`}
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div
                              className="bg-[#c68e53] h-3 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>₹{prevTier.threshold}</span>
                            <span>₹{currentTier.threshold}</span>
                          </div>
                        </div>

                        {/* Best Offer For You */}
                        {bestOffer && (
                          <div className="p-4 bg-[#c68e53]/10 rounded-lg mb-4 border-2 border-[#c68e53]">
                            <h3 className="font-bold text-[#82512f] text-sm mb-2">Best Offer For You</h3>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-[#82512f] text-sm">{bestOffer.title}</h4>
                                <button
                                  onClick={() => handleApplyOffer(bestOffer)}
                                  disabled={appliedOffers.some(applied => applied.code === bestOffer.code)}
                                  className="bg-[#c68e53] text-white px-4 py-2 rounded text-sm hover:bg-[#82512f] font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >
                                  {appliedOffers.some(applied => applied.code === bestOffer.code) ? 'Applied' : 'Apply Offer'}
                                </button>
                              </div>
                              <p className="text-sm mb-2 text-gray-700">{bestOffer.desc}</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {bestOffer.terms.map(term => (
                                  <li key={term}>• {term}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Available Offers */}
                        <div className="p-4">
                          <h3 className="font-bold text-[#82512f] text-sm mb-4">Available Offers</h3>
                          <div className="space-y-4">
                            {offers.map(offer => {
                              const eligible = isEligible(offer);
                              const isApplied = appliedOffers.some(applied => applied.code === offer.code);
                              return (
                                <div key={offer.code} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-[#82512f] text-sm">{offer.title}</h4>
                                    <button
                                      onClick={() => handleApplyOffer(offer)}
                                      disabled={isApplied || !eligible}
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
                        </div>

                        {/* Manual Code Entry */}
                        <div className="p-4 border-t border-gray-200">
                          <h3 className="font-bold text-[#82512f] text-sm mb-2">Have a coupon code?</h3>
                          <div className="flex space-x-2">
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
                              disabled={!!appliedOffers.length}
                            >
                              Apply
                            </button>
                          </div>
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
