import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import teaData from '../data/teaData.js';

const TeaSommelier = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const questions = [
    {
      id: 'time',
      question: 'What time of day is this for?',
      options: [
        { value: 'morning', label: 'Morning', image: '/images/morning.jpg', description: 'Bright and energizing start' },
        { value: 'afternoon', label: 'Afternoon', image: '/images/afternoon.jpg', description: 'Calm and focused' },
        { value: 'evening', label: 'Evening', image: '/images/evening.jpg', description: 'Relaxing and soothing' }
      ]
    },
    {
      id: 'flavor',
      question: 'What flavors call to you?',
      options: [
        { value: 'spicy', label: 'Spicy & Warm', image: '/images/spicy.jpg', description: 'Cardamom, cinnamon, ginger' },
        { value: 'floral', label: 'Floral & Light', image: '/images/floral.jpg', description: 'Jasmine, rose, hibiscus' },
        { value: 'earthy', label: 'Earthy & Robust', image: '/images/earthy.jpg', description: 'Malty, woody, grounded' }
      ]
    },
    {
      id: 'mood',
      question: 'How are you feeling today?',
      options: [
        { value: 'adventurous', label: 'Adventurous', image: '/images/adventurous.jpg', description: 'Bold and exciting flavors' },
        { value: 'comfortable', label: 'Comfortable', image: '/images/comfortable.jpg', description: 'Familiar and cozy' },
        { value: 'mindful', label: 'Mindful', image: '/images/mindful.jpg', description: 'Calm and present' }
      ]
    },
    {
      id: 'caffeine',
      question: 'Caffeine preference?',
      options: [
        { value: 'high', label: 'High Energy', image: '/images/high-caffeine.jpg', description: 'Strong and invigorating' },
        { value: 'medium', label: 'Balanced', image: '/images/medium-caffeine.jpg', description: 'Moderate stimulation' },
        { value: 'low', label: 'Gentle', image: '/images/low-caffeine.jpg', description: 'Light and calming' }
      ]
    }
  ];

  const profiles = {
    'spicy-morning-adventurous-high': {
      name: 'Bold Adventurer',
      description: 'You crave bold, energizing flavors that kickstart your day with adventure.',
      teas: ['Masala Chai', 'Ginger Spice', 'Cardamom Delight'],
      ritual: 'Morning Warrior Ritual Bundle'
    },
    'floral-evening-mindful-low': {
      name: 'Serene Dreamer',
      description: 'You seek gentle, calming experiences that bring peace and mindfulness.',
      teas: ['Jasmine Green', 'Rose Petal', 'Chamomile Bliss'],
      ritual: 'Evening Serenity Ritual Bundle'
    },
    'earthy-afternoon-comfortable-medium': {
      name: 'Grounded Traditionalist',
      description: 'You appreciate classic, comforting flavors that feel like home.',
      teas: ['English Breakfast', 'Darjeeling', 'Assam'],
      ritual: 'Afternoon Comfort Ritual Bundle'
    },
    'default': {
      name: 'Spiced Connoisseur',
      description: 'You have a refined palate for complex, layered flavors.',
      teas: ['Premium Blend', 'Signature Collection', 'Estate Reserve'],
      ritual: 'Connoisseur Experience Bundle'
    }
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate profile
      const profileKey = `${newAnswers.time || 'morning'}-${newAnswers.flavor || 'spicy'}-${newAnswers.mood || 'adventurous'}-${newAnswers.caffeine || 'high'}`;
      const calculatedProfile = profiles[profileKey] || profiles.default;
      setProfile(calculatedProfile);
      setShowResult(true);
    }
  };

  const handleAddToCart = (teaName) => {
    const tea = teaData.find(t => t.name === teaName);
    if (tea) {
      addToCart(tea);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && profile) {
    return (
      <div className="fixed inset-0 bg-manorBg text-manorText flex flex-col items-center justify-center p-4 z-50">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-manorAccent">Your MANOR Profile</h1>
          <h2 className="text-2xl font-semibold mb-4">{profile.name}</h2>
          <p className="text-lg mb-8">{profile.description}</p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recommended Teas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.teas.map((teaName, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{teaName}</h4>
                  <button
                    onClick={() => handleAddToCart(teaName)}
                    className="bg-manorAccent text-white px-4 py-2 rounded hover:bg-manorDark transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Perfect Ritual Bundle</h3>
            <p className="mb-4">{profile.ritual}</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-manorGold text-white px-6 py-3 rounded-lg font-semibold hover:bg-manorGold/80 transition-colors"
            >
              Explore Bundles
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-manorAccent hover:text-manorDark transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-manorBg text-manorText flex flex-col z-50">
      {/* Progress Bar */}
      <div className="w-full bg-manorLight h-2">
        <div
          className="bg-manorAccent h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-manorAccent">
            Find Your Perfect Tea
          </h1>

          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{currentQ.question}</h2>
            <div className="text-sm text-manorText/70 mb-8">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <div className="text-6xl opacity-50">📷</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                  <p className="text-sm text-manorText/70">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-manorLight text-manorText rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-manorAccent hover:text-white transition-colors"
        >
          Previous
        </button>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 text-manorText/60 hover:text-manorText transition-colors"
        >
          Skip Quiz
        </button>
      </div>
    </div>
  );
};

export default TeaSommelier;
