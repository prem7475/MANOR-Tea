import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const Checkout = () => {
  const { getSubtotal, getTotal, clearCart } = useCart();
  const [form, setForm] = useState({ phone: '', email: '', address: '' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const gst = subtotal * 0.05;
  const delivery = subtotal >= 500 ? 0 : 50;
  const total = getTotal();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const finalAmount = Math.round(total * 100);

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Enter the Key ID generated from the Razorpay Dashboard
      amount: finalAmount, // Amount is in currency subunits. Default is INR.
      currency: 'INR',
      name: 'Manor Tea',
      description: `Test Transaction - Total: ₹${total.toFixed(2)}`,
      handler: function (response) {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
        setPaymentSuccess(true);
        clearCart();
        navigate('/thank-you');
      },
      prefill: {
        name: form.email,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: '#c68e53',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    displayRazorpay();
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success-container">
        <h1 className="thank-you-text">THANK YOU for Choosing MANOR</h1>
        <div className="sprinkles"></div>
        <style>{`
          .payment-success-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80vh;
            background-color: #fff8ea; /* warm beige */
            color: #ffcc00; /* Occur yellow */
            font-family: 'Georgia', serif;
            font-size: 2.5rem;
            position: relative;
            overflow: hidden;
          }
          .thank-you-text {
            text-align: center;
            text-shadow: 0 0 10px #ffcc00, 0 0 20px #ffcc00;
            margin-bottom: 2rem;
          }
          .sprinkles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background-image: radial-gradient(circle, #ffcc00 2px, transparent 3px);
            background-repeat: repeat-x;
            animation: sprinkle-fall 3s linear infinite;
            background-size: 20px 20px;
          }
          @keyframes sprinkle-fall {
            0% {
              background-position: 0 -20px;
            }
            100% {
              background-position: 0 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="relative p-4 md:p-8 min-h-screen font-serif text-manorText animate-fade-in">
      <video autoPlay muted loop className="absolute inset-0 w-screen h-screen object-cover z-0 pointer-events-none">
        <source src="/2.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Checkout</h1>

        {/* Progress Indicators */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center">
            <div className="checkout-progress bg-manorGold text-white rounded-full flex items-center justify-center font-bold w-8 h-8">1</div>
            <span className="ml-2 text-sm md:text-base">Cart</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-2 md:mx-4">
            <div className="h-1 bg-manorGold w-full"></div>
          </div>
          <div className="flex items-center">
            <div className="checkout-progress bg-manorGold text-white rounded-full flex items-center justify-center font-bold w-8 h-8">2</div>
            <span className="ml-2 font-bold text-sm md:text-base">Checkout</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-2 md:mx-4">
            <div className="h-1 bg-manorGold w-full"></div>
          </div>
          <div className="flex items-center">
            <div className="checkout-progress bg-manorGold text-white rounded-full flex items-center justify-center font-bold w-8 h-8">3</div>
            <span className="ml-2 font-bold text-sm md:text-base">Payment</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-manorAccent rounded p-3 focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors min-h-[44px]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-manorAccent rounded p-3 focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors min-h-[44px]"
              required
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              rows="4"
              className="w-full border border-manorAccent rounded p-3 focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors min-h-[44px]"
              required
            />

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Order Summary</h3>
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
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-manorGold text-white py-3 rounded hover:bg-manorGold/80 transition-colors font-semibold text-lg min-h-[44px]"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
