import type { ShallowRef } from 'vue';
import { useAnalytics } from './use-analytics';

/**
 * Sends `article_read` once, when the end-of-article marker scrolls into view.
 * The marker sits right after the article body, so the event means the reader
 * reached the end, not only that the page loaded.
 */
export function useArticleReadTracking(
  marker: Readonly<ShallowRef<HTMLElement | null>>,
  slug: MaybeRefOrGetter<string>,
  readingMinutes: MaybeRefOrGetter<number>,
) {
  const { track } = useAnalytics();
  const sent = ref(false);

  const { stop } = useIntersectionObserver(marker, ([entry]) => {
    if (sent.value || !entry?.isIntersecting) return;
    sent.value = true;
    track('article_read', {
      slug: toValue(slug),
      readingMinutes: toValue(readingMinutes),
    });
    stop();
  });

  return { sent, stop };
}
