<template>
  <section class="h-full w-full flex items-center justify-center">
    <nuxt-page :key="$route.fullPath">
      <slot></slot>
    </nuxt-page>
  </section>
</template>
