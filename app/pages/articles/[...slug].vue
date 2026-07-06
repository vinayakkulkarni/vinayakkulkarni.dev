<script setup lang="ts">
  import { AUTHOR, SITE_URL } from '~/utils/author';
  import { formatDate } from '~/utils/date';
  import type { ArticleMeta } from '~/types/article';

  const route = useRoute();
  const slug = computed(() => {
    const parts = route.params.slug;
    return Array.isArray(parts) ? parts.join('/') : parts;
  });

  const { data: article } = await useAsyncData(`article-${slug.value}`, () =>
    queryCollection('articles').path(`/articles/${slug.value}`).first(),
  );

  if (!article.value) {
    throw createError({ statusCode: 404, message: 'Article not found' });
  }

  const { data: siblings } = await useArticles();
  const neighbors = computed(() => {
    const list = siblings.value ?? [];
    const i = list.findIndex((a) => a.path === article.value?.path);
    return {
      prev: i > 0 ? list[i - 1]! : null,
      next: i >= 0 && i < list.length - 1 ? list[i + 1]! : null,
    };
  });

  const bodyText = computed(() => extractText(article.value?.body));
  const reading = useReadingTime(bodyText);
  const publishedDate = computed(() =>
    article.value ? formatDate(article.value.date) : '',
  );

  useArticleSchema(article as Ref<ArticleMeta | null>);

  const ogImageUrl = computed(() => {
    const title = encodeURIComponent(article.value?.title ?? 'Articles');
    const desc = encodeURIComponent(article.value?.description ?? '');
    return `${SITE_URL}/og/articles/${slug.value}.png?title=${title}&description=${desc}`;
  });

  useSeoMeta({
    title: article.value?.title,
    description: article.value?.description,
    ogTitle: article.value?.title,
    ogDescription: article.value?.description,
    ogType: 'article',
    ogUrl: () => `${SITE_URL}/articles/${slug.value}`,
    ogImage: ogImageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    articleAuthor: [AUTHOR.url],
    articlePublishedTime: article.value?.date,
    articleModifiedTime: article.value?.updatedAt ?? article.value?.date,
    twitterCard: 'summary_large_image',
    twitterImage: ogImageUrl,
  });
</script>

<template>
  <main class="mx-auto max-w-3xl px-6 pt-32 pb-20">
    <NuxtLink
      to="/articles"
      class="mb-10 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon name="lucide:arrow-left" class="mr-2 size-4" />
      All articles
    </NuxtLink>

    <article v-if="article">
      <header class="mb-10 border-b border-border pb-8">
        <div
          v-if="article.category"
          class="mb-4 text-sm font-medium uppercase tracking-wider text-primary"
        >
          {{ article.category }}
        </div>

        <h1
          class="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          {{ article.title }}
        </h1>

        <p
          v-if="article.description"
          class="mt-5 text-lg leading-relaxed text-muted-foreground"
        >
          {{ article.description }}
        </p>

        <div class="mt-8 flex items-center gap-3">
          <NuxtImg
            src="/apple-touch-icon.png"
            alt=""
            width="40"
            height="40"
            class="size-10 rounded-full ring-1 ring-border"
          />
          <div class="text-sm">
            <div class="font-medium text-foreground">{{ AUTHOR.name }}</div>
            <div
              class="flex flex-wrap items-center gap-x-2 text-muted-foreground"
            >
              <time :datetime="article.date">{{ publishedDate }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ reading.label }}</span>
            </div>
          </div>
        </div>
      </header>

      <ContentRenderer
        :value="article"
        class="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:rounded-xl prose-pre:border prose-pre:border-border"
      />

      <div
        v-if="article.tags?.length"
        class="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8"
      >
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
        >
          {{ tag }}
        </span>
      </div>
    </article>

    <nav
      v-if="neighbors.prev || neighbors.next"
      class="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      <NuxtLink
        v-if="neighbors.prev"
        :to="neighbors.prev.path"
        class="group rounded-xl border border-border p-5 transition-colors hover:border-primary/40 hover:bg-accent/30"
      >
        <span class="text-xs uppercase tracking-wider text-muted-foreground">
          Previous
        </span>
        <span
          class="mt-1 block font-display font-medium text-foreground group-hover:text-primary"
        >
          {{ neighbors.prev.title }}
        </span>
      </NuxtLink>

      <NuxtLink
        v-if="neighbors.next"
        :to="neighbors.next.path"
        class="group rounded-xl border border-border p-5 text-right transition-colors hover:border-primary/40 hover:bg-accent/30 sm:col-start-2"
      >
        <span class="text-xs uppercase tracking-wider text-muted-foreground">
          Next
        </span>
        <span
          class="mt-1 block font-display font-medium text-foreground group-hover:text-primary"
        >
          {{ neighbors.next.title }}
        </span>
      </NuxtLink>
    </nav>
  </main>
</template>
