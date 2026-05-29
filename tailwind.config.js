/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",           // Fixed: Points directly to your actual HTML file layout
    "./*.js",                     // Added: Watches root scripts like app.js or env-config.js
    "./src/**/*.{js,ts,jsx,tsx}", // Keeps tracking any modular files inside your src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}