import { InferModel } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { category } from "./category";

export const campaignStatus = pgEnum("campaign_status", [
  "ACTIVE",
  "CANCELLED",
  "FULFILLED",
  "INACTIVE",
]);

export const campaign = pgTable("campaigns", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  targetFunding: integer("target_funding").default(0),
  currentFunding: integer("current_funding").default(0),
  images: text("images").array().notNull(),
  status: campaignStatus("status").default("ACTIVE"),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  slug: text("slug").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  categoryId: text("category_id").references(() => category.id),
});

export type Campaign = InferModel<typeof campaign>;
