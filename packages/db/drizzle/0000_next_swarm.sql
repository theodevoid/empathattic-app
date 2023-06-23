DO $$ BEGIN
 CREATE TYPE "campaign_status" AS ENUM('ACTIVE', 'CANCELLED', 'FULFILLED', 'INACTIVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" text,
	"phone" varchar(256)
);

CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"target_funding" integer DEFAULT 0,
	"current_funding" integer DEFAULT 0,
	"images" text[] NOT NULL,
	"status" campaign_status DEFAULT 'ACTIVE',
	"description" text,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_id" uuid
);

DO $$ BEGIN
 ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
