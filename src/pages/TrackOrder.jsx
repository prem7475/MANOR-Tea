import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // SIMULATED TRACKING LOGIC
  // In a real app, this would fetch from your Google Sheet or Backend
  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Mock logic: If ID starts with '123', say it's shipped.
      if (orderId.includes('123')) {
        setStatus({
          step: 3,
          message: 'Shipped - On the way',
          location: 'Nagpur Dispatch Center',
          date: new Date().toLocaleDateString()
        });
      } else {
        setStatus({
          step: 1,
          message: 'Order Placed - Processing',
          location: 'Manor Warehouse',
          date: new Date().toLocaleDateString()
        });
      }
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-[#fff8ea] font-serif text-[#4a3b2b] pt-8 animate-fade-in">
      
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#82512f] mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your Order ID (sent via WhatsApp/Email) to see current status.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-[#e6d0b3] mb-10">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Order ID / Mobile Number"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82512f] bg-[#fffcf5]"
              required
            />
            <button 
              type="submit" 
              className="bg-[#82512f] hover:bg-[#6b4226] text-white font-bold py-3 px-8 rounded-lg transition-all"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Track Now'}
            </button>
          </form>
        </div>

        {/* Result Display */}
        {status && (
          <div className="bg-white p-8 rounded-xl shadow-md border border-[#e6d0b3] animate-slide-up">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#82512f]">Order #{orderId}</h2>
                <p className="text-sm text-gray-500">Updated: {status.date}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                {status.message}
              </span>
            </div>

            {/* Tracking Steps Visual */}
            <div className="relative flex justify-between items-center mb-8">
              {/* Progress Bar Background */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0"></div>
              {/* Active Progress */}
              <div 
                className="absolute top-1/2 left-0 h-1 bg-[#82512f] -z-0 transition-all duration-1000"
                style={{ width: status.step === 1 ? '0%' : status.step === 2 ? '50%' : '100%' }}
              ></div>

              {['Placed', 'Packed', 'Shipped', 'Delivered'].map((label, index) => {
                const stepNum = index + 1;
                const active = stepNum <= status.step;
                return (
                  <div key={label} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-500 ${active ? 'bg-[#82512f] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {active ? '✓' : stepNum}
                    </div>
                    <span className={`mt-2 text-xs font-bold ${active ? 'text-[#82512f]' : 'text-gray-400'}`}>{label}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#fff8ea] p-4 rounded-lg">
              <p className="font-bold text-[#82512f]">Current Location:</p>
              <p className="text-gray-700">{status.location}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/" className="text-[#82512f] underline hover:text-[#6b4226]">← Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;