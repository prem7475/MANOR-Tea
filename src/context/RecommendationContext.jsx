import React, { createContext, useContext, useState, useEffect } from 'react';

const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [userInteractions, setUserInteractions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Load interactions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userInteractions');
    if (stored) {
      try {
        setUserInteractions(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading user interactions:', error);
      }
    }
  }, []);

  // Save interactions to localStorage
  useEffect(() => {
    localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
  }, [userInteractions]);

  const trackInteraction = (productId, action) => {
    const interaction = {
      productId,
      action, // 'view', 'like', 'add_to_cart', 'checkout', 'click'
      timestamp: Date.now()
    };

    setUserInteractions(prev => [...prev, interaction]);
  };

  const getRecommendations = (allProducts) => {
    if (userInteractions.length === 0) {
      // Return popular products if no interactions
      return allProducts
        .filter(product => product.isBestSeller)
        .slice(0, 6);
    }

    // Analyze user preferences
    const productInteractions = {};
    userInteractions.forEach(interaction => {
      if (!productInteractions[interaction.productId]) {
        productInteractions[interaction.productId] = { views: 0, likes: 0, carts: 0, purchases: 0, clicks: 0 };
      }
      switch (interaction.action) {
        case 'view':
          productInteractions[interaction.productId].views++;
          break;
        case 'like':
          productInteractions[interaction.productId].likes++;
          break;
        case 'add_to_cart':
          productInteractions[interaction.productId].carts++;
          break;
        case 'checkout':
          productInteractions[interaction.productId].purchases++;
          break;
        case 'click':
          productInteractions[interaction.productId].clicks++;
          break;
      }
    });

    // Find user's preferred categories and types
    const preferredCategories = new Set();
    const preferredTypes = new Set();
    const preferredTastingNotes = new Set();

    Object.keys(productInteractions).forEach(productId => {
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        if (productInteractions[productId].views > 0 || productInteractions[productId].likes > 0) {
          preferredCategories.add(product.category);
          preferredTypes.add(product.type);
          if (product.tastingNotes) {
            product.tastingNotes.forEach(note => preferredTastingNotes.add(note));
          }
        }
      }
    });

    // Score products based on preferences
    const scoredProducts = allProducts.map(product => {
      let score = 0;

      // Category match
      if (preferredCategories.has(product.category)) score += 3;

      // Type match
      if (preferredTypes.has(product.type)) score += 2;

      // Tasting notes match
      if (product.tastingNotes) {
        const matchingNotes = product.tastingNotes.filter(note => preferredTastingNotes.has(note)).length;
        score += matchingNotes;
      }

      // Boost best sellers slightly
      if (product.isBestSeller) score += 0.5;

      return { ...product, recommendationScore: score };
    });

    // Return top recommendations, excluding already interacted products
    const interactedProductIds = new Set(userInteractions.map(i => i.productId));

    return scoredProducts
      .filter(product => !interactedProductIds.has(product.id))
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 6);
  };

  const value = {
    userInteractions,
    recommendations,
    trackInteraction,
    getRecommendations
  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendations must be used within a RecommendationProvider');
  }
  return context;
};
