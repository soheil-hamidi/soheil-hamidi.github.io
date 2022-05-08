module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Avenir", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      boxShadow: {
        cs1: "0 0 10px 5px rgb(0 0 0 / 0.05)",
        cs2: "0 0 10px 10px rgb(0 0 0 / 0.05)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
