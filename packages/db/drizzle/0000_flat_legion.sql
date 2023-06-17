CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" text,
	"phone" varchar(256)
);
