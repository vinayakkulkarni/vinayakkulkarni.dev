import type { SocialTarget } from './analytics';

export type SocialLink = {
  label: string;
  icon: string;
  url: string;
  /** Analytics target, or `null` for links that stay on this site. */
  target: SocialTarget | null;
};
