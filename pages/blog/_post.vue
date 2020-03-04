<template>
  <nuxt-child />
</template>

<script>
  export default {
    name: 'BlogPost',
    transition(to, from) {
      if (from && from.name === 'blog') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
