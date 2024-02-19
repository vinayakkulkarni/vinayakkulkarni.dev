import { Lucia } from 'lucia';
import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql';
import { GitHub } from 'arctic';
import { sql } from '~/server/utils/db';
import type { DatabaseUser } from '~/server/utils/db';

// Polyfill for webcrypto
// import { webcrypto } from 'crypto';
// globalThis.crypto = webcrypto as Crypto;

const adapter = new PostgresJsAdapter(sql, {
  user: 'user',
  session: 'session',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      githubId: attributes.oauth_id,
      avatarUrl: attributes.avatar_url,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
  }
}

const config = useRuntimeConfig();

export const github = new GitHub(
  config.oauth.github.clientId,
  config.oauth.github.clientSecret,
);
