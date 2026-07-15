// @nuxt/content 3.x expects h3 v1 events on the SSR context: queryCollection
// reads event.$fetch and event.node.req.headers, which nitro v3's h3 v2
// events don't have (nuxt/content#3772). Restore both on the request's own
// event right when the Nuxt app is created — this runs for SSR page renders
// AND prerender, unlike nitro request hooks which don't wrap the renderer.
// Remove when @nuxt/content ships nitro v3 support.
export default defineNuxtPlugin((nuxtApp) => {
  const event = nuxtApp.ssrContext?.event as
    | {
        $fetch?: unknown;
        node?: unknown;
        req?: Request;
      }
    | undefined;
  if (!event) return;

  if (!event.$fetch) {
    event.$fetch = useRequestFetch();
  }

  if (!event.node) {
    const headers: Record<string, string> = {};
    event.req?.headers?.forEach((value, key) => {
      headers[key] = value;
    });
    event.node = { req: { headers }, res: {} };
  }
});
