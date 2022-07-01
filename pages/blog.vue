<template>
  <nuxt-child />
</template>

<script lang="ts">
  export default defineComponent({
    name: 'BlogLayout',
    transition(_, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  });
</script>
