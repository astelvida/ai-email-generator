import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(), // TODO: clerk id
  userName: text("user_name"),
  userEmail: text("user_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;
