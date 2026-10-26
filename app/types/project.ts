export type ProjectTag = 'Product' | 'Library demo' | 'Map plugin' | 'Tool';

export type ProjectGroup =
  | 'Products and sites'
  | 'UI libraries'
  | 'MapLibre plugins'
  | 'Vue components';

export interface LiveProject {
  name: string;
  /** One line, taken from the repo or site description. */
  description: string;
  /** Live site or demo. Always https and returns 200. */
  url: string;
  /** Omitted when the repository is private. */
  github?: string;
  /** Only for packages published on npm by the author. */
  npm?: string;
  tag: ProjectTag;
  group: ProjectGroup;
}
