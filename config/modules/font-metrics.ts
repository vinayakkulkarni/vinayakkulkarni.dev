import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['fontMetrics'] = {
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
};
