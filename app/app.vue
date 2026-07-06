<script setup lang="ts">
  // Site-wide Open Graph defaults — every page inherits these; pages can still
  // override ogTitle/ogDescription/ogImage/ogUrl in their own useSeoMeta.
  useSeoMeta({
    ogType: 'website',
    ogSiteName: 'Vinayak Kulkarni',
    twitterSite: '@_vinayak_k',
  });

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Vinayak Kulkarni',
          url: 'https://vinayakkulkarni.dev',
          jobTitle: 'GIS Engineer & Co-Founder',
          description:
            'Co-Founder building geospatial infrastructure. Specializing in MapLibre, Planetiler, PMTiles, and Vue.js. Open source cartographer.',
          worksFor: {
            '@type': 'Organization',
            name: 'Invarya Technologies Private Limited',
            url: 'https://invarya.com',
          },
          knowsAbout: [
            'Geospatial Engineering',
            'MapLibre GL',
            'Planetiler',
            'PMTiles',
            'Vue.js',
            'Cartography',
            'Open Source',
          ],
          sameAs: [
            'https://github.com/vinayakkulkarni',
            'https://x.com/_vinayak_k',
            'https://www.linkedin.com/in/kulkarnivinayak/',
            'https://www.reddit.com/user/vinayak-kulkarni/',
          ],
        }),
      },
    ],
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
