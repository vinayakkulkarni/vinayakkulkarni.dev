// wrangler.json keys passed through Nitro's defu merge. Kept out of the
// config literal because nitropack's wrangler type predates `cache`, which
// wrangler's own config-schema.json (RawConfig.cache -> CacheOptions) accepts.
const wranglerConfig = {
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
    mode: 'smart' as const,
  },
  // Route the markdown-negotiable pages through the Worker so the
  // agent-ready middleware can serve Accept: text/markdown. Static
  // assets bypass middleware by default; run_worker_first opts these
  // paths back into the Worker (markdown hits are rare, browsers still
  // get the cached prerendered HTML variant via Vary: Accept).
  //
  // One URL style (no trailing slash, as in the sitemap). The asset
  // layer can only redirect with a 307, so every `/x/` request runs the
  // Worker first ('/*/'), where server/middleware/0.trailing-slash.ts
  // answers 308 → `/x`. drop-trailing-slash serves folder indexes such
  // as articles/index.html at `/articles` instead of 307 → `/articles/`.
  assets: {
    html_handling: 'drop-trailing-slash' as const,
    run_worker_first: [
      '/',
      '/*/',
      '/about',
      '/projects',
      '/open-source',
      '/articles',
      '/articles/*',
    ],
  },
};

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },

  experimental: {
    // compatibilityVersion 5 turns Nitro auto-imports off from Nuxt 4.6.2.
    // @nuxt/content 3.16.2 (latest) imports `useRuntimeConfig` from `#imports`
    // in its server runtime and needs `H3Event` for `queryCollection`, so the
    // build fails without this layer. Remove when @nuxt/content imports from
    // `nuxt/server`; see https://nuxt.com/docs/5.x/getting-started/upgrade
    nitroAutoImports: true,
  },

  compatibilityDate: '2026-10-01',

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    // Analytics fan out to three trackers via app/composables/use-analytics.ts:
    // GA4 (@nuxt/scripts, plugins/5), OpenPanel (this module) and Plausible
    // (official pa-*.js snippet, plugins/7). The OpenPanel module copies every
    // `openpanel` option below into runtimeConfig.public (browser-exposed), so
    // the client secret lives in the private runtimeConfig.openpanel block.
    '@nuxt/scripts',
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
    // Bundle every icon the app uses from the installed @iconify-json/*
    // collections. Without it, prerender fetches each icon from the Iconify
    // API with a 1.5 s timeout, and on a slow network the icons drop out of
    // the prerendered HTML.
    clientBundle: {
      scan: true,
    },
    customCollections: [
      {
        prefix: 'base',
        dir: './app/assets/icons',
      },
    ],
  },

  openpanel: {
    // Baked in at build time: prerendered pages embed runtimeConfig.public.
    // Public ID (ships in the HTML), production project vinayakkulkarnidev.
    clientId:
      process.env.NUXT_PUBLIC_OPENPANEL_CLIENT_ID ??
      'cb66da23-5300-4331-9cc6-538f4c078c44',
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
      clientId:
        process.env.NUXT_PUBLIC_OPENPANEL_CLIENT_ID ??
        'cb66da23-5300-4331-9cc6-538f4c078c44',
      clientSecret: '',
    },
    // Public tracker IDs (they ship in the HTML). Production defaults,
    // overridable via NUXT_PUBLIC_GTAG_ID / NUXT_PUBLIC_PLAUSIBLE_SCRIPT_ID /
    // NUXT_PUBLIC_PLAUSIBLE_API_HOST / NUXT_PUBLIC_OPENPANEL_CLIENT_ID.
    public: {
      gtagId: 'G-T7XYEZ3ZXM',
      // Loaded as `${plausibleApiHost}/js/pa-${plausibleScriptId}.js`.
      plausibleScriptId: 'WBom9BCe9ftyS8jGOKOsy',
      plausibleApiHost: 'https://analytics.geoql.in',
      // OpenPanel's public clientId lives in runtimeConfig.public.openpanel
      // (set by the `openpanel` block above), where @openpanel/nuxt reads it.
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
      wrangler: wranglerConfig,
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
