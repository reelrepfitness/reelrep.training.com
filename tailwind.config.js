/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#1C1C1C',
        backgroundLight: '#2C2C2C',
        pink: '#D81B60',
        white: '#FFFFFF',
        textGray: '#CCCCCC',
      },
      fontFamily: {
        // Add custom fonts here if needed
      },
    },
  },
  plugins: [],
}
