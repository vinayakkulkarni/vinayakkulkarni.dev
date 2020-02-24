<template>
  <section class="w-full h-full mx-12 my-4">
    <div class="grid grid-flow-col grid-cols-4 gap-4 mb-4">
      <div class="max-w-lg col-span-3">
        <p class="text-3xl">Projects</p>
        <p>
          This page will serve as a listing for all the side-projects, plugins,
          tools created for OSS 💚
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="max-w-lg col-span-1 text-5xl text-right cursor-pointer"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">V-Offline</div>
          <p class="text-base">
            Detect Offline & Online events
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">V-Image</div>
          <p class="text-base">
            Detect Offline & Online events
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">Vue-Identify-Network</div>
          <p class="text-base">
            Detect Offline & Online events
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">V-Offline</div>
          <p class="text-base">
            Detect Offline & Online events
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Projects',
    transition(to, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
