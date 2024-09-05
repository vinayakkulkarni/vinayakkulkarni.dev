CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text NOT NULL,
	"avatar_url" text NOT NULL,
	"username" text NOT NULL,
	"oauth_id" integer NOT NULL,
	"oauth_provider" text NOT NULL
);
