<script lang="ts" setup>
  const router = useRouter();
  const { data: posts } = await useAsyncData(() => {
    return queryCollection('articles')
      .select(
        'title',
        'description',
        'path',
        'id',
        'date',
        'status',
        'position',
        'tags',
      )
      .order('date', 'DESC')
      .all();
  });
</script>

<template>
  <section class="h-full w-full flex flex-col p-4">
    <!-- Top Data -->
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="col-span-3 inline-flex flex-col self-center justify-end">
        <p class="text-3xl">
          Blog articles
        </p>
        <p>
          This page will serve as a listing for all the TIL's, blog articles &
          learnings.
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="col-span-1 inline-flex cursor-pointer self-center justify-end text-5xl"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <!-- Actual Data -->
    <template v-if="posts">
      <template v-if="posts.length > 0">
        <div
          class="grid gap-4 py-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"
        >
          <div
            v-for="article in posts"
            :key="article.position"
            class="w-full cursor-pointer overflow-hidden rounded bg-stone-900 text-stone-200 shadow md:max-w-lg dark:bg-stone-700 hover:shadow-md"
            :title="article.title"
            @click="router.push({ path: article.path })"
          >
            <template v-if="article.status !== 'draft'">
              <div class="p-4">
                <div class="mb-2 text-xl font-bold">
                  {{ article.title }}
                </div>
                <div class="flex items-center justify-start text-sm space-x-2">
                  <nuxt-time
                    :datetime="article.date"
                    day="numeric"
                    month="long"
                    year="numeric"
                  />
                  <div v-for="(tag, index) in article.tags" :key="index">
                    <span
                      class="mr-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-stone-800 font-medium leading-4"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div class="pt-2">
                  {{ article.description }}
                </div>
              </div>
            </template>
            <template v-else>
              <p class="p-4 col-span-full">
                No published articles found.
              </p>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <p>No articles found.</p>
      </template>
    </template>
  </section>
</template>
