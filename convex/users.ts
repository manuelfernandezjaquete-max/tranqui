import { v, ConvexError } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import { requireUser } from "./lib/auth";

export const bootstrap = mutation({
  args: {},
  returns: v.id("users"),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Auth required",
      });
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { lastSeenAt: Date.now() });
      return existing._id;
    }

    const now = Date.now();
    const displayName =
      identity.name ?? identity.givenName ?? identity.email ?? "Tranqui user";

    const userId = await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email ?? "",
      name: identity.name,
      role: "owner",
      locale: "es-ES",
      createdAt: now,
      lastSeenAt: now,
    });

    const householdId = await ctx.db.insert("households", {
      name: `Casa de ${displayName}`,
      ownerUserId: userId,
      createdAt: now,
    });

    await ctx.db.patch(userId, { householdId });

    return userId;
  },
});

export const me = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      clerkId: v.string(),
      email: v.string(),
      name: v.optional(v.string()),
      role: v.union(
        v.literal("owner"),
        v.literal("vet"),
        v.literal("admin"),
      ),
      locale: v.optional(v.string()),
      householdId: v.id("households"),
      household: v.object({
        _id: v.id("households"),
        name: v.string(),
      }),
      subscription: v.null(),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || !user.householdId) return null;

    const household = await ctx.db.get(user.householdId);
    if (!household) return null;

    return {
      _id: user._id,
      _creationTime: user._creationTime,
      clerkId: user.clerkId,
      email: user.email,
      name: user.name,
      role: user.role,
      locale: user.locale,
      householdId: user.householdId,
      household: { _id: household._id, name: household.name },
      subscription: null,
    };
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await requireUser(ctx);
    const patch: Partial<typeof user> = {};
    if (args.name !== undefined) patch.name = args.name;
    if (args.locale !== undefined) patch.locale = args.locale;
    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(user._id, patch);
    }
    return null;
  },
});

// Internal — used by email.ts to look up the booking owner.
export const _internalGet = internalQuery({
  args: { userId: v.id("users") },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      email: v.string(),
      name: v.optional(v.string()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const u = await ctx.db.get(args.userId);
    if (!u) return null;
    return { _id: u._id, email: u.email, name: u.name };
  },
});

export const renameHousehold = mutation({
  args: { name: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await requireUser(ctx);
    if (!user.householdId) {
      throw new ConvexError({
        code: "NO_HOUSEHOLD",
        message: "User has no household to rename",
      });
    }
    const trimmed = args.name.trim();
    if (trimmed.length === 0 || trimmed.length > 60) {
      throw new ConvexError({
        code: "INVALID_NAME",
        message: "Household name must be 1-60 characters",
      });
    }
    await ctx.db.patch(user.householdId, { name: trimmed });
    return null;
  },
});
