<template>
  <section class="flex flex-col w-full h-full p-4">
    <!-- Top Data -->
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="inline-flex flex-col self-center justify-end col-span-3">
        <p class="text-3xl">Blog articles</p>
        <p>
          This page will serve as a listing for all the TIL's, blog articles &
          learnings.
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="inline-flex self-center justify-end col-span-1 text-5xl cursor-pointer"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <!-- Actual Data -->
    <content-list path="/articles">
      <template #default="{ list }">
        <div
          v-if="list.length > 0"
          class="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="article in list"
            v-show="article.status !== 'draft'"
            :key="article.position"
            class="w-full overflow-hidden dark:bg-gray-700 bg-gray-900 text-gray-200 rounded shadow cursor-pointer md:max-w-lg hover:shadow-md"
            :title="article.title"
            @click="router.push({ path: article._path })"
          >
            <div class="p-4">
              <div class="mb-2 text-xl font-bold">
                {{ article.title }}
              </div>
              <div class="flex items-center justify-start py-1 text-sm">
                <div
                  v-for="(tag, index) in article.tags"
                  :key="index"
                  class="pl-2"
                >
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-gray-800 mr-2"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="pt-2">
                {{ article.description }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </content-list>
  </section>
</template>
<script setup lang="ts">
  const router = useRouter();
</script>
