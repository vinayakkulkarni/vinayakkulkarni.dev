<template>
  <section
    class="
      p-6
      m-12
      text-gray-100
      rounded
      shadow
      bg-gradient-to-t
      from-gray-700
      to-gray-600
      hover:shadow-md
      lg:m-0
      lg:p-12
    "
  >
    <!-- Hello -->
    <h1 class="text-5xl">Hello 👋</h1>
    <!-- Info -->
    <div class="max-w-lg text-base break-words">
      <article class="py-2 prose text-gray-100">
        <div>
          My name is Vinayak Kulkarni. I’m a JavaScript enthusiast. Currently
          Frontend Tech Lead @
          <a
            href="https://geospoc.com"
            target="_blank"
            rel="noopener nofollow"
            class="focus:text-green-500"
            >GeoSpoc</a
          >
          & open source contributor
        </div>
        <div><span class="blinking-heart">💚</span> Vue &amp; Nuxt.js</div>
        <div>I love watching Arsenal FC, gymming, trekking & writing code</div>
      </article>
    </div>
    <!-- Blog / Uses / Projects -->
    <div
      class="flex items-center justify-around w-full mt-8 text-xl tracking-wide"
    >
      <nuxt-link
        :to="{ name: 'blog' }"
        class="hover:line-through hover:text-foreground-secondary"
      >
        📖 Blog
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'projects' }"
        class="hover:line-through hover:text-foreground-secondary"
      >
        🛠 Projects
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'uses' }"
        class="hover:line-through hover:text-foreground-secondary"
      >
        👨🏻‍💻 Uses
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    name: 'Homepage',
    transition(_, from) {
      if (!from) {
        return 'slide-right';
      }
      return 'slide-left';
    },
  });
</script>
