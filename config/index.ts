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

const dev: NuxtConfig['dev'] = process.env.NODE_ENV !== 'production';
const debug: NuxtConfig['debug'] = process.env.NODE_ENV !== 'production';
const devtools: NuxtConfig['devtools'] = {
  enabled: process.env.NODE_ENV !== 'production',
};
const devServer: NuxtConfig['devServer'] = {
  port: Number(process.env.PORT) || 3000,
};

const experimental: NuxtConfig['experimental'] = {
  asyncEntry: true,
  externalVue: true,
  configSchema: false,
  emitRouteChunkError: 'automatic',
  viewTransition: true,
  componentIslands: true,
  payloadExtraction: true,
  typedPages: true,
};

const nitro: NuxtConfig['nitro'] = {
  sourceMap: true,
  future: {
    nativeSWR: true,
  },
  prerender: {
    crawlLinks: true,
  },
  rollupConfig: {
    external: ['cloudflare:sockets'],
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
  '/': { prerender: true },
  // Blog post generated on-demand once until next deploy
  '/articles/**': { isr: true },
  // API routes are not pre-rendered
  '/api/**': { prerender: false },
};

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  database: {
    url: process.env.NUXT_DATABASE_URL,
  },
  oauth: {
    github: {
      clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
    },
  },
  public: {
    appVersion: process.env.npm_package_version,
    NUXT_ENV: 'development',
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
