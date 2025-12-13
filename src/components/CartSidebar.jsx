import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  // Simple calculation for preview
  const total = subtotal + (subtotal * 0.05); 

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout'); // Goes to Address/Checkout page
  };

  return (
    <>
      {/* Backdrop with Blur */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-3">
             <ShoppingBag size={20} className="text-[#E69536]" />
             <h2 className="font-serif text-xl font-bold text-[#2B221F]">Shopping Cart</h2>
             <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
               {cart.length}
             </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#2B221F] hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-[#FFF9F2] rounded-full flex items-center justify-center">
                 <ShoppingBag size={32} className="text-[#E69536]/50" />
              </div>
              <div>
                <p className="text-[#2B221F] font-serif font-bold text-lg mb-1">Your cart is empty</p>
                <p className="text-gray-500 text-sm">Add some premium tea to get started.</p>
              </div>
              <button 
                onClick={onClose}
                className="text-[#E69536] font-bold text-sm hover:underline decoration-2 underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-8 pb-4">
              {cart.map(({ id, name, price, quantity, image }) => (
                <li key={id} className="flex gap-4 group">
                  {/* Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                    <img
                      src={image || '/imgtea.jpeg'}
                      alt={name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="line-clamp-2 pr-2 font-serif font-bold text-[#2B221F] text-sm leading-snug">
                          {name}
                        </h3>
                        <p className="font-bold text-[#2B221F] text-sm">₹{price * quantity}</p>
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#E69536]">₹{price} each</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {/* Qty Control */}
                      <div className="flex items-center border border-gray-200 rounded-md bg-white h-8 shadow-sm">
                        <button 
                          className="px-2.5 h-full text-gray-500 hover:text-[#E69536] hover:bg-gray-50 transition-colors disabled:opacity-30" 
                          onClick={() => updateQuantity(id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2B221F] border-x border-gray-100">{quantity}</span>
                        <button 
                          className="px-2.5 h-full text-gray-500 hover:text-[#E69536] hover:bg-gray-50 transition-colors"
                          onClick={() => updateQuantity(id, quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-md transition-colors"
                        onClick={() => removeFromCart(id)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-[#F9FAFB]">
            <div className="flex justify-between items-center mb-4 text-[#2B221F]">
              <span className="text-sm font-medium text-gray-500">Subtotal (approx)</span>
              <span className="text-lg font-bold font-serif">₹{subtotal.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-[#E69536] hover:bg-[#CC8430] text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              Proceed to Checkout
            </button>
            <p className="mt-4 text-center text-[10px] text-gray-400">
              Shipping, taxes, and discounts calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;