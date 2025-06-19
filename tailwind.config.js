/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS, JSX, TS, TSX files in src folder
    "./public/index.html",         // Also scan index.html
  ],
  theme: {
    extend: {
      fontFamily: { // Add the Inter font family for easier use
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}