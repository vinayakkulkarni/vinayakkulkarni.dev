<script setup lang="ts">
  import type { LiveProject, ProjectGroup } from '~/types/project';

  const props = defineProps<{
    groups: readonly ProjectGroup[];
    projects: LiveProject[];
  }>();

  const { track } = useAnalytics();

  const sections = computed(() =>
    props.groups
      .map((group) => ({
        group,
        items: props.projects.filter((p) => p.group === group),
      }))
      .filter((s) => s.items.length > 0),
  );

  function host(url: string): string {
    return new URL(url).host;
  }
</script>

<template>
  <div class="space-y-12">
    <section v-for="section in sections" :key="section.group">
      <h3
        class="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
      >
        {{ section.group }}
        <span class="ml-2 font-normal text-muted-foreground/60">
          {{ section.items.length }}
        </span>
      </h3>

      <ul class="space-y-1">
        <li
          v-for="project in section.items"
          :key="project.url"
          class="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:gap-4"
        >
          <div class="min-w-0 sm:w-64 sm:shrink-0">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener"
              class="group inline-flex max-w-full items-center gap-1.5 font-medium text-foreground hover:text-primary"
              @click="
                track('project_click', { repo: project.name, section: 'live' })
              "
            >
              <span class="truncate">{{ project.name }}</span>
              <Icon
                name="lucide:arrow-up-right"
                class="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            </a>
            <p class="truncate text-xs text-muted-foreground/60">
              {{ host(project.url) }}
            </p>
          </div>

          <p
            class="min-w-0 flex-1 text-sm text-muted-foreground sm:line-clamp-2"
          >
            {{ project.description }}
          </p>

          <!-- Fixed slots so tags and icons line up whether or not a
               project has a public repo or an npm package. -->
          <div class="flex shrink-0 items-center gap-3 text-muted-foreground">
            <span class="flex sm:w-28 sm:justify-end">
              <span
                class="rounded-full border border-border px-2 py-0.5 text-xs whitespace-nowrap"
              >
                {{ project.tag }}
              </span>
            </span>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.name} on GitHub`"
              class="transition-colors hover:text-foreground"
            >
              <Icon name="lucide:github" class="size-4" />
            </a>
            <span v-else class="hidden size-4 sm:block" aria-hidden="true" />
            <a
              v-if="project.npm"
              :href="project.npm"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.name} on npm`"
              class="transition-colors hover:text-foreground"
            >
              <Icon name="simple-icons:npm" class="size-4" />
            </a>
            <span v-else class="hidden size-4 sm:block" aria-hidden="true" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
