import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let db: PostgresJsDatabase<Record<string, never>>;
let sql: ReturnType<typeof postgres>;

export const useDrizzle = () => {
  if (!db) {
    const config = useRuntimeConfig();
    if (!sql) {
      sql = postgres(config.database.url, {
        ssl: false,
        max: 10,
        idle_timeout: 20,
        connect_timeout: 30,
      });
    }
    try {
      db = drizzle(sql);
    } catch (error) {
      console.error('Error initializing database connection:', error);
      throw createError({
        statusCode: 500,
        message: 'Failed to initialize database connection',
      });
    }
  }
  return db;
};

export interface DatabaseUser {
  id: string;
  username: string;
  oauth_provider: string;
  oauth_id: number;
  avatar_url: string;
}
