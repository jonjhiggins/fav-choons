module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
};
