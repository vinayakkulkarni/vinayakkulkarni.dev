import type { Configuration } from 'webpack';

// Build Configuration (https://go.nuxtjs.dev/config-build)
export const build = {
  corejs: '3',
  terser: {
    cache: true,
    parallel: true,
    sourceMap: true,
    terserOptions: {
      ecma: 2020,
      mangle: true,
      module: true,
      sourceMap: true,
    },
  },
  extend(config: Configuration) {
    config.devtool = 'source-map';
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
  },
};
