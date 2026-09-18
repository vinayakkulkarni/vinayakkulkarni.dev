<script setup lang="ts">
  import {
    Map as MaplibreMap,
    NavigationControl,
    setWorkerUrl,
  } from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  // MapLibre resolves its worker from a runtime-computed URL, which the bundler
  // cannot see, and the worker imports a sibling chunk by relative path, so a
  // plain hashed copy breaks it. `?worker&url` makes Vite bundle the worker and
  // its dependency into one file and hand back that file's URL.
  import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
  import { VMap } from '@geoql/v-maplibre';
  import '@geoql/v-maplibre/dist/v-maplibre.css';
  import { VLayerStarfield } from '@geoql/v-maplibre/starfield';

  setWorkerUrl(maplibreWorkerUrl);

  const { sunAzimuth, sunAltitude, localSunAltitude, skyMode } =
    useSunPosition();

  // Headless scanners (isitagentready's WebMCP check) wait for networkidle in
  // a no-GPU browser with an 8s timeout; live MapLibre tile streaming never
  // reaches idle and the check times out. Bots get the static gradient, humans
  // get the globe. navigator is browser-only, so the check runs onMounted.
  const isAutomated = ref(false);

  const taglines = [
    'GIS Engineer',
    'Co-Founder',
    'Open Source Cartographer',
    'Vue.js Expert',
    'Geospatial Architect',
  ];

  const mapOptions = {
    container: 'hero-map',
    style: {
      version: 8 as const,
      projection: { type: 'globe' as const },
      sources: {
        satellite: {
          type: 'raster' as const,
          tiles: [
            'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
          ],
          tileSize: 256,
        },
      },
      layers: [
        { id: 'satellite', type: 'raster' as const, source: 'satellite' },
      ],
      sky: {
        'atmosphere-blend': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          0.15,
          5,
          0.3,
          7,
          0,
        ],
      },
    },
    center: [73.85, 18.52] as [number, number],
    zoom: 1.8,
    attributionControl: false,
  };

  function onMapLoaded(map: MaplibreMap) {
    map.addControl(new NavigationControl(), 'top-right');
  }

  onMounted(() => {
    isAutomated.value = navigator.webdriver === true;
  });
</script>

<template>
  <section
    id="hero"
    class="relative flex min-h-dvh items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0">
      <ClientOnly>
        <div
          v-if="isAutomated"
          class="size-full bg-gradient-to-b from-black via-[#0a0e1a] to-[#060810]"
        />
        <VMap
          v-else
          :options="mapOptions"
          projection="globe"
          class="size-full"
          @loaded="onMapLoaded"
        >
          <VLayerStarfield
            id="hero-starfield"
            :star-count="5000"
            :star-size="2.5"
            galaxy-texture-url="/milkyway.jpg"
            :before="'satellite'"
            sun-enabled
            :sun-azimuth="sunAzimuth"
            :sun-altitude="sunAltitude"
            :fade-altitude="localSunAltitude"
          />
        </VMap>
        <template #fallback>
          <div class="size-full bg-black" />
        </template>
      </ClientOnly>
    </div>

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
    />

    <div
      class="pointer-events-none relative z-10 mx-auto max-w-4xl select-none px-6 text-center"
    >
      <div
        class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-xl"
      >
        <span class="text-xs text-white/70">
          <span class="mr-1 font-medium capitalize text-white">{{
            skyMode
          }}</span>
          &middot; Lng {{ sunAzimuth }}&deg; &middot; Decl
          {{ sunAltitude }}&deg; &middot; Local {{ localSunAltitude }}&deg;
        </span>
      </div>

      <DecryptedText
        text="Vinayak Kulkarni"
        class="mb-4 block text-5xl font-bold tracking-tight text-white md:text-7xl"
        :speed="60"
        :max-iterations="15"
        animate-on="view"
        :sequential="true"
      />

      <div
        class="mb-8 flex items-center justify-center gap-2 text-xl text-white/80 md:text-2xl"
      >
        <RotatingText
          :texts="taglines"
          :rotation-interval="3000"
          split-by="characters"
          :stagger-duration="0.03"
          class="font-light"
        />
      </div>

      <div class="pointer-events-auto flex items-center justify-center gap-4">
        <ShimmerButton
          shimmer-color="rgba(120, 119, 198, 0.5)"
          background="rgba(0, 0, 0, 0.7)"
          class="px-8 py-3"
          @click="$router.push('/projects')"
        >
          <span class="text-sm font-medium text-white">View Projects</span>
        </ShimmerButton>

        <a
          href="https://github.com/vinayakkulkarni"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <Icon name="lucide:github" class="size-4" />
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>
