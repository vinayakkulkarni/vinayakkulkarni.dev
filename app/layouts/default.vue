<template>
  <div
    class="relative min-w-screen w-screen flex flex-col select-none overflow-hidden bg-stone-100 text-stone-800 font-light transition-colors duration-200 ease-linear h-dvh dark:bg-stone-900 dark:text-stone-100"
  >
    <!-- Header -->
    <header>
      <v-header />
    </header>
    <!-- Body -->
    <main
      class="scrollbar-track-stone-400 scrollbar-thumb-stone-600 dark:scrollbar-thumb-stone-400 dark:scrollbar-track-stone-600 flex-1 overflow-y-auto p-4"
    >
      <div class="h-full flex items-center justify-center">
        <slot class="md:max-w-screen-xl"></slot>
      </div>
    </main>
    <!-- Footer -->
    <footer>
      <v-footer />
    </footer>
  </div>
</template>
