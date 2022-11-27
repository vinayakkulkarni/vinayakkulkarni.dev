import type { NuxtConfig } from '@nuxt/schema';
import { meta } from './meta';

const app: NuxtConfig['app'] = {
  head: meta,
};

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: {
    appVersion: process.env.npm_package_version,
  },
};

const css: NuxtConfig['css'] = [
  '~/assets/css/fonts.css',
  '~/assets/css/logo.css',
  '~/assets/css/global.css',
];

const plugins: NuxtConfig['plugins'] = [
  { src: '~/plugins/click-outside', mode: 'client' },
];

const typescript: NuxtConfig['typescript'] = {
  strict: true,
  shim: false,
};

const nitro: NuxtConfig['nitro'] = {
  preset: 'netlify-builder',
};

export { modules } from './modules';
export { app, css, plugins, nitro, runtimeConfig, typescript };
