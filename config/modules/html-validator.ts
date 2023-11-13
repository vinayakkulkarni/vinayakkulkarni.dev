import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['htmlValidator'] = {
  failOnError: true,
  options: {
    rules: {
      'wcag/h37': 'warn',
      'element-permitted-content': 'warn',
      'element-required-attributes': 'warn',
    },
  },
};
