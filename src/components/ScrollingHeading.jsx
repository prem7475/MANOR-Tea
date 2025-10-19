import React from 'react';

const ScrollingHeading = ({ text }) => {
  return (
    <div className="marquee-container bg-manorLight text-manorText py-4 font-bold text-xl md:text-2xl">
      <div className="marquee-text">
        {text.repeat(3)} {/* Repeat for seamless loop */}
      </div>
    </div>
  );
};

export default ScrollingHeading;
