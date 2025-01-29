/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollbarHide: {
        '-ms-overflow-style': 'none', 
        'scrollbar-width': 'none', 
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none', 
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', 
        },
      });
    }
  ],
};


