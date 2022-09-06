<template>
  <article v-if="data" class="flex flex-col w-full h-full prose prose-lg">
    <h1>{{ data.title }}</h1>
    <div
      v-if="data.tags && data.tags.length"
      class="flex items-center justify-start py-1 text-sm"
    >
      <div v-for="(tag, index) in data.tags" :key="index" class="pl-2">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-gray-800 mr-2"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <h3>{{ data.description }}</h3>
    <content-doc />
  </article>
</template>
<script setup lang="ts">
  const route = useRoute();

  const { data } = await useLazyAsyncData('page-data', () =>
    queryContent(route.path).findOne(),
  );
</script>
