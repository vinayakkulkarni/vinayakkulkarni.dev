import { readArticlesFromDisk } from '~~/server/utils/articles-from-disk';

const BASE_URL = 'https://vinayakkulkarni.dev';

export default defineEventHandler(async (event: H3Event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const articles = await readArticlesFromDisk();

  const articleLines = articles
    .map((a) => `- [${a.title}](${BASE_URL}${a.path}): ${a.description}`)
    .join('\n');

  return `# Vinayak Kulkarni

> GIS Engineer & Co-Founder building geospatial infrastructure — MapLibre, Planetiler, PMTiles, and Vue.js. Open-source cartographer shipping maps, tiling pipelines, and mapping tooling.

Vinayak Kulkarni is a GIS engineer and co-founder at Invarya Technologies, where he builds maps.guru and geospatial tooling. He works across the modern web-mapping stack — MapLibre GL for rendering, Planetiler and PMTiles for vector-tile generation and delivery, and Vue.js on the frontend — and maintains open-source Vue mapping packages including v-maplibre and maplibre-gl-starfield.

## Pages

- [About](${BASE_URL}/about): Who Vinayak is — a GIS engineer and co-founder focused on geospatial infrastructure, web cartography, and open-source mapping.
- [Projects](${BASE_URL}/projects): Selected work across web mapping, vector tiling, and geospatial platforms, including maps.guru.
- [Open Source](${BASE_URL}/open-source): Vue and MapLibre open-source packages Vinayak maintains, such as v-maplibre and maplibre-gl-starfield.
- [Articles](${BASE_URL}/articles): Writing on GIS, MapLibre, vector tiles, PMTiles, and building with Vue.js.

## Articles

${articleLines || '- No articles published yet.'}

## Optional

- [Full content index](${BASE_URL}/llms-full.txt): Plaintext of the most important pages for single-round-trip ingestion.
`;
});
