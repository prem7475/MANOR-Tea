import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LoyaltyContext = createContext();

export const LoyaltyProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState({
    points: 0,
    tier: 'Bronze Leaf',
    nextTierPoints: 500,
    pointsToNextTier: 500,
    totalSpent: 0,
    reviewsCount: 0,
    accountAge: 0
  });

  // Load loyalty data when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadLoyaltyData();
    } else {
      setLoyaltyData({
        points: 0,
        tier: 'Bronze Leaf',
        nextTierPoints: 500,
        pointsToNextTier: 500,
        totalSpent: 0,
        reviewsCount: 0,
        accountAge: 0
      });
    }
  }, [user, isAuthenticated]);

  const loadLoyaltyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/loyalty/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLoyaltyData(data);
      }
    } catch (error) {
      console.error('Error loading loyalty data:', error);
    }
  };

  const addPoints = async (points, reason) => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/loyalty/add-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ points, reason })
      });

      if (response.ok) {
        await loadLoyaltyData(); // Refresh data
        return { success: true };
      }
    } catch (error) {
      console.error('Error adding points:', error);
    }
    return { success: false };
  };

  const getTierBenefits = (tier) => {
    const benefits = {
      'Bronze Leaf': {
        name: 'Bronze Leaf',
        color: '#CD7F32',
        benefits: ['Early access to sales', 'Welcome discount']
      },
      'Silver Leaf': {
        name: 'Silver Leaf',
        color: '#C0C0C0',
        benefits: ['Free shipping on all orders', 'Priority customer support', 'Exclusive previews']
      },
      'Gold Leaf': {
        name: 'Gold Leaf',
        color: '#FFD700',
        benefits: ['Free "Tea of the Month" sampler', 'Exclusive limited-edition blends', 'VIP events access', 'Personalized recommendations']
      }
    };
    return benefits[tier] || benefits['Bronze Leaf'];
  };

  const getTierProgress = () => {
    const { points, tier } = loyaltyData;
    let nextTierPoints = 500; // Bronze to Silver
    if (tier === 'Silver Leaf') nextTierPoints = 1500; // Silver to Gold
    if (tier === 'Gold Leaf') nextTierPoints = points; // Max tier

    const pointsToNextTier = Math.max(0, nextTierPoints - points);
    const progressPercent = tier === 'Gold Leaf' ? 100 : ((points / nextTierPoints) * 100);

    return {
      currentTier: tier,
      nextTier: tier === 'Bronze Leaf' ? 'Silver Leaf' : tier === 'Silver Leaf' ? 'Gold Leaf' : 'Gold Leaf',
      pointsToNextTier,
      progressPercent: Math.min(100, progressPercent)
    };
  };

  const value = {
    loyaltyData,
    addPoints,
    getTierBenefits,
    getTierProgress,
    refreshLoyaltyData: loadLoyaltyData
  };

  return (
    <LoyaltyContext.Provider value={value}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};
