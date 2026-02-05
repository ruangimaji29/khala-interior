/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F3',
          light: '#FFFFFF',
          dark: '#F5F1E8',
          warm: '#F0EBE0',
        },
        stone: {
          DEFAULT: '#E8E4DC',
          light: '#F2EFE9',
          dark: '#D5D0C4',
        },
        charcoal: {
          DEFAULT: '#3A3A3A',
          light: '#5A5A5A',
          dark: '#2A2A2A',
        },
        brown: {
          DEFAULT: '#8B7355',
          light: '#A68968',
          dark: '#6B5842',
        },
        gold: {
          DEFAULT: '#C9A961',
          light: '#D4BC7A',
          dark: '#B89448',
        },
        warmGrey: '#9E9B95',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}

