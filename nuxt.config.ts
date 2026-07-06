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
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  site: {
    url: 'https://vinayakkulkarni.dev',
    name: 'Vinayak Kulkarni',
  },

  sitemap: {
    // Static personal site — precompute the sitemap at build, no runtime cost.
    zeroRuntime: true,
  },

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
    preset: 'cloudflare_module',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/projects', '/open-source', '/articles'],
    },
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
      wrangler: {
        name: 'vinayakkulkarni-dev',
        compatibility_date: '2025-07-18',
        compatibility_flags: ['nodejs_compat'],
        workers_dev: false,
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'vinayakkulkarni-dev-db',
            database_id: '4e5afc7d-61a8-44d5-9a9b-a3fbd6cb7277',
          },
        ],
        // Workers Cache API — nitro passes arbitrary wrangler keys through its
        // defu merge (no allowlist); Pages rejected this key, Workers accepts it.
        // Needs wrangler >=4.89.0 for the base block.
        cache: {
          enabled: true,
        },
        observability: {
          enabled: true,
        },
        placement: {
          mode: 'smart',
        },
      },
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
