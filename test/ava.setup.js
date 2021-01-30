import hooks from 'require-extension-hooks';
import { config } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('browser-env')();

config.productionTip = false;

// https://github.com/nuxt/create-nuxt-app/issues/180#issuecomment-463069941
window.Date = global.Date = Date;

hooks('vue').plugin('vue').push();
hooks(['vue', 'js'])
  .exclude(({ filename }) => filename.match(/\/node_modules\//))
  .plugin('babel')
  .push();
