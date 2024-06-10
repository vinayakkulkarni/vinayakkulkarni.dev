<template>
  <div
    class="relative h-100dvh min-w-screen w-screen flex flex-col select-none overflow-hidden bg-stone-100 text-stone-800 font-light transition-colors duration-200 ease-linear dark:bg-stone-900 dark:text-stone-100"
  >
    <!-- <v-spotlight v-if="isDark && isDesktop" /> -->
    <!-- Header -->
    <header>
      <v-header />
    </header>
    <!-- Body -->
    <main
      class="scrollbar-track-stone-400 scrollbar-thumb-stone-600 dark:scrollbar-thumb-stone-400 dark:scrollbar-track-stone-600 flex-1 overflow-y-auto p-4 scrollbar-thin"
    >
      <div class="h-full flex items-center justify-center">
        <slot class="md:max-w-screen-xl" />
      </div>
    </main>
    <!-- Footer -->
    <footer>
      <v-footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
  import VFooter from '~/components/common/VFooter.vue';
  import VHeader from '~/components/common/VHeader.vue';
  // import { VSpotlight } from 'v-spotlight';

  // const isDark = useDark();
  // const { isDesktop } = useDevice();
</script>
