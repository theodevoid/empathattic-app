DO $$ BEGIN
 CREATE TYPE "campaign_status" AS ENUM('ACTIVE', 'CANCELLED', 'FULFILLED', 'INACTIVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "campaigns" (
	"id" text PRIMARY KEY NOT NULL,
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
	"category_id" text
);

DO $$ BEGIN
 ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
