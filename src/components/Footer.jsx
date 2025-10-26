import React from 'react';
import { Instagram, Facebook, Linkedin, Truck, Lock, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-manorDark text-white p-6 font-serif">
      {/* Trust Badges Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-8 h-8 text-manorGold" />
            <h3 className="font-semibold text-manorGold">Free Delivery</h3>
            <p className="text-sm text-gray-300">Free home delivery in Nagpur</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Lock className="w-8 h-8 text-manorGold" />
            <h3 className="font-semibold text-manorGold">Secure Payment</h3>
            <p className="text-sm text-gray-300">100% secure payment gateway</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Leaf className="w-8 h-8 text-manorGold" />
            <h3 className="font-semibold text-manorGold">Premium Quality</h3>
            <p className="text-sm text-gray-300">Sourced from finest plantations</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-3 text-sm text-center md:text-left">
          <div className="flex items-center gap-2">
            <img
              src="/fsssai logo.png"
              alt="FSSAI Logo"
              className="h-6 w-auto"
            />
            <span className="legal-text font-normal">FSSAI: 11523078000114</span>
          </div>
          <span className="legal-text font-normal">GST No: 27ADRPN3696H1ZT</span>
          <p className="text-sm text-gray-300">© MANOR Tea 2025 | All Rights Reserved</p>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-manorGold hover:text-manorGreen transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-manorGold hover:text-manorGreen transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-manorGold hover:text-manorGreen transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
            aria-label="Connect with us on LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
