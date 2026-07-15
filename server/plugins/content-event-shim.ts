// @nuxt/content 3.x ships h3 v1 handlers (readBody reads event.node.req),
// but nitro v3 produces h3 v2 events without .node (nuxt/content#3772).
// Every request — including queryCollection's serverFetch sub-requests to
// /__nuxt_content/** — passes this hook; give those events an h3-v1-shaped
// node stub carrying headers and the raw body so readBody can parse the
// query. Remove when @nuxt/content ships nitro v3 support.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const e = event as typeof event & {
      node?: unknown;
      web?: unknown;
      req?: Request;
    };

    if (!e.node) {
      const headers: Record<string, string> = {};
      e.req?.headers?.forEach((value, key) => {
        headers[key] = value;
      });
      Object.defineProperty(e, 'node', {
        value: { req: { headers }, res: {} },
        configurable: true,
      });
    }

    if (!e.web) {
      Object.defineProperty(e, 'web', {
        value: { request: e.req },
        configurable: true,
      });
    }
  });
});
