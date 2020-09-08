<template>
  <header class="fixed top-0 h-24 min-w-full p-4">
    <!-- Logo -->
    <div class="select-none">
      <svg
        class="cursor-pointer fill-current v-logo"
        width="30"
        height="30"
        @click="$router.push({ name: 'index' })"
      >
        <defs />
        <text y="30" fill="currentColor" class="text-5xl">V.</text>
      </svg>
    </div>
    <!-- Theme switcher -->
    <theme-switcher
      :theme="theme"
      @set-theme="(theme) => $emit('set-theme', theme)"
    />
  </header>
</template>

<script>
  export default {
    name: 'Header',
    components: {
      ThemeSwitcher: () =>
        import(
          /* webpackChunkName: "Footer Component" */ '@/components/common/ThemeSwitcher.vue'
        ),
    },
    props: {
      theme: {
        type: String,
        default: 'light',
        required: true,
      },
    },
    data() {
      return {
        currentTheme: 'light',
      };
    },
  };
</script>

<style>
  .v-logo {
    font-family: 'Permanent Marker', -apple-system, Verdana, Tahoma, sans-serif;
  }
</style>
