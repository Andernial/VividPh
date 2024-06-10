/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainBg':'#F2E8B3',
        'hoverColor':"#72F2C3"
      },
    },
  },
  plugins: [],
}