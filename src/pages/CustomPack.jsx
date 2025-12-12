import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';

const CustomPack = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Configuration
  const basePricePerKg = 380; 
  const kgPerBag = 15; // Standard Bag Size
  const baseImage = "/Manor (4).jpg"; 

  const [isCustomQty, setIsCustomQty] = useState(false);
  const [formData, setFormData] = useState({
    quantity: '15', // Default 15kg
    shopName: '',
    address: '',
    phone: '',
    fssai: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantitySelect = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomQty(true);
      setFormData({ ...formData, quantity: '15' }); // Reset to min for safety
    } else {
      setIsCustomQty(false);
      setFormData({ ...formData, quantity: value });
    }
  };

  const handleConfirmOrder = () => {
    // 1. Check Empty Fields
    if (!formData.shopName || !formData.phone || !formData.address || !formData.fssai) {
      alert("Please fill in ALL details including FSSAI License Number.");
      return;
    }

    // 2. Validate Minimum Quantity
    const selectedWeightInKg = parseFloat(formData.quantity);
    if (isNaN(selectedWeightInKg) || selectedWeightInKg < 15) {
      alert("Minimum order quantity is 15 Kg.");
      return;
    }

    // 3. Calculate Values
    const bags = (selectedWeightInKg / kgPerBag).toFixed(1); // Calculate approx bags
    const finalPrice = basePricePerKg * selectedWeightInKg;

    // 4. Create Cart Object
    const customOrder = {
      id: `custom-${Date.now()}`,
      name: `Custom Pack: ${formData.shopName}`,
      image: baseImage,
      price: finalPrice,
      weight: selectedWeightInKg * 1000,
      quantity: 1, 
      description: `${selectedWeightInKg} Kg (~${bags} Bags) for ${formData.shopName}. Lic: ${formData.fssai}`,
      isCustom: true
    };

    // 5. Add to Cart
    addToCart(customOrder);
    alert("Custom Order Added to Cart!"); 
    navigate('/cart');
  };

  return (
    <section className="p-4 sm:p-8 bg-[#fff8ea] min-h-screen font-serif text-[#4a3b2b] animate-fade-in">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#82512f]">Design Your Manor Pack</h1>
        <Link to="/" className="text-amber-700 hover:underline font-sans text-sm">← Back to Shop</Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: FORM SECTION */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-amber-100">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
             <img src={baseImage} alt="Tea" className="w-20 h-20 object-cover rounded-md bg-gray-200" />
             <div>
               <h2 className="text-xl font-bold text-gray-800">Manor Custom Blend</h2>
               <p className="text-amber-700 font-bold">₹{basePricePerKg} / kg</p>
               <p className="text-xs text-gray-500">Min Order: 15 Kg</p>
             </div>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">Enter Label Details</h3>
          
          <div className="space-y-5 font-sans">
            
            {/* Dynamic Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Quantity (Kg)</label>
              
              {!isCustomQty ? (
                // MODE A: Dropdown for Standard Bags
                <select 
                  onChange={handleQuantitySelect} 
                  value={formData.quantity}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82512f] outline-none"
                >
                  <option value="15">15 Kg [ 1 Bag ]</option>
                  <option value="30">30 Kg [ 2 Bags ]</option>
                  <option value="75">75 Kg [ 5 Bags ]</option>
                  <option value="150">150 Kg [ 10 Bags ]</option>
                  <option value="custom" className="font-bold text-amber-700">Enter Custom Value...</option>
                </select>
              ) : (
                // MODE B: Input for Custom Value
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    name="quantity"
                    min="15"
                    step="1"
                    value={formData.quantity} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82512f] outline-none"
                  />
                  <button 
                    onClick={() => setIsCustomQty(false)}
                    className="whitespace-nowrap px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-300 transition"
                  >
                    Back to Bags
                  </button>
                </div>
              )}
              {isCustomQty && parseInt(formData.quantity) < 15 && (
                <p className="text-red-500 text-xs mt-1">Quantity cannot be less than 15 Kg.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Your Shop Name</label>
              <input 
                type="text" 
                name="shopName" 
                value={formData.shopName} 
                onChange={handleChange} 
                placeholder="e.g. Royal Tea Corner" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82512f] outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Shop Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Full address for the packet label..." 
                rows="2" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82512f] outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+91..." 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82512f] outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">FSSAI No. <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="fssai" 
                  value={formData.fssai} 
                  onChange={handleChange} 
                  placeholder="Required" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82512f] outline-none" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PREVIEW SECTION */}
        <div className="sticky top-8">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-600">Back Label Preview</h3>
          <div className="relative mx-auto bg-white border-2 border-green-800 w-80 h-[420px] p-6 rounded shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
            <div className="text-center border-b-2 border-gray-100 pb-4">
              <h2 className="text-2xl font-serif font-black text-green-900 tracking-widest">MANOR</h2>
              <p className="text-[10px] text-green-700 uppercase tracking-[0.3em]">Premium Tea Leaf</p>
            </div>
            <div className="flex-grow flex flex-col justify-center space-y-4 font-sans text-sm text-gray-800">
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="font-bold text-gray-500">Net Wt.</span>
                <span className="font-bold text-xl">{formData.quantity} Kg</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Marketed By</span>
                <p className="font-bold text-lg leading-tight text-green-900">{formData.shopName || "Your Shop Name"}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Address</span>
                <p className="text-gray-600 text-xs leading-relaxed">{formData.address || "Your Address Here..."}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100">
                <div><span className="text-[10px] text-gray-400 uppercase font-bold">Contact</span><p className="font-semibold text-xs">{formData.phone || "---"}</p></div>
                <div><span className="text-[10px] text-gray-400 uppercase font-bold">Lic No.</span><p className="font-semibold text-xs">{formData.fssai || "---"}</p></div>
              </div>
            </div>
            <div className="text-center text-[10px] text-gray-400 pt-3 border-t border-gray-200">Product of India • Store in cool dry place</div>
          </div>
          
          <button 
            onClick={handleConfirmOrder} 
            className="w-full mt-8 bg-[#82512f] hover:bg-[#6b4226] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={parseInt(formData.quantity) < 15}
          >
            Add to Cart - ₹{(basePricePerKg * parseInt(formData.quantity || 0)).toLocaleString()}
          </button>
        </div>

      </div>
    </section>
  );
};

export default CustomPack;