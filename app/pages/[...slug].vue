<script lang="ts" setup>
  const route = useRoute();
  const { data: post } = await useAsyncData(() => {
    return queryCollection('articles').path(route.path).first();
  });
</script>

<template>
  <section class="size-full relative flex items-center justify-center">
    <article v-if="post" class="prose-lg size-full flex flex-col prose">
      <h1>{{ post.title }}</h1>
      <p class="subtitle mr-4">
        <nuxt-time
          :datetime="post.date"
          day="numeric"
          month="long"
          year="numeric"
        />
      </p>
      <div
        v-if="post.tags && post.tags.length"
        class="mt-2 flex items-center justify-start py-1 text-sm"
      >
        <div v-for="(tag, index) in post.tags" :key="index">
          <span
            class="mr-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-stone-800 font-medium leading-4"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <h3>{{ post.description }}</h3>
      <content-renderer :value="post" />
    </article>
  </section>
</template>
