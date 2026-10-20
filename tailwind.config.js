/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#D6D6D6',
          400: '#A3A3A3',
          500: '#737373',
          700: '#383838',
          800: '#222222',
          900: '#111111',
        },
        gold: {
          50: '#FAF7F0',
          100: '#F4ECE0',
          200: '#E8D7BE',
          300: '#DCBF98',
          400: '#D0A86E',
          DEFAULT: '#C5A059',
          600: '#A88340',
          700: '#876730',
          800: '#684E25',
          900: '#4F3B1C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'gallery': '0 12px 36px -4px rgba(0, 0, 0, 0.08)',
        'frame': '0 30px 60px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        'modal': '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
