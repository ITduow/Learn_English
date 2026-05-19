/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#172033",
        mist: "#f6f8fb",
        leaf: "#2f8f6b",
        skysoft: "#e8f4ff",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
