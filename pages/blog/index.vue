<template>
  <section class="w-full h-full overflow-hidden">
    <!-- Top Data -->
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="max-w-lg col-span-3">
        <p class="text-3xl">Blog Posts</p>
        <p>
          This page will serve as a listing for all the TIL's, blog posts &
          learnings.
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
    <!-- Actual Data -->
    <div style="height: calc(100% - 6rem);">
      <vue-scroll :ops="scrollOps">
        <div
          class="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          <!-- This needs to be dynamic -->
          <div
            v-for="post in posts"
            :key="post.title"
            class="max-w-lg overflow-hidden rounded shadow cursor-pointer bg-background-secondary hover:shadow-md"
            @click="
              $router.push({
                name: 'blog-post',
                params: { post: post.id },
              })
            "
          >
            <div class="p-4">
              <div class="mb-2 text-xl font-bold">{{ post.title }}</div>
              <p class="text-base">
                {{ post.description }}
              </p>
            </div>
          </div>
        </div>
      </vue-scroll>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Blog',
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
            keepShow: false,
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
        posts: [
          {
            id: 0,
            title: 'Why Brotli is awesome!',
            description:
              'Learn how we integrated brotli and shaved off almost 25% off our bundle',
          },
        ],
      };
    },
  };
</script>
