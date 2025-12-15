/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fashion-dark': '#0f172a',
        'fashion-card': 'rgba(30, 41, 59, 0.7)',
        'fashion-accent': '#06b6d4', // cyan
      }
    },
  },
  plugins: [],
}
