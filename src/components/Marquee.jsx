import React from 'react';

const Marquee = () => {
  const messages = [
    "Welcome to MANOR",


    "10% OFF for the New Customers 😉",

    
    "DIWALI DHAMAKA offers available"
  ];

  const fullText = messages.join('       ') + '       '; // Add more spaces between messages

  return (
    <div className="marquee-container bg-gray-100 text-gray-800 py-2 font-bold text-sm md:text-lg w-full overflow-hidden">
      <div className="marquee-text flex whitespace-nowrap" style={{ width: '200%' }}>
        <span>{fullText}</span>
        <span>{fullText}</span>
      </div>
    </div>
  );
};

export default Marquee;
