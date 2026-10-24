import type { GtagHandle } from '~/types/analytics';
import { isAutomationBrowser } from '~/utils/automation-browser';

export default defineNuxtPlugin(() => {
  const gtagId = useRuntimeConfig().public.gtagId;
  const ga: GtagHandle | undefined =
    gtagId && !isAutomationBrowser() ? createGtag(gtagId) : undefined;

  return { provide: { ga } };
});

function createGtag(id: string): GtagHandle {
  const { proxy } = useScriptGoogleAnalytics({ id });
  return {
    event: (name, params) => proxy.gtag('event', name, params),
  };
}
