/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./bundle.js", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        zeus: {
          black: "#030303",
          panel: "#070707",
          border: "#171717",
          gold: "#eab308",
          goldSoft: "rgba(234, 179, 8, 0.12)",
          red: "#7f1d1d",
          redSoft: "rgba(127, 29, 29, 0.4)" // Added for error states
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      maxWidth: {
        grid: "1600px"
      },
      // Added grid column for the dashboard layout
      gridTemplateColumns: {
        'dashboard': '320px 1fr 320px',
      },
      boxShadow: {
        zeus: "0 0 18px rgba(234, 179, 8, 0.24)",
        "zeus-soft": "0 0 10px rgba(234, 179, 8, 0.2)",
        "panel-deep": "0 20px 60px rgba(0, 0, 0, 0.65)"
      },
      animation: {
        "modal-pop": "modalScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "feed-slide": "feedSlideIn 0.3s ease-out both"
      },
      keyframes: {
        modalScaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        feedSlideIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  safelist: [
    "bg-zeus-black", "bg-zeus-panel", "border-zeus-border", 
    "text-zeus-gold", "bg-zeus-goldSoft", "animate-feed-slide"
  ]
};