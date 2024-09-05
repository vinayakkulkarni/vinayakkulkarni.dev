<template>
  <section
    class="m-12 rounded from-stone-700 to-stone-600 bg-gradient-to-t p-6 text-stone-100 shadow lg:m-0 lg:p-12 hover:shadow-md"
  >
    <h1 class="text-5xl">Hello 👋</h1>
    <div class="max-w-lg break-words text-base">
      <article class="py-2 text-stone-100 prose">
        <div>
          My name is Vinayak Kulkarni. I’m a JavaScript enthusiast. Currently
          Frontend Engineering Lead @
          <a href="https://dscvr.one" target="_blank" rel="noopener nofollow"
            >DSCVR</a
          >
          &amp; open source contributor
        </div>
        <div>
          <span class="keyframes-pulse animate-fade-in-up">💚</span> Vue &amp;
          Nuxt.js
        </div>
        <div>
          I love watching Arsenal FC, gymming, trekking &amp; writing code
        </div>
      </article>
    </div>
    <div
      class="mt-8 w-full flex items-center justify-around text-xl tracking-wide"
    >
      <nuxt-link :to="{ name: 'articles' }" class="hover:line-through">
        📖 Blog
      </nuxt-link>
      <nuxt-link :to="{ name: 'projects' }" class="hover:line-through">
        🛠 Projects
      </nuxt-link>
      <nuxt-link :to="{ name: 'uses' }" class="hover:line-through">
        👨🏻‍💻 Uses
      </nuxt-link>
    </div>
  </section>
</template>
