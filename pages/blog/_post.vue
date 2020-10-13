<template>
  <div class="w-full h-full pb-48 mt-16">
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="col-span-3">
        <p class="text-3xl">{{ post.title }}</p>
        <p>
          {{ post.description }}
        </p>
      </div>
      <nuxt-link
        tag="a"
        class="inline-flex self-center justify-end col-span-1 text-5xl cursor-pointer"
        :to="{ name: 'blog' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <span
      v-for="(tag, index) in post.tags"
      :key="index"
      class="inline-flex items-center px-2.5 py-0.5 mb-2 rounded-full text-xs font-medium leading-4 bg-red-100 text-gray-800 mr-2"
    >
      {{ tag }}
    </span>
    <vue-scroll :ops="scrollOps">
      <article class="pt-2 prose prose-lg dark:text-gray-100 md:prose-xl">
        <nuxt-content :document="post" />
      </article>
    </vue-scroll>
  </div>
</template>

<script>
  export default {
    name: 'BlogPost',
    transition(to, from) {
      if (from && from.name === 'blog') {
        return 'slide-left';
      }
      return 'slide-right';
    },
    async asyncData({ $content, params }) {
      const post = await $content(`blog/${params.post}`).fetch();
      return { post };
    },
    data() {
      return {
        scrollOps: {
          rail: {
            background: '#01a99a',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: true,
          },
          bar: {
            showDelay: 5000,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#1E1E1E',
            opacity: 0.7,
            hoverStyle: true,
            specifyBorderRadius: false,
            minSize: 0,
            size: '6px',
            disable: false,
          },
        },
      };
    },
  };
</script>
