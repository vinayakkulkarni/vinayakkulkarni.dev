<template>
  <section
    class="min-w-full py-4"
    :class="{ 'border-t border-stone-500': $route.name !== 'index' }"
  >
    <div class="w-full flex items-center justify-center">
      <!-- GitHub -->
      <a
        rel="noopener"
        href="https://github.com/vinayakkulkarni"
        target="_blank"
        aria-label="Github"
        class="px-2 transition-colors duration-100 ease-linear hover:text-dark-300"
      >
        <icon name="base:github" size="16" />
      </a>
      <!-- Twitter -->
      <a
        rel="noopener"
        href="https://twitter.com/_vinayak_k"
        target="_blank"
        aria-label="Twitter"
        class="px-2 transition-colors duration-100 ease-linear hover:text-blue-300"
      >
        <icon name="base:twitter" size="16" />
      </a>
      <!-- LinkedIn -->
      <a
        rel="noopener"
        href="https://www.linkedin.com/in/kulkarnivinayak/"
        target="_blank"
        aria-label="LinkedIn"
        class="px-2 transition-colors duration-100 ease-linear hover:text-blue-400"
      >
        <icon name="base:linkedin" size="16" />
      </a>
      <!-- Codepen -->
      <a
        rel="noopener"
        href="https://codepen.io/vinayakkulkarni"
        target="_blank"
        aria-label="Codepen"
        class="px-2 transition-colors duration-100 ease-linear hover:text-dark-400"
      >
        <icon name="base:codepen" size="16" />
      </a>
    </div>
  </section>
</template>
