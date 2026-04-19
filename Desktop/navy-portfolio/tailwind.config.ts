import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#1a1a1a",
        border: "#1f1f1f",
        "border-2": "#2a2a2a",
        ink: "#e2ddd4",
        "ink-2": "#a09a90",
        muted: "#555555",
        signal: "#9bff6e",
        "signal-dim": "#4a7a32",
        amber: "#f4c97a",
        "amber-dim": "#7a6030",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["Space Mono", "Courier New", "monospace"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "flicker": "flicker 0.15s infinite",
        "glitch-1": "glitch1 2.5s infinite",
        "glitch-2": "glitch2 2.5s infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        glitch1: {
          "0%, 100%": { clipPath: "inset(0 0 100% 0)", transform: "translate(0)" },
          "10%": { clipPath: "inset(10% 0 85% 0)", transform: "translate(-3px, 1px)" },
          "20%": { clipPath: "inset(40% 0 50% 0)", transform: "translate(3px, -1px)" },
          "30%": { clipPath: "inset(70% 0 20% 0)", transform: "translate(-2px, 2px)" },
          "40%": { clipPath: "inset(20% 0 75% 0)", transform: "translate(2px, 0px)" },
        },
        glitch2: {
          "0%, 100%": { clipPath: "inset(0 0 100% 0)", transform: "translate(0)" },
          "15%": { clipPath: "inset(60% 0 30% 0)", transform: "translate(3px, -2px)" },
          "25%": { clipPath: "inset(30% 0 60% 0)", transform: "translate(-3px, 1px)" },
          "35%": { clipPath: "inset(80% 0 10% 0)", transform: "translate(2px, -1px)" },
          "45%": { clipPath: "inset(5% 0 90% 0)", transform: "translate(-2px, 2px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
