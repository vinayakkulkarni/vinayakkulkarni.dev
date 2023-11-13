import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['content'] = {
  highlight: {
    preload: ['js', 'ts', 'json', 'vue'],
    theme: {
      default: 'light-plus',
      dark: 'github-dark',
    },
  },
};
