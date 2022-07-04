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
  preset: 'netlify',
  ssr: false,
  modern: 'client',
  target: 'static',
  components: false,
  meta,
  css,
  plugins,
  modules,
  publicRuntimeConfig,
  build,
});
