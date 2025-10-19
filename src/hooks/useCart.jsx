import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [appliedOffer, setAppliedOfferInternal] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('appliedOffer') || 'null');
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const getSubtotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getTotal = () => {
    const subtotal = getSubtotal();
    const gst = subtotal * 0.05;
    const delivery = subtotal >= 500 ? 0 : 50;
    const totalBefore = subtotal + gst + delivery;
    const offerDiscount = appliedOffer ? appliedOffer.discount : 0;
    return totalBefore - offerDiscount;
  };

  const setAppliedOffer = (offer) => {
    const subtotal = getSubtotal();
    if (subtotal < offer.minOrder) {
      alert(`Offer requires minimum order of ₹${offer.minOrder}`);
      return;
    }
    const usedOffers = JSON.parse(localStorage.getItem('usedOffers') || '[]');
    if (usedOffers.includes(offer.code)) {
      alert('Offer already used');
      return;
    }
    const discount = offer.type === 'percent' ? getSubtotal() * offer.value : offer.value;
    const newOffer = { ...offer, discount };
    setAppliedOfferInternal(newOffer);
    localStorage.setItem('appliedOffer', JSON.stringify(newOffer));
    localStorage.setItem('usedOffers', JSON.stringify([...usedOffers, offer.code]));
    setToast(`${offer.title} applied!`);
  };

  const clearAppliedOffer = () => {
    setAppliedOfferInternal(null);
    localStorage.removeItem('appliedOffer');
    const usedOffers = JSON.parse(localStorage.getItem('usedOffers') || '[]');
    const filtered = usedOffers.filter(code => code !== appliedOffer?.code);
    localStorage.setItem('usedOffers', JSON.stringify(filtered));
  };

  const addToCart = product => {
    if (product.isSoldOut) {
      setToast('This product is currently sold out!');
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        setToast('Product quantity updated in cart!');
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      setToast('Product added to cart!');
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartAnimation(true);
    setTimeout(() => setToast(null), 3000);
    setTimeout(() => setCartAnimation(false), 600);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      setToast('Product removed from cart!');
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setCart(prev => prev.map(p => p.id === productId ? { ...p, quantity } : p));
    setToast('Quantity updated!');
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = productId => {
    setCart(prev => prev.filter(p => p.id !== productId));
    setToast('Product removed from cart!');
    setTimeout(() => setToast(null), 3000);
  };

  const clearCart = () => {
    setCart([]);
    clearAppliedOffer();
    setToast('Cart cleared!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, toast, setToast, appliedOffer, setAppliedOffer, clearAppliedOffer, getSubtotal, getTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
