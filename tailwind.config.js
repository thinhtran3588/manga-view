/* eslint-disable global-require */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
      colors: {
        primary: '#2563EB',
        secondary: '#7C3AED',
        success: '#059669',
        warning: '#ED6C02',
        error: '#d32f2f',
        info: '#0288d1',
        'primary-light': '#60A5FA',
        'secondary-light': '#A78BFA',
        'success-light': '#4caf50',
        'warning-light': '#ff9800',
        'error-light': '#ef5350',
        'info-light': '#03a9f4',
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
