import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A5C38",
          dark: "#004324",
        },
        secondary: "#2E7D52",
        gold: "#C9A84C",
        background: "#EDFDF3",
        surface: {
          DEFAULT: "#FFFFFF",
          tint: "#E1F2E8",
          low: "#F5FBF7",
        },
        onsurface: "#111E18",
        muted: "#404941",
        outline: "#707971",
        outlinevariant: "#C0C9BF",
        error: "#BA1A1A",
        success: "#1D6D42",
        warning: "#A66A00",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 12px 30px rgba(17,30,24,0.08)",
        soft: "0 8px 20px rgba(26,92,56,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
