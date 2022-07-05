const publicRuntimeConfig = {
  appVersion: process.env.npm_package_version,
};

const css: string[] = [
  '~/assets/css/fonts.css',
  '~/assets/css/logo.css',
  '~/assets/css/global.css',
];

const plugins: any[] = [{ src: '~/plugins/click-outside', mode: 'client' }];

export { meta } from './meta';
export { modules } from './modules';
export { css, plugins, publicRuntimeConfig };
