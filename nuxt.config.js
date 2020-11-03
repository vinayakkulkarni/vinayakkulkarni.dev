export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/guides/features/rendering-modes#spa
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Vinayak Kulkarni - Portfolio',
      },
      { name: 'msapplication-TileColor', content: '#ffc40d' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    noscript: [{ innerHTML: 'This application requires JavaScript.' }],
    link: [
      { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    script: [
      {
        hid: 'thesemetrics',
        src: 'https://unpkg.com/thesemetrics@latest',
        async: true,
        type: 'text/javascript',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/styles/fonts.css', lang: 'css' },
    { src: '~/assets/styles/logo.css', lang: 'css' },
    { src: '~/assets/styles/global.css', lang: 'css' },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vuescroll', mode: 'client' },
    { src: '~/plugins/composition-api', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
    // https://typescript.nuxtjs.org/guide/setup.html#configuration
    '@nuxt/typescript-build',
  ],
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: true,
    config: {},
  },
  colorMode: {
    // remove -mode suffix for Tailwind Dark mode support
    classSuffix: '',
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://content.nuxtjs.org/
    '@nuxt/content',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: '/',
  },
  /**
   * PWA module configuration
   */
  pwa: {
    manifest: {
      name: 'Vinayak Kulkarni',
      short_name: 'VK',
      description: "Vinayak Kulkarni's portfolio website",
      theme_color: '#5bbad5',
      background_color: '#FFFFFF',
    },
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-dark.css',
      },
    },
  },
  /*
   ** Fallback for Netlify
   */
  generate: {
    fallback: true,
  },
};
