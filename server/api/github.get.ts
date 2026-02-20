import type { GitHubRepo, GitHubResponse } from '~~/app/types/github';

const GITHUB_USERNAME = 'vinayakkulkarni';
const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const FALLBACK_PINNED_NAMES = ['tileserver-rs', 'vue-nuxt-best-practices'];

const FALLBACK_GEOQL_REPOS = [
  'geoql/v-maplibre',
  'geoql/maplibre-gl-interpolate-heatmap',
  'geoql/maplibre-gl-compare',
  'geoql/maplibre-gl-wind',
];

interface GraphQLPinnedNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  updatedAt: string;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
}

interface RestRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  Rust: '#dea584',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  Go: '#00ADD8',
  CSS: '#563d7c',
  HTML: '#e34c26',
};

async function fetchPinnedRepos(token?: string): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'vinayakkulkarni.dev',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const query = `{
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name color }
            updatedAt
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  }`;

  const response = await $fetch<{
    data: {
      user: { pinnedItems: { nodes: GraphQLPinnedNode[] } };
    };
  }>(GITHUB_GRAPHQL, {
    method: 'POST',
    headers,
    body: { query },
  });

  return response.data.user.pinnedItems.nodes.map(
    (node): GitHubRepo => ({
      name: node.name,
      description: node.description,
      url: node.url,
      stars: node.stargazerCount,
      forks: node.forkCount,
      language: node.primaryLanguage?.name ?? null,
      languageColor: node.primaryLanguage?.color ?? null,
      updatedAt: node.updatedAt,
      topics: node.repositoryTopics.nodes.map((t) => t.topic.name),
      pinned: true,
    }),
  );
}

async function fetchAllRepos(token?: string): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'vinayakkulkarni.dev',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const data = await $fetch<RestRepo[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos`,
    {
      headers,
      query: {
        sort: 'updated',
        per_page: 50,
        type: 'owner',
      },
    },
  );

  return data
    .filter((repo) => !repo.fork)
    .map(
      (repo): GitHubRepo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        languageColor: repo.language
          ? (LANGUAGE_COLORS[repo.language] ?? null)
          : null,
        updatedAt: repo.updated_at,
        topics: repo.topics ?? [],
        pinned: false,
      }),
    );
}

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);
    const token = config.githubToken as string | undefined;

    let [pinned, repos] = await Promise.all([
      fetchPinnedRepos(token).catch(() => [] as GitHubRepo[]),
      fetchAllRepos(token).catch(() => [] as GitHubRepo[]),
    ]);

    if (pinned.length === 0 && repos.length > 0) {
      const fallbackSet = new Set(FALLBACK_PINNED_NAMES);
      pinned = repos
        .filter((r) => fallbackSet.has(r.name))
        .map((r) => ({ ...r, pinned: true }));

      const geoqlHeaders = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'vinayakkulkarni.dev',
      };

      const geoqlResults = await Promise.allSettled(
        FALLBACK_GEOQL_REPOS.map((fullName) =>
          $fetch<RestRepo>(`${GITHUB_API}/repos/${fullName}`, {
            headers: geoqlHeaders,
          }),
        ),
      );

      for (const result of geoqlResults) {
        if (result.status !== 'fulfilled') continue;
        const repo = result.value;
        pinned.push({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          languageColor: repo.language
            ? (LANGUAGE_COLORS[repo.language] ?? null)
            : null,
          updatedAt: repo.updated_at,
          topics: repo.topics ?? [],
          pinned: true,
        });
      }
    }

    const pinnedNames = new Set(pinned.map((r) => r.name));
    const filteredRepos = repos.filter((r) => !pinnedNames.has(r.name));

    const response: GitHubResponse = {
      pinned,
      repos: filteredRepos,
    };

    return response;
  },
  {
    maxAge: 3600,
    name: 'github-repos',
  },
);
