const ORIGIN = 'https://vinayakkulkarni.dev';

export default defineEventHandler((event: H3Event) => {
  setHeader(event, 'Content-Type', 'application/linkset+json; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');
  setHeader(event, 'X-Content-Type-Options', 'nosniff');

  return {
    linkset: [
      {
        anchor: `${ORIGIN}/api/github`,
        describedby: [{ href: `${ORIGIN}/llms.txt`, type: 'text/plain' }],
      },
      {
        anchor: ORIGIN,
        'service-meta': [
          { href: `${ORIGIN}/llms.txt`, type: 'text/plain' },
          { href: `${ORIGIN}/sitemap.xml`, type: 'application/xml' },
          { href: `${ORIGIN}/rss.xml`, type: 'application/rss+xml' },
        ],
      },
    ],
  };
});
