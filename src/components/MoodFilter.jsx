import React from 'react';

const MoodFilter = ({ selectedMoods, onMoodChange, selectedBenefits, onBenefitChange, selectedTastingNotes, onTastingNoteChange }) => {
  const moodOptions = [
    "Energizing", "Calming & Relaxing", "Focus", "Sleepy"
  ];

  const benefitOptions = [
    "Immunity", "Digestion", "De-Stress"
  ];

  const tastingNoteOptions = [
    "Spicy", "Floral", "Earthy", "Fruity", "Robust"
  ];

  const handleMoodToggle = (mood) => {
    if (selectedMoods.includes(mood)) {
      onMoodChange(selectedMoods.filter(m => m !== mood));
    } else {
      onMoodChange([...selectedMoods, mood]);
    }
  };

  const handleBenefitToggle = (benefit) => {
    if (selectedBenefits.includes(benefit)) {
      onBenefitChange(selectedBenefits.filter(b => b !== benefit));
    } else {
      onBenefitChange([...selectedBenefits, benefit]);
    }
  };

  const handleTastingNoteToggle = (note) => {
    if (selectedTastingNotes.includes(note)) {
      onTastingNoteChange(selectedTastingNotes.filter(n => n !== note));
    } else {
      onTastingNoteChange([...selectedTastingNotes, note]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-manorBg to-gray-900 p-4 rounded-lg border border-gray-700 mb-4">


      {/* Mood Filter */}
      <div className="mb-4">
        <h4 className="text-manorText font-medium mb-2">Mood</h4>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map(mood => (
            <button
              key={mood}
              onClick={() => handleMoodToggle(mood)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedMoods.includes(mood)
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Benefit Filter */}
      <div className="mb-4">
        <h4 className="text-manorText font-medium mb-2">Benefits</h4>
        <div className="flex flex-wrap gap-2">
          {benefitOptions.map(benefit => (
            <button
              key={benefit}
              onClick={() => handleBenefitToggle(benefit)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedBenefits.includes(benefit)
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {benefit}
            </button>
          ))}
        </div>
      </div>

      {/* Tasting Notes Filter */}
      <div className="mb-4">
        <h4 className="text-manorText font-medium mb-2">Tasting Notes</h4>
        <div className="flex flex-wrap gap-2">
          {tastingNoteOptions.map(note => (
            <button
              key={note}
              onClick={() => handleTastingNoteToggle(note)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedTastingNotes.includes(note)
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedMoods.length > 0 || selectedBenefits.length > 0 || selectedTastingNotes.length > 0) && (
        <button
          onClick={() => {
            onMoodChange([]);
            onBenefitChange([]);
            onTastingNoteChange([]);
          }}
          className="text-amber-500 hover:text-amber-400 text-sm underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default MoodFilter;
