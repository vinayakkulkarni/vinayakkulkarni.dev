const WORDS_PER_MINUTE = 220;

export function useReadingTime(text: MaybeRefOrGetter<string | undefined>) {
  return computed(() => {
    const raw = toValue(text) ?? '';
    const words = raw.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
    return { words, minutes, label: `${minutes} min read` };
  });
}
