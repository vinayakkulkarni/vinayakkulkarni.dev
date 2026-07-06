import type { ArticleMeta } from '~/types/article';

const FIELDS = [
  'path',
  'title',
  'description',
  'date',
  'updatedAt',
  'category',
  'tags',
  'image',
  'status',
] as const;

export function useArticles(limit?: number) {
  return useAsyncData(
    limit ? `articles-${limit}` : 'articles-all',
    () => {
      const q = queryCollection('articles')
        .where('status', '=', 'published')
        .order('date', 'DESC')
        .select(...FIELDS);
      return (limit ? q.limit(limit) : q).all();
    },
    { transform: (rows) => rows as unknown as ArticleMeta[] },
  );
}
