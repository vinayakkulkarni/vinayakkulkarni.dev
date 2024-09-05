import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub } from 'arctic';
import { sessionTable, userTable } from '../db/schema';

// Polyfill for webcrypto
// import { webcrypto } from 'crypto';
// globalThis.crypto = webcrypto as Crypto;

const db = useDrizzle();

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

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
