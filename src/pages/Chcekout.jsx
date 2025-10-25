import React, { useState } from 'react';

const Checkout = () => {
  const [form, setForm] = useState({ phone: '', email: '', address: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    setForm({ phone: '', email: '', address: '' });
  };

  return (
    <div className="checkout-container max-w-lg mx-auto font-serif text-[#82512f] bg-[#fff8ea] rounded min-h-screen">
      <h1 className="checkout-title font-bold mb-6">Checkout</h1>
      {/* Progress Indicators */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="checkout-progress bg-[#c68e53] text-white rounded-full flex items-center justify-center font-bold">1</div>
          <span className="ml-2">Cart</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2 md:mx-4">
          <div className="h-1 bg-[#c68e53] w-full"></div>
        </div>
        <div className="flex items-center">
          <div className="checkout-progress bg-[#c68e53] text-white rounded-full flex items-center justify-center font-bold">2</div>
          <span className="ml-2 font-bold">Checkout</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2 md:mx-4"></div>
        <div className="flex items-center">
          <div className="checkout-progress bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">3</div>
          <span className="ml-2">Payment</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="checkout-input border border-manorAccent rounded focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="checkout-input border border-manorAccent rounded focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors"
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          rows="4"
          className="checkout-input border border-manorAccent rounded focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors"
          required
        />
        <button
          type="submit"
          className="checkout-button bg-manorGold text-white rounded hover:bg-manorGold/80 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
