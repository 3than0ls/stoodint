module.exports = {
  purge: ['./client/**/*.js', './pages/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-dark-blue': '#1b263d',
        'app-blue-1': '#0f4c75',
        'app-blue-2': '#3282b8',
        'app-blue-3': '#11a7cd',
        'app-purple': '#ba3e97',
        'app-green': '#0dbc79',
        'app-light-blue-1': '#bbe1fa',
        'app-light-blue-2': '#52f2f2',
        'app-light-blue-3': '#49baeb',
        'app-light-gray': '#cfcfcf',
        'app-gray': '#191925',
      },
      transitionProperty: {
        height: 'height',
      },
      transitionDuration: {
        2000: '2000ms',
      },
      minHeight: {
        32: '8rem',
      },
      scale: {
        99: '.99',
      },
      rotate: {
        22.5: '22.5deg',
      },
      animation: {
        animated: 'spin pulse bounce infinite 3s',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
    },
  },
  plugins: [],
}
