import { queryCollection } from '@nuxt/content/server';

const BASE_URL = 'https://vinayakkulkarni.dev';
const AUTHOR_NAME = 'Vinayak Kulkarni';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default defineEventHandler(async (event: H3Event) => {
  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const articles = await queryCollection(event, 'articles')
    .where('status', '=', 'published')
    .order('date', 'DESC')
    .all();

  const items = articles
    .map((a) => {
      const url = `${BASE_URL}${a.path}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.description ?? '')}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>
${(a.tags ?? []).map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const lastBuild = articles[0]
    ? new Date(articles[0].date).toUTCString()
    : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vinayak Kulkarni - Articles</title>
    <link>${BASE_URL}/articles</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Writing on GIS, MapLibre, vector tiles, PMTiles, and building with Vue.js.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;
});
