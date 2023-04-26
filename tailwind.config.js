/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      "ultra-sm": "396px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
