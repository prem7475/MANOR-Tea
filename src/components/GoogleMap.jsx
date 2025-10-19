import React from 'react';

const GoogleMap = () => {
  // Location: Mahalaxmi Traders, opp hanuman mandir, near mahatma gandhi school, hemu kalani chowk, jaripatka, nagpur
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.123456789!2d79.09383!3d21.1781089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c134bf6e7f69%3A0x914789d1a35a1d3d!2sMahalaxmi%20Traders!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Mahalaxmi Traders Location"
    ></iframe>
  );
};

export default GoogleMap;
