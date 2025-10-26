import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [appliedOffers, setAppliedOffers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('appliedOffers') || '[]');
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const getSubtotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getTotal = () => {
    const subtotal = getSubtotal();
    const gst = subtotal * 0.05;
    const delivery = subtotal >= 500 ? 0 : 50;
    const totalBefore = subtotal + gst + delivery;
    const offerDiscount = appliedOffers.reduce((total, offer) => {
      if (offer.type === 'percent') {
        return total + (subtotal * offer.value);
      } else if (offer.type === 'flat') {
        return total + offer.value;
      }
      return total;
    }, 0);
    return totalBefore - offerDiscount;
  };

  const applyOffer = async (offer) => {
    const subtotal = getSubtotal();
    if (subtotal < offer.minOrder) {
      setToast(`Offer requires minimum order of ₹${offer.minOrder}`);
      return;
    }
    const isAlreadyApplied = appliedOffers.some(applied => applied.code === offer.code);
    if (isAlreadyApplied) {
      setToast('Offer already applied');
      return;
    }

    // Simulate API call to backend
    try {
      setToast('Applying offer...');
      const response = await fetch('/api/apply-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: offer.code, subtotal })
      });
      const data = await response.json();

      if (data.success) {
        const offerWithDiscount = {
          ...offer,
          discount: data.discountAmount
        };
        setAppliedOffers(prev => [...prev, offerWithDiscount]);
        localStorage.setItem('appliedOffers', JSON.stringify([...appliedOffers, offerWithDiscount]));
        setToast(`${offer.title} applied!`);
      } else {
        setToast(data.message || 'Failed to apply offer');
      }
    } catch (error) {
      // Fallback to local calculation if API fails
      const offerWithDiscount = {
        ...offer,
        discount: offer.type === 'percent' ? subtotal * offer.value : offer.value
      };
      setAppliedOffers(prev => [...prev, offerWithDiscount]);
      localStorage.setItem('appliedOffers', JSON.stringify([...appliedOffers, offerWithDiscount]));
      setToast(`${offer.title} applied!`);
    }
  };

  const removeOffer = (offerId) => {
    setAppliedOffers(prev => prev.filter(offer => offer.id !== offerId));
    const updatedOffers = appliedOffers.filter(offer => offer.id !== offerId);
    localStorage.setItem('appliedOffers', JSON.stringify(updatedOffers));
    setToast('Offer removed');
  };

  const addToCart = product => {
    if (product.isSoldOut) {
      // Do not add sold out products to cart
      return;
    }
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast('Product added to cart!');
    setCartAnimation(true);
    setTimeout(() => setToast(null), 3000);
    setTimeout(() => setCartAnimation(false), 600);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(p => p.id === productId ? { ...p, quantity } : p));
  };

  const removeFromCart = productId => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOffers([]);
    localStorage.removeItem('appliedOffers');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, toast, setToast, appliedOffers, applyOffer, removeOffer, getSubtotal, getTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
