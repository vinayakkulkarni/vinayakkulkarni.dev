// Bridge for @nuxt/content 3.x on nitro v3 (nuxt/content#3772): its runtime
// still imports from 'nitropack/runtime', which nitro v3 removed. Re-export
// the same APIs from their new v3 subpaths under the old specifier (wired
// via nitro.alias in nuxt.config). Remove when @nuxt/content ships native
// nitro v3 support.
export { useStorage } from 'nitro/storage';
export { useNitroApp, getRouteRules } from 'nitro/app';
export { useRuntimeConfig } from 'nitro/runtime-config';
export { definePlugin as defineNitroPlugin } from 'nitro';
export { defineCachedFunction, defineCachedHandler } from 'nitro/cache';
