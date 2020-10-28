<template>
  <section class="w-full h-full mt-16 overflow-hidden xl:mt-0">
    <!-- Top Data -->
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="inline-flex flex-col self-center justify-end col-span-3">
        <p class="text-3xl">Blog Posts</p>
        <p>
          This page will serve as a listing for all the TIL's, blog posts &
          learnings.
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="inline-flex self-center justify-end col-span-1 text-5xl cursor-pointer"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <!-- Actual Data -->
    <div style="height: calc(100% - 6rem)">
      <vue-scroll :ops="scrollOps">
        <div
          class="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          <!-- This needs to be dynamic -->
          <div
            v-for="post in posts"
            v-show="post.status !== 'draft'"
            :key="post.position"
            class="w-full overflow-hidden text-gray-100 rounded shadow cursor-pointer md:max-w-lg hover:shadow-md bg-gradient-to-tr from-cool-gray-700 to-cool-gray-600 hover:bg-gradient-to-bl hover:from-cool-gray-600 hover:to-cool-gray-700"
            @click="$router.push({ path: post.path })"
          >
            <div class="p-4">
              <div class="mb-2 text-xl font-bold">
                {{ post.title }}
              </div>
              <div class="flex items-center justify-start py-1 text-sm">
                <div
                  class="pr-2 border-r border-gray-500 text-foreground-secondary"
                >
                  {{ new Date(post.createdAt).toDateString() }}
                </div>
                <div
                  v-for="(tag, index) in post.tags"
                  :key="index"
                  class="pl-2"
                >
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-gray-800 mr-2"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="pt-2">
                {{ post.description }}
              </div>
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
    transition(to, from) {
      if (from && from.name === 'blog-post') {
        return 'slide-right';
      }
      return 'slide-left';
    },
    async fetch() {
      this.posts = await this.$content('blog').fetch();
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
        posts: [],
      };
    },
  };
</script>
