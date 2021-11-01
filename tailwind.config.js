const CONSTANTS = require('./src/core/constants.json');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
      colors: {
        primary: CONSTANTS.COLOR.PRIMARY,
        secondary: CONSTANTS.COLOR.SECONDARY,
        success: CONSTANTS.COLOR.SUCCESS,
        warning: CONSTANTS.COLOR.WARNING,
        error: CONSTANTS.COLOR.ERROR,
        info: CONSTANTS.COLOR.INFO,
        'primary-light': CONSTANTS.COLOR.PRIMARY_LIGHT,
        'secondary-light': CONSTANTS.COLOR.SECONDARY_LIGHT,
        'success-light': CONSTANTS.COLOR.SUCCESS_LIGHT,
        'warning-light': CONSTANTS.COLOR.WARNING_LIGHT,
        'error-light': CONSTANTS.COLOR.ERROR_LIGHT,
        'info-light': CONSTANTS.COLOR.INFO_LIGHT,
      },
      minHeight: {
        2: '2rem',
        4: '4rem',
        6: '6rem',
        8: '8rem',
        10: '10rem',
        12: '12rem',
      },
      maxHeight: {
        2: '2rem',
        4: '4rem',
        6: '6rem',
        8: '8rem',
        10: '10rem',
        12: '12rem',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {
      display: ['dark'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
