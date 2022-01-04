<template>
  <section class="flex flex-col w-full h-full pb-20 mt-16 xl:mt-0 lg:pb-8">
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
    <vue-scroll :ops="state.scrollOps">
      <div
        v-if="state.posts.length > 0"
        class="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        <!-- This needs to be dynamic -->
        <div
          v-for="post in state.posts"
          v-show="post.status !== 'draft'"
          :key="post.position"
          class="w-full overflow-hidden text-gray-100 rounded shadow cursor-pointer md:max-w-lg hover:shadow-md bg-gradient-to-tr from-gray-700 to-gray-600 hover:bg-gradient-to-bl hover:from-gray-600 hover:to-gray-700"
          :title="post.title"
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
              <div v-for="(tag, index) in post.tags" :key="index" class="pl-2">
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
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@nuxtjs/composition-api';
  import { getRuntimeVM } from '@/utils/runtime';
  import { Post } from '@/types/blog';

  export default defineComponent({
    name: 'VBlog',
    transition(_, from) {
      if (from && from.name === 'blog-post') {
        return 'slide-right';
      }
      return 'slide-left';
    },
    setup() {
      const { $content } = getRuntimeVM();
      // component state
      const state = reactive({
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
        posts: [] as Post[] | unknown,
      });
      // triggered in created()
      getPosts();
      // methods
      /**
       * API: GET Blog posts
       */
      async function getPosts(): Promise<void> {
        state.posts = await $content('blog').sortBy('createdAt').fetch();
      }
      return {
        state,
      };
    },
  });
</script>
