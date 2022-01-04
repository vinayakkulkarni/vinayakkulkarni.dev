<template>
  <header
    class="fixed top-0 flex items-center justify-between invisible h-24 min-w-full p-4 select-none"
  >
    <!-- Logo -->
    <svg
      class="visible text-gray-900 cursor-pointer v-logo dark:text-gray-100"
      width="30"
      height="30"
      @click="$router.push({ name: 'index' })"
    >
      <defs />
      <text y="30" fill="currentColor" class="text-5xl">V.</text>
    </svg>
    <!-- Theme switcher -->
    <div class="visible">
      <span class="relative z-0 inline-flex shadow rounded-full">
        <button
          type="button"
          class="relative inline-flex items-center px-3 py-1.5 rounded-l-full border border-gray-300 bg-transparent text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 active:ring-0"
          :class="{
            'bg-gray-500 text-white': $colorMode.preference === 'system',
          }"
          @click="$colorMode.preference = 'system'"
        >
          System
        </button>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-transparent text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blueGray-500 focus:border-blueGray-500 active:ring-0"
          :class="{
            'bg-blueGray-800 text-gray-50': $colorMode.preference === 'dark',
          }"
          @click="$colorMode.preference = 'dark'"
        >
          Dark
        </button>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center px-3 py-1.5 rounded-r-full border border-gray-300 bg-transparent text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 active:ring-0"
          :class="{
            'bg-yellow-500 text-gray-700': $colorMode.preference === 'light',
          }"
          @click="$colorMode.preference = 'light'"
        >
          Light
        </button>
      </span>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'VHeader',
  };
</script>

<style>
  .v-logo {
    font-family: 'Permanent Marker', -apple-system, Verdana, Tahoma, sans-serif;
  }
</style>
