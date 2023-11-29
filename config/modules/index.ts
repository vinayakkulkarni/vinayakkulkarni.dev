import type { NuxtConfig } from '@nuxt/schema';
import { config as content } from './content';
import { config as device } from './device';
import { config as htmlValidator } from './html-validator';
import { config as plausible } from './plausible';
// import { config as pwa } from './pwa';
import { config as unocss } from './unocss';
import { config as fontMetrics } from './font-metrics';
import { config as auth } from './auth';

export const modules: NuxtConfig['modules'] = [
  // https://nuxt.com/modules/time#nuxt-time
  'nuxt-time',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://content.nuxtjs.org/
  ['@nuxt/content', content],
  // https://github.com/kevinmarrec/nuxt-pwa-module#nuxt-3-pwa
  // ['@vite-pwa/nuxt', pwa],
  // https://github.com/nuxt-modules/plausible#setup
  ['@nuxtjs/plausible', plausible],
  // https://unocss.dev/integrations/nuxt
  ['@unocss/nuxt', unocss],
  // https://github.com/nuxt-modules/device?tab=readme-ov-file#setup-for-nuxt3
  ['@nuxtjs/device', device],
  // https://html-validator.nuxtjs.org/
  ['@nuxtjs/html-validator', htmlValidator],
  // https://github.com/nuxt-modules/fontaine?tab=readme-ov-file#installation
  ['@nuxtjs/fontaine', fontMetrics],
  // https://github.com/Atinux/nuxt-auth-utils?tab=readme-ov-file#quick-setup
  ['nuxt-auth-utils', auth],
];
