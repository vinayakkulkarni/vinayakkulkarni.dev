<template>
  <section class="h-full w-full flex items-center justify-center">
    <article v-if="data" class="prose-lg h-full w-full flex flex-col prose">
      <h1>{{ data.title }}</h1>
      <div
        v-if="data.tags && data.tags.length"
        class="flex items-center justify-start py-1 text-sm"
      >
        <div v-for="(tag, index) in data.tags" :key="index" class="pl-2">
          <span
            class="mr-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium leading-4 text-stone-800"
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
<script setup lang="ts">
  const route = useRoute();

  const { data } = await useLazyAsyncData('page-data', () =>
    queryContent(route.path).findOne(),
  );
</script>
