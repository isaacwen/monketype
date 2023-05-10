/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // here we are defining our primary color, so that in our App.tsx file,
        // when we say that we want to use `text-primary`, it is yellow
        primary: colors.yellow
      }
    },
  },
  plugins: [],
}

