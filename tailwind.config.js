module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sacramento: ["Sacramento", "cursive"],
        quicksand: ["Quicksand", "sans"],
      },
      colors: {
        dark: "#161616",
        light: "#9A918D",
        lighter: "#EFE1DB",
        blue: {
          DEFAULT: "#74a0b3",
          dark: "#3B6F85",
        },
      },
      backgroundImage: {
        "header-image": "url('/woman-shopping.jpg')",
      },
    },
  },
  plugins: [],
}
