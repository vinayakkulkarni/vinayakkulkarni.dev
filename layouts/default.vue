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
      <slot class="md:max-w-screen-xl" />
    </section>
    <!-- Footer -->
    <v-footer />
  </main>
</template>

<script lang="ts">
  import VFooter from '~/components/common/VFooter.vue';
  import VHeader from '~/components/common/VHeader.vue';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      VHeader,
      VFooter,
    },
  });
</script>
