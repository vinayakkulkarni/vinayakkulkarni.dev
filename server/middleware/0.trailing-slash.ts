// `/x/` → 308 `/x`. Runs before agent-ready (middleware order is by file name)
// so no slash variant is ever served as a 200 duplicate. The asset layer can
// only answer with a 307, so wrangler routes every slash path here first
// (`run_worker_first: '/*/'` in nuxt.config.ts).
import type { H3Event } from 'h3';
import { trailingSlashRedirect } from '#shared/utils/canonical';

export default defineEventHandler((event: H3Event) => {
  const url = getRequestURL(event);
  const location = trailingSlashRedirect(url.pathname, url.search);
  if (location) return sendRedirect(event, location, 308);
});
