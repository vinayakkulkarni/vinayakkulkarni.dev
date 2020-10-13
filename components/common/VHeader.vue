<template>
  <header
    class="fixed top-0 flex items-center justify-between invisible h-24 min-w-full p-4"
  >
    <!-- Logo -->
    <div class="select-none">
      <svg
        class="visible text-gray-900 cursor-pointer v-logo dark:text-gray-100"
        width="30"
        height="30"
        @click="$router.push({ name: 'index' })"
      >
        <defs />
        <text y="30" fill="currentColor" class="text-5xl">V.</text>
      </svg>
    </div>
    <!-- Theme switcher -->
    <div>
      <select
        v-model="$colorMode.preference"
        class="visible w-full h-8 px-2 text-base text-gray-300 border border-gray-700 rounded bg-cool-gray-900"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>

<style>
  .v-logo {
    font-family: 'Permanent Marker', -apple-system, Verdana, Tahoma, sans-serif;
  }
</style>
