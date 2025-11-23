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
      handler: async function (response) {
        const isVerified = await verifyPayment(response.razorpay_payment_id);
        if (isVerified) {
          setPaymentSuccess(true);
          clearCart();
          setTimeout(() => {
            navigate('/thank-you');
          }, 3000); // Show success animation for 3 seconds then navigate
        } else {
          alert('Payment verification failed. Please contact support.');
        }
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

  const verifyPayment = async (paymentId) => {
    setVerifying(true);
    // Mock verification - in real app, call backend API to verify with Razorpay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        const success = Math.random() > 0.1;
        setVerifying(false);
        resolve(success);
      }, 2000); // Simulate network delay
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    displayRazorpay();
  };

  if (verifying) {
    return (
      <div className="verifying-container">
        <h1 className="verifying-text">Verifying Payment...</h1>
        <div className="spinner"></div>
        <style>{`
          .verifying-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80vh;
            background-color: #fff8ea;
            color: #3e2f1c;
            font-family: 'Georgia', serif;
            font-size: 2rem;
          }
          .verifying-text {
            margin-bottom: 2rem;
          }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #c68e53;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="payment-success-container animate-fade-in">
        <h1 className="thank-you-text">THANK YOU for Choosing MANOR</h1>
        <div className="confetti"></div>
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
            animation: fadeIn 1s ease-in;
          }
          .thank-you-text {
            text-align: center;
            text-shadow: 0 0 10px #ffcc00, 0 0 20px #ffcc00;
            margin-bottom: 2rem;
            animation: bounce 2s infinite;
          }
          .confetti {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background-image: radial-gradient(circle, #ff69b4 3px, transparent 4px), radial-gradient(circle, #00ff00 3px, transparent 4px), radial-gradient(circle, #0000ff 3px, transparent 4px);
            background-size: 30px 30px;
            animation: confetti-fall 5s linear infinite;
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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          @keyframes confetti-fall {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: 100px 100vh, 200px 100vh, 300px 100vh; }
          }
          @keyframes sprinkle-fall {
            0% { background-position: 0 -20px; }
            100% { background-position: 0 100%; }
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
