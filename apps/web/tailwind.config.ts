import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A5C38',
          dark: '#004324',
          50: '#EDFDF3',
          100: '#D4F0E0',
          200: '#A8E1C2',
          300: '#7CCBA4',
          400: '#50B486',
          500: '#2E7D52',
          600: '#1A5C38',
          700: '#145230',
          800: '#0D3B23',
          900: '#072616',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50: '#FDF8EC',
          100: '#F9EDD0',
          500: '#C9A84C',
          600: '#A8872B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          tint: '#E1F2E8',
          bg: '#EDFDF3',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
export default config
