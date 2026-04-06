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
        surface: "#121212",
        "card-bg": "rgba(12, 12, 12, 0.84)",
        primary: {
          DEFAULT: "#C4A35A",
          foreground: "#000000",
        },
        gold: "#C4A35A",
        "text-primary": "#E8E6E1",
        "text-highlight": "#F2EFE8",
        "text-secondary": "#888888",
        "text-muted": "#555555",
        "border-default": "rgba(255, 255, 255, 0.07)",
        "border-subtle": "rgba(255, 255, 255, 0.04)",
        "border-gold": "rgba(196, 163, 90, 0.24)",
        muted: {
          DEFAULT: "#E0E0E0",
          foreground: "#666666",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-gold": "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { opacity: "1", "box-shadow": "0 0 10px #C4A35A" },
          "50%": { opacity: "0.7", "box-shadow": "0 0 20px #C4A35A" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
