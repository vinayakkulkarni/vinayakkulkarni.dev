import { content } from './content';
import { windicss } from './windicss';

export const modules: any = [
  // https://github.com/nuxt-community/eslint-module
  '@nuxtjs/eslint-module',
  // https://go.nuxtjs.dev/stylelint
  '@nuxtjs/stylelint-module',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://content.nuxtjs.org/
  ['@nuxt/content', content],
  // https://github.com/kevinmarrec/nuxt-pwa-module#nuxt-3-pwa
  '@kevinmarrec/nuxt-pwa',
  // https://windicss.org/integrations/nuxt.html
  ['nuxt-windicss', windicss],
];
