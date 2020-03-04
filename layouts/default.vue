<template>
  <main
    class="w-full h-full min-h-screen overflow-hidden antialiased font-thin transition transition-colors duration-200 ease-linear min-w-screen bg-background-primary text-foreground-primary"
    :class="currentTheme"
  >
    <!-- Header -->
    <v-header
      :theme="currentTheme"
      @set-theme="(theme) => (currentTheme = theme)"
    />
    <!-- Body -->
    <div
      class="flex items-center justify-center w-full h-screen max-h-screen py-24"
    >
      <nuxt class="max-w-screen-xl" />
    </div>
    <!-- Footer -->
    <v-footer />
  </main>
</template>

<script>
  export default {
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
    data() {
      return {
        currentTheme: 'light',
      };
    },
  };
</script>
