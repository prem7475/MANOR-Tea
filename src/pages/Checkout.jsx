import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const Checkout = () => {
  const { cartItems, getSubtotal, getTotal, clearCart } = useCart();
  const [form, setForm] = useState({ phone: '', email: '', address: '' });
  
  // Payment States
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const navigate = useNavigate();

  // --- CONFIGURATION ---
  // 1. PASTE YOUR GOOGLE SCRIPT URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFcvteSgkl8YMnUZ8GM2mAezaI67diY-vsGCc2dm5k6PwdA1YtTEuBHd974CsiyFN7/exec"; 
  
  // 2. PASTE YOUR WHATSAPP NUMBER HERE (Format: 919876543210)
  const ownerNumber = "917666853412"; 
  // ---------------------

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
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- THE CORE LOGIC: Save Order & Notify ---
  const handleOrderSuccess = async (paymentId) => {
    setVerifying(true);
    
    // 1. Generate Order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    // 2. Format Items for List
    const itemDetails = cartItems.map(item => {
      return `${item.name} (${item.quantity} unit)`;
    }).join(', ');

    // 3. Prepare Data for Google Sheet
    const orderData = {
      orderId: orderId,
      name: form.email.split('@')[0], // Uses part of email as name
      phone: form.phone,
      address: form.address,
      items: itemDetails,
      total: total.toFixed(2)
    };

    // 4. Send to Google Sheet (The "Excel" part)
    try {
      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "https://script.google.com/macros/s/AKfycbxFcvteSgkl8YMnUZ8GM2mAezaI67diY-vsGCc2dm5k6PwdA1YtTEuBHd974CsiyFN7/exec") {
         await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(orderData),
          mode: "no-cors" // Essential for Google Scripts
        });
        console.log("Order saved to Sheet!");
      } else {
        console.warn("Google Script URL not set!");
      }
    } catch (error) {
      console.error("Error saving to sheet:", error);
    }

    // 5. Send to WhatsApp (The "Notification" part)
    const whatsappMsg = 
      `*New Order: ${orderId}* %0A` +
      `-----------------------%0A` +
      `*Customer:* ${form.phone} %0A` +
      `*Items:* ${itemDetails} %0A` +
      `*Total:* ₹${total.toFixed(2)} %0A` +
      `*Address:* ${form.address} %0A` +
      `-----------------------%0A` +
      `Payment ID: ${paymentId}`;
    
    // Open WhatsApp in new tab
    window.open(`https://wa.me/${ownerNumber}?text=${whatsappMsg}`, '_blank');

    // 6. Finish
    setVerifying(false);
    setPaymentSuccess(true);
    clearCart();
    
    // Redirect to Thank You page after 3 seconds
    setTimeout(() => {
      navigate('/thank-you');
    }, 3000);
  };

  const displayRazorpay = async () => {
    // Basic Validation
    if (!form.phone || !form.email || !form.address) {
      alert("Please fill in all delivery details.");
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const finalAmount = Math.round(total * 100);

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your actual Key ID
      amount: finalAmount,
      currency: 'INR',
      name: 'Manor Tea',
      description: `Order Payment - Total: ₹${total.toFixed(2)}`,
      handler: function (response) {
        // CALL THE SUCCESS FUNCTION HERE
        handleOrderSuccess(response.razorpay_payment_id);
      },
      prefill: {
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

  // 1. VERIFYING VIEW
  if (verifying) {
    return (
      <div className="verifying-container">
        <h1 className="verifying-text">Processing Order...</h1>
        <p className="text-sm mb-4">Saving details and notifying store...</p>
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
          }
          .verifying-text { margin-bottom: 1rem; font-size: 2rem; }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #c68e53;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // 2. SUCCESS VIEW
  if (paymentSuccess) {
    return (
      <div className="payment-success-container animate-fade-in">
        <h1 className="thank-you-text">THANK YOU<br/>for Choosing MANOR</h1>
        <div className="confetti"></div>
        <style>{`
          .payment-success-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80vh;
            background-color: #fff8ea;
            color: #d97706; /* Amber-600 */
            font-family: 'Georgia', serif;
            font-size: 2.5rem;
            position: relative;
            overflow: hidden;
          }
          .thank-you-text {
            text-align: center;
            animation: bounce 2s infinite;
            z-index: 10;
          }
          .confetti {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: radial-gradient(circle, #d97706 2px, transparent 3px);
            background-size: 30px 30px;
            animation: fall 4s linear infinite;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          @keyframes fall {
            0% { background-position: 0 0; }
            100% { background-position: 100px 100vh; }
          }
        `}</style>
      </div>
    );
  }

  // 3. CHECKOUT FORM VIEW
  return (
    <section className="relative p-4 md:p-8 min-h-screen font-serif text-[#4a3b2b] animate-fade-in bg-[#fff8ea]">
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-[#82512f]">Checkout</h1>

        {/* Progress Indicators */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-lg p-4 shadow-sm border border-[#e6d0b3]">
          <div className="flex items-center">
            <div className="bg-[#c68e53] text-white rounded-full flex items-center justify-center font-bold w-8 h-8">1</div>
            <span className="ml-2 text-sm font-semibold">Cart</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-2">
            <div className="h-0.5 bg-[#c68e53] w-full"></div>
          </div>
          <div className="flex items-center">
            <div className="bg-[#c68e53] text-white rounded-full flex items-center justify-center font-bold w-8 h-8">2</div>
            <span className="ml-2 font-bold text-sm">Checkout</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-2">
            <div className="h-0.5 bg-gray-300 w-full"></div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold w-8 h-8">3</div>
            <span className="ml-2 font-semibold text-sm text-gray-400">Payment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-[#f3e6d8]">
          <h2 className="text-xl font-bold mb-4 text-[#82512f]">Delivery Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full border border-gray-300 rounded p-3 focus:border-[#c68e53] focus:ring-1 focus:ring-[#c68e53] outline-none transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="For order confirmation"
                className="w-full border border-gray-300 rounded p-3 focus:border-[#c68e53] focus:ring-1 focus:ring-[#c68e53] outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full address with pincode..."
                rows="3"
                className="w-full border border-gray-300 rounded p-3 focus:border-[#c68e53] focus:ring-1 focus:ring-[#c68e53] outline-none transition"
                required
              />
            </div>

            {/* Order Summary */}
            <div className="bg-[#fffbf5] p-4 rounded-lg border border-[#faebd7] mt-6">
              <h3 className="font-bold text-[#82512f] mb-3 border-b border-[#faebd7] pb-2">Order Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Delivery:</span>
                  <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
                </div>
                <div className="border-t border-[#faebd7] pt-2 flex justify-between text-lg font-bold text-[#82512f]">
                  <span>Total Payable:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#82512f] hover:bg-[#6b4226] text-white py-3 rounded-lg shadow-md transition-all transform active:scale-95 font-bold text-lg"
            >
              Pay Now & Place Order
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;