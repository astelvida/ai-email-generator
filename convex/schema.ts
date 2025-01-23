import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    picture: v.string(),
    credits: v.number(),
  }).searchIndex("by_email", { searchField: "email" }),
});
