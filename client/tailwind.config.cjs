/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A56DB",
        accent: "#FF5A5F",
        bg: "#F8FAFC",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [],
}
