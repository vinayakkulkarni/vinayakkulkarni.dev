// RFC 8288 Link headers + Accept: text/markdown content negotiation.
// - Link advertises machine-readable resources (llms.txt, sitemap, api-catalog)
//   on every HTML response; skipped on /api/** per security-hardening rule.
// - Markdown negotiation: articles serve the source .md (full fidelity),
//   static pages convert prerendered HTML via html-to-markdown.
// The Accept: text/html subrequest re-enters this middleware but skips the
// markdown branch — that guard is load-bearing (prevents a self-fetch loop).
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { htmlToMarkdown } from '~~/server/utils/html-to-markdown';

const ORIGIN = 'https://vinayakkulkarni.dev';

const LINK_HEADER = [
  `<${ORIGIN}/llms.txt>; rel="llms"; type="text/plain"`,
  `<${ORIGIN}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
  `<${ORIGIN}/.well-known/api-catalog>; rel="api-catalog"`,
].join(', ');

const STATIC_MARKDOWN_ROUTES = new Set([
  '/',
  '/about',
  '/projects',
  '/open-source',
  '/articles',
]);

function stripFrontmatter(md: string): string {
  const m = md.match(/^---\n[\s\S]*?\n---\n/);
  return m ? md.slice(m[0].length) : md;
}

export default defineEventHandler(async (event: H3Event) => {
  const path = getRequestURL(event).pathname;

  if (!path.startsWith('/api/')) {
    appendHeader(event, 'Link', LINK_HEADER);
  }

  if (event.method !== 'GET') return;

  const accept = getHeader(event, 'accept') ?? '';
  if (!accept.includes('text/markdown')) return;

  // Articles: serve the source markdown from disk (code blocks stay intact).
  const articleMatch = path.match(/^\/articles\/([a-z0-9-]+)\/?$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    try {
      const dir = join(process.cwd(), 'content/articles');
      const { readdir } = await import('node:fs/promises');
      const files = await readdir(dir);
      const file = files.find((f) => f.endsWith('.md') && f.replace(/^\d+\./, '').replace(/\.md$/, '') === slug);
      if (!file) return;
      const raw = await readFile(join(dir, file), 'utf-8');
      setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
      setHeader(event, 'Vary', 'Accept');
      return stripFrontmatter(raw).trim();
    } catch {
      return;
    }
  }

  // Static pages: convert prerendered HTML.
  if (!STATIC_MARKDOWN_ROUTES.has(path)) return;

  const html = await event
    .$fetch<string>(path, { headers: { Accept: 'text/html' } })
    .catch(() => '');
  const markdown = htmlToMarkdown(html);
  if (!markdown) return;

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
  setHeader(event, 'Vary', 'Accept');
  return `# ${path}\n\n${markdown}\n`;
});
