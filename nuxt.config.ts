export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-07-18',

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/globals.css'],

  vite: {
    optimizeDeps: {
      include: ['maplibre-gl', '@geoql/maplibre-gl-starfield'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Vinayak Kulkarni — GIS Engineer & Co-Founder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Co-Founder building geospatial infrastructure. Specializing in MapLibre, Planetiler, PMTiles, and Vue.js. Open source cartographer.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },

  icon: {
    provider: 'iconify',
    mode: 'svg',
    customCollections: [
      {
        prefix: 'base',
        dir: './app/assets/icons',
      },
    ],
  },

  plausible: {
    domain: 'vinayakkulkarni.dev',
    apiHost: 'https://analytics.geoql.in',
    autoOutboundTracking: true,
  },

  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-dark',
            dark: 'github-dark',
            light: 'github-light',
          },
          langs: [
            'bash',
            'json',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'shell',
            'md',
            'yaml',
          ],
        },
      },
    },
  },

  runtimeConfig: {
    githubToken: '',
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/projects', '/open-source', '/articles'],
    },
    cloudflare: {
      nodeCompat: true,
    },
    experimental: {
      wasm: true,
    },
    wasm: {
      esmImport: true,
      lazy: true,
    },
    rollupConfig: {
      output: {
        generatedCode: {
          constBindings: true,
        },
      },
    },
    replace: {
      'process.stdout': 'undefined',
    },
  },
});
