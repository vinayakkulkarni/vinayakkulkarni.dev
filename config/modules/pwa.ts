const pwaConfig = {
  // https://pwa.nuxtjs.org/meta
  meta: {
    name: 'Vinayak Kulkarni',
    theme_color: '#5bbad5',
    author: 'Vinayak <inbox.vinayak@gmail.com>',
    lang: 'en',
  },
  // https://pwa.nuxtjs.org/manifest
  manifest: {
    name: 'Vinayak Kulkarni',
    short_name: 'VK',
    description: "Vinayak Kulkarni's portfolio website",
    categories: [
      'Vue.js',
      'Nuxt.js',
      'Frontend developer',
      "Vinayak's Portfolio",
      'JAMStack',
    ],
    theme_color: '#5bbad5',
    background_color: '#FFFFFF',
    start_url: '/?standalone=true',
    lang: 'en',
  },
};

export { pwaConfig as pwa };
