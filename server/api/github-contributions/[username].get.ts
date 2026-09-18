const UPSTREAM = 'https://github-contributions-api.jogruber.de/v4';
const USERNAME_PATTERN = /^[a-zA-Z0-9-]{1,39}$/;

interface UpstreamDay {
  date: string;
  count: number;
  level: number;
}

interface UpstreamPayload {
  total: Record<string, number>;
  contributions: UpstreamDay[];
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

    return await $fetch<UpstreamPayload>(`${UPSTREAM}/${username}`, {
      query: { y: 'last' },
    });
  },
  {
    maxAge: 3600,
    name: 'github-contributions',
    getKey: (event) => getRouterParam(event, 'username') ?? 'unknown',
  },
);
