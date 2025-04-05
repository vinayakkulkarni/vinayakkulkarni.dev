<script setup lang="ts">
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>

<template>
  <section class="flex items-center justify-between invisible min-w-full p-4">
    <!-- Logo -->
    <nuxt-link to="/" class="visible pl-4 cursor-pointer">
      <icon
        :name="isDark ? 'base:v-logo-dark' : 'base:v-logo-dark'"
        size="32"
        mode="svg"
        class="text-black v-logo dark:text-white"
      />
    </nuxt-link>
    <div class="flex items-center justify-center visible gap-4 px-4 py-2">
      <!-- Theme switcher -->
      <client-only>
        <span class="relative z-0 inline-flex rounded-full cursor-pointer">
          <icon
            :name="isDark ? 'carbon:moon' : 'carbon:sun'"
            size="16"
            @click="toggleDark()"
          />
        </span>
      </client-only>
    </div>
  </section>
</template>
