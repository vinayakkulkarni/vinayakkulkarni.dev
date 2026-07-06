<script setup lang="ts">
  import type { ArticleMeta } from '~/types/article';
  import { formatDate } from '~/utils/date';

  const props = defineProps<{
    article: ArticleMeta;
    featured?: boolean;
  }>();

  const formattedDate = computed(() => formatDate(props.article.date));
</script>

<template>
  <NuxtLink
    :to="article.path"
    class="group relative block border-t border-border py-8 transition-colors first:border-t-0 hover:bg-accent/30 sm:py-10"
  >
    <div
      class="flex flex-col gap-3 px-1 sm:px-4"
      :class="featured ? 'lg:gap-4' : ''"
    >
      <div
        class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
      >
        <span
          v-if="article.category"
          class="font-medium uppercase tracking-wider text-primary/80"
        >
          {{ article.category }}
        </span>
        <time :datetime="article.date">{{ formattedDate }}</time>
      </div>

      <h3
        class="font-display font-semibold text-foreground transition-colors group-hover:text-primary"
        :class="
          featured
            ? 'text-2xl leading-tight sm:text-3xl lg:text-4xl'
            : 'text-xl leading-snug sm:text-2xl'
        "
      >
        {{ article.title }}
      </h3>

      <p
        v-if="article.description"
        class="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {{ article.description }}
      </p>

      <div
        v-if="article.tags?.length"
        class="mt-1 flex flex-wrap items-center gap-2"
      >
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <Icon
      name="lucide:arrow-up-right"
      class="absolute right-1 top-8 size-5 text-muted-foreground/50 transition-all group-hover:right-0 group-hover:text-primary sm:right-4 sm:top-10"
    />
  </NuxtLink>
</template>
