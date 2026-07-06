import { AUTHOR, SITE_URL } from '~/utils/author';
import type { ArticleMeta } from '~/types/article';

export function useArticleSchema(
  article: MaybeRefOrGetter<ArticleMeta | null | undefined>,
) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: computed(() => {
          const a = toValue(article);
          if (!a) return '';
          const url = `${SITE_URL}${a.path}`;

          const blogPosting = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.description,
            image: a.image ? `${SITE_URL}${a.image}` : AUTHOR.image,
            datePublished: a.date,
            dateModified: a.updatedAt ?? a.date,
            keywords: a.tags?.join(', '),
            articleSection: a.category,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            url,
            author: {
              '@type': 'Person',
              name: AUTHOR.name,
              url: AUTHOR.url,
              sameAs: AUTHOR.sameAs,
            },
            publisher: {
              '@type': 'Person',
              name: AUTHOR.name,
              url: AUTHOR.url,
            },
          };

          const breadcrumb = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Articles',
                item: `${SITE_URL}/articles`,
              },
              { '@type': 'ListItem', position: 3, name: a.title, item: url },
            ],
          };

          return JSON.stringify([blogPosting, breadcrumb]);
        }),
      },
    ],
  });
}
