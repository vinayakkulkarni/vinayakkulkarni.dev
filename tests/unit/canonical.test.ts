import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { useCanonicalLink } from '~/composables/use-canonical-link';
import {
  canonicalPath,
  canonicalUrl,
  trailingSlashRedirect,
} from '#shared/utils/canonical';

const ORIGIN = 'https://vinayakkulkarni.dev';

// GSC flagged these as "Duplicate without user-selected canonical".
const FLAGGED = [
  '/about/',
  '/articles/',
  '/articles/encoding-elevation-into-pixels/',
];

describe('canonical URL style (no trailing slash)', () => {
  it('drops the trailing slash everywhere except the root', () => {
    expect(canonicalPath('/')).toBe('/');
    expect(canonicalPath('/about')).toBe('/about');
    expect(canonicalPath('/about/')).toBe('/about');
    expect(canonicalPath('/articles/x//')).toBe('/articles/x');
    expect(canonicalUrl('/')).toBe(`${ORIGIN}/`);
    expect(canonicalUrl('/articles/')).toBe(`${ORIGIN}/articles`);
  });

  it('builds a same-site redirect target that keeps the query', () => {
    expect(trailingSlashRedirect('/about', '')).toBeNull();
    expect(trailingSlashRedirect('/', '')).toBeNull();
    expect(trailingSlashRedirect('/about/', '?x=1')).toBe('/about?x=1');
    expect(trailingSlashRedirect('//evil.com/', '')).toBe('/evil.com');
  });
});

describe('server/middleware/0.trailing-slash', () => {
  type Redirect = { location: string; status: number };
  type FakeEvent = { url: URL };
  let handler: (event: FakeEvent) => Redirect | undefined;

  beforeAll(async () => {
    // Nitro auto-imports, replaced by minimal fakes.
    vi.stubGlobal('defineEventHandler', <T>(h: T) => h);
    vi.stubGlobal('getRequestURL', (event: FakeEvent) => event.url);
    vi.stubGlobal(
      'sendRedirect',
      (_event: FakeEvent, location: string, status: number) => ({
        location,
        status,
      }),
    );
    ({ default: handler } =
      await import('../../server/middleware/0.trailing-slash'));
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it.each(FLAGGED)('308s %s to the slash-less URL', (path) => {
    const res = handler({ url: new URL(`${ORIGIN}${path}?ref=gsc`) });
    expect(res).toEqual({
      location: `${path.replace(/\/$/, '')}?ref=gsc`,
      status: 308,
    });
  });

  it('passes canonical paths and the root through', () => {
    for (const path of ['/', '/about', '/articles/x']) {
      expect(handler({ url: new URL(`${ORIGIN}${path}`) })).toBeUndefined();
    }
  });
});

describe('useCanonicalLink', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    ['/', `${ORIGIN}/`],
    ['/about', `${ORIGIN}/about`],
    ['/articles/', `${ORIGIN}/articles`],
  ])('emits rel=canonical for %s as %s', (path, expected) => {
    const useHead = vi.fn();
    vi.stubGlobal('useRoute', () => ({ path }));
    vi.stubGlobal('useHead', useHead);

    useCanonicalLink();

    const [input] = useHead.mock.calls[0]!;
    const [link] = input.link;
    expect(link.rel).toBe('canonical');
    expect(link.href()).toBe(expected);
  });
});

describe('wrangler assets routing (nuxt.config.ts)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends every slash path to the Worker and drops folder slashes', async () => {
    vi.stubGlobal('defineNuxtConfig', (c: unknown) => c);
    const { default: config } = await import('../../nuxt.config');
    const assets = config.nitro?.cloudflare?.wrangler?.assets;
    expect(assets?.html_handling).toBe('drop-trailing-slash');
    expect(assets?.run_worker_first).toContain('/*/');
    expect(assets?.run_worker_first).toContain('/articles');
  });
});
