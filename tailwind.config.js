/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",           // Point directly to your core layout file inside src
    "./src/app.js",               // Point directly to your newly compiled JavaScript entry point
    "./src/**/*.{js,ts,jsx,tsx}", // Keep tracking any other modular or sub-component files inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}