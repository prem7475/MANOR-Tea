/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // BACKGROUNDS
        manorBg: '#FFF9F2',       // Warm Cream (Page Background)
        manorLight: '#FFF9F2',    // Alternate Light
        manorPlate: '#FFFFFF',    // White for cards
        
        // ACCENTS (Buttons & Highlights)
        manorOrange: '#E69536',   // MAIN BUTTON COLOR (Orange)
        manorOrangeHover: '#CC8430', // Darker Orange for Hover
        manorGold: '#C8A870',     // Matte Gold (Secondary Accent)
        
        // TEXT & BORDERS
        manorDark: '#2B221F',     // Dark Coffee/Charcoal Text
        manorText: '#2B221F',     // Main Text
        manorBorder: '#EACAA5',   // Light Beige Border
        
        // DEPRECATED (Mapped to new colors to prevent errors if used elsewhere)
        manorAccent: '#E69536',   // Formerly Green -> Now Orange
        manorGreen: '#E69536',    // Formerly Green -> Now Orange
        accentGreen: '#E69536',   // Formerly Green -> Now Orange
        emerald: { 600: '#E69536', 700: '#CC8430' }, // Override default Tailwind green
        green: { 500: '#E69536', 600: '#E69536', 700: '#CC8430' }, // Override default Tailwind green
      },
      fontFamily: {
        // CHANGE: Mapped 'serif' to 'Inter' to remove the fancy curly font 
        // and make the whole website look "normal" and decent.
        serif: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
};