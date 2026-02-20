<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { MaplibreStarfieldLayer } from "@geoql/maplibre-gl-starfield";

const mapContainer = useTemplateRef<HTMLDivElement>("mapContainer");
const map = shallowRef<maplibregl.Map | null>(null);
const { sunAzimuth, sunAltitude, skyMode } = useSunPosition();

const taglines = [
  "GIS Engineer",
  "Co-Founder",
  "Open Source Cartographer",
  "Vue.js Expert",
  "Geospatial Architect",
];

function initMap(el: HTMLDivElement) {
  if (map.value) return;

  const m = new maplibregl.Map({
    container: el,
    style: {
      version: 8,
      projection: { type: "globe" },
      sources: {
        satellite: {
          type: "raster",
          tiles: [
            "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
          ],
          tileSize: 256,
        },
      },
      layers: [{ id: "satellite", type: "raster", source: "satellite" }],
      sky: {
        "atmosphere-blend": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          5,
          1,
          7,
          0,
        ],
      },
    },
    center: [73.85, 18.52],
    zoom: 1.8,
    attributionControl: false,
  });

  m.addControl(new maplibregl.NavigationControl(), "top-right");

  m.on("style.load", () => {
    const starfield = new MaplibreStarfieldLayer({
      galaxyTextureUrl: "/milkyway.jpg",
      starCount: 5000,
      starSize: 2.5,
      sunEnabled: true,
      sunAzimuth: sunAzimuth.value,
      sunAltitude: sunAltitude.value,
    });
    m.addLayer(
      starfield as unknown as maplibregl.LayerSpecification,
      "satellite",
    );
  });

  map.value = m;
}

watch(mapContainer, (el) => {
  if (el) initMap(el);
});

onMounted(() => {
  if (mapContainer.value) initMap(mapContainer.value);
});

watch([sunAzimuth, sunAltitude], ([az, alt]) => {
  const m = map.value;
  if (!m) return;
  const layer = m.getLayer("maplibre-starfield");
  if (layer && "implementation" in layer) {
    const impl = layer.implementation as MaplibreStarfieldLayer;
    impl.setSunPosition?.(az, alt);
  }
});

onBeforeUnmount(() => {
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <section
    id="hero"
    class="relative flex min-h-dvh items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0">
      <ClientOnly>
        <div ref="mapContainer" class="size-full" />
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
          &middot; Az {{ sunAzimuth }}&deg; &middot; Alt {{ sunAltitude }}&deg;
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
