import { defineNuxtConfig } from 'nuxt';
import { css, meta, modules, plugins, publicRuntimeConfig } from './config';

export default defineNuxtConfig({
  ssr: true,
  target: 'static',
  modern: 'client',
  components: false,
  meta,
  css,
  plugins,
  modules,
  publicRuntimeConfig,
  typescript: {
    strict: true,
    shim: false,
  },
  nitro: {
    preset: 'netlify-builder',
  },
});
