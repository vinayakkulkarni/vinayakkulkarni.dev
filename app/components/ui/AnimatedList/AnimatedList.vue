<script setup lang="ts">
  import { cn } from '~/lib/utils';

  const props = withDefaults(
    defineProps<{
      items?: string[];
      showGradients?: boolean;
      enableArrowNavigation?: boolean;
      displayScrollbar?: boolean;
      initialSelectedIndex?: number;
      class?: string;
    }>(),
    {
      items: () => Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`),
      showGradients: true,
      enableArrowNavigation: true,
      displayScrollbar: true,
      initialSelectedIndex: -1,
    },
  );

  const emit = defineEmits<{
    select: [item: string, index: number];
  }>();

  const listRef = ref<HTMLElement | null>(null);
  const selectedIndex = ref(props.initialSelectedIndex);
  const keyboardNav = ref(false);
  const topGradientOpacity = ref(0);
  const bottomGradientOpacity = ref(1);

  // Item visibility tracking
  const itemRefs = ref<HTMLElement[]>([]);
  const itemVisible = ref<boolean[]>([]);

  function setItemRef(el: HTMLElement | null, index: number) {
    if (el) {
      itemRefs.value[index] = el;
    }
  }

  onMounted(() => {
    itemVisible.value = Array.from<boolean>({
      length: props.items.length,
    }).fill(false);

    // Set up intersection observers for each item
    itemRefs.value.forEach((el, index) => {
      if (!el) return;
      useIntersectionObserver(
        ref(el),
        ([entry]) => {
          itemVisible.value[index] = entry?.isIntersecting ?? false;
        },
        { threshold: 0.5 },
      );
    });
  });

  function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    topGradientOpacity.value = Math.min(scrollTop / 50, 1);
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    bottomGradientOpacity.value =
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1);
  }

  function handleItemClick(item: string, index: number) {
    selectedIndex.value = index;
    emit('select', item, index);
  }

  const scrollbarHidden = computed(() => props.displayScrollbar === false);

  function itemStyle(index: number) {
    const visible = itemVisible.value[index];
    return {
      transform: visible ? 'scale(1)' : 'scale(0.7)',
      opacity: visible ? 1 : 0,
      transitionDelay: '100ms',
    };
  }

  // Keyboard navigation
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (!props.enableArrowNavigation) return;

    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      keyboardNav.value = true;
      selectedIndex.value = Math.min(
        selectedIndex.value + 1,
        props.items.length - 1,
      );
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      keyboardNav.value = true;
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
    } else if (e.key === 'Enter') {
      if (
        selectedIndex.value >= 0 &&
        selectedIndex.value < props.items.length
      ) {
        e.preventDefault();
        emit('select', props.items[selectedIndex.value], selectedIndex.value);
      }
    }
  });

  // Scroll selected into view on keyboard nav
  function scrollIntoView() {
    if (!keyboardNav.value || selectedIndex.value < 0 || !listRef.value) return;
    const container = listRef.value;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex.value}"]`,
    ) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth',
        });
      }
    }
    keyboardNav.value = false;
  }

  // Trigger scroll when selectedIndex changes
  onMounted(() => {
    scrollIntoView();
  });

  onBeforeUnmount(() => {
    // Cleanup handled by VueUse
  });
</script>

<template>
  <div :class="cn('animated-list relative', $props.class)">
    <div
      ref="listRef"
      class="animated-list-scroll overflow-y-auto p-4"
      :class="{ 'scrollbar-none': scrollbarHidden }"
      @scroll="handleScroll"
    >
      <div
        v-for="(item, index) in items"
        :key="`${item}-${index}`"
        :ref="(el) => setItemRef(el as HTMLElement, index)"
        :data-index="index"
        class="mb-4 cursor-pointer transition-all duration-200"
        :style="itemStyle(index)"
        @mouseenter="selectedIndex = index"
        @click="handleItemClick(item, index)"
      >
        <div
          class="rounded-lg p-4 transition-colors"
          :class="
            selectedIndex === index ? 'bg-muted-foreground/20' : 'bg-muted/50'
          "
        >
          <p class="m-0 text-foreground">{{ item }}</p>
        </div>
      </div>
    </div>
    <template v-if="showGradients">
      <div
        class="animated-list-gradient-top pointer-events-none absolute left-0 right-0 top-0 bg-gradient-to-b from-background to-transparent transition-opacity duration-300"
        :style="{ opacity: topGradientOpacity }"
      ></div>
      <div
        class="animated-list-gradient-bottom pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent transition-opacity duration-300"
        :style="{ opacity: bottomGradientOpacity }"
      ></div>
    </template>
    <!-- Trigger scroll into view -->
    <span v-if="scrollIntoView" class="hidden"></span>
  </div>
</template>

<style scoped>
  .animated-list {
    width: 500px;
  }

  .animated-list-scroll {
    max-height: 400px;
  }

  .animated-list-gradient-top {
    height: 50px;
  }

  .animated-list-gradient-bottom {
    height: 100px;
  }
</style>
