import { content } from './content';
import { windicss } from './windicss';

export const modules: any = [
  '@nuxtjs/eslint-module',
  // https://go.nuxtjs.dev/stylelint
  '@nuxtjs/stylelint-module',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // Doc: https://color-mode.nuxtjs.org/
  '@nuxtjs/color-mode',
  // Doc: https://content.nuxtjs.org/
  ['@nuxt/content', content],
  // https://windicss.org/integrations/nuxt.html
  ['nuxt-windicss', windicss],
];
