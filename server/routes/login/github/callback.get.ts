import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { eq, and } from 'drizzle-orm';
import {
  insertUserSchema,
  selectUserSchema,
  userTable,
} from '../../../db/schema';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, 'github_oauth_state') ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUser = await $fetch<GitHubUser>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const db = useDrizzle();

    // Query for existing user
    const existingUsers = await db
      .select()
      .from(userTable)
      .where(
        and(
          eq(userTable.oauthId, githubUser.id),
          eq(userTable.oauthProvider, 'github'),
        ),
      )
      .limit(1);

    const existingUser = selectUserSchema.parse(existingUsers[0]);

    // Check if a user exists
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
      );
      return sendRedirect(event, '/');
    }

    // Generate a new user id
    const userId = generateId(15);

    // Insert new user
    const newUser = insertUserSchema.parse({
      id: userId,
      oauthProvider: 'github',
      oauthId: githubUser.id,
      username: githubUser.login,
      avatarUrl: githubUser.avatar_url,
    });

    await db.insert(userTable).values(newUser);

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      'Set-Cookie',
      lucia.createSessionCookie(session.id).serialize(),
    );
    return sendRedirect(event, '/');
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === 'bad_verification_code'
    ) {
      // invalid code
      throw createError({
        status: 400,
      });
    }
    throw createError({
      status: 500,
    });
  }
});

type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
