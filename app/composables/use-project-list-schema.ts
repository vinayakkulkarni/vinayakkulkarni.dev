import type { LiveProject } from '~/types/project';

// schema.org ItemList of live sites/demos for the page it is called from.
export function buildProjectListSchema(name: string, projects: LiveProject[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      description: p.description,
      url: p.url,
    })),
  };
}

export function useProjectListSchema(name: string, projects: LiveProject[]) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(buildProjectListSchema(name, projects)),
      },
    ],
  });
}
