import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AnalyticsHandles } from '~/types/analytics';
import { useAnalytics } from '~/composables/use-analytics';

function stubNuxtApp(handles: AnalyticsHandles) {
  const ga = handles.ga ? { $ga: handles.ga } : {};
  const plausible = handles.plausible ? { $plausible: handles.plausible } : {};
  const openpanel = handles.openpanel ? { $openpanel: handles.openpanel } : {};
  vi.stubGlobal('useNuxtApp', () => ({ ...ga, ...plausible, ...openpanel }));
}

function allHandles() {
  return {
    ga: { event: vi.fn() },
    plausible: { event: vi.fn() },
    openpanel: { track: vi.fn() },
  };
}

describe('useAnalytics', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends one track() call to GA4, Plausible and OpenPanel', () => {
    const handles = allHandles();
    stubNuxtApp(handles);
    const props = { slug: 'pmtiles-on-r2', readingMinutes: 7 };

    useAnalytics().track('article_read', props);

    expect(handles.ga.event).toHaveBeenCalledExactlyOnceWith(
      'article_read',
      props,
    );
    expect(handles.plausible.event).toHaveBeenCalledExactlyOnceWith(
      'article_read',
      props,
    );
    expect(handles.openpanel.track).toHaveBeenCalledExactlyOnceWith(
      'article_read',
      props,
    );
  });

  it('still reaches the other trackers when one plugin skipped', () => {
    const handles = allHandles();
    stubNuxtApp({ plausible: handles.plausible, openpanel: handles.openpanel });

    useAnalytics().track('outbound_click', {
      target: 'linkedin',
      location: 'footer',
    });

    expect(handles.ga.event).not.toHaveBeenCalled();
    expect(handles.plausible.event).toHaveBeenCalledOnce();
    expect(handles.openpanel.track).toHaveBeenCalledOnce();
  });

  it('sends nothing and does not throw when every tracker skipped', () => {
    stubNuxtApp({});

    expect(() =>
      useAnalytics().track('cta_click', {
        location: 'hero',
        target: 'projects',
      }),
    ).not.toThrow();
  });
});
