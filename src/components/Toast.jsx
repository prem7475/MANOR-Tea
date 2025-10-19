import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-accentGreen text-white px-4 py-2 rounded shadow-lg animate-fade-in z-50">
      {message}
    </div>
  );
};

export default Toast;
