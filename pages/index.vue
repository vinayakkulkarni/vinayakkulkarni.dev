<template>
  <section
    class="p-6 m-12 rounded shadow bg-background-secondary hover:shadow-md lg:m-0 lg:p-12"
  >
    <!-- Hello -->
    <h1 class="text-5xl">
      Hello 👋
    </h1>
    <!-- Info -->
    <div class="max-w-lg text-base break-words">
      <div>
        My name is Vinayak Kulkarni. I’m a JavaScript enthusiast. Currently
        Frontend Tech Lead @
        <a
          href="https://geospoc.com"
          target="_blank"
          rel="noopener nofollow"
          class="hover:underline hover:text-foreground-secondary focus:text-green-500"
          >GeoSpoc</a
        >
        & core team member of
        <a
          href="https://github.com/vuejs/vuepress/"
          target="_blank"
          rel="noopener nofollow"
          class="hover:underline hover:text-foreground-secondary focus:text-green-500"
          >VuePress</a
        >
      </div>
      <div><span class="blinking-heart">💚</span> Vue &amp; Nuxt.js</div>
      <div>
        I love watching
        <span class="font-semibold text-red-600">Arsenal FC</span>, gymming,
        trekking & writing code
      </div>
    </div>
    <!-- Blog / Uses / Projects -->
    <div
      class="flex items-center justify-around w-full mt-8 text-xl tracking-wide"
    >
      <nuxt-link
        :to="{ name: 'resume' }"
        class="hover:line-through hover:text-foreground-secondary"
      >
        👷🏻‍♂ Resumè
      </nuxt-link>
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

<script>
  export default {
    name: 'Homepage',
    transition(to, from) {
      if (!from) {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
