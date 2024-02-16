import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { pool } from '~/server/utils/db';
import type { DatabaseUser } from '~/server/utils/db';

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

    // Connect to the database
    const db = await pool.connect();
    // Execute the query
    const result = await db.query('SELECT * FROM "user" WHERE github_id = $1', [
      githubUser.id,
    ]);
    console.log('result from db :', result);
    // Check if a user exists
    const existingUser: DatabaseUser = result.rows[0]; // First row returned by the query
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      console.log('user found, creating session: ', session);
      appendHeader(
        event,
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
      );
      return sendRedirect(event, '/');
    }
    console.log('user not found, creating user');
    // Generate a new user id
    const userId = generateId(15);
    // Execute the query
    await db.query(
      'INSERT INTO "user" (id, github_id, username, avatar_url) VALUES ($1, $2, $3, $4)',
      [userId, githubUser.id, githubUser.login, githubUser.avatar_url],
    );
    console.log('user created');
    // Release the client to the pool
    db.release();

    const session = await lucia.createSession(userId, {});
    console.log('new user created, creating session: ', session);
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

interface GitHubUser {
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
  email: any;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
