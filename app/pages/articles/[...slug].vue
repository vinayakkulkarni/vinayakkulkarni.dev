<script setup lang="ts">
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

  useSeoMeta({
    title: article.value?.title,
    description: article.value?.description,
  });
</script>

<template>
  <main class="mx-auto max-w-3xl px-6 pt-32 pb-20">
    <NuxtLink
      to="/articles"
      class="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon name="lucide:arrow-left" class="mr-2 size-4" />
      Back to articles
    </NuxtLink>

    <article v-if="article">
      <h1 class="mb-4 text-3xl font-bold tracking-tight text-foreground">
        {{ article.title }}
      </h1>
      <p v-if="article.description" class="mb-8 text-lg text-muted-foreground">
        {{ article.description }}
      </p>
      <ContentRenderer
        :value="article"
        class="prose prose-neutral max-w-none dark:prose-invert"
      />
    </article>
  </main>
</template>
