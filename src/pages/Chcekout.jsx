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
    <div className="p-8 max-w-lg mx-auto font-serif text-[#82512f] bg-[#fff8ea] rounded">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {/* Progress Indicators */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#c68e53] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
          <span className="ml-2 text-sm">Cart</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-4">
          <div className="h-1 bg-[#c68e53] w-full"></div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#c68e53] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
          <span className="ml-2 text-sm font-bold">Checkout</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
          <span className="ml-2 text-sm">Payment</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border border-[#c68e53] rounded p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="border border-[#c68e53] rounded p-2"
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          rows="4"
          className="border border-[#c68e53] rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-[#c68e53] text-white p-2 rounded hover:bg-[#82512f]"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
