<template>
  <section class="flex flex-col w-full h-full pb-20 mt-16 xl:mt-0 lg:pb-8">
    <div class="grid grid-flow-col grid-cols-4 gap-4 mb-4">
      <div class="inline-flex flex-col self-center justify-end col-span-3">
        <p class="text-3xl">Projects</p>
        <p>
          This page will serve as a listing for all the side-projects, plugins,
          tools created for OSS 💚
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
    <vue-scroll :ops="scrollOps">
      <div class="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(project, idx) in projects"
          :key="idx"
          class="overflow-hidden text-gray-100 rounded shadow md:max-w-lg hover:shadow-md bg-gradient-to-tr from-cool-gray-700 to-cool-gray-600 hover:bg-gradient-to-bl hover:from-cool-gray-600 hover:to-cool-gray-700"
        >
          <div class="p-4">
            <div class="mb-2 text-xl font-bold">
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center"
              >
                <span>{{ project.name }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  class="w-4 ml-1 fill-current"
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  />
                  <polygon
                    fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                  />
                </svg>
              </a>
            </div>
            <p class="text-base break-words">
              {{ project.excerpt }}
            </p>
            <div class="mt-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4"
                :class="{
                  'bg-green-100 text-green-800': project.library === 'vue',
                  'bg-red-100 text-red-800': project.library === 'svelte',
                }"
              >
                {{ project.library }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </section>
</template>

<script>
  export default {
    name: 'Projects',
    transition(_, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
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
        projects: [
          {
            name: 'Janak',
            excerpt: '🤙 Build Vue 3 apps in a breeze!',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/janak',
          },
          {
            name: 'v-offline',
            excerpt: '⚡️ Easily detect offline & online events',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-offline',
          },
          {
            name: 'v-image',
            excerpt: '🖼 Tiny css-free component for your input type file',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-image',
          },
          {
            name: 'v-intl',
            excerpt: '🔉 Add i18n to your awesome Vue 3 apps',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-intl',
          },
          {
            name: 'v-pip',
            excerpt: '🌁 Vue wrapper for native picture-in-picture',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-intl',
          },
          {
            name: 'v-clappr',
            excerpt: '📹 Vue wrapper for Clappr media player',
            url: 'https://github.com/vinayakkulkarni/v-clappr',
            library: 'vue',
          },
          {
            name: 'v-spotlight',
            excerpt: '🔦 Tiny reusable spotlight Vue component',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-spotlight',
          },
          {
            name: 'v-rating',
            excerpt: '⭐ Rating component in Semantic-UI',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-rating',
          },
          {
            name: 'v-github-icon',
            excerpt: '🐙 GitHub corner icons',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/v-github-icon',
          },
          {
            name: 's-offline',
            excerpt: '🎉 Detect offline & online events in Svelte',
            url: 'https://github.com/vinayakkulkarni/s-offline',
            library: 'svelte',
          },
          {
            name: 'Vue Identify Network',
            excerpt: '🚨 Identify network type & speed',
            library: 'vue',
            url: 'https://github.com/vinayakkulkarni/vue-identify-network',
          },
        ],
      };
    },
  };
</script>
