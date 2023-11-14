<script lang="ts" setup>
  import VPwaAlert from '~/components/common/VPwaAlert.vue';
</script>

<template>
  <nuxt-layout>
    <vite-pwa-manifest />
    <nuxt-page />
    <v-pwa-alert />
  </nuxt-layout>
</template>
