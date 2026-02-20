<template>
  <div
    class="flex min-h-dvh flex-col scroll-smooth bg-background text-foreground antialiased"
  >
    <SiteHeader />
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>
