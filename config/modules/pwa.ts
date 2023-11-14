import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['pwa'] = {
  registerType: 'prompt',
  manifest: {
    name: 'Vinayak Kulkarni - Portfolio',
    short_name: 'VK',
    theme_color: '#ffffff',
    background_color: '#c3c3c3',
    display: 'standalone',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  },
  client: {
    installPrompt: true,
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: 'module',
  },
};
