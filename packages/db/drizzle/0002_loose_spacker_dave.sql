DO $$ BEGIN
 CREATE TYPE "donation_status" AS ENUM('AWAITING_PAYMENT', 'SUCCESS', 'FAIL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"is_anonymous" boolean DEFAULT false,
	"amount" integer NOT NULL,
	"platform_fee" integer DEFAULT 0,
	"message" text,
	"external_id" text NOT NULL,
	"external_invoice_url" text NOT NULL,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
