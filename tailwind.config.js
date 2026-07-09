/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#feccaa',
          300: '#fdac74',
          400: '#fb813c',
          500: '#f96316',
          600: '#ea490c',
          700: '#c2360c',
          800: '#9a2c12',
          900: '#7c2712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
