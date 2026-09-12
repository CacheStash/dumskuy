/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'sans-serif'],
        specimen: ['var(--specimen-font)', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        studio: {
          950: '#090a0f',
          900: '#0f111a',
          850: '#151824',
          800: '#1c2030',
          750: '#252b3f',
          700: '#2e364f',
          600: '#424d6d',
          500: '#5b6990',
          400: '#8794b6',
          300: '#b2bed9',
          200: '#dce3f1',
          100: '#f0f3fa',
          50: '#f8fafc',
        }
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'specimen-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
        'specimen-light': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
