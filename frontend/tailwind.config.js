/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: "#a8a29e",
        custom1: "#9C5D4B",
        custom2: "#8C5D4B",
      },
    },
  },
  plugins: [require("daisyui")],
};
