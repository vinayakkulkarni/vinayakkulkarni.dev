export default defineNuxtConfig({
  modules: [
    // https://content.nuxtjs.org
    '@nuxt/content',
    // https://github.com/nuxt-modules/fontaine?tab=readme-ov-file#installation
    '@nuxtjs/fontaine',
    // https://github.com/nuxt/icon
    '@nuxt/icon',
    // https://github.com/nuxt-modules/plausible#setup
    '@nuxtjs/plausible',
    // https://unocss.dev/integrations/nuxt
    '@unocss/nuxt',
    // https://nuxt.com/blog/eslint-module
    '@nuxt/eslint',
    // https://nuxt.com/modules/time#nuxt-time
    'nuxt-time',
    // https://vueuse.org/guide/#nuxt
    '@vueuse/nuxt',
  ],

  devtools: {
    enabled: true,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Vinayak Kulkarni - Portfolio',
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'Portfolio site for Vinayak Kulkarni ',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        {
          name: 'keywords',
          content: 'Vinayak Kulkarni - Portfolio',
        },
        {
          name: 'msapplication-TileColor',
          content: '#ffc40d',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
      link: [
        {
          rel: 'mask-icon',
          color: '#5bbad5',
          href: '/safari-pinned-tab.svg',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
      noscript: [
        {
          innerHTML: 'This application requires JavaScript.',
        },
      ],
    },
  },
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/logo.css',
    '~/assets/css/global.css',
  ],

  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-dark',
            dark: 'github-dark',
            light: 'github-light',
          },
          preload: ['js', 'ts', 'json', 'vue'],
        },
      },
    },
    // database: {
    //   type: 'postgres',
    //   url: process.env.NUXT_DATABASE_URL as string,
    // }
  },
  runtimeConfig: {
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
  },
  routeRules: {
    '/articles/**': { isr: true },
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    renderJsonPayloads: true,
    asyncContext: true,
  },
  compatibilityDate: '2024-09-05',
  nitro: {
    rollupConfig: {
      external: ['cloudflare:sockets'],
    },
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        jsx: false,
        arrowParens: true,
        quotes: 'single',
      },
    },
  },

  fontMetrics: {
    fonts: [
      {
        fallbackName: 'Inter var',
        family: 'Inter',
        fallbacks: ['sans-serif'],
      },
      {
        fallbackName: 'Permanent Marker',
        family: 'Permanent Marker',
        fallbacks: ['sans-serif'],
      },
    ],
  },

  icon: {
    provider: 'server',
    customCollections: [
      {
        prefix: 'base',
        dir: './app/assets/icons',
      },
    ],
  },

  plausible: {
    hashMode: false,
    domain: 'vinayakkulkarni.dev',
    apiHost: 'https://analytics.geoql.in',
    autoPageviews: true,
    autoOutboundTracking: true,
  },

  unocss: {
    attributify: true,
    icons: true,
    components: false,
    shortcuts: [],
  },
});
