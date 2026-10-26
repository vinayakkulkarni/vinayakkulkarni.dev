/**
 * Funnel events for vinayakkulkarni.dev. A closed union: every event the site
 * sends is named here, with the exact props it carries.
 */
export type AnalyticsEventMap = {
  /** Reader reached the end of an article body. */
  article_read: { slug: string; readingMinutes: number };
  /** Click on an outbound profile link (GitHub, LinkedIn, X, Reddit). */
  outbound_click: { target: SocialTarget; location: OutboundLocation };
  /** Click on a project / repository card. */
  project_click: { repo: string; section: ProjectSection };
  /** Click on a contact channel in the footer contact block. */
  contact_click: { channel: SocialTarget; location: 'footer' };
  /** Click on an in-site call to action. */
  cta_click: { location: 'hero'; target: 'projects' };
};

export type AnalyticsEvent = keyof AnalyticsEventMap;

export type SocialTarget = 'github' | 'linkedin' | 'x' | 'reddit';

export type OutboundLocation = 'hero' | 'footer';

export type ProjectSection = 'pinned' | 'all' | 'live';

export type AnalyticsProps = Record<string, string | number | boolean>;

/** GA4 handle provided by plugins/5.google-analytics.client.ts as `$ga`. */
export type GtagHandle = {
  event: (name: string, params: AnalyticsProps) => void;
};

/** Plausible handle provided by plugins/7.plausible.client.ts as `$plausible`. */
export type PlausibleHandle = {
  event: (name: string, props: AnalyticsProps) => void;
};

/** The part of the `@openpanel/nuxt` client (`$openpanel`) the site uses. */
export type OpenPanelHandle = {
  track: (name: string, properties?: AnalyticsProps) => unknown;
};

export type AnalyticsHandles = {
  ga?: GtagHandle;
  plausible?: PlausibleHandle;
  openpanel?: OpenPanelHandle;
};

/**
 * The handles provided by plugins/5 (`$ga`) and plugins/7 (`$plausible`).
 * `undefined` when the plugin skipped (automation browser or missing ID).
 *
 * Declared here because Nuxt's generated plugin-injection types
 * (.nuxt/types/plugins.d.ts) do not resolve under TypeScript 7 — every
 * injected key, `$icon` included, comes back `unknown`. The shape matches what
 * Nuxt infers from the plugins, so this stays valid once that is fixed.
 */
declare module '#app' {
  interface NuxtApp {
    $ga: GtagHandle | undefined;
    $plausible: PlausibleHandle | undefined;
  }
}
