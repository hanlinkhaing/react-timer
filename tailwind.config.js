/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-7s': "spin 7s linear infinite",
      },
    },
  },
  plugins: [],
}
