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
        class="visible block w-full py-2 pl-3 pr-10 mt-1 text-base text-gray-300 bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
