<script setup lang="ts">
import type { GitHubResponse } from "~/types/github";

const colorMode = useColorMode();

const { data, status } = await useFetch<GitHubResponse>("/api/github", {
  key: "github-repos",
});

const FEATURED_REPOS = ["tileserver-rs", "v-maplibre"];

const pinnedRepos = computed(() => {
  if (!data.value?.pinned) return [];
  const pinned = [...data.value.pinned];
  const featured = pinned.filter((r) => FEATURED_REPOS.includes(r.name));
  const rest = pinned.filter((r) => !FEATURED_REPOS.includes(r.name));
  return [...featured, ...rest];
});

const repos = computed(() => data.value?.repos ?? []);

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}
</script>

<template>
  <section id="projects" class="relative overflow-hidden pt-40 pb-32">
    <div class="pointer-events-none absolute inset-0">
      <ClientOnly>
        <div v-if="colorMode.value === 'dark'" class="size-full opacity-30">
          <Waves
            line-color="rgba(120, 119, 198, 0.3)"
            :wave-speed-x="0.015"
            :wave-speed-y="0.005"
            :wave-amp-x="40"
            :wave-amp-y="20"
            :x-gap="12"
            :y-gap="36"
          />
        </div>
        <div v-else class="size-full opacity-[0.06]">
          <Squares
            direction="diagonal"
            :speed="0.3"
            :square-size="48"
            border-color="currentColor"
            hover-fill-color="currentColor"
          />
        </div>
      </ClientOnly>
    </div>

    <div class="relative mx-auto max-w-6xl px-6">
      <FadeContent :duration="0.8" blur>
        <GradientText
          text="Projects"
          :colors="['#7877c6', '#40ffaa', '#4079ff', '#7877c6']"
          :speed="6"
          class="mb-4 text-sm font-semibold uppercase tracking-widest"
        />
      </FadeContent>

      <SplitText
        text="What I'm Building"
        by="words"
        :delay="80"
        :duration="0.5"
        class="mb-16 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
      />

      <div v-if="status === 'pending'" class="flex justify-center py-20">
        <Icon
          name="lucide:loader-2"
          class="size-8 animate-spin text-muted-foreground"
        />
      </div>

      <template v-else-if="data">
        <!-- Pinned Repos -->
        <div class="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FadeContent
            v-for="(repo, index) in pinnedRepos"
            :key="repo.name"
            :delay="index * 0.1"
            :duration="0.6"
            blur
          >
            <a
              :href="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block h-full"
            >
              <SpotlightCard
                spotlight-color="rgba(120, 119, 198, 0.3)"
                :border-radius="16"
                :glow-intensity="0.15"
                class="h-full p-5"
              >
                <div class="flex h-full flex-col justify-between gap-3">
                  <div>
                    <div class="mb-2 flex items-center gap-2">
                      <Icon
                        name="lucide:github"
                        class="size-4 text-muted-foreground"
                      />
                      <span class="font-semibold text-foreground">
                        {{ repo.name }}
                      </span>
                    </div>
                    <p
                      v-if="repo.description"
                      class="line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      {{ repo.description }}
                    </p>
                  </div>
                  <div
                    class="flex items-center gap-3 text-xs text-muted-foreground"
                  >
                    <span
                      v-if="repo.language"
                      class="flex items-center gap-1.5"
                    >
                      <span
                        class="size-2.5 rounded-full"
                        :style="{
                          backgroundColor: repo.languageColor ?? 'var(--muted)',
                        }"
                      />
                      {{ repo.language }}
                    </span>
                    <span v-if="repo.stars > 0" class="flex items-center gap-1">
                      <Icon name="lucide:star" class="size-3" />
                      {{ formatStars(repo.stars) }}
                    </span>
                    <span v-if="repo.forks > 0" class="flex items-center gap-1">
                      <Icon name="lucide:git-fork" class="size-3" />
                      {{ repo.forks }}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </FadeContent>
        </div>

        <FadeContent :duration="0.8" :delay="0.2" blur>
          <h3
            class="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            All Repositories
          </h3>
        </FadeContent>

        <div class="space-y-1">
          <FadeContent
            v-for="(repo, index) in repos"
            :key="repo.name"
            :delay="Math.min(index * 0.03, 0.6)"
            :duration="0.5"
            blur
          >
            <a
              :href="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-accent/50"
            >
              <span
                class="size-2.5 shrink-0 rounded-full"
                :style="{
                  backgroundColor: repo.languageColor ?? 'var(--muted)',
                }"
              />

              <span
                class="min-w-0 flex-1 truncate font-medium text-foreground group-hover:text-primary"
              >
                {{ repo.name }}
              </span>

              <span
                v-if="repo.description"
                class="hidden min-w-0 max-w-sm flex-1 truncate text-sm text-muted-foreground lg:block"
              >
                {{ repo.description }}
              </span>

              <span
                v-if="repo.stars > 0"
                class="flex shrink-0 items-center gap-1 text-xs text-muted-foreground"
              >
                <Icon name="lucide:star" class="size-3" />
                {{ formatStars(repo.stars) }}
              </span>

              <span
                v-if="repo.language"
                class="hidden shrink-0 text-xs text-muted-foreground sm:block"
              >
                {{ repo.language }}
              </span>

              <span class="shrink-0 text-xs text-muted-foreground/60">
                {{ formatDate(repo.updatedAt) }}
              </span>
            </a>
          </FadeContent>
        </div>
      </template>

      <FadeContent v-else :duration="0.8" blur>
        <p class="text-center text-muted-foreground">
          Unable to load repositories.
        </p>
      </FadeContent>
    </div>
  </section>
</template>
