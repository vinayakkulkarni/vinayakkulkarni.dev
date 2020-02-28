<template>
  <main
    class="flex items-center justify-center w-full h-full min-h-screen overflow-hidden antialiased font-thin transition transition-colors duration-200 ease-linear min-w-screen bg-background-primary text-foreground-primary"
    :class="currentTheme"
  >
    <div class="absolute top-0 left-0 ml-6 logo">
      <svg class="fill-current logo">
        <defs />
        <text y="50" fill="currentColor" class="text-5xl">
          V.
        </text>
      </svg>
    </div>
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

<style>
  .logo {
    font-family: 'Permanent Marker', -apple-system, Verdana, Tahoma, sans-serif;
  }
</style>
