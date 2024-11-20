/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all your template files
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Scans these files to generate utility classes
  theme: {
    extend: {}, // Placeholder for extending the default Tailwind theme (e.g., adding custom colors or fonts)
  },
  plugins: [], // Add plugins here if needed (e.g., forms, typography, aspect ratio)
};
