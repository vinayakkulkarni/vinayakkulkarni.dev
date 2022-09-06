<template>
  <section class="flex items-center justify-center w-full h-full">
    <nuxt-page :page-key="$route.params.article">
      <slot />
    </nuxt-page>
  </section>
</template>
