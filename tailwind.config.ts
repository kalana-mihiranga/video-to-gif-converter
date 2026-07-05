import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0B0E14",
          soft: "#0F1420",
        },
        surface: {
          DEFAULT: "#131720",
          raised: "#1A2030",
          border: "#242B3D",
        },
        ink: {
          DEFAULT: "#F2F4F8",
          muted: "#8A93A6",
          faint: "#5B6478",
        },
        magenta: {
          DEFAULT: "#FF5CAA",
          soft: "#FF8CC4",
        },
        cyan: {
          DEFAULT: "#4DE1FF",
          soft: "#9BF0FF",
        },
        violet: {
          DEFAULT: "#7C5CFF",
          soft: "#A594FF",
        },
        success: "#34D399",
        danger: "#FB6B6B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "reel-gradient": "linear-gradient(90deg, #FF5CAA 0%, #7C5CFF 50%, #4DE1FF 100%)",
        "reel-gradient-soft": "linear-gradient(90deg, rgba(255,92,170,0.15) 0%, rgba(124,92,255,0.15) 50%, rgba(77,225,255,0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 30px rgba(124,92,255,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "film-scroll": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-160px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "film-scroll": "film-scroll 6s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
