const UPSTREAM = 'https://github-contributions-api.jogruber.de/v4';
const USERNAME_PATTERN = /^[a-z0-9-]{1,39}$/i;
const TOP_REPO_LIMIT = 3;

const LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
] as const;

const COUNTED_EVENTS = new Set([
  'PushEvent',
  'PullRequestEvent',
  'PullRequestReviewEvent',
  'IssuesEvent',
  'IssueCommentEvent',
  'CreateEvent',
  'CommitCommentEvent',
]);

interface UpstreamDay {
  date: string;
  count: number;
  level: number;
}

interface UpstreamPayload {
  total: Record<string, number>;
  contributions: UpstreamDay[];
}

interface GithubEvent {
  type: string;
  repo: { name: string };
  payload: { size?: number; distinct_size?: number };
}

interface CalendarDay {
  color: string;
  contributionCount: number;
  contributionLevel: (typeof LEVELS)[number];
  date: string;
}

function isUpstreamPayload(value: unknown): value is UpstreamPayload {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.total === 'object' &&
    record.total !== null &&
    Array.isArray(record.contributions)
  );
}

function isEventArray(value: unknown): value is GithubEvent[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as GithubEvent).type === 'string' &&
        typeof (item as GithubEvent).repo?.name === 'string',
    )
  );
}

function toWeeks(days: UpstreamDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  let week: CalendarDay[] = [];

  for (const day of days) {
    const dow = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (dow === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    week.push({
      color: '',
      contributionCount: day.count,
      contributionLevel: LEVELS[Math.min(4, Math.max(0, day.level))]!,
      date: day.date,
    });
  }

  if (week.length > 0) weeks.push(week);
  return weeks;
}

async function fetchTopContributions(
  username: string,
  token?: string,
): Promise<{ repo: string; count: number; owner: string }[]> {
  try {
    const headers: Record<string, string> = {
      accept: 'application/vnd.github+json',
      'user-agent': 'vinayakkulkarni.dev',
    };
    if (token) headers.authorization = `Bearer ${token}`;

    const events = await $fetch<unknown>(
      `https://api.github.com/users/${username}/events/public`,
      { headers, query: { per_page: 100 } },
    );
    if (!isEventArray(events)) return [];

    const tally = new Map<string, number>();
    for (const event of events) {
      if (!COUNTED_EVENTS.has(event.type)) continue;
      const weight =
        event.type === 'PushEvent'
          ? (event.payload.size ?? event.payload.distinct_size ?? 1)
          : 1;
      tally.set(event.repo.name, (tally.get(event.repo.name) ?? 0) + weight);
    }

    return [...tally.entries()]
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_REPO_LIMIT)
      .map(([fullName, count]) => {
        const [owner = username, repo = fullName] = fullName.split('/');
        return { repo, count, owner };
      });
  } catch {
    return [];
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const username = getRouterParam(event, 'username');

    if (!username || !USERNAME_PATTERN.test(username)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid GitHub username',
      });
    }

    const payload = await $fetch<unknown>(`${UPSTREAM}/${username}`, {
      headers: { accept: 'application/json' },
      query: { y: 'last' },
    });

    if (!isUpstreamPayload(payload)) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Malformed upstream payload',
      });
    }

    const token = useRuntimeConfig(event).githubToken as string | undefined;
    const topContributions = await fetchTopContributions(username, token);

    setHeader(event, 'x-content-type-options', 'nosniff');

    return {
      contributions: toWeeks(payload.contributions),
      totalContributions: Object.values(payload.total).reduce(
        (sum, n) => sum + n,
        0,
      ),
      topContributions,
    };
  },
  {
    maxAge: 3600,
    name: 'github-contributions',
    getKey: (event) => getRouterParam(event, 'username') ?? 'unknown',
  },
);
