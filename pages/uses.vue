<template>
  <section class="w-full h-full mx-12 my-4">
    <div class="grid grid-flow-col grid-cols-4 gap-4 mb-4">
      <div class="max-w-lg col-span-3">
        <p class="text-3xl">Uses</p>
        <p>
          This page will serve as a living document for people to always know
          the latest and greatest.
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
    <div class="flex">
      CV
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Uses',
    transition(to, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
