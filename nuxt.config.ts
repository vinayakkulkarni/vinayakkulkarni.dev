import { defineNuxtConfig } from 'nuxt';
import {
  build,
  css,
  meta,
  modules,
  plugins,
  publicRuntimeConfig,
} from './config';

export default defineNuxtConfig({
  ssr: false,
  components: false,
  meta,
  css,
  plugins,
  modules,
  publicRuntimeConfig,
  build,
  nitro: {
    prerender: {
      routes: ['/articles'],
    },
  },
});
