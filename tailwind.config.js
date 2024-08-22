/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-main": "#121212", // Black main
        "card-bg": "#1E1E1E", // Cards
        "lighter-black": "#2C2C2C", // Lighter black
        green: "#009A6C", // Green
        silver: "#B0B0B0", // Silver
        "dark-turquoise": "#005750", // Dark turquoise
        "warning-orange": "#917144", // Warning orange
        "warning-red": "#914444", // Warning red
        "warning-text": "#d1a05c", // Warning text
      },
    },
  },
  plugins: [],
};
