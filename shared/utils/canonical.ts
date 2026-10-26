// One URL style for the whole site: no trailing slash (the sitemap style).
// The root is the only path that keeps its slash, because `https://host` and
// `https://host/` are the same request.
export const SITE_ORIGIN = 'https://vinayakkulkarni.dev';

export function canonicalPath(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function canonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${canonicalPath(path)}`;
}

// Location for a 308 from `/x/` to `/x`, keeping the query string. Returns
// null when the path is already canonical.
export function trailingSlashRedirect(
  pathname: string,
  search: string,
): string | null {
  const target = canonicalPath(pathname);
  if (target === pathname) return null;
  // A leading `//` would make the Location protocol-relative (open redirect).
  const safe = target.replace(/^\/{2,}/, '/');
  return `${safe}${search}`;
}
