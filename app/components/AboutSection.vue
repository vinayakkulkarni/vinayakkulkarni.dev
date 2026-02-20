<script setup lang="ts">
  const techStack = [
    { label: 'Vue 3', icon: 'simple-icons:vuedotjs' },
    { label: 'Nuxt', icon: 'simple-icons:nuxtdotjs' },
    { label: 'TypeScript', icon: 'simple-icons:typescript' },
    { label: 'MapLibre GL', icon: 'simple-icons:maplibre' },
    { label: 'Planetiler', icon: 'lucide:globe-2' },
    { label: 'PMTiles', icon: 'lucide:database' },
    { label: 'Rust', icon: 'simple-icons:rust' },
    { label: 'Cloudflare', icon: 'simple-icons:cloudflare' },
    { label: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
    { label: 'DuckDB', icon: 'simple-icons:duckdb' },
    { label: 'PostGIS', icon: 'simple-icons:postgresql' },
    { label: 'Three.js', icon: 'simple-icons:threedotjs' },
  ];
</script>

<template>
  <section id="about" class="relative py-32">
    <div class="mx-auto max-w-6xl px-6">
      <FadeContent :duration="0.8" blur>
        <GradientText
          text="About"
          :colors="['#7877c6', '#40ffaa', '#4079ff', '#7877c6']"
          :speed="6"
          class="mb-4 text-sm font-semibold uppercase tracking-widest"
        />
      </FadeContent>

      <SplitText
        text="Building the geospatial infrastructure of the future."
        by="words"
        :delay="80"
        :duration="0.5"
        class="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
      />

      <FadeContent :duration="1" :delay="0.3" blur>
        <div class="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Co-Founder of a stealth startup focused on geospatial technology.
            Previously Frontend Engineering Lead, now building cutting-edge GIS
            tools that serve millions of map tiles daily.
          </p>
          <p>
            I specialize in the entire geospatial stack &mdash; from processing
            planetary-scale vector data with Planetiler and Overture Maps, to
            rendering interactive 3D globes with MapLibre GL and Three.js, to
            serving tiles at the edge via Cloudflare Workers and R2.
          </p>
          <p>
            Passionate about open source cartography and the Vue.js ecosystem.
            Creator of 50+ open source packages with thousands of stars on
            GitHub.
          </p>
        </div>
      </FadeContent>

      <!-- Tech Stack -->
      <FadeContent :duration="1" :delay="0.5" blur>
        <div class="mt-16">
          <h3
            class="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Tech Stack
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="tech in techStack"
              :key="tech.label"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <Icon :name="tech.icon" class="size-4" />
              {{ tech.label }}
            </span>
          </div>
        </div>
      </FadeContent>
    </div>
  </section>
</template>
