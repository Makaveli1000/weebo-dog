/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/index.html",
    "./bundle.js",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./*.{html,js}"
  ],

  theme: {
    extend: {
      colors: {
        zeus: {
          black: "#030303",
          panel: "#070707",
          border: "#171717",
          gold: "#eab308",
          goldSoft: "rgba(234, 179, 8, 0.12)",
          red: "#7f1d1d"
        }
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ]
      },

      maxWidth: {
        grid: "1600px"
      },

      boxShadow: {
        zeus: "0 0 18px rgba(234, 179, 8, 0.24)",
        "zeus-soft": "0 0 10px rgba(234, 179, 8, 0.2)",
        "panel-deep": "0 20px 60px rgba(0, 0, 0, 0.65)"
      },

      backgroundImage: {
        // Updated from #030712 to map directly onto your zeus palette configs
        "zeus-panel": "linear-gradient(to bottom, #070707, #030303)",
        "zeus-glow": "radial-gradient(circle at top, rgba(234, 179, 8, 0.18), transparent 38%)"
      },

      animation: {
        "modal-pop": "modalScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "pulse-slow": "pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "feed-slide": "feedSlideIn 0.25s ease-out both"
      },

      keyframes: {
        modalScaleUp: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95) translateY(8px)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)"
          }
        },

        feedSlideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(6px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      }
    }
  },

  safelist: [
    "hidden",
    "block",
    "flex",
    "grid",
    "opacity-0",
    "pointer-events-none",
    "bg-black",
    "bg-gray-950",
    "bg-gray-900",
    "bg-yellow-500",
    "bg-yellow-400",
    "bg-red-950",
    "text-white",
    "text-black",
    "text-gray-100",
    "text-gray-300",
    "text-gray-400",
    "text-gray-500",
    "text-gray-600",
    "text-yellow-500",
    "text-yellow-400",
    "text-red-400",
    "border-gray-900",
    "border-gray-800",
    "border-yellow-500",
    "border-red-900",
    "hover:bg-yellow-500",
    "hover:bg-yellow-400",
    "hover:text-black",
    "hover:text-white",
    "hover:border-yellow-500",
    "selection:bg-yellow-500",
    "selection:text-black",
    // ⚡ ADDED: Safelisting your custom semantic classes for dynamic runtime injection
    "bg-zeus-black",
    "bg-zeus-panel",
    "border-zeus-border",
    "text-zeus-gold",
    "bg-zeus-goldSoft"
  ],

  plugins: []
};