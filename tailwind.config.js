/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        manorLight: '#F8F8F8', // Off-white background
        manorAccent: '#2E4A3F', // Luxury Green
        manorDark: '#333333', // Deep Charcoal
        manorText: '#333333', // Deep Charcoal text
        manorBg: '#F8F8F8', // Off-white bg
        manorPlate: '#F8F8F8', // Off-white plate
        manorBorder: '#2E4A3F', // Luxury Green border
        manorCup: '#2E4A3F', // Luxury Green
        accentGreen: '#2E4A3F', // Luxury Green
        accentHover: '#233a32', // Darker green for hover
        shadowLight: '#F8F8F8', // Off-white shadow
        highlight: '#C8A870', // Matte Gold highlight
        manorGold: '#C8A870', // Matte Gold
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Source Sans Pro', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'swing': 'swing 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
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
        swing: {
          '0%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '100%': { transform: 'rotate(-10deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
