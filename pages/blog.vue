<template>
  <nuxt-child />
</template>

<script>
  export default {
    name: 'BlogLayout',
    transition(_, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
