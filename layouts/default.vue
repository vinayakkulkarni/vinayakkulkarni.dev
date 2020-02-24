<template>
  <main
    class="flex items-center justify-center w-full h-full min-h-screen overflow-hidden antialiased font-thin transition transition-colors duration-200 ease-linear min-w-screen bg-background-primary text-foreground-primary"
    :class="currentTheme"
  >
    <!-- Theme switcher -->
    <theme-switcher
      :theme="currentTheme"
      @set-theme="(theme) => (currentTheme = theme)"
    />
    <nuxt />
    <!-- Footer -->
    <footer class="fixed bottom-0 p-4">
      <v-footer />
    </footer>
  </main>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    components: {
      VFooter: () =>
        import(
          /* webpackChunkName: "Footer Component" */ '@/components/common/VFooter.vue'
        ),
      ThemeSwitcher: () =>
        import(
          /* webpackChunkName: "Footer Component" */ '@/components/common/ThemeSwitcher.vue'
        ),
    },
    data() {
      return {
        currentTheme: 'light',
      };
    },
  };
</script>
