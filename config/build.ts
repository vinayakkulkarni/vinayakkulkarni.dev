import { NuxtOptionsBuild } from '@nuxt/types/config/build';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';

const build: NuxtOptionsBuild = {
  corejs: 3,
  extend(config: NuxtRuntimeConfig, { isDev, isClient }) {
    config.node = {
      fs: 'empty',
    };
    if (isDev && isClient) {
      config.devtool = 'source-map';
    }
  },
  terser: {
    sourceMap: true,
  },
};

export { build };
