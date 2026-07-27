import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event: H3Event) => {
  setHeader(event, 'Content-Type', 'application/json; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const articles = await queryCollection(event, 'articles')
    .where('status', '=', 'published')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date', 'tags')
    .all();

  return articles.map((a) => ({
    title: a.title,
    description: a.description,
    date: a.date,
    tags: a.tags ?? [],
    path: a.path,
  }));
});
