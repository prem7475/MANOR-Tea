import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

const Offers = () => {
  const { cart, applyOffer, removeOffer, appliedOffers } = useCart();
  const [showAllOffers, setShowAllOffers] = useState(false);

  const offers = [
    {
      id: 'TIER10',
      title: 'MANOR TIER 1',
      detail: 'Get 10% off on orders above ₹500',
      terms: 'Min. order ₹500. Valid on all products.',
      logo: '/images/manor-logo.png',
      minAmount: 500,
      discount: 0.1,
      type: 'cart-value'
    },
    {
      id: 'TIER20',
      title: 'MANOR TIER 2',
      detail: 'Get 20% off on orders above ₹1,000',
      terms: 'Min. order ₹1,000. Valid on all products.',
      logo: '/images/manor-logo.png',
      minAmount: 1000,
      discount: 0.2,
      type: 'cart-value'
    },
    {
      id: 'FREEGIFT',
      title: 'FREE GIFT',
      detail: 'Get a free "Manor Tea Sampler" on orders above ₹750',
      terms: 'Min. order ₹750. Free gift added to cart.',
      logo: '/images/gift-icon.png',
      minAmount: 750,
      discount: 0,
      type: 'free-gift'
    },
    {
      id: 'HDFC15',
      title: 'HDFC BANK OFFER',
      detail: 'Get 15% instant discount on HDFC Bank Credit & Debit Cards',
      terms: 'Min. order ₹1,500. Valid on HDFC cards only.',
      logo: '/images/hdfc-logo.png',
      minAmount: 1500,
      discount: 0.15,
      type: 'bank'
    },
    {
      id: 'ICICI50',
      title: 'ICICI BANK OFFER',
      detail: 'Flat ₹50 off on ICICI Bank Credit Cards',
      terms: 'Min. order ₹999. Valid on ICICI cards only.',
      logo: '/images/icici-logo.png',
      minAmount: 999,
      discount: 50,
      type: 'bank'
    },
    {
      id: 'VISA20',
      title: 'VISA SIGNATURE',
      detail: '20% off up to ₹100 on all Visa Signature cards',
      terms: 'Min. order ₹500. Max discount ₹100.',
      logo: '/images/visa-logo.png',
      minAmount: 500,
      discount: 0.2,
      maxDiscount: 100,
      type: 'card'
    },
    {
      id: 'PAYTM100',
      title: 'PAYTM WALLET',
      detail: 'Get ₹100 cashback in your Paytm Wallet',
      terms: 'Min. order ₹800. Valid on Paytm UPI only.',
      logo: '/images/paytm-logo.png',
      minAmount: 800,
      discount: 100,
      type: 'wallet'
    },
    {
      id: 'AMZPAY50',
      title: 'AMAZON PAY',
      detail: 'Flat ₹50 cashback via Amazon Pay UPI',
      terms: 'First order only. Min. order ₹500.',
      logo: '/images/amazon-pay-logo.png',
      minAmount: 500,
      discount: 50,
      type: 'wallet'
    },
    {
      id: 'GIFTBOGO',
      title: 'GIFT BUY ONE GET ONE',
      detail: 'Buy 1 Manor Gift Hamper, Get 1 Free',
      terms: 'Valid on Manor Gift Hampers only.',
      logo: '/images/gift-icon.png',
      minAmount: 0,
      discount: 0,
      type: 'bogo'
    },
    {
      id: 'TEATIME',
      title: 'TEA TIME SPECIAL',
      detail: 'Buy any 3 Leaf Teas and get 15% off that category',
      terms: 'Valid on Leaf Tea products only.',
      logo: '/images/tea-icon.png',
      minAmount: 0,
      discount: 0.15,
      type: 'category'
    }
  ];

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
