import { defineNuxtConfig } from 'nuxt/config';
import {
  app,
  css,
  modules,
  nitro,
  plugins,
  runtimeConfig,
  typescript,
} from './config';

export default defineNuxtConfig({
  app,
  ssr: true,
  components: false,
  css,
  plugins,
  modules,
  runtimeConfig,
  typescript,
  nitro,
});
