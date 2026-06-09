import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A5C38",
          dark: "#004324",
          hover: "#155230",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2E7D52",
          foreground: "#FFFFFF",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#F0DFA0",
          dark: "#A8872A",
        },
        surface: {
          DEFAULT: "#EDFDF3",
          low: "#E7F8ED",
          container: "#E1F2E8",
          high: "#DCECE2",
          white: "#FFFFFF",
        },
        "on-surface": "#111E18",
        "on-surface-variant": "#404941",
        outline: "#707971",
        "outline-variant": "#C0C9BF",
        error: "#BA1A1A",
        "error-container": "#FFDAD6",
        confirmed: "#1A5C38",
        pending: "#B45309",
        cancelled: "#BA1A1A",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(17,30,24,0.08), 0 4px 12px rgba(17,30,24,0.04)",
        "card-hover": "0 4px 12px rgba(17,30,24,0.12), 0 8px 24px rgba(17,30,24,0.06)",
        sidebar: "2px 0 8px rgba(17,30,24,0.08)",
      },
      animation: {
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-in": "slideIn 0.25s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
