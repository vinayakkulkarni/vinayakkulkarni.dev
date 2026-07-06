<script setup lang="ts">
  import { AUTHOR, SITE_URL } from '~/utils/author';

  const { data: articles } = await useArticles();

  const featured = computed(() => articles.value?.[0] ?? null);
  const rest = computed(() => articles.value?.slice(1) ?? []);

  const description =
    'Writing on GIS, MapLibre, vector tiles, PMTiles, and building with Vue.js, from an engineer taking geospatial products from zero to one.';

  useSeoMeta({
    title: 'Articles - Vinayak Kulkarni',
    description,
    ogTitle: 'Articles - Vinayak Kulkarni',
    ogDescription: description,
    ogUrl: `${SITE_URL}/articles`,
    ogImage: `${SITE_URL}/og/articles.png?title=Articles&description=${encodeURIComponent(description)}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterImage: `${SITE_URL}/og/articles.png?title=Articles&description=${encodeURIComponent(description)}`,
  });

  useHead({
    link: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Vinayak Kulkarni - Articles',
        href: `${SITE_URL}/rss.xml`,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: computed(() =>
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Vinayak Kulkarni - Articles',
            description,
            url: `${SITE_URL}/articles`,
            author: {
              '@type': 'Person',
              name: AUTHOR.name,
              url: AUTHOR.url,
            },
            blogPost: (articles.value ?? []).map((a) => ({
              '@type': 'BlogPosting',
              headline: a.title,
              description: a.description,
              datePublished: a.date,
              url: `${SITE_URL}${a.path}`,
            })),
          }),
        ),
      },
    ],
  });
</script>

<template>
  <main class="mx-auto max-w-4xl px-6 pt-32 pb-24">
    <header class="mb-16 border-b border-border pb-12">
      <h1
        class="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
      >
        Writing on GIS, maps, and shipping from zero to one.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {{ description }}
      </p>
      <a
        :href="`${SITE_URL}/rss.xml`"
        class="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="lucide:rss" class="size-4" />
        Subscribe via RSS
      </a>
    </header>

    <div v-if="featured">
      <ArticleCard :article="featured" featured />
      <ArticleCard v-for="a in rest" :key="a.path" :article="a" />
    </div>

    <div v-else class="py-20 text-center">
      <p class="text-muted-foreground">No articles published yet.</p>
    </div>
  </main>
</template>
