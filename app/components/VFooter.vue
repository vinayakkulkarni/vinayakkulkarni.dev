<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <section
    class="min-w-full py-4"
    :class="{ 'border-t border-stone-500': route.name !== 'index' }"
  >
    <div class="w-full flex items-center justify-center">
      <!-- GitHub -->
      <a
        rel="noopener"
        href="https://github.com/vinayakkulkarni"
        target="_blank"
        aria-label="Github"
        class="px-2"
      >
        <icon name="line-md:github" size="16" />
      </a>
      <!-- Twitter -->
      <a
        rel="noopener"
        href="https://x.com/_vinayak_k"
        target="_blank"
        aria-label="Twitter"
        class="px-2"
      >
        <icon name="line-md:twitter-x-alt" size="16" />
      </a>
      <!-- LinkedIn -->
      <a
        rel="noopener"
        href="https://www.linkedin.com/in/kulkarnivinayak/"
        target="_blank"
        aria-label="LinkedIn"
        class="px-2"
      >
        <icon name="line-md:linkedin" size="16" />
      </a>
    </div>
  </section>
</template>
