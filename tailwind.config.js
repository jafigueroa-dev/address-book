const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      lato: ["Lato"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.coolGray,
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      lightblue: "#F8FAFF",
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      teal: colors.teal,
      orange: colors.orange,
      pink: colors.pink,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
