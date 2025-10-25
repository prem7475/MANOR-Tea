import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const ReferralProgram = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralLink = user ? `${window.location.origin}/register?ref=${user.id}` : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOnWhatsApp = () => {
    const message = `Hey! I love MANOR Tea. Join me and get ₹50 off your first order! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareOnEmail = () => {
    const subject = 'Join me at MANOR Tea and get ₹50 off!';
    const body = `Hey!\n\nI love MANOR Tea and thought you'd enjoy it too. Use my referral link to get ₹50 off your first order:\n\n${referralLink}\n\nCheers!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  if (!user) {
    return (
      <div className="bg-manorLight p-6 rounded-lg text-center">
        <h3 className="font-serif font-semibold text-lg mb-2">Refer & Earn</h3>
        <p className="text-manorText/80 mb-4">Login to access your referral program</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-manorLight p-6 rounded-lg">
        <h3 className="font-serif font-semibold text-lg mb-4">Refer & Earn</h3>
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-manorGreen mb-2">₹50</div>
          <p className="text-sm text-manorText/80">for you & your friend</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-manorGreen text-white rounded-md hover:bg-manorGreen/80 transition-colors text-sm font-medium"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={shareOnWhatsApp}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
            >
              WhatsApp
            </button>
            <button
              onClick={shareOnEmail}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Email
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full px-4 py-2 bg-manorDark text-white rounded-md hover:bg-manorDark/80 transition-colors text-sm font-medium"
          >
            How it Works
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="font-serif font-semibold text-xl mb-4">How Referral Works</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-manorGreen text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-medium">Share your link</p>
                  <p className="text-manorText/80">Send your unique referral link to friends</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-manorGreen text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-medium">Friend signs up & buys</p>
                  <p className="text-manorText/80">They get ₹50 off their first order</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-manorGreen text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-medium">You both earn ₹50</p>
                  <p className="text-manorText/80">Get ₹50 credit for your next purchase</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 px-4 py-2 bg-manorGreen text-white rounded-md hover:bg-manorGreen/80 transition-colors font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReferralProgram;
