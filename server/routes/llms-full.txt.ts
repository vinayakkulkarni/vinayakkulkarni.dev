import type { H3Event } from 'h3';
const PRIORITY_ROUTES = [
  '/',
  '/about',
  '/projects',
  '/open-source',
  '/articles',
];

function htmlToPlaintext(html: string): string {
  // Strip comments BEFORE scripts: a literal "<script>" token inside an HTML
  // comment would otherwise make the greedy script regex swallow the body.
  // Then scope to <main> so head/end-of-body scripts can't bleed in.
  let s = html.replace(/<!--[\s\S]*?-->/g, ' ');
  const main = s.match(/<main[\s\S]*?<\/main>/i);
  if (main) s = main[0];
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export default defineEventHandler(async (event: H3Event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const origin = getRequestURL(event).origin;
  const sections = await Promise.all(
    PRIORITY_ROUTES.map(async (path) => {
      const html = await $fetch<string>(`${origin}${path}`, {
        headers: { Accept: 'text/html' },
      }).catch(() => '');
      const plain = htmlToPlaintext(html);
      return plain ? `# ${origin}${path}\n\n${plain}\n` : '';
    }),
  );

  return `# Vinayak Kulkarni — full content for LLMs\n\nGenerated: ${new Date().toISOString()}\n\n${sections.filter(Boolean).join('\n---\n\n')}`;
});
