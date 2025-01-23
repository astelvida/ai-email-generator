import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    const userDetails = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (userDetails) {
      return userDetails;
    }

    const user = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      picture: args.picture,
      credits: 3,
    });

    return user;
  },
});

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});
