import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert(`Message sent from ${form.name}`);
    setForm({ name: '', email: '', message: '' });
  };
  return (
    <section className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-serif max-w-lg mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border border-[#c68e53] p-2 rounded"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border border-[#c68e53] p-2 rounded"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="border border-[#c68e53] p-2 rounded"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows="5"
          required
        />
        <button type="submit" className="bg-[#c68e53] text-white p-2 rounded hover:bg-[#82512f]">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
