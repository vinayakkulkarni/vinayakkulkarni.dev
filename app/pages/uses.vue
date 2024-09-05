<template>
  <section class="h-full w-full overflow-hidden p-4">
    <div class="grid grid-flow-col grid-cols-4 gap-4">
      <div class="col-span-3 inline-flex flex-col self-center justify-end">
        <p class="text-3xl">
          Uses
        </p>
        <p>
          There are times where people ask me about what software or gear I am
          using. This page will serve as a living document for people to always
          know the latest and greatest.
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="col-span-1 inline-flex cursor-pointer self-center justify-end text-5xl"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <p class="border-b text-xl font-bold dark:border-stone-500">
      Hardware
    </p>
    <!-- MBP -->
    <a
      href="https://www.apple.com/in/shop/savedItem/Z176?option.hard_drive_solid_state_drive_aos_phantom_z176=065-CDP7&option.sw_logic_pro_z176=065-CDTY&option.sw_final_cut_pro_z176=065-CDTW&option.memory_aos_phantom_z176=065-CDP4"
      target="_blank"
      rel="noopener noreferrer"
      class="block"
    >
      &bull; MacBook Pro (16-inch, 2023), Apple M2 Max with 12‑core CPU, 38‑core
      GPU and 16‑core Neural Engine, 96 GB unified memory
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        width="15"
        height="15"
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
      href="https://www.amazon.in/gp/product/B01CDYB0QS"
      target="_blank"
      rel="noopener noreferrer"
      class="block"
    >
      &bull; MacBook Pro (15-inch, 2017), 2.8 GHz quad-core Intel Core i7, 16 GB
      2133 MHz DDR3
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        width="15"
        height="15"
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
    <!-- Phone 1 :: iPhone -->
    <a
      href="https://www.apple.com/in/shop/buy-iphone/iphone-13-pro/6.7-inch-display-1tb-graphite"
      target="_blank"
      rel="noopener noreferrer"
      class="block"
    >
      &bull; iPhone 13 Pro Max
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        width="15"
        height="15"
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
    <!-- Phone 2 :: OnePlus 6 -->
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
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
    <p class="border-b text-xl font-bold dark:border-stone-500">
      Editor &amp; Terminal
    </p>
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
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
    <p class="border-b p-2 text-xl font-bold dark:border-stone-500">
      Apps
    </p>
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
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
        class="text-foreground-secondary hover:text-foreground-primary inline fill-current align-top"
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
      class="hover:text-foreground-secondary italic focus:text-green-500 hover:underline"
    >
      Ben Hong's Uses page
    </a>
  </section>
</template>
