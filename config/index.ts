import type { NuxtConfig } from '@nuxt/schema';
import { head } from './head';

const app: NuxtConfig['app'] = {
  head,
  pageTransition: false,
  layoutTransition: false,
};

const build: NuxtConfig['build'] = {
  analyze: true,
};

const components: NuxtConfig['components'] = false;

const css: NuxtConfig['css'] = [
  '~/assets/css/fonts.css',
  '~/assets/css/logo.css',
  '~/assets/css/global.css',
];

const dev: NuxtConfig['dev'] = false;
const debug: NuxtConfig['debug'] = false;
const devtools: NuxtConfig['devtools'] = { enabled: true };
const devServer: NuxtConfig['devServer'] = {
  port: Number(process.env.PORT) || 3000,
};

const experimental: NuxtConfig['experimental'] = {
  asyncEntry: true,
  externalVue: true,
  configSchema: false,
  emitRouteChunkError: 'automatic',
  typescriptBundlerResolution: false,
  viewTransition: true,
  componentIslands: true,
  payloadExtraction: true,
  typedPages: true,
};

const nitro: NuxtConfig['nitro'] = {
  preset: 'deno-deploy',
  sourceMap: true,
  future: {
    nativeSWR: true,
  },
  prerender: {
    crawlLinks: true,
  },
};

const postcss: NuxtConfig['postcss'] = {
  plugins: {
    'postcss-nesting': {},
    '@unocss/postcss': {},
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
  build,
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
