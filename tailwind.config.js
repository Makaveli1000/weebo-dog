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
          redSoft: "rgba(127, 29, 29, 0.4)"
        },

        sport: {
          football: "#16a34a",
          basketball: "#f97316",
          baseball: "#2563eb",
          track: "#ef4444",
          hockey: "#38bdf8"
        }
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        title: ["Bebas Neue", "Impact", "sans-serif"],
        athletic: ["Oswald", "Arial Narrow", "sans-serif"]
      },

      screens: {
        xs: "420px",
        ultra: "1900px"
      },

      maxWidth: {
        grid: "1600px"
      },

      gridTemplateColumns: {
        dashboard: "320px minmax(0, 1fr) 320px",
        dashboardWide: "360px minmax(0, 1fr) 360px"
      },

      backgroundImage: {
        "zeus-dark": "linear-gradient(135deg, #030303, #101010, #1a1a1a)",
        "zeus-gold": "linear-gradient(90deg, #eab308, #facc15)",
        "zeus-panel": "linear-gradient(180deg, rgba(234,179,8,0.08), rgba(0,0,0,0))"
      },

      boxShadow: {
        zeus: "0 0 18px rgba(234, 179, 8, 0.24)",
        "zeus-soft": "0 0 10px rgba(234, 179, 8, 0.2)",
        "zeus-strong": "0 0 35px rgba(234, 179, 8, 0.38)",
        "panel-deep": "0 20px 60px rgba(0, 0, 0, 0.65)",
        athlete: "0 0 30px rgba(234, 179, 8, 0.35)",
        card: "0 10px 35px rgba(0, 0, 0, 0.55)"
      },

      animation: {
        "modal-pop": "modalScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "feed-slide": "feedSlideIn 0.3s ease-out both",
        "pulse-gold": "pulseGold 2s infinite",
        glow: "glow 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        marquee: "marquee 25s linear infinite"
      },

      keyframes: {
        modalScaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },

        feedSlideIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },

        pulseGold: {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 10px rgba(234,179,8,0.25)"
          },
          "50%": {
            opacity: "0.75",
            boxShadow: "0 0 25px rgba(234,179,8,0.55)"
          }
        },

        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(234,179,8,0.2)"
          },
          "50%": {
            boxShadow: "0 0 30px rgba(234,179,8,0.45)"
          }
        },

        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },

        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" }
        }
      }
    }
  },

  safelist: [
    "bg-zeus-black",
    "bg-zeus-panel",
    "border-zeus-border",
    "border-zeus-gold",
    "text-zeus-gold",
    "bg-zeus-goldSoft",
    "bg-zeus-red",
    "text-white",
    "text-red-400",
    "shadow-zeus",
    "shadow-zeus-soft",
    "shadow-zeus-strong",
    "shadow-panel-deep",
    "shadow-athlete",
    "animate-feed-slide",
    "animate-modal-pop",
    "animate-pulse-gold",
    "animate-glow",
    "animate-float"
  ]
};