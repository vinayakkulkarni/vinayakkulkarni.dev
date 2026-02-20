export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
  updatedAt: string;
  topics: string[];
  pinned: boolean;
}

export interface GitHubResponse {
  pinned: GitHubRepo[];
  repos: GitHubRepo[];
}
