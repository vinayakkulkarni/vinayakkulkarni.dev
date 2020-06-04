<template>
  <div>
    <h1 class="text-4xl tracking-wide capitalize">
      {{ blogPost.slug.split('-').join(' ') }}
    </h1>
    <nuxt-content :document="blogPost" />
  </div>
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
    async asyncData({ $content, params }) {
      const blogPost = await $content(`blog/${params.post}`).fetch();
      return { blogPost };
    },
  };
</script>
