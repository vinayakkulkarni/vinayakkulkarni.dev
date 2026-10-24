import type { AnalyticsEvent, AnalyticsEventMap } from '~/types/analytics';

/**
 * One `track()` call fans out to every tracker: GA4 (`$ga`), Plausible
 * (`$plausible`) and OpenPanel (`$openpanel`). A handle is absent when its
 * plugin skipped (automation browser, missing ID), so each call is optional.
 */
export function useAnalytics() {
  const nuxtApp = useNuxtApp();

  function track<E extends AnalyticsEvent>(
    event: E,
    props: AnalyticsEventMap[E],
  ) {
    nuxtApp.$ga?.event(event, props);
    nuxtApp.$plausible?.event(event, props);
    nuxtApp.$openpanel?.track(event, props);
  }

  return { track };
}
