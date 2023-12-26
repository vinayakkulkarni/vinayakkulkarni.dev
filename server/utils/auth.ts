import { Lucia, type Cookie } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { db } from './db';
import { GitHub } from 'arctic';
import type { H3Event } from 'h3';
// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new BetterSqlite3Adapter(db, {
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
      githubId: attributes.github_id,
      avatarUrl: attributes.avatar_url,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
  }
  interface DatabaseUserAttributes {
    username: string;
    github_id: number;
    avatar_url: string;
  }
}
export const setLuciaCookie = (event: H3Event, cookie: Cookie) => {
  setCookie(event, cookie.name, cookie.value, cookie.attributes);
};
const config = useRuntimeConfig();

export const github = new GitHub(
  config.oauth.github.clientId,
  config.oauth.github.clientSecret,
);
