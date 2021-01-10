const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  prefix: '',
  separator: ':',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#1DA1F2',
        linkedIn: '#2867B2',
        github: '#333333',
        ...defaultTheme.colors,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none',
              '&:hover, &.active': {
                color: 'white',
                'background-color': theme('colors.blue.500'),
                strong: {
                  color: 'white',
                },
              },
            },
            strong: {
              color: theme('colors.blue.500'),
            },
            h1: {
              color: theme('colors.gray.800'),
              'margin-top': '0',
            },
            h2: {
              color: theme('colors.gray.800'),
              'margin-top': '0',
            },
            h3: {
              color: theme('colors.gray.800'),
              'margin-top': '0',
            },
            h4: {
              color: theme('colors.gray.800'),
              'margin-top': '0',
            },
            code: {
              color: 'white',
              'background-color': theme('colors.gray.800'),
              '&:before, &:after': {
                display: 'none',
              },
            },
            p: {
              color: theme('colors.gray.800'),
              'margin-top': '0',
              'margin-bottom': '1em',
            },
            img: {
              'margin-top': '0',
              'margin-bottom': '0',
              'box-shadow': '0px 2px 4px -2px rgba(0, 0, 0, 30%)',
            },
            'ul > li': {
              '&::before': {
                'background-color': theme('colors.gray.800'),
                'font-weight': 'bold',
              },
            },
            'ol > li': {
              '&::before': {
                color: theme('colors.gray.800'),
                'font-weight': 'bold',
              },
            },
          },
        },

        dark: {
          css: {
            color: 'white',
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none',
              '&:hover, &.active': {
                color: 'white',
                'background-color': theme('colors.blue.500'),
              },
            },
            strong: {
              color: theme('colors.blue.500'),
            },
            h1: {
              color: 'white',
              'margin-top': '0',
            },
            h2: {
              color: 'white',
              'margin-top': '0',
            },
            h3: {
              color: 'white',
              'margin-top': '0',
            },
            h4: {
              color: 'white',
              'margin-top': '0',
            },
            code: {
              color: theme('colors.gray.100'),
              '&:before, &:after': {
                display: 'none',
              },
            },
            p: {
              color: 'white',
              'margin-top': '0',
              'margin-bottom': '1em',
            },
            img: {
              'margin-top': '0',
              'margin-bottom': '0',
              'box-shadow': '0px 2px 4px -2px rgba(255, 255, 255, 30%)',
            },
            'ul > li': {
              '&::before': {
                'background-color': 'white',
                'font-weight': 'bold',
              },
            },
            'ol > li': {
              '&::before': {
                color: 'white',
                'font-weight': 'bold',
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
};
