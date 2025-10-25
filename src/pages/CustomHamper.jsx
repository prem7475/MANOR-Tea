import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Check, Plus, Minus, ShoppingCart } from 'lucide-react';
import teaData from '../data/teaData.js';

const CustomHamper = () => {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedTeas, setSelectedTeas] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [giftMessage, setGiftMessage] = useState('');

  const boxes = [
    { id: 'small', name: 'Small Box', price: 150, capacity: 3 },
    { id: 'medium', name: 'Medium Box', price: 250, capacity: 5 },
    { id: 'premium', name: 'Premium Wooden Crate', price: 400, capacity: 8 }
  ];

  const teas = teaData.filter(p => !p.id.startsWith('g') && p.price > 0).slice(0, 6); // Popular teas

  const addons = [
    { id: 'strainer', name: 'Tea Strainer', price: 50, image: '/tea-strainer.jpg' },
    { id: 'mug', name: 'Branded Mug', price: 120, image: '/branded-mug.jpg' },
    { id: 'honey', name: 'Local Honey', price: 80, image: '/local-honey.jpg' },
    { id: 'cookies', name: 'Artisanal Cookies', price: 100, image: '/artisanal-cookies.jpg' }
  ];

  const toggleTea = (teaId) => {
    if (selectedTeas.includes(teaId)) {
      setSelectedTeas(selectedTeas.filter(id => id !== teaId));
    } else if (selectedTeas.length < (selectedBox?.capacity || 3)) {
      setSelectedTeas([...selectedTeas, teaId]);
    }
  };

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateTotal = () => {
    let total = selectedBox?.price || 0;
    selectedTeas.forEach(teaId => {
      const tea = teas.find(t => t.id === teaId);
      if (tea) total += tea.price;
    });
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const handleAddToCart = () => {
    const hamper = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedBox?.name} Hamper`,
      price: calculateTotal(),
      image: '/custom-hamper.jpg',
      description: `Custom hamper with ${selectedTeas.length} teas and ${selectedAddons.length} add-ons`,
      isCustom: true,
      customDetails: {
        box: selectedBox,
        teas: selectedTeas,
        addons: selectedAddons,
        giftMessage
      }
    };
    addToCart(hamper);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-manorText mb-6">Choose Your Box</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boxes.map(box => (
          <div
            key={box.id}
            onClick={() => setSelectedBox(box)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedBox?.id === box.id
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-300 hover:border-amber-300'
            }`}
          >
            <h3 className="font-semibold text-manorText">{box.name}</h3>
            <p className="text-gray-600">₹{box.price}</p>
            <p className="text-sm text-gray-500">Holds up to {box.capacity} items</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-manorText mb-6">Choose Your Teas ({selectedTeas.length}/{selectedBox?.capacity || 3})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teas.map(tea => (
          <div
            key={tea.id}
            onClick={() => toggleTea(tea.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedTeas.includes(tea.id)
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-300 hover:border-amber-300'
            }`}
          >
            <img src={tea.image} alt={tea.name} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-semibold text-manorText">{tea.name}</h3>
            <p className="text-gray-600">₹{tea.price}</p>
            {selectedTeas.includes(tea.id) && (
              <div className="mt-2 flex items-center text-amber-600">
                <Check size={16} />
                <span className="ml-1 text-sm">Selected</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-manorText mb-6">Add Complements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {addons.map(addon => (
          <div
            key={addon.id}
            onClick={() => toggleAddon(addon.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedAddons.includes(addon.id)
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-300 hover:border-amber-300'
            }`}
          >
            <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
            <h3 className="font-semibold text-manorText">{addon.name}</h3>
            <p className="text-gray-600">₹{addon.price}</p>
            {selectedAddons.includes(addon.id) && (
              <div className="mt-2 flex items-center text-amber-600">
                <Check size={16} />
                <span className="ml-1 text-sm">Added</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-manorText mb-6">Write Your Note</h2>
      <textarea
        value={giftMessage}
        onChange={(e) => setGiftMessage(e.target.value)}
        placeholder="Enter your personal gift message..."
        className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none focus:border-amber-500 focus:outline-none"
        maxLength={200}
      />
      <p className="text-sm text-gray-500">{giftMessage.length}/200 characters</p>
    </div>
  );

  return (
    <section className="p-4 bg-manorBg min-h-screen font-serif text-manorText">
      <h1 className="header-title text-2xl mb-8">Build Your Own Hamper</h1>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-amber-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* Navigation and Total */}
      <div className="max-w-4xl mx-auto mt-8 flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-center">
          <div className="text-2xl font-bold text-manorText">₹{calculateTotal()}</div>
          <div className="text-sm text-gray-600">Total Price</div>
        </div>

        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={
              (currentStep === 1 && !selectedBox) ||
              (currentStep === 2 && selectedTeas.length === 0)
            }
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </section>
  );
};

export default CustomHamper;
