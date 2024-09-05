import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL as string,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  introspect: {
    casing: 'camel',
  },
  verbose: process.env.NODE_ENV === 'development',
});
