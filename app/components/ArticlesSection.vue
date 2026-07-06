<script setup lang="ts">
  const { data: articles } = await useArticles(4);
</script>

<template>
  <section id="articles" class="relative overflow-hidden pt-40 pb-16">
    <div
      class="threads-wrap pointer-events-none absolute inset-x-0 top-0 opacity-25"
    >
      <ClientOnly>
        <Threads
          :color="[0.25, 0.47, 1]"
          :amplitude="0.8"
          :distance="0.3"
          class="threads-canvas"
        />
      </ClientOnly>
    </div>

    <div class="relative mx-auto max-w-4xl px-6">
      <FadeContent :duration="0.8" blur>
        <GradientText
          text="Articles"
          :colors="['#4079ff', '#40ffaa', '#7877c6', '#4079ff']"
          :speed="6"
          class="mb-4 text-sm font-semibold uppercase tracking-widest"
        />
      </FadeContent>

      <SplitText
        text="Writing & Thinking"
        by="words"
        :delay="80"
        :duration="0.5"
        class="mb-12 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl"
      />

      <div v-if="articles?.length">
        <FadeContent
          v-for="(article, index) in articles"
          :key="article.path"
          :delay="index * 0.08"
          :duration="0.7"
          blur
        >
          <ArticleCard :article="article" />
        </FadeContent>

        <FadeContent :delay="0.3" :duration="0.7" blur>
          <NuxtLink
            to="/articles"
            class="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Read all articles
            <Icon
              name="lucide:arrow-right"
              class="size-4 transition-transform group-hover:translate-x-1"
            />
          </NuxtLink>
        </FadeContent>
      </div>

      <FadeContent v-else :duration="0.8" blur>
        <p class="text-muted-foreground">Articles coming soon.</p>
      </FadeContent>
    </div>
  </section>
</template>

<style scoped>
  .threads-wrap {
    max-height: 600px;
  }

  .threads-canvas {
    height: 600px;
  }
</style>
