import type { NuxtConfig } from '@nuxt/schema';
import { content } from './content';
import { plausible } from './plausible';
import { pwa } from './pwa';
import { windicss } from './windicss';

export const modules: NuxtConfig['modules'] = [
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://content.nuxtjs.org/
  ['@nuxt/content', content],
  // https://github.com/kevinmarrec/nuxt-pwa-module#nuxt-3-pwa
  ['@kevinmarrec/nuxt-pwa', pwa],
  // https://windicss.org/integrations/nuxt.html
  ['nuxt-windicss', windicss],
  // https://github.com/nuxt-modules/plausible#setup
  ['@nuxtjs/plausible', plausible],
];
