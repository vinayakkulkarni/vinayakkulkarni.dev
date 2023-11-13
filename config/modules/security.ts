import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['security'] = {
  enabled: process.env.NODE_ENV === 'production',
  nonce: true,
  headers: {
    contentSecurityPolicy: {
      'base-uri': ["'self'"],
      'font-src': ["'self'", 'https:', 'data:'],
      'form-action': ["'self'"],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'object-src': ["'none'"],
      'script-src': ["'self'", "'unsafe-inline'"],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'upgrade-insecure-requests': true,
    },
  },
  hidePoweredBy: true,
};
