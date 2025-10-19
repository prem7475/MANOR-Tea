/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        manorLight: '#DBEAFE', // Light blue background
        manorAccent: '#3B82F6', // Primary blue
        manorDark: '#000000', // Black
        manorText: '#000000', // Black text
        manorBg: '#ffffff', // White bg
        manorPlate: '#DBEAFE', // Light blue plate
        manorBorder: '#3B82F6', // Blue border
        manorCup: '#3B82F6', // Blue
        accentGreen: '#3B82F6', // Blue (replaced from dark gray)
        accentHover: '#1E40AF', // Darker blue for hover
        shadowLight: '#ffffff', // White shadow
        highlight: '#DBEAFE', // Light blue highlight
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'swing': 'swing 2s ease-in-out infinite',
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
      },
    },
  },
  plugins: [require('daisyui')],
};
