import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const ThankYou = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [referralCode] = useState('MANOR' + Math.random().toString(36).substr(2, 6).toUpperCase());

  // Simulate order progression
  useEffect(() => {
    const statuses = ['confirmed', 'packing', 'shipped', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setOrderStatus(statuses[currentIndex]);
    }, 5000); // Change status every 5 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const orderSteps = [
    { id: 'confirmed', label: 'Order Confirmed', icon: '✓' },
    { id: 'packing', label: 'Packing', icon: '📦' },
    { id: 'shipped', label: 'Shipped', icon: '🚚' },
    { id: 'delivered', label: 'Delivered', icon: '🏠' }
  ];

  const currentStepIndex = orderSteps.findIndex(step => step.id === orderStatus);

  const shareReferral = () => {
    const text = `Love MANOR Tea? Get ₹50 off your first order with my referral code: ${referralCode}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-manorBg text-manorText font-serif p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-manorAccent mb-4">
            THANK YOU for Choosing MANOR
          </h1>
          <p className="text-lg text-manorText/80">
            Your tea journey begins here. We're excited to share our passion with you.
          </p>
        </div>

        {/* Order Tracker */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Order Status</h2>
          <div className="flex items-center justify-between">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 transition-all duration-500 ${
                    index <= currentStepIndex
                      ? 'bg-manorGold text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm text-center ${
                    index <= currentStepIndex ? 'text-manorText font-semibold' : 'text-manorText/60'
                  }`}
                >
                  {step.label}
                </span>
                {index < orderSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 mt-6 transition-all duration-500 ${
                      index < currentStepIndex ? 'bg-manorGold' : 'bg-gray-200'
                    }`}
                    style={{ width: '100%', maxWidth: '100px' }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Referral Program */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Share the Love</h2>
          <p className="text-center mb-6 text-manorText/80">
            Love your tea? <strong>Give ₹50, Get ₹50.</strong> Share your unique referral code and both you and your friend get rewarded!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-manorLight px-4 py-2 rounded-lg font-mono text-lg">
              {referralCode}
            </div>
            <button
              onClick={shareReferral}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span>📱</span> Share via WhatsApp
            </button>
          </div>
        </div>

        {/* Brewing Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">3-Step Brewing Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-manorAccent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Heat Water</h3>
              <p className="text-sm text-manorText/70">
                Bring fresh water to 80-90°C. Avoid boiling for delicate teas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-manorAccent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Steep Tea</h3>
              <p className="text-sm text-manorText/70">
                Add 1 tsp tea per cup. Steep for 3-5 minutes for optimal flavor.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-manorAccent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Enjoy</h3>
              <p className="text-sm text-manorText/70">
                Sip slowly and savor the complex flavors. Add milk/sugar to taste.
              </p>
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Join Our Community</h2>
          <p className="text-center mb-6 text-manorText/80">
            Follow the MANOR story on Instagram for brewing tips, behind-the-scenes content, and exclusive offers.
          </p>
          <div className="text-center">
            <a
              href="https://instagram.com/manortea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <span>📸</span> Follow @manortea
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/products')}
            className="bg-manorAccent text-white px-8 py-3 rounded-lg font-semibold hover:bg-manorDark transition-colors mr-4"
          >
            Shop More Teas
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-manorAccent text-manorAccent px-8 py-3 rounded-lg font-semibold hover:bg-manorAccent hover:text-white transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
