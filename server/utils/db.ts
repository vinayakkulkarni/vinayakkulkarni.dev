import postgres from 'postgres';

const config = useRuntimeConfig();

export const sql = postgres(config.database.url, {
  ssl: { rejectUnauthorized: false },
});

export interface DatabaseUser {
  id: string;
  username: string;
  oauth_provider: string;
  oauth_id: number;
  avatar_url: string;
}
