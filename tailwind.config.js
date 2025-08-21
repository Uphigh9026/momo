/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'momo-green': '#03c75a',
        'momo-dark-green': '#029e4b',
        'momo-light-green': '#e9fbe7',
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      }
    },
  },
  plugins: [],
}