import type { WebMcpModelContext, WebMcpTool } from '~/types/webmcp';

const listArticles: WebMcpTool = {
  name: 'list_articles',
  description: 'List published articles on vinayakkulkarni.dev.',
  inputSchema: { type: 'object', properties: {} },
  execute: async () => $fetch('/api/articles'),
};

const searchArticles: WebMcpTool = {
  name: 'search_articles',
  description:
    'Search published articles by title, description, or tag. Returns matching articles.',
  inputSchema: {
    type: 'object',
    properties: { query: { type: 'string' } },
    required: ['query'],
  },
  execute: async (input) => {
    const articles =
      await $fetch<{ title: string; description: string; tags: string[] }[]>(
        '/api/articles',
      );
    const q = String(input.query ?? '').toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  },
};

const getArticleMarkdown: WebMcpTool = {
  name: 'get_article_markdown',
  description:
    'Fetch the full markdown source of an article by its slug (the path under /articles/).',
  inputSchema: {
    type: 'object',
    properties: { slug: { type: 'string' } },
    required: ['slug'],
  },
  execute: async (input) => {
    const slug = String(input.slug ?? '').replace(/^\/+|\/+$/g, '');
    if (!slug) throw new Error('Article slug is required.');
    return await $fetch(`/articles/${slug}`, {
      headers: { Accept: 'text/markdown' },
    });
  },
};

export default defineNuxtPlugin(() => {
  const nav = navigator as Navigator & { modelContext?: WebMcpModelContext };
  const mc = nav.modelContext;
  if (!mc) return;

  const tools = [listArticles, searchArticles, getArticleMarkdown];
  if (typeof mc.registerTool === 'function') {
    for (const tool of tools) {
      mc.registerTool(tool, { signal: new AbortController().signal });
    }
  } else if (typeof mc.provideContext === 'function') {
    mc.provideContext({ tools });
  }
});
