<template>
  <section class="h-full w-full flex items-center justify-center">
    <nuxt-page :page-key="route.fullPath">
      <slot />
    </nuxt-page>
  </section>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>
