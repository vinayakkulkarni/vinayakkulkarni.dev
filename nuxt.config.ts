export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },

  compatibilityDate: '2026-10-01',

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/plausible',
    // OpenPanel product analytics (self-hosted at events.geoql.in), alongside
    // Plausible. The module copies every `openpanel` option below into
    // runtimeConfig.public (browser-exposed), so the client secret lives in the
    // private runtimeConfig.openpanel block instead.
    '@openpanel/nuxt',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  site: {
    url: 'https://vinayakkulkarni.dev',
    name: 'Vinayak Kulkarni',
  },

  fonts: {
    families: [
      // Inter is the established brand body/UI face (loaded via CSS stack).
      // Geist is the editorial display companion for article + section headings.
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700, 800] },
    ],
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
    // Vite 8.1.3 (latest) crashes with "handleUpgrade() called more than once"
    // when a second WebSocket upgrade races Nitro's dev server on the shared
    // HTTP socket (any browser-automation connection triggers it). Pinning HMR
    // to its own client port routes the HMR upgrade off the shared listener.
    // Vite 8.1.4+ renamed server.hmr.* to server.ws.* (same semantics).
    server: {
      ws: { host: 'localhost', port: 24678 },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Vinayak Kulkarni - GIS Engineer & Co-Founder',
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

  openpanel: {
    // Baked in at build time: prerendered pages embed runtimeConfig.public.
    clientId: process.env.NUXT_PUBLIC_OPENPANEL_CLIENT_ID ?? '',
    apiUrl: 'https://events.geoql.in/api',
    trackScreenViews: true,
    trackOutgoingLinks: true,
    trackAttributes: true,
    // The proxy handler hardcodes api.openpanel.dev and would bypass the
    // self-hosted apiUrl; the browser POSTs to events.geoql.in directly.
    proxy: false,
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
            'rust',
            'toml',
          ],
        },
      },
    },
  },

  runtimeConfig: {
    githubToken: '',
    // Server-only. clientSecret authenticates server-side track calls
    // (server/utils/openpanel.ts); on the Worker it comes from the
    // NUXT_OPENPANEL_CLIENT_SECRET secret at runtime.
    openpanel: {
      clientId: process.env.NUXT_PUBLIC_OPENPANEL_CLIENT_ID ?? '',
      clientSecret: '',
    },
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
        compatibility_date: '2026-10-01',
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
        // Route the markdown-negotiable pages through the Worker so the
        // agent-ready middleware can serve Accept: text/markdown. Static
        // assets bypass middleware by default; run_worker_first opts these
        // paths back into the Worker (markdown hits are rare, browsers still
        // get the cached prerendered HTML variant via Vary: Accept).
        assets: {
          run_worker_first: [
            '/',
            '/about',
            '/about/',
            '/projects',
            '/projects/',
            '/open-source',
            '/open-source/',
            '/articles/*',
          ],
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
