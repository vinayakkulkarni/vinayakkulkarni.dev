// Single source for every live site and demo. /projects, /open-source and
// their ItemList JSON-LD all read from this list. Descriptions come from the
// repository (or, for private repos, the live site) description.
import type { LiveProject, ProjectGroup } from '~/types/project';

const GH = 'https://github.com';
const NPM = 'https://www.npmjs.com/package';

export const LIVE_PROJECTS: readonly LiveProject[] = [
  // Products and sites (/projects)
  {
    name: 'the-doctor.report',
    description:
      'Deterministic health score, diagnostics and safe auto-fixes for Vue 3 and Nuxt 4 apps, from the terminal or CI.',
    url: 'https://the-doctor.report',
    github: `${GH}/geoql/doctor`,
    npm: `${NPM}/@geoql/nuxt-doctor`,
    tag: 'Product',
    group: 'Products and sites',
  },
  {
    name: 'tileserver-rs',
    description:
      'High-performance Rust tile server for PMTiles, MBTiles, PostGIS, and Cloud Optimized GeoTIFFs.',
    url: 'https://tileserver.app',
    github: `${GH}/vinayakkulkarni/tileserver-rs`,
    tag: 'Product',
    group: 'Products and sites',
  },
  {
    name: 'tileserver-rs demo',
    description:
      'Live tileserver-rs instance serving PMTiles and MBTiles to MapLibre GL JS.',
    url: 'https://demo.tileserver.app',
    github: `${GH}/vinayakkulkarni/tileserver-rs`,
    tag: 'Product',
    group: 'Products and sites',
  },
  {
    name: 'GeoQL',
    description:
      'Open-source maps and code-quality tools for Vue and Nuxt. The geoql.in index.',
    url: 'https://geoql.in',
    github: `${GH}/geoql/geoql.in`,
    tag: 'Product',
    group: 'Products and sites',
  },
  {
    name: 'better-helium',
    description:
      'Gives the Helium browser the DRM playback it ships without. Pure bash, zero deps.',
    url: 'https://better-helium.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/better-helium`,
    tag: 'Tool',
    group: 'Products and sites',
  },

  // UI libraries (/open-source)
  {
    name: 'nxui',
    description:
      'Animated, copy-paste UI components for Vue 3 and Nuxt, installed with the shadcn-vue CLI.',
    url: 'https://nxui.geoql.in/docs',
    github: `${GH}/vinayakkulkarni/nxui`,
    tag: 'Library demo',
    group: 'UI libraries',
  },
  {
    name: 'shadscan-vue',
    description:
      'Deterministic audits for shadcn-vue and shadcn-nuxt apps. Vue port of shadscan.',
    url: 'https://shadscan-vue.geoql.in',
    github: `${GH}/vinayakkulkarni/shadscan-vue`,
    npm: `${NPM}/shadscan-vue`,
    tag: 'Tool',
    group: 'UI libraries',
  },
  {
    name: 'mapcn-vue',
    description:
      'Map components for Vue, built on @geoql/v-maplibre and styled with Tailwind CSS.',
    url: 'https://mapcn-vue.geoql.in',
    github: `${GH}/geoql/v-maplibre`,
    tag: 'Library demo',
    group: 'UI libraries',
  },
  {
    name: 'v-maplibre',
    description:
      'Vue 3 components for MapLibre GL: deck.gl, LiDAR, COG, spatial indexing, and more.',
    url: 'https://v-maplibre.geoql.in',
    github: `${GH}/geoql/v-maplibre`,
    npm: `${NPM}/@geoql/v-maplibre`,
    tag: 'Library demo',
    group: 'UI libraries',
  },
  {
    name: 'v-mapkit',
    description:
      'Vue 3 components for Apple MapKit JS: annotations, overlays, Look Around, search and geocoding.',
    url: 'https://v-mapkit.geoql.in',
    github: `${GH}/geoql/v-mapkit`,
    npm: `${NPM}/@geoql/v-mapkit`,
    tag: 'Library demo',
    group: 'UI libraries',
  },

  // MapLibre plugins (/open-source)
  {
    name: 'maplibre-gl-inspect',
    description: 'Inspect control for maplibre-gl-js.',
    url: 'https://maplibre-gl-inspect.geoql.in',
    github: `${GH}/geoql/maplibre-gl-inspect`,
    npm: `${NPM}/maplibre-gl-inspect`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },
  {
    name: 'maplibre-gl-draw-circle',
    description: 'Draw and edit a circle on a MapLibre map.',
    url: 'https://maplibre-gl-draw-circle.geoql.in',
    github: `${GH}/geoql/maplibre-gl-draw-circle`,
    npm: `${NPM}/@geoql/maplibre-gl-draw-circle`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },
  {
    name: 'maplibre-gl-compare',
    description:
      'Swipe-style map comparison control for MapLibre GL JS with theme support.',
    url: 'https://maplibre-gl-compare.geoql.in',
    github: `${GH}/geoql/maplibre-gl-compare`,
    npm: `${NPM}/@geoql/maplibre-gl-compare`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },
  {
    name: 'maplibre-gl-snow',
    description: 'WebGPU snow particle layer for MapLibre GL JS.',
    url: 'https://maplibre-gl-snow.geoql.in',
    github: `${GH}/geoql/maplibre-gl-snow`,
    npm: `${NPM}/@geoql/maplibre-gl-snow`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },
  {
    name: 'maplibre-gl-interpolate-heatmap',
    description: 'IDW interpolated heatmap layer plugin for MapLibre GL JS.',
    url: 'https://maplibre-gl-interpolate-heatmap.geoql.in',
    github: `${GH}/geoql/maplibre-gl-interpolate-heatmap`,
    npm: `${NPM}/maplibre-gl-interpolate-heatmap`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },
  {
    name: 'maplibre-gl-starfield',
    description:
      'MapLibre GL JS custom layer that renders a Three.js starfield skybox with a galaxy panorama.',
    url: 'https://maplibre-gl-starfield.geoql.in',
    github: `${GH}/geoql/maplibre-gl-starfield`,
    npm: `${NPM}/@geoql/maplibre-gl-starfield`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },
  {
    name: 'maplibre-gl-wind',
    description: 'Wind particle animation layer for MapLibre GL JS.',
    url: 'https://maplibre-gl-wind.geoql.in',
    github: `${GH}/geoql/maplibre-gl-wind`,
    npm: `${NPM}/maplibre-gl-wind`,
    tag: 'Map plugin',
    group: 'MapLibre plugins',
  },

  // Vue components (/open-source)
  {
    name: 'v-intl',
    description:
      'Native Intl-based i18n components for Vue 3: number, date, currency, relative time, and list formatting.',
    url: 'https://v-intl.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-intl`,
    npm: `${NPM}/@vinayakkulkarni/v-intl`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-clappr',
    description:
      'Vue 3 wrapper for the Clappr media player with HLS adaptive streaming and custom plugins.',
    url: 'https://v-clappr.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-clappr`,
    npm: `${NPM}/v-clappr`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-github-icon',
    description: 'Vue 3 component for rendering GitHub Octicons.',
    url: 'https://v-github-icon.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-github-icon`,
    npm: `${NPM}/v-github-icon`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-image',
    description:
      'Vue 3 file input component with image preview, drag-and-drop upload, and reactive validation.',
    url: 'https://v-image.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-image`,
    npm: `${NPM}/v-image`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-mapbox',
    description:
      'Vue 3 wrapper for Mapbox GL and MapLibre GL JS with a declarative component API.',
    url: 'https://v-mapbox.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-mapbox`,
    npm: `${NPM}/v-mapbox`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-pip',
    description:
      'Vue 3 wrapper for the native Picture-in-Picture Web API: floating video and document PiP.',
    url: 'https://v-pip.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-pip`,
    npm: `${NPM}/v-pip`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-spotlight',
    description:
      'Vue 3 spotlight overlay component for product tours, feature highlights and onboarding flows.',
    url: 'https://v-spotlight.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-spotlight`,
    npm: `${NPM}/v-spotlight`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-tweakpane',
    description:
      'Vue 3 wrapper for Tweakpane: floating GUI panels for tweaking values.',
    url: 'https://v-tweakpane.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-tweakpane`,
    npm: `${NPM}/v-tweakpane`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-dock-menu',
    description: 'Dockable menu bar for Vue.',
    url: 'https://v-dock-menu.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-dock-menu`,
    npm: `${NPM}/v-dock-menu`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-offline',
    description:
      'Vue 3 component and composable for detecting online and offline network status.',
    url: 'https://v-offline.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-offline`,
    npm: `${NPM}/v-offline`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-canvas',
    description: 'Canvas store and canvas module for Nuxt 4.',
    url: 'https://v-canvas.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-canvas`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-bpm-calc',
    description: 'Metronome meter made with Vue.',
    url: 'https://v-bpm-calc.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-bpm-calc`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-intl-listformat',
    description: 'Tiny Vue component for Intl.ListFormat.',
    url: 'https://v-intl-listformat.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-intl-listformat`,
    npm: `${NPM}/v-intl-listformat`,
    tag: 'Library demo',
    group: 'Vue components',
  },
  {
    name: 'v-rating',
    description: 'Rating component in Semantic UI made with Vue (under 1 kB).',
    url: 'https://v-rating.vinayakkulkarni.dev',
    github: `${GH}/vinayakkulkarni/v-rating`,
    npm: `${NPM}/v-rating`,
    tag: 'Library demo',
    group: 'Vue components',
  },
];

export const PRODUCT_GROUPS: readonly ProjectGroup[] = ['Products and sites'];

export const OPEN_SOURCE_GROUPS: readonly ProjectGroup[] = [
  'UI libraries',
  'MapLibre plugins',
  'Vue components',
];

export function projectsIn(groups: readonly ProjectGroup[]): LiveProject[] {
  return LIVE_PROJECTS.filter((p) => groups.includes(p.group));
}
