module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sacramento: ['Sacramento', 'cursive'],
        quicksand: ['Quicksand', 'sans'],
      },
      colors: {
        dark: '#161616',
        light: '#9A918D',
        blue: '#74a0b3',
      },
    },
  },
  plugins: [],
};
