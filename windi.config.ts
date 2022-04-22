import colors from 'windicss/colors';
import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

const extract = {
  include: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
    // TypeScript
    'plugins/**/*.ts',
    'nuxt.config.ts',
  ],
};

const theme = {
  extend: {
    colors: {
      ...colors,
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Inter var', defaultTheme.fontFamily.sans],
    },
  },
};
const plugins = [
  require('windicss/plugin/filters'),
  require('windicss/plugin/forms'),
  require('windicss/plugin/aspect-ratio'),
  require('windicss/plugin/line-clamp'),
  require('windicss/plugin/scroll-snap'),
  typography({
    dark: true,
    modifiers: ['DEFAULT', 'sm', 'lg', 'red'],
  }),
  require('@windicss/plugin-scrollbar'),
  require('@windicss/animations'),
];

export default defineConfig({
  darkMode: 'class',
  extract,
  theme,
  plugins,
});
