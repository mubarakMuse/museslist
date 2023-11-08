/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["wireframe"]
  },
  plugins: [require('@tailwindcss/forms'), require("daisyui")
],
}