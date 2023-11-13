import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['pwa'] = {
  workbox: {
    enabled: process.env.NODE_ENV === 'production',
  },
};
