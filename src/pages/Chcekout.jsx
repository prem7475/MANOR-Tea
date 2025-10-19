import React from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../hooks/useCart.jsx';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    alert('Order placed successfully!');
    console.log('Order data:', data);
    clearCart(); // Clear cart after successful order
    reset();
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="p-8 max-w-lg mx-auto font-serif text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded min-h-screen">
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Please enter a valid 10-digit Indian phone number'
              }
            })}
            className="border border-[#c68e53] rounded p-2 w-full"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            className="border border-[#c68e53] rounded p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Delivery Address"
            {...register('address', {
              required: 'Delivery address is required',
              minLength: {
                value: 10,
                message: 'Address must be at least 10 characters long'
              }
            })}
            rows="4"
            className="border border-[#c68e53] rounded p-2 w-full"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-[#c68e53] text-white p-2 rounded hover:bg-[#82512f] transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
