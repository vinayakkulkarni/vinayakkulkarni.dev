// Runs against the prerendered build (`pnpm run build` first): proves every
// live URL is a plain <a href> in the SSR HTML, not added after hydration.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  OPEN_SOURCE_GROUPS,
  PRODUCT_GROUPS,
  projectsIn,
} from '~/data/projects';

function ssrHtml(route: string): string {
  return readFileSync(
    new URL(`../../.output/public${route}/index.html`, import.meta.url),
    'utf8',
  );
}

// href -> opening <a> tag, for every anchor in the page.
function anchors(html: string): Map<string, string> {
  return new Map(
    [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)].map(
      (m) => [m[1]!, m[0]] as const,
    ),
  );
}

function itemListUrls(html: string): string[] {
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => JSON.parse(m[1]!));
  const list = blocks.find((b) => b['@type'] === 'ItemList');
  return list.itemListElement.map((e: { url: string }) => e.url);
}

describe.each([
  ['/open-source', projectsIn(OPEN_SOURCE_GROUPS)],
  ['/projects', projectsIn(PRODUCT_GROUPS)],
])('SSR HTML of %s', (route, projects) => {
  const html = ssrHtml(route);
  const tags = anchors(html);

  it.each(projects.map((p) => p.url))('links %s with <a href>', (url) => {
    expect(tags.has(url)).toBe(true);
  });

  it('owned links are followable (no nofollow)', () => {
    for (const p of projects) {
      const tag = tags.get(p.url) ?? '';
      expect(tag).not.toContain('nofollow');
      expect(tag).toContain('rel="noopener"');
    }
  });

  it('carries an ItemList JSON-LD with each live URL', () => {
    expect(itemListUrls(html)).toEqual(projects.map((p) => p.url));
  });

  // Unreleased products (see tests/unit/projects.test.ts) must not leak.
  it('names no unreleased product', () => {
    for (const host of ['ourkosh.com', 'geolith.app']) {
      expect(html).not.toContain(host);
    }
  });
});
