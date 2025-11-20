import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import offersData from '../data/offersData';

const Offers = () => {
  const { cart, applyOffer, removeOffer, appliedOffers } = useCart();
  const [showAllOffers, setShowAllOffers] = useState(false);

  const offers = offersData.map(offer => ({
    ...offer,
    minAmount: offer.minAmount,
    discount: offer.discount,
    type: offer.type === 'percent' ? 'cart-value' : offer.type
  }));

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleApplyOffer = (offer) => {
    if (cartTotal >= offer.minAmount) {
      applyOffer(offer);
    }
  };

  const handleRemoveOffer = (offerId) => {
    removeOffer(offerId);
  };

  const getProgressPercentage = () => {
    if (cartTotal >= 1000) return 100;
    if (cartTotal >= 500) return (cartTotal / 1000) * 100;
    return (cartTotal / 500) * 100;
  };

  const getOfferBarText = () => {
    if (cartTotal >= 1000) return "You've unlocked 20% OFF!";
    if (cartTotal >= 500) return `You're ₹${1000 - cartTotal} away from 20% OFF!`;
    return `You're ₹${500 - cartTotal} away from 10% OFF!`;
  };

  const displayedOffers = showAllOffers ? offers : offers.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="header-title mb-8">Exclusive Offers</h1>

      {/* Gamified Offer Bar */}
      <div className="offer-bar-container">
        <div className="offer-bar-text">
          {cartTotal >= 1000 ? (
            <span className="offer-bar-celebration">{getOfferBarText()}</span>
          ) : (
            getOfferBarText()
          )}
        </div>
        <div className="offer-bar-progress-container">
          <div
            className="offer-bar-progress"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Spend more to unlock bigger discounts!
        </p>
      </div>

      {/* Applied Offers */}
      {appliedOffers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Applied Offers</h2>
          {appliedOffers.map((offer) => (
            <div key={offer.id} className="coupon-card applied">
              <img src={offer.logo} alt={offer.title} className="coupon-logo" />
              <div className="coupon-content">
                <div className="coupon-title">{offer.title}</div>
                <div className="coupon-detail">{offer.detail}</div>
                <div className="coupon-terms">{offer.terms}</div>
              </div>
              <button
                className="coupon-apply-btn"
                onClick={() => handleRemoveOffer(offer.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Available Offers */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Available Offers</h2>
        {displayedOffers.map((offer) => {
          const isApplied = appliedOffers.some(applied => applied.id === offer.id);
          const canApply = cartTotal >= offer.minAmount && !isApplied;

          return (
            <div key={offer.id} className={`coupon-card ${isApplied ? 'applied' : ''}`}>
              <img src={offer.logo} alt={offer.title} className="coupon-logo" />
              <div className="coupon-content">
                <div className="coupon-title">{offer.title}</div>
                <div className="coupon-detail">{offer.detail}</div>
                <div className="coupon-terms">{offer.terms}</div>
              </div>
              <button
                className="coupon-apply-btn"
                onClick={() => canApply ? handleApplyOffer(offer) : null}
                disabled={!canApply}
              >
                {isApplied ? 'Applied' : canApply ? 'Apply' : 'Min. ₹' + offer.minAmount}
              </button>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      <div className="text-center">
        <button
          className="primary-cta-button"
          onClick={() => setShowAllOffers(!showAllOffers)}
        >
          {showAllOffers ? 'Show Less' : 'Show All Offers'}
        </button>
      </div>
    </div>
  );
};

export default Offers;
