<script setup lang="ts">
  import type { SocialTarget } from '~/types/analytics';
  import type { SocialLink } from '~/types/social';

  const { track } = useAnalytics();

  const quotes = [
    'Never stop learning, cause life never stops teaching.',
    'The best maps are the ones people can build on.',
    "Open source is not just code, it's community.",
    'Ship fast, iterate faster.',
  ];

  const socials: SocialLink[] = [
    {
      label: 'GitHub',
      icon: 'lucide:github',
      url: 'https://github.com/vinayakkulkarni',
      target: 'github',
    },
    {
      label: 'Twitter',
      icon: 'lucide:twitter',
      url: 'https://x.com/_vinayak_k',
      target: 'x',
    },
    {
      label: 'LinkedIn',
      icon: 'lucide:linkedin',
      url: 'https://www.linkedin.com/in/kulkarnivinayak/',
      target: 'linkedin',
    },
    {
      label: 'Reddit',
      icon: 'simple-icons:reddit',
      url: 'https://www.reddit.com/user/vinayak-kulkarni/',
      target: 'reddit',
    },
    {
      label: 'Website',
      icon: 'lucide:globe',
      url: 'https://vinayakkulkarni.dev',
      target: null,
    },
  ];

  // The footer social row is the site's contact block: a click is both an
  // outbound profile click and a contact intent. The self-link sends nothing.
  function onSocialClick(target: SocialTarget | null) {
    if (!target) return;
    track('outbound_click', { target, location: 'footer' });
    track('contact_click', { channel: target, location: 'footer' });
  }
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
          @click="onSocialClick(social.target)"
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
