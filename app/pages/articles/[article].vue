<script setup lang="ts">
  const route = useRoute();

  const { data } = await useLazyAsyncData('page-data', () =>
    queryContent(route.path).findOne(),
  );
</script>

<template>
  <section class="h-full w-full flex items-center justify-center">
    <article v-if="data" class="prose-lg h-full w-full flex flex-col prose">
      <h1>{{ data.title }}</h1>
      <p class="subtitle mr-4">
        <nuxt-time
          :datetime="data.date"
          day="numeric"
          month="long"
          year="numeric"
        />
      </p>
      <div
        v-if="data.tags && data.tags.length"
        class="mt-2 flex items-center justify-start py-1 text-sm"
      >
        <div v-for="(tag, index) in data.tags" :key="index">
          <span
            class="mr-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-stone-800 font-medium leading-4"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <h3>{{ data.description }}</h3>
      <content-doc />
    </article>
  </section>
</template>
