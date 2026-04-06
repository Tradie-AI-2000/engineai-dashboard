import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        "card-bg": "rgba(12, 12, 12, 0.84)",
        gold: {
          DEFAULT: "#C4A35A",
          muted: "rgba(196, 163, 90, 0.24)",
        },
        primary: {
          DEFAULT: "#E8E6E1",
          foreground: "#0A0A0A",
        },
        secondary: "#888888",
        muted: {
          DEFAULT: "#555555",
          foreground: "rgba(255, 255, 255, 0.04)",
        },
        foreground: "#ffffff",
        border: "rgba(255, 255, 255, 0.07)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "0.5rem",
        md: "1.1rem",
        lg: "1.75rem",
        xl: "1.9rem",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { opacity: "1", "border-color": "rgba(196, 163, 90, 0.4)" },
          "50%": { opacity: "0.5", "border-color": "rgba(196, 163, 90, 0.1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1.5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
