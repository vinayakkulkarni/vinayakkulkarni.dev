<template>
  <section class="w-full h-full mx-12 my-4">
    <div class="grid grid-flow-col grid-cols-4 gap-4 mb-4">
      <div class="col-span-3">
        <p class="text-3xl">Projects</p>
        <p>
          This page will serve as a listing for all the side-projects, plugins,
          tools created for OSS 💚
        </p>
      </div>
      <nuxt-link
        tag="div"
        class="col-span-1 text-5xl text-right cursor-pointer"
        :to="{ name: 'index' }"
      >
        &larr;
      </nuxt-link>
    </div>
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div
        class="max-w-lg overflow-hidden rounded shadow hover:shadow-md bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">
            <a
              href="https://github.com/vinayakkulkarni/janak"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-foreground-secondary hover:text-foreground-primary"
            >
              <span class="text-foreground-primary">Janak</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                width="15"
                height="15"
                class="w-4 ml-1 fill-current"
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
          </div>
          <p class="text-base">
            Build Vue 3 apps in a breeze!
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow hover:shadow-md bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">
            <a
              href="https://github.com/vinayakkulkarni/v-offline"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-foreground-secondary hover:text-foreground-primary"
            >
              <span class="text-foreground-primary">v-offline</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                width="15"
                height="15"
                class="w-4 ml-1 fill-current"
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
          </div>
          <p class="text-base">
            Detect Offline & Online events
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow hover:shadow-md bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">
            <a
              href="https://github.com/vinayakkulkarni/v-image"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-foreground-secondary hover:text-foreground-primary"
            >
              <span class="text-foreground-primary">v-image</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                width="15"
                height="15"
                class="w-4 ml-1 fill-current"
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
          </div>
          <p class="text-base">
            Tiny css-free component for your input type file
          </p>
        </div>
      </div>
      <div
        class="max-w-lg overflow-hidden rounded shadow hover:shadow-md bg-background-secondary"
      >
        <div class="p-4">
          <div class="mb-2 text-xl font-bold">
            <a
              href="https://github.com/vinayakkulkarni/vue-identify-network"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-foreground-secondary hover:text-foreground-primary"
            >
              <span class="text-foreground-primary">Vue Identify Network</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                width="15"
                height="15"
                class="w-4 ml-1 fill-current"
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
          </div>
          <p class="text-base">
            Detect Offline & Online events
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Projects',
    transition(to, from) {
      if (from && from.name === 'index') {
        return 'slide-right';
      }
      return 'slide-left';
    },
  };
</script>
