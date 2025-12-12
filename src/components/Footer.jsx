import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    alert("Thank you for subscribing to Manor Tea!");
    setSubscribeEmail("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We will contact you shortly.");
    setContactForm({ name: "", email: "", message: "" });
  };

  // Theme Colors (Matching Navbar)
  const theme = {
    bg: "bg-[#F3E0C6]",        // Manor Beige
    text: "text-[#2B221F]",    // Manor Dark Charcoal
    accent: "text-[#D48C2E]",  // Manor Gold
    border: "border-[#2B221F]",// Dark Border
    inputBg: "bg-white",       // Clean White Inputs
  };

  return (
    <footer className={`${theme.bg} ${theme.text} border-t ${theme.border} border-opacity-10 font-serif`}>
      {/* Container: Wide and Spacious */}
      <div className="w-[95%] max-w-[1600px] mx-auto py-24 px-4">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* COLUMN 1: Brand & Subscribe */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Logo Text */}
              <span className={`text-4xl font-serif font-bold ${theme.text} tracking-widest group-hover:opacity-80 transition-opacity duration-300`}>
                MANOR
              </span>
            </Link>
            <p className="text-base leading-loose opacity-80 pr-4">
              Experience the rich aroma and robust flavor of our premium black tea, sourced directly from the finest plantations to your cup.
            </p>
            
            <div className="space-y-4 pt-6">
              <h4 className={`font-semibold text-lg ${theme.text} uppercase tracking-wide`}>Subscribe to Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-0 relative shadow-md rounded-md overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className={`w-full px-6 py-4 ${theme.inputBg} border-none focus:ring-2 focus:ring-[#D48C2E] focus:outline-none text-base ${theme.text} placeholder-gray-400 transition-all`}
                />
                <button 
                  type="submit" 
                  className="bg-[#2B221F] hover:bg-[#D48C2E] text-[#F3E0C6] px-8 transition-colors flex items-center justify-center duration-300"
                  aria-label="Subscribe"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="lg:pl-12">
            <h4 className={`font-serif font-semibold text-2xl mb-8 ${theme.text} border-b ${theme.border} border-opacity-20 pb-3 inline-block`}>
              Quick Links
            </h4>
            <ul className="space-y-4 text-lg opacity-80">
              {['Home', 'Products', 'Gifts', 'About Us', 'Leadership', 'Contact'].map((item) => (
                <li key={item}>
                   <Link 
                     to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                     className="hover:text-[#D48C2E] hover:translate-x-2 transition-all duration-300 inline-block font-medium"
                   >
                     {item}
                   </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Contact Form */}
          <div>
            <h4 className={`font-serif font-semibold text-2xl mb-8 ${theme.text} border-b ${theme.border} border-opacity-20 pb-3 inline-block`}>
              Send a Message
            </h4>
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className={`w-full px-5 py-3.5 rounded ${theme.inputBg} border border-[#2B221F] border-opacity-20 focus:border-[#D48C2E] focus:outline-none text-base ${theme.text} placeholder-gray-400 shadow-sm transition-colors`}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className={`w-full px-5 py-3.5 rounded ${theme.inputBg} border border-[#2B221F] border-opacity-20 focus:border-[#D48C2E] focus:outline-none text-base ${theme.text} placeholder-gray-400 shadow-sm transition-colors`}
                required
              />
              <textarea
                placeholder="Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows="3"
                className={`w-full px-5 py-3.5 rounded ${theme.inputBg} border border-[#2B221F] border-opacity-20 focus:border-[#D48C2E] focus:outline-none text-base ${theme.text} placeholder-gray-400 shadow-sm transition-colors min-h-[120px]`}
                required
              />
              <button 
                type="submit" 
                className="w-full bg-[#2B221F] hover:bg-[#D48C2E] text-[#F3E0C6] py-4 rounded text-base font-bold tracking-widest uppercase transition-all transform hover:-translate-y-1 shadow-lg duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* COLUMN 4: Map & Info */}
          <div className="space-y-8">
            <h4 className={`font-serif font-semibold text-2xl ${theme.text} border-b ${theme.border} border-opacity-20 pb-3 inline-block`}>
              Visit Us
            </h4>
            <div className="space-y-6 text-base opacity-90">
              <div className="flex items-start gap-4 group">
                <MapPin className="h-6 w-6 text-[#D48C2E] mt-1 flex-shrink-0 group-hover:animate-bounce" />
                <span className="leading-relaxed">
                  Mahalaxmi Traders, Opp. Hanuman Mandir, Near Mahatma Gandhi School, Hemu Colony, Jaripatka, Nagpur - 440014
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-[#D48C2E] flex-shrink-0" />
                <span className="hover:text-[#D48C2E] transition-colors cursor-pointer text-lg tracking-wide">+91 76668 53412</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-[#D48C2E] flex-shrink-0" />
                <span className="hover:text-[#D48C2E] transition-colors cursor-pointer text-lg">contact@manortea.com</span>
              </div>
            </div>
            
            {/* Map - Premium Sepia Tone Filter */}
            <div className="w-full h-64 rounded-xl overflow-hidden border border-[#2B221F] border-opacity-20 shadow-xl mt-6 relative transition-all duration-500 hover:shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.803767856986!2d79.0805963147669!3d21.15934698592758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0f7c231730d%3A0x6734106366601007!2sJaripatka%2C%20Nagpur%2C%20Maharashtra%20440014!5e0!3m2!1sen!2sin!4v1679925241000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'sepia(30%) contrast(1.1)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Manor Tea Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`border-t ${theme.border} border-opacity-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-70`}>
          <p className="text-base font-medium">© {new Date().getFullYear()} Manor Tea. All rights reserved. | FSSAI Lic. No.: 11523078000114</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#D48C2E] transition-colors hover:scale-125 transform duration-200"><Instagram className="h-6 w-6" /></a>
            <a href="#" className="hover:text-[#D48C2E] transition-colors hover:scale-125 transform duration-200"><Facebook className="h-6 w-6" /></a>
            <a href="#" className="hover:text-[#D48C2E] transition-colors hover:scale-125 transform duration-200"><Linkedin className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;