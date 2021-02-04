module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-dark-blue': '#1b263d',
        'app-blue-1': '#0f4c75',
        'app-blue-2': '#3282b8',
        'app-light-blue': '#bbe1fa',
        'app-light-gray': '#cfcfcf',
        'app-gray': '#444b4f',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
