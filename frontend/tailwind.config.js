/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        elancoBlue: '#1D4ED8', // Primary blue
        elancoLightBlue: '#60A5FA', // Lighter blue
      },
      backgroundImage: {
        'elanco-gradient': 'linear-gradient(90deg, #1D4ED8, #60A5FA)', // Gradient from dark to light blue
      },
    },
  },
  plugins: [],
};
