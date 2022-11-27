import type { NuxtConfig } from '@nuxt/schema';
import { content } from './content';
import { windicss } from './windicss';

export const modules: NuxtConfig['modules'] = [
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://content.nuxtjs.org/
  ['@nuxt/content', content],
  // https://github.com/kevinmarrec/nuxt-pwa-module#nuxt-3-pwa
  '@kevinmarrec/nuxt-pwa',
  // https://windicss.org/integrations/nuxt.html
  ['nuxt-windicss', windicss],
];
