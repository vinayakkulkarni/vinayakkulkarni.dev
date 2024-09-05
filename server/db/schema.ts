import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const userTable = pgTable('users', {
  id: text('id').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  username: text('username').notNull(),
  oauthId: integer('oauth_id').notNull(),
  oauthProvider: text('oauth_provider').notNull(),
});

export const sessionTable = pgTable('sessions', {
  id: text('id').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  userId: text('user_id').notNull(),
});

export const insertUserSchema = createInsertSchema(userTable);
export const selectUserSchema = createSelectSchema(userTable);

export const insertSessionSchema = createInsertSchema(sessionTable);
export const selectSessionSchema = createSelectSchema(sessionTable);
