import pg from 'pg';

const config = useRuntimeConfig();

export const pool = new pg.Pool({
  connectionString: config.database.url,
});

export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
  avatar_url: string;
}
