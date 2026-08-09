/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#142420",
          light: "#1D332C",
          soft: "#28453B",
        },
        ivory: {
          DEFAULT: "#F6F1E6",
          dark: "#EEE6D3",
        },
        gold: {
          DEFAULT: "#B98B42",
          light: "#E7C88A",
          dark: "#8C6A31",
        },
        wine: {
          DEFAULT: "#6E2A3B",
          light: "#8C3A4E",
        },
        sand: "#DED2B8",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.2,0.6,0.4,1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(20, 36, 32, 0.35)",
        card: "0 10px 40px -15px rgba(20, 36, 32, 0.25)",
      },
    },
  },
  plugins: [],
};
