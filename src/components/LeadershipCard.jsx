import React from 'react';

const LeadershipCard = ({ image, name, designation, details, onShowMore, isExpanded, index }) => {
  // SAFETY CHECK: Ensure details is a string before trying to slice it
  // This prevents the "Cannot read properties of undefined" crash
  const safeDetails = details || ""; 
  
  const shouldTruncate = safeDetails.length > 100;
  const displayDetails = isExpanded ? safeDetails : safeDetails.slice(0, 100) + (shouldTruncate ? "..." : "");

  return (
    <div className="bg-white border border-[#EACAA5] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-[#F3E0C6]">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2B221F]/50">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-[#2B221F] mb-1 uppercase tracking-wide">
          {name}
        </h3>
        <p className="font-sans text-xs font-bold text-[#E69536] mb-4 uppercase tracking-wider">
          {designation}
        </p>
        
        <div className="font-sans text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
           {displayDetails}
        </div>

        {shouldTruncate && (
          <button 
            onClick={() => onShowMore(index)} 
            className="self-start text-[#E69536] hover:text-[#CC8430] text-sm font-bold uppercase tracking-wide border-b border-[#E69536] pb-0.5 transition-colors"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadershipCard;