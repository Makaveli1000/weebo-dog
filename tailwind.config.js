/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",           // Tracks your core layout file inside src
    "./src/app.js",               // Tracks your Firestore rendering logic and dynamic buttons
    "./src/**/*.{js,ts,jsx,tsx}", // Tracks any other modular script files inside src
  ],
  theme: {
    extend: {
      colors: {
        // Custom St. Louis dark theme palette adjustments
        slate: {
          950: "#030712",
          900: "#0f172a",
          800: "#1e293b",
        },
        orange: {
          500: "#f97316",
          600: "#ea580c",
        }
      },
      animation: {
        // Custom snappy scale animation for the highlight player modal pop-up
        'modal-pop': 'modalScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        // FIXED: Added the missing colon right here
        modalScaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}