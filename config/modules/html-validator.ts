import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['htmlValidator'] = {
  failOnError: false,
  options: {
    rules: {
      'wcag/h37': 'warn',
      'element-permitted-content': 'warn',
      'element-required-attributes': 'warn',
    },
  },
};
