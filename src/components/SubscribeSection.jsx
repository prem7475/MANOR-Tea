import React, { useState } from 'react';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  return (
    <section
      id="subscribe"
      className="py-8 sm:py-12 bg-gray-900 text-white flex flex-col justify-center items-center"
    >
      <div className="max-w-md w-full text-center">
        <h3 className="text-2xl font-serif font-bold text-yellow-400 mb-6">Subscribe</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 rounded-md text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSubscribe}
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition-colors duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
