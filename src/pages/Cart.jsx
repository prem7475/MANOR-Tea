import React from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useRecommendations } from '../context/RecommendationContext.jsx';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'; // Assuming you have lucide-react, or use text

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const { trackInteraction } = useRecommendations();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const gst = subtotal * 0.05;
  const delivery = subtotal >= 500 ? 0 : 50;
  const total = subtotal + gst + delivery;

  // Empty State
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F9F9F9] px-4 animate-fade-in">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
           <ShoppingBag size={32} />
        </div>
        <h2 className="text-3xl font-serif text-[#2B221F] mb-2 font-bold">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md font-sans">
          Looks like you haven't found your perfect blend yet. Explore our collection to find your morning ritual.
        </p>
        <Link 
          to="/products" 
          className="bg-[#E69536] hover:bg-[#CC8430] text-white px-8 py-3.5 rounded-lg font-bold tracking-wide transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 duration-200"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9F9F9] pt-28 pb-16 px-4 md:px-8 font-sans animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2B221F]">Your Cart ({cart.length})</h1>
          <Link to="/products" className="hidden md:flex items-center text-[#E69536] hover:text-[#CC8430] font-medium transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Continue Shopping
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-50">
                {cart.map(({ id, name, price, quantity, image }) => (
                  <li key={id} className="p-6 flex items-start gap-6 group hover:bg-gray-50 transition-colors duration-300">
                    
                    {/* Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                      <img 
                        src={image || '/imgtea.jpeg'} 
                        alt={name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-h-[6rem] md:min-h-[8rem]">
                      <div>
                        <div className="flex justify-between items-start">
                          <h2 className="text-lg md:text-xl font-serif font-bold text-[#2B221F] mb-1 leading-tight">
                            {name}
                          </h2>
                          <span className="hidden md:block font-bold text-[#2B221F] text-lg">
                            ₹{(price * quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[#E69536] font-medium text-sm">₹{price} / unit</p>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-end justify-between mt-4">
                         {/* Quantity */}
                         <div className="flex items-center border border-gray-200 rounded-lg bg-white h-10 shadow-sm">
                            <button
                              className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#E69536] hover:bg-gray-50 rounded-l-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                              onClick={() => updateQuantity(id, quantity - 1)}
                              disabled={quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 h-full flex items-center justify-center font-bold text-[#2B221F] text-sm bg-gray-50 border-x border-gray-100">
                              {quantity}
                            </span>
                            <button
                              className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#E69536] hover:bg-gray-50 rounded-r-lg transition-colors"
                              onClick={() => updateQuantity(id, quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                         </div>

                         {/* Remove */}
                         <button
                            className="flex items-center gap-1.5 text-xs md:text-sm text-gray-400 hover:text-red-500 font-medium transition-colors p-2 rounded-md hover:bg-red-50"
                            onClick={() => removeFromCart(id)}
                          >
                            <Trash2 size={16} /> <span className="hidden md:inline">Remove</span>
                          </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-28 transition-all">
              <h2 className="font-serif text-xl font-bold text-[#2B221F] mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-8">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2B221F]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>GST (5%)</span>
                  <span className="font-bold text-[#2B221F]">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery</span>
                  {delivery === 0 ? (
                    <span className="font-bold text-green-600">Free</span>
                  ) : (
                    <span className="font-bold text-[#2B221F]">₹{delivery}</span>
                  )}
                </div>
              </div>
              
              <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-end mb-8">
                <span className="font-serif text-lg font-bold text-[#2B221F]">Total</span>
                <div className="text-right">
                  <span className="block text-2xl font-serif font-bold text-[#E69536]">₹{total.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400">Including all taxes</span>
                </div>
              </div>

              {/* ACTION BUTTON -> GOES TO CHECKOUT */}
              <button
                onClick={() => {
                  cart.forEach(item => trackInteraction(item.id, 'checkout'));
                  navigate('/checkout'); // Directs to Address/Checkout page
                }}
                className="w-full bg-[#E69536] hover:bg-[#CC8430] text-white py-4 rounded-xl font-bold text-base uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-200 active:scale-[0.98] duration-200 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 opacity-60">
                 <span className="text-[10px] uppercase tracking-widest">Secure Payment by Razorpay</span>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default Cart;