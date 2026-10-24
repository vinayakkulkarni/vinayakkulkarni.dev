import type { PlausibleHandle } from '~/types/analytics';
import { isAutomationBrowser } from '~/utils/automation-browser';

export default defineNuxtPlugin(() => {
  const { plausibleScriptId, plausibleApiHost } = useRuntimeConfig().public;
  const plausible: PlausibleHandle | undefined =
    plausibleScriptId && plausibleApiHost && !isAutomationBrowser()
      ? bootPlausible(plausibleApiHost, plausibleScriptId)
      : undefined;

  return { provide: { plausible } };
});

/**
 * The Oct-2025 `pa-*.js` tracker only boots if `window.plausible.o` is set
 * when it loads (its tail runs `plausible.o && S(plausible.o)`). So this is
 * Plausible's official snippet: a queue stub with `q` and init options `o`
 * set BEFORE the async script arrives. Loading from apiHost lets the script
 * derive its `/api/event` endpoint. `@nuxtjs/plausible` never sets `.o`.
 */
function bootPlausible(apiHost: string, scriptId: string): PlausibleHandle {
  const queue: unknown[][] = [];
  const initOptions: Record<string, unknown> = {
    autoCapturePageviews: true,
    captureOnLocalhost: import.meta.dev,
  };
  const stub = Object.assign(
    (...args: unknown[]) => {
      queue.push(args);
    },
    {
      q: queue,
      o: initOptions,
      init: (options?: Record<string, unknown>) => {
        stub.o = { ...options };
      },
    },
  );
  Object.assign(window, { plausible: stub });

  useHead({
    script: [{ src: `${apiHost}/js/pa-${scriptId}.js`, async: true }],
  });

  // The loaded script replaces window.plausible, so look it up per call.
  return {
    event: (name, props) => window.plausible(name, { props }),
  };
}
