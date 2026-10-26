import { canonicalUrl } from '#shared/utils/canonical';

// Every page emits `<link rel="canonical">` in the sitemap's URL style.
export function useCanonicalLink() {
  const route = useRoute();
  useHead({
    link: [{ rel: 'canonical', href: () => canonicalUrl(route.path) }],
  });
}
