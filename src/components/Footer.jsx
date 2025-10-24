import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center font-serif">
      <div className="flex flex-col items-center md:items-start gap-2 text-sm text-center md:text-left">
        <span>GST No. :- 27ADRPN3696H1ZT</span>
        <div className="flex items-center gap-2">
          <img
            src="/fsssai logo.png"
            alt="FSSAI Logo"
            className="h-6 w-auto"
          />
          <span>11523078000114</span>
        </div>
        <p className="text-sm">© MANOR Tea 2025 | All Rights Reserved</p>
      </div>
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
        >
          <FaInstagram className="text-xl" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
        >
          <FaFacebook className="text-xl" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
        >
          <FaLinkedin className="text-xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
