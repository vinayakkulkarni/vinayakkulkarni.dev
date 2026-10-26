import { describe, expect, it } from 'vitest';
import {
  LIVE_PROJECTS,
  OPEN_SOURCE_GROUPS,
  PRODUCT_GROUPS,
  projectsIn,
} from '~/data/projects';
import { buildProjectListSchema } from '~/composables/use-project-list-schema';

// Private infrastructure must never be linked from the portfolio.
const PRIVATE_HOSTS = [
  'analytics.geoql.in',
  'events.geoql.in',
  'aeo.geoql.in',
  'wakapi',
  'vault',
];

// Products still being built must not be listed until the owner launches
// them. Remove a host from this list only on the owner's word.
const UNRELEASED_HOSTS = ['ourkosh.com', 'geolith.app'];

describe('app/data/projects.ts', () => {
  it.each(LIVE_PROJECTS.map((p) => [p.name, p] as const))(
    '%s has a live https URL and https repo/npm links',
    (_name, project) => {
      const live = new URL(project.url);
      expect(live.protocol).toBe('https:');
      expect(project.description.length).toBeGreaterThan(10);
      if (project.github) {
        expect(project.github).toMatch(
          /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/,
        );
      }
      if (project.npm) {
        expect(project.npm).toMatch(/^https:\/\/www\.npmjs\.com\/package\//);
      }
      for (const host of PRIVATE_HOSTS) {
        expect(live.host).not.toContain(host);
      }
    },
  );

  it('lists no unreleased product (live URL, repo or text)', () => {
    const text = JSON.stringify(LIVE_PROJECTS);
    for (const host of UNRELEASED_HOSTS) {
      expect(text).not.toContain(host);
    }
  });

  it('has no duplicate live URLs', () => {
    const urls = LIVE_PROJECTS.map((p) => p.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('splits into 5 products and 26 open-source demos', () => {
    expect(projectsIn(PRODUCT_GROUPS)).toHaveLength(5);
    expect(projectsIn(OPEN_SOURCE_GROUPS)).toHaveLength(26);
  });

  it('builds an ItemList with every live URL', () => {
    const items = projectsIn(OPEN_SOURCE_GROUPS);
    const schema = buildProjectListSchema('demos', items);
    expect(schema['@type']).toBe('ItemList');
    expect(schema.numberOfItems).toBe(items.length);
    expect(schema.itemListElement.map((e) => e.url)).toEqual(
      items.map((p) => p.url),
    );
  });
});
