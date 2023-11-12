<template>
  <section class="h-full w-full">
    <div class="grid grid-flow-col grid-cols-4 mb-4 gap-4">
      <div class="col-span-3 inline-flex flex-col self-center justify-end">
        <p class="text-3xl">Projects</p>
        <p>
          This page will serve as a listing for all the side-projects, plugins,
          tools created for OSS 💚
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="col-span-1 inline-flex cursor-pointer self-center justify-end text-5xl"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <div
      class="grid mb-4 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 xl:grid-cols-6"
    >
      <div
        v-for="(project, idx) in projects"
        :key="idx"
        :class="{ 'mb-4 sm:mb-0': idx === projects.length - 1 }"
        class="rounded text-stone-100 shadow from-stone-700 to-stone-600 bg-gradient-to-tr md:max-w-lg hover:shadow-md hover:from-stone-600 hover:to-stone-700 hover:bg-gradient-to-bl"
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
                class="ml-1 w-4 fill-current"
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
          <p class="break-words text-base">
            {{ project.excerpt }}
          </p>
          <div class="mt-2">
            <span
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-4"
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
  </section>
</template>

<script setup lang="ts">
  const projects = ref([
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
  ]);
</script>
