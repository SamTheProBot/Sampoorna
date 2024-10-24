/** @type {import('tailwindcss').Config} */
export default {
  content: ['./main.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: "'Inter'",
    },
    extend: {
      colors: {
        dark: '#141414',
        mid: '#ebebeb',
        light: '#ffffff',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  darkMode: 'class',
};
