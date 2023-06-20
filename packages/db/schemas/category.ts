import { InferModel } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const category = pgTable("categories", {
  id: text("id").primaryKey(),
  name: varchar("name").notNull(),
});

export type Category = InferModel<typeof category>;
