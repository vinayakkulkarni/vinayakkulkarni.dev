import type { H3Event } from 'h3';
// Conservative AI crawlers (Google-Extended, Applebot-Extended) need an explicit
// allow separate from `User-agent: *`, or they skip the site for AI answers.
const aiCrawlers = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
  'cohere-ai',
];

export default defineEventHandler((event: H3Event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /api/', ''];

  for (const bot of aiCrawlers) {
    lines.push(`User-agent: ${bot}`, 'Allow: /', 'Disallow: /api/', '');
  }

  lines.push(
    'Sitemap: https://vinayakkulkarni.dev/sitemap.xml',
    'Sitemap: https://vinayakkulkarni.dev/llms.txt',
    '',
  );
  return lines.join('\n');
});
