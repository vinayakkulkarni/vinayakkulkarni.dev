<template>
  <section class="w-full h-full mx-12 my-4">
    <div class="grid grid-flow-col grid-cols-4 gap-4 mb-4">
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
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">Why Brotli is awesome!</div>
          <p class="text-base">
            Learn how we integrated brotli &amp; shaved off almost 25% off our
            bundle
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">Lorem ipsum dolor</div>
          <p class="text-base">
            sit amet consectetur, adipisicing elit. Pariatur officiis libero
            adipisci sequi temporibus ipsa possimus? Voluptates obcaecati nobis
            repellendus nemo dolor, numquam ipsum suscipit, autem incidunt sequi
            mollitia culpa?
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">aspernatur debitis iste.</div>
          <p class="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            nulla distinctio atque suscipit pariatur, placeat molestias cumque
            nobis aliquid iusto quae nam quidem! Nihil neque tenetur, asperiores
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow-lg bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">Ea eum, alias possimus ad</div>
          <p class="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            itaque officia nihil aspernatur, laboriosam sapiente! reprehenderit
            veritatis quos esse eligendi libero. Odit.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'BlogPosts',
    transition(to, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
