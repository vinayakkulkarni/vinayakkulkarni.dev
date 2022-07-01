<template>
  <div class="flex flex-col w-full h-full pb-20 mt-16 xl:mt-0 lg:pb-8">
    <!-- Title & back button -->
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
    <!-- Tags -->
    <div>
      <span
        v-for="(tag, index) in post.tags"
        :key="index"
        class="inline-flex items-center px-2.5 py-0.5 mb-2 rounded-full text-xs font-medium leading-4 bg-red-100 text-gray-800 mr-2"
      >
        {{ tag }}
      </span>
    </div>
    <vue-scroll :ops="scrollOps">
      <article
        class="w-full pt-2 mb-4 prose break-words dark:prose-dark sm:max-w-full dark:text-gray-100"
      >
        <nuxt-content :document="post" class="flex flex-col" />
      </article>
    </vue-scroll>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'BlogPost',
    async asyncData({ $content, params }) {
      const post = await $content(`blog/${params.post}`).fetch();
      return { post };
    },
    data() {
      return {
        scrollOps: {
          scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: false,
            scrollingY: true,
            speed: 500,
            easing: 'easeInQuad',
            verticalNativeBarPos: 'right',
          },
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
  });
</script>
