import { isAutomationBrowser } from '~/utils/automation-browser';

/**
 * `@openpanel/nuxt` builds its client from serializable runtime config, so it
 * cannot skip automation browsers by itself. This runs right after it and
 * drops every payload on those browsers. The first screen view is sent on a
 * `setTimeout(0)`, so the filter is in place before anything goes out.
 */
export default defineNuxtPlugin({
  name: 'openpanel-automation-guard',
  dependsOn: ['openpanel'],
  setup(nuxtApp) {
    if (!isAutomationBrowser()) return;
    nuxtApp.$openpanel.options.filter = () => false;
  },
});
