/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#7357e8",
          600: "#6346dc",
          700: "#5234c6",
        },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(39, 31, 84, 0.08)",
      },
    },
  },
  plugins: [],
};
