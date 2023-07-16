import type { NuxtConfig } from '@nuxt/schema';
import { meta } from './meta';

const app: NuxtConfig['app'] = {
  head: meta,
};

const components: NuxtConfig['components'] = false;

const css: NuxtConfig['css'] = [
  '~/assets/css/fonts.css',
  '~/assets/css/logo.css',
  '~/assets/css/global.css',
];

const nitro: NuxtConfig['nitro'] = {
  preset: 'netlify',
  future: {
    nativeSWR: true,
  },
};

const plugins: NuxtConfig['plugins'] = [];

const routeRules: NuxtConfig['routeRules'] = {
  // Homepage pre-rendered at build time
  '/': { prerender: true },
  // Blog post generated on-demand once until next deploy
  '/articles/**': { isr: true },
};

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: {
    appVersion: process.env.npm_package_version,
  },
};

const ssr: NuxtConfig['ssr'] = true;

const typescript: NuxtConfig['typescript'] = {
  strict: true,
  shim: false,
};

export { modules } from './modules';
export {
  app,
  components,
  css,
  nitro,
  plugins,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
};
