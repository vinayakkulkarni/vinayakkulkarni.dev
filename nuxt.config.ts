import { NuxtConfig } from '@nuxt/types';
import { build, head } from './config';
import { axios, content, pwa } from './config/modules';
import { tailwindcss, colorMode } from './config/buildModules';

const config: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/guides/features/rendering-modes#spa
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   */
  head,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading-indicator/
  loadingIndicator: {
    name: 'pulse',
    color: '#5bbad5',
    background: '#041126',
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/styles/fonts.css',
    '~/assets/styles/logo.css',
    '~/assets/styles/global.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/vuescroll', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    ['@nuxtjs/tailwindcss', tailwindcss],
    // https://color-mode.nuxtjs.org/#setup
    ['@nuxtjs/color-mode', colorMode],
    // https://typescript.nuxtjs.org/guide/setup.html#configuration
    '@nuxt/typescript-build',
    // https://typescript.nuxtjs.org/guide/setup.html#configuration
    '@nuxtjs/composition-api/module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', axios],
    // Doc: https://github.com/nuxt-community/pwa-module/#-pwa-module
    ['@nuxtjs/pwa', pwa],
    // Doc: https://content.nuxtjs.org/
    ['@nuxt/content', content],
  ],
  /*
   ** Fallback for Netlify
   */
  generate: {
    fallback: true,
  },

  // Read more: https://typescript.nuxtjs.org/guide/lint.html#runtime-lint
  typescript: {
    typeCheck: {
      eslint: {
        enabled: true,
        files: [
          // 'assets/**/*.{ts,js}',
          'components/**/*.{ts,js,vue}',
          'config/**/*.{ts,js}',
          // 'hooks/**/*.{ts,js}',
          'layouts/**/*.{ts,js,vue}',
          'pages/**/*.{ts,js,vue}',
          'plugins/**/*.{ts,js}',
          'shims/**/*.{ts,js}',
          'types/**/*.{ts,js}',
          'utils/**/*.{ts,js}',
        ],
      },
    },
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build,
};

export default config;
