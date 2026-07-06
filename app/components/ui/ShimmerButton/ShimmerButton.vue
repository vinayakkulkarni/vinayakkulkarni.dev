<script setup lang="ts">
  import { cn } from '~/lib/utils';

  const props = withDefaults(
    defineProps<{
      shimmerColor?: string;
      shimmerSize?: string;
      shimmerDuration?: string;
      borderRadius?: string;
      background?: string;
      class?: string;
    }>(),
    {
      shimmerColor: '#ffffff',
      shimmerSize: '0.05em',
      shimmerDuration: '3s',
      borderRadius: '100px',
      background: 'rgba(0, 0, 0, 1)',
      class: '',
    },
  );

  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === 'dark');

  const resolvedBg = computed(() => {
    if (props.background !== 'rgba(0, 0, 0, 1)') return props.background;
    return isDark.value ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
  });

  const resolvedShimmerColor = computed(() => {
    if (props.shimmerColor !== '#ffffff') return props.shimmerColor;
    return isDark.value ? '#000000' : '#ffffff';
  });
</script>

<template>
  <button
    :class="
      cn(
        'shimmer-button group relative z-0 inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-sm font-medium text-white transition-transform duration-300 ease-in-out active:translate-y-px dark:border-black/10 dark:text-black',
        $props.class,
      )
    "
    :style="{
      '--spread': '90deg',
      '--shimmer-color': resolvedShimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': resolvedBg,
    }"
  >
    <!-- spark container -->
    <span class="shimmer-spark-container absolute inset-0 -z-30">
      <!-- spark -->
      <span class="shimmer-spark absolute inset-0 animate-shimmer-slide">
        <!-- spark gradient -->
        <span
          class="shimmer-spark-gradient absolute -inset-full w-auto rotate-0 animate-spin-around"
        ></span>
      </span>
    </span>

    <!-- content -->
    <span class="relative z-10 flex items-center gap-2">
      <slot>Shimmer Button</slot>
    </span>

    <!-- highlight -->
    <span
      class="shimmer-highlight absolute inset-0 size-full rounded-2xl px-4 py-1.5 transition-all duration-300 ease-in-out"
    ></span>

    <!-- backdrop -->
    <span class="shimmer-backdrop absolute -z-20"></span>
  </button>
</template>

<style scoped>
  .shimmer-button {
    background: var(--bg);
    border-radius: var(--radius);
  }

  .shimmer-spark-container {
    overflow: visible;
    filter: blur(2px);
    container-type: size;
  }

  .shimmer-spark {
    height: 100cqh;
    aspect-ratio: 1;
    border-radius: 0;
    mask: none;
  }

  .shimmer-spark-gradient {
    background: conic-gradient(
      from calc(270deg - (var(--spread) * 0.5)),
      transparent 0,
      var(--shimmer-color) var(--spread),
      transparent var(--spread)
    );
  }

  .shimmer-highlight {
    box-shadow: inset 0 -8px 10px oklch(1 0 0 / 0.122);
  }

  .group:hover .shimmer-highlight {
    box-shadow: inset 0 -6px 10px oklch(1 0 0 / 0.247);
  }

  .group:active .shimmer-highlight {
    box-shadow: inset 0 -10px 10px oklch(1 0 0 / 0.247);
  }

  :global(.dark) .shimmer-highlight {
    box-shadow: inset 0 -8px 10px oklch(0 0 0 / 0.051);
  }

  :global(.dark) .group:hover .shimmer-highlight {
    box-shadow: inset 0 -6px 10px oklch(0 0 0 / 0.078);
  }

  :global(.dark) .group:active .shimmer-highlight {
    box-shadow: inset 0 -10px 10px oklch(0 0 0 / 0.078);
  }

  .shimmer-backdrop {
    background: var(--bg);
    border-radius: var(--radius);
    inset: var(--cut);
  }
</style>
