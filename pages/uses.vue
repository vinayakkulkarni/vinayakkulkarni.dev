<template>
  <section class="w-full h-full mt-16 overflow-hidden xl:mt-0">
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="inline-flex flex-col self-center justify-end col-span-3">
        <p class="text-3xl">Uses</p>
        <p>
          There are times where people ask me about what software or gear I am
          using. This page will serve as a living document for people to always
          know the latest and greatest.
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="inline-flex self-center justify-end col-span-1 text-5xl cursor-pointer"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <div style="height: calc(100% - 6rem)">
      <vue-scroll :ops="scrollOps">
        <div class="py-4">
          <p class="text-xl font-bold border-b">Hardware</p>
          <!-- Laptop 1 -->
          <a
            href="https://www.amazon.in/gp/product/B01CDYB0QS"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; MacBook Pro (16-inch, 2019), 2.6 GHz 6-Core Intel Core i7, 16
            GB 2667 MHz DDR4
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <!-- Laptop 2 -->

          <a
            href="https://www.amazon.in/gp/product/B01CDYB0QS"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; MacBook Pro (15-inch, 2017), 2.8 GHz quad-core Intel Core i7,
            16 GB 2133 MHz DDR3
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <!-- Monitor -->
          <a
            href="https://www.amazon.in/gp/product/B01CDYB0QS"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; LG 27UD88 27 Inch 4K UHD IPS LED Backlit Monitor
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <!-- Phone -->
          <a
            href="https://www.oneplus.in/6/specs"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; OnePlus 6
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <p class="text-xl font-bold border-b">Editor &amp; Terminal</p>
          <a
            href="https://code.visualstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; Visual Studio Code
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <a
            href="https://iterm2.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; iTerm 2
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <p class="p-2 text-xl font-bold border-b">Apps</p>
          <a
            href="https://notion.so/"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; Notion
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <a
            href="https://www.omnidb.org/en/"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            &bull; OmniDB
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="inline align-top fill-current text-foreground-secondary hover:text-foreground-primary"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              />
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              />
            </svg>
          </a>
          <!-- Credits -->
          &rarr; This page is inspired by
          <a
            href="https://www.bencodezen.io/uses/"
            rel="noopener"
            target="_blank"
            class="italic hover:underline hover:text-foreground-secondary focus:text-green-500"
          >
            Ben Hong's Uses page
          </a>
        </div>
      </vue-scroll>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    name: 'VUses',
    transition(_, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
    data() {
      return {
        scrollOps: {
          scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: false,
            scrollingY: true,
            speed: 500,
            easing: 'easeInQuad',
            verticalNativeBarPos: 'right',
          },
          rail: {
            background: '#01a99a',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: true,
          },
          bar: {
            showDelay: 5000,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#1E1E1E',
            opacity: 0.7,
            hoverStyle: true,
            specifyBorderRadius: false,
            minSize: 0,
            size: '6px',
            disable: false,
          },
        },
      };
    },
  });
</script>
