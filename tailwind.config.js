// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JS/TS files in src directory
    // If you have other files like components or template files, add them here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
