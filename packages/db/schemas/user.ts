import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  fullName: text("full_name"),
  email: text("email"),
  phone: varchar("phone", { length: 256 }),
});
