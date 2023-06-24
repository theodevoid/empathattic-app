import { InferModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { campaign } from "./campaign";
import { user } from "./user";

export const donationStatus = pgEnum("donation_status", [
  "AWAITING_PAYMENT",
  "SUCCESS",
  "FAIL",
]);

export const donation = pgTable("donations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  campaignId: uuid("campaign_id")
    .references(() => campaign.id)
    .notNull(),
  isAnonymous: boolean("is_anonymous").default(false),
  amount: integer("amount").notNull(),
  platformFee: integer("platform_fee").default(0),
  message: text("message"),
  externalId: text("external_id"),
  externalInvoiceUrl: text("external_invoice_url"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  status: donationStatus("status").default("AWAITING_PAYMENT"),
});

export type Donation = InferModel<typeof donation>;
