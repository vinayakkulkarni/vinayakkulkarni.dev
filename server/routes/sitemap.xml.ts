import { readArticlesFromDisk } from '~~/server/utils/articles-from-disk';

const BASE_URL = 'https://vinayakkulkarni.dev';

const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/projects', priority: '0.8' },
  { path: '/open-source', priority: '0.8' },
  { path: '/articles', priority: '0.9' },
] as const;

export default defineEventHandler(async (event: H3Event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const articles = await readArticlesFromDisk();

  const staticUrls = STATIC_PAGES.map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <priority>${p.priority}</priority>
  </url>`,
  );

  const articleUrls = articles.map(
    (a) => `  <url>
    <loc>${BASE_URL}${a.path}</loc>
    <lastmod>${new Date(a.date).toISOString().slice(0, 10)}</lastmod>
    <priority>0.7</priority>
  </url>`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...articleUrls].join('\n')}
</urlset>`;
});
