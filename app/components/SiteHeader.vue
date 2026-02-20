<script setup lang="ts">
import { motion } from "motion-v";

const route = useRoute();
const colorMode = useColorMode();

function isActiveLink(href: string): boolean {
  if (href === "/") return route.path === "/";
  return route.path.startsWith(href);
}

const navLinks = [
  { label: "About", href: "/about", icon: "lucide:user" },
  { label: "Projects", href: "/projects", icon: "lucide:folder-kanban" },
  { label: "Open Source", href: "/open-source", icon: "lucide:heart" },
  { label: "Articles", href: "/articles", icon: "lucide:file-text" },
];

const springTransition = { type: "spring", stiffness: 400, damping: 15 };

function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <header
    class="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center"
  >
    <GlassSurface
      width="fit-content"
      height="fit-content"
      :border-radius="9999"
      :brightness="50"
      :opacity="1"
      :blur="8"
      :background-opacity="0.04"
      :saturation="1.4"
      :distortion-scale="-30"
      :border-width="0.06"
      class="pointer-events-auto mx-auto rounded-full"
    >
      <nav class="flex items-center gap-1 px-2 py-1.5">
        <component
          :is="motion.div"
          class="inline-flex"
          :while-hover="{ scale: 1.1 }"
          :while-tap="{ scale: 0.95 }"
          :transition="springTransition"
        >
          <NuxtLink
            to="/"
            class="rounded-full p-2 text-foreground transition-colors hover:bg-accent/80"
            aria-label="Home"
          >
            <Icon name="base:v-logo" class="size-6" mode="svg" />
          </NuxtLink>
        </component>

        <div class="mx-1 h-4 w-px bg-border/50" />

        <div class="flex items-center gap-0.5 md:hidden">
          <component
            :is="motion.div"
            v-for="link in navLinks"
            :key="link.href"
            class="inline-flex"
            :while-hover="{ scale: 1.15, rotate: 8 }"
            :while-tap="{ scale: 0.9 }"
            :transition="springTransition"
          >
            <NuxtLink
              :to="link.href"
              :class="[
                'rounded-full p-2 transition-colors hover:bg-accent/80 hover:text-foreground',
                isActiveLink(link.href)
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground',
              ]"
              :aria-label="link.label"
            >
              <Icon :name="link.icon" class="size-4" />
            </NuxtLink>
          </component>
        </div>

        <div class="hidden items-center gap-0.5 md:flex">
          <component
            :is="motion.div"
            v-for="link in navLinks"
            :key="link.href"
            class="inline-flex"
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
            :transition="{ duration: 0.2 }"
          >
            <NuxtLink
              :to="link.href"
              :class="[
                'rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-accent/80 hover:text-foreground',
                isActiveLink(link.href)
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground',
              ]"
            >
              {{ link.label }}
            </NuxtLink>
          </component>
        </div>

        <div class="mx-1 h-4 w-px bg-border/50" />

        <component
          :is="motion.button"
          type="button"
          class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent/80 hover:text-foreground"
          aria-label="Toggle color mode"
          :while-hover="{ scale: 1.1, rotate: 15 }"
          :while-tap="{ scale: 0.9, rotate: -15 }"
          :transition="springTransition"
          @click="toggleColorMode"
        >
          <ClientOnly>
            <Icon
              :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
              class="size-4"
            />
            <template #fallback>
              <Icon name="lucide:sun" class="size-4" />
            </template>
          </ClientOnly>
        </component>
      </nav>
    </GlassSurface>
  </header>
</template>
