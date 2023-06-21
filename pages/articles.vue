<template>
  <section class="flex items-center justify-center w-full h-full">
    <nuxt-page :page-key="route.fullPath">
      <slot />
    </nuxt-page>
  </section>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>
