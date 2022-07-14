<template>
  <article class="flex flex-col w-full h-full prose prose-lg">
    <content-doc v-slot="{ doc }">
      <h1>{{ doc[0].title }}</h1>
      <div
        v-if="doc[0].tags && doc[0].tags.length"
        class="flex items-center justify-start py-1 text-sm"
      >
        <div v-for="(tag, index) in doc[0].tags" :key="index" class="pl-2">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-gray-800 mr-2"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <h3>{{ doc[0].description }}</h3>
      <content-renderer :value="doc" />
    </content-doc>
  </article>
</template>
