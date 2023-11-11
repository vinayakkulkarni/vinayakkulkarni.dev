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

const dev: NuxtConfig['dev'] = process.env.NODE_ENV !== 'production';
const debug: NuxtConfig['debug'] = process.env.NODE_ENV !== 'production';
const devtools: NuxtConfig['devtools'] = { enabled: true };
const devServer: NuxtConfig['devServer'] = {
  port: Number(process.env.PORT) || 3000,
};

const experimental: NuxtConfig['experimental'] = {
  asyncEntry: true,
  externalVue: true,
  emitRouteChunkError: 'automatic',
  typescriptBundlerResolution: false,
  viewTransition: true,
  componentIslands: true,
  payloadExtraction: true,
  typedPages: true,
};

const nitro: NuxtConfig['nitro'] = {
  preset: process.env.NODE_ENV === 'production' ? 'netlify' : 'static',
  future: {
    nativeSWR: true,
  },
  prerender: {
    crawlLinks: true,
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

// temp sol: https://answers.netlify.com/t/javascript-heap-out-of-memory-when-trying-to-build-a-nuxt-app/93138/14
const postcss: NuxtConfig['postcss'] = {
  plugins: {
    cssnano:
      process.env.NODE_ENV === 'production'
        ? { preset: ['default', { discardComments: { removeAll: true } }] }
        : false, // disable cssnano when not in production
  },
};

export { modules } from './modules';
export {
  app,
  components,
  css,
  debug,
  dev,
  devServer,
  devtools,
  experimental,
  nitro,
  plugins,
  postcss,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
};
