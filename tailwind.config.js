/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        BlueTone: '#4481eb',
        GrayTone: '#F6F8FA'
      },
    },
    plugins: [],
  }
}