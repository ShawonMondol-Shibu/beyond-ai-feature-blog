import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme-aware accent via CSS var — works with opacity modifiers (bg-brand/10).
        brand: "rgb(var(--accent-rgb) / <alpha-value>)",
        "brand-strong": "rgb(var(--accent-strong-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "dark-bg": "#0A0A0F",
        whatsapp: "#25d366",
        cta: "rgb(var(--cta-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        accent: "0 10px 40px -12px rgb(var(--accent-rgb) / 0.5)",
        "accent-sm": "0 6px 24px -10px rgb(var(--accent-rgb) / 0.45)",
        cta: "0 10px 40px -12px rgb(var(--cta-rgb) / 0.5)",
        "cta-sm": "0 6px 24px -10px rgb(var(--cta-rgb) / 0.45)",
        elevated: "0 24px 60px -28px rgba(0,0,0,0.55)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
