<script setup lang="ts">
  const { data: articles } = await useAsyncData('articles', () =>
    queryCollection('articles').order('date', 'DESC').limit(6).all(),
  );
</script>

<template>
  <section id="articles" class="relative overflow-hidden pt-40 pb-16">
    <!-- Threads Background — capped height to prevent bleed into footer -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 max-h-[600px] opacity-25"
    >
      <ClientOnly>
        <Threads
          :color="[0.25, 0.47, 1]"
          :amplitude="0.8"
          :distance="0.3"
          class="h-[600px]"
        />
      </ClientOnly>
    </div>

    <div class="relative mx-auto max-w-6xl px-6">
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
        class="mb-16 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
      />

      <div v-if="articles?.length" class="space-y-6">
        <FadeContent
          v-for="(article, index) in articles"
          :key="article.path"
          :delay="index * 0.1"
          :duration="0.8"
          blur
        >
          <NuxtLink
            :to="article.path"
            class="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-accent/50"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3
                  class="mb-2 text-lg font-semibold text-foreground group-hover:text-primary"
                >
                  {{ article.title }}
                </h3>
                <p
                  v-if="article.description"
                  class="text-sm text-muted-foreground"
                >
                  {{ article.description }}
                </p>
              </div>
              <Icon
                name="lucide:arrow-right"
                class="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
              />
            </div>
          </NuxtLink>
        </FadeContent>
      </div>

      <FadeContent v-else :duration="0.8" blur>
        <p class="text-center text-muted-foreground">Articles coming soon.</p>
      </FadeContent>
    </div>
  </section>
</template>
