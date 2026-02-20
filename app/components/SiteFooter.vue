<script setup lang="ts">
  const quotes = [
    'Never stop learning, cause life never stops teaching.',
    'The best maps are the ones people can build on.',
    "Open source is not just code, it's community.",
    'Ship fast, iterate faster.',
  ];

  const socials = [
    {
      label: 'GitHub',
      icon: 'lucide:github',
      url: 'https://github.com/vinayakkulkarni',
    },
    {
      label: 'Twitter',
      icon: 'lucide:twitter',
      url: 'https://twitter.com/_vinayakkulkarni',
    },
    {
      label: 'LinkedIn',
      icon: 'lucide:linkedin',
      url: 'https://www.linkedin.com/in/kulkarnivinayak/',
    },
    {
      label: 'Website',
      icon: 'lucide:globe',
      url: 'https://vinayakkulkarni.dev',
    },
  ];
</script>

<template>
  <footer class="relative overflow-hidden border-t border-border py-20">
    <!-- Waves Background -->
    <div class="pointer-events-none absolute inset-0 opacity-10">
      <Waves
        line-color="currentColor"
        :wave-speed-x="0.01"
        :wave-speed-y="0.005"
        :wave-amp-x="24"
        :wave-amp-y="12"
        :y-gap="40"
        class="size-full text-foreground"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <!-- Typing Quote -->
      <TextType
        :text="quotes"
        :typing-speed="40"
        :deleting-speed="25"
        :pause-duration="3000"
        cursor-character="_"
        class="mb-12 inline-block text-lg text-muted-foreground"
      />

      <!-- Social Links -->
      <div class="mb-12 flex items-center justify-center gap-4">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary/50 hover:bg-accent hover:text-foreground"
        >
          <Icon :name="social.icon" class="size-5" />
        </a>
      </div>

      <!-- Credits -->
      <p class="text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} Vinayak Kulkarni.
      </p>
    </div>
  </footer>
</template>
