import { v, ConvexError } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import { requireAdmin } from "./lib/permissions";

export const upgradeToVet = mutation({
  args: {
    userId: v.id("users"),
    fullName: v.string(),
    licenseNumber: v.string(),
    specialty: v.optional(v.string()),
    bio: v.optional(v.string()),
    timezone: v.optional(v.string()),
    revenueShareBps: v.optional(v.number()),
  },
  returns: v.id("veterinarians"),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const target = await ctx.db.get(args.userId);
    if (!target) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Usuario no existe" });
    }

    const existing = await ctx.db
      .query("veterinarians")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
    if (existing) return existing._id;

    if (target.role !== "vet") {
      await ctx.db.patch(args.userId, { role: "vet" });
    }

    return await ctx.db.insert("veterinarians", {
      userId: args.userId,
      fullName: args.fullName.trim(),
      licenseNumber: args.licenseNumber.trim(),
      specialty: args.specialty?.trim(),
      bio: args.bio?.trim(),
      timezone: args.timezone ?? "Europe/Madrid",
      isActive: true,
      revenueShareBps: args.revenueShareBps ?? 6000,
      createdAt: Date.now(),
    });
  },
});

const vetCard = v.object({
  _id: v.id("veterinarians"),
  fullName: v.string(),
  specialty: v.optional(v.string()),
  bio: v.optional(v.string()),
  photoUrl: v.optional(v.string()),
});

export const listActive = query({
  args: {},
  returns: v.array(vetCard),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("veterinarians")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
    return rows.map((r) => ({
      _id: r._id,
      fullName: r.fullName,
      specialty: r.specialty,
      bio: r.bio,
      photoUrl: r.photoUrl,
    }));
  },
});

export const _internalGet = internalQuery({
  args: { veterinarianId: v.id("veterinarians") },
  returns: v.union(
    v.object({
      _id: v.id("veterinarians"),
      fullName: v.string(),
      userId: v.id("users"),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const vet = await ctx.db.get(args.veterinarianId);
    if (!vet) return null;
    return { _id: vet._id, fullName: vet.fullName, userId: vet.userId };
  },
});

