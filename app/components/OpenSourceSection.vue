<script setup lang="ts">
  const stats = [
    { label: 'GitHub Stars', value: 1200, icon: 'lucide:star' },
    { label: 'Open Source Packages', value: 45, icon: 'lucide:package' },
    { label: 'npm Downloads', value: 737000, icon: 'lucide:download' },
    {
      label: 'Contributions',
      value: 8378,
      icon: 'lucide:git-commit-horizontal',
    },
  ];
</script>

<template>
  <section id="open-source" class="relative overflow-hidden pt-40 pb-16">
    <!-- Aurora Background -->
    <div class="pointer-events-none absolute inset-0 opacity-20">
      <ClientOnly>
        <Aurora
          :color-stops="['#7877c6', '#40ffaa', '#4079ff']"
          :amplitude="0.8"
          :blend="0.6"
          :speed="0.6"
        />
      </ClientOnly>
    </div>

    <div class="relative mx-auto max-w-6xl px-6">
      <FadeContent :duration="0.8" blur>
        <GradientText
          text="Open Source"
          :colors="['#40ffaa', '#7877c6', '#4079ff', '#40ffaa']"
          :speed="6"
          class="mb-4 text-sm font-semibold uppercase tracking-widest"
        />
      </FadeContent>

      <SplitText
        text="I Love Open Source"
        by="words"
        :delay="80"
        :duration="0.5"
        class="mb-16 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
      />

      <!-- Stats -->
      <div class="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        <FadeContent
          v-for="(stat, index) in stats"
          :key="stat.label"
          :delay="index * 0.15"
          :duration="0.8"
          blur
        >
          <div
            class="relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center"
          >
            <BorderBeam
              :size="120"
              :duration="12"
              :delay="index * 2"
              color-from="#7877c6"
              color-to="#40ffaa"
            />
            <Icon
              :name="stat.icon"
              class="mx-auto mb-3 size-6 text-muted-foreground"
            />
            <CountUp
              :to="stat.value"
              :duration="2.5"
              separator=","
              class="text-3xl font-bold text-foreground"
            />
            <p class="mt-1 text-xs text-muted-foreground">
              {{ stat.label }}
            </p>
          </div>
        </FadeContent>
      </div>

      <!-- GitHub Calendar -->
      <FadeContent :duration="1" :delay="0.4" blur>
        <div
          class="relative overflow-hidden rounded-2xl border border-border bg-card p-6"
        >
          <BorderBeam
            :size="200"
            :duration="15"
            color-from="#7877c6"
            color-to="#40ffaa"
          />
          <h3
            class="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Contribution Activity
          </h3>
          <GithubCalendar
            username="vinayakkulkarni"
            variant="city-lights"
            shape="rounded"
            :glow-intensity="0.4"
            color-schema="green"
          />
        </div>
      </FadeContent>
    </div>
  </section>
</template>
