<template>
  <main
    class="w-full h-full min-h-screen overflow-hidden antialiased font-light text-gray-800 transition-colors duration-200 ease-linear bg-gray-100 min-w-screen text-foreground-primary dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Header -->
    <v-header />
    <!-- Body -->
    <section
      class="flex items-center justify-center w-full h-screen max-h-screen px-4 pb-4 pt-14 md:py-16 xl:py-12 xl:px-0"
    >
      <nuxt class="md:max-w-screen-xl" />
    </section>
    <!-- Footer -->
    <v-footer />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      VHeader: () =>
        import(
          /* webpackChunkName: "Header Component" */ '@/components/common/VHeader.vue'
        ),
      VFooter: () =>
        import(
          /* webpackChunkName: "Footer Component" */ '@/components/common/VFooter.vue'
        ),
    },
  });
</script>
