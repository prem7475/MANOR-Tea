import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const Payment = () => {
  const { cart, getTotal, clearCart } = useCart();
  const location = useLocation();
  const checkoutData = location.state?.checkoutData || {};
  const [form, setForm] = useState({
    phone: checkoutData.phone || '',
    email: checkoutData.email || '',
    address: checkoutData.address || '',
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    const finalAmount = Math.round(getTotal() * 100);

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Enter the Key ID generated from the Razorpay Dashboard
      amount: finalAmount, // Amount is in currency subunits. Default is INR.
      currency: 'INR',
      name: 'Manor Tea',
      description: `Test Transaction - Total: ₹${(finalAmount / 100).toFixed(2)}`,
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

  const handlePaymentSubmit = (e) => {
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
    <section className="relative min-h-screen flex items-center justify-center">
      <video autoPlay muted loop className="absolute inset-0 w-screen h-screen object-fill z-0">
        <source src="/3.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 payment-container">
        <h1 className="payment-title">Payment & Address Details</h1>
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="payment-input border border-manorAccent rounded focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="payment-input border border-manorAccent rounded focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors"
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            required
            className="payment-textarea border border-manorAccent rounded focus:border-manorGold focus:ring-2 focus:ring-manorGold/20 transition-colors"
          />
          <button type="submit" className="payment-button bg-manorGold text-white hover:bg-manorGold/80 transition-colors">
            Pay Now
          </button>
        </form>

      <style>{`
        .payment-page-container {
          max-width: 400px;
          margin: 0.5rem auto;
          padding: 0.5rem;
          background-color: #fff8ea; /* warm beige */
          color: #3e2f1c; /* dark brown */
          font-family: 'Georgia', serif;
          border-radius: 10px;
          box-shadow: 0 0 15px #c68e53;
        }
        @media (min-width: 640px) {
          .payment-page-container {
            margin: 1.5rem auto;
            padding: 1.5rem;
          }
        }
        .payment-title {
          text-align: center;
          font-size: 1rem;
          margin-bottom: 1rem;
          color: #82512f; /* warm brown */
          text-shadow: 0 0 10px #c68e53;
        }
        @media (min-width: 640px) {
          .payment-title {
            font-size: 1.5rem;
          }
        }
        .payment-form input,
        .payment-form textarea {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 5px;
          border: 1px solid #c68e53;
          font-size: 0.9rem;
          font-family: 'Georgia', serif;
          color: #3e2f1c;
          min-height: 44px;
        }
        @media (min-width: 640px) {
          .payment-form input,
          .payment-form textarea {
            padding: 0.5rem;
            font-size: 1rem;
          }
        }
        .pay-now-button {
          width: 100%;
          background-color: #c68e53;
          color: #3e2f1c;
          font-weight: bold;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          box-shadow: 0 0 10px #c68e53;
          transition: background-color 0.3s ease;
          min-height: 44px;
        }
        @media (min-width: 640px) {
          .pay-now-button {
            padding: 0.75rem;
            font-size: 1.2rem;
          }
        }
        .pay-now-button:hover {
          background-color: #82512f;
          color: #fff;
        }
      `}</style>
    </div>
  </section>
  );
};

export default Payment;