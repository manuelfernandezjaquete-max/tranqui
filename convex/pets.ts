import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireHousehold } from "./lib/auth";

const petCoreFields = {
  name: v.string(),
  species: v.union(v.literal("dog"), v.literal("cat")),
  breed: v.optional(v.string()),
  sex: v.optional(v.union(v.literal("male"), v.literal("female"))),
  neutered: v.optional(v.boolean()),
  birthYear: v.optional(v.number()),
  weightKg: v.optional(v.number()),
  knownAllergies: v.optional(v.string()),
};

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("pets"),
      _creationTime: v.number(),
      name: v.string(),
      species: v.union(v.literal("dog"), v.literal("cat")),
      breed: v.optional(v.string()),
      birthYear: v.optional(v.number()),
      photoUrl: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user || !user.householdId) return [];

    const pets = await ctx.db
      .query("pets")
      .withIndex("by_household", (q) =>
        q.eq("householdId", user.householdId),
      )
      .collect();

    return pets
      .filter((p) => p.deletedAt === undefined)
      .map((p) => ({
        _id: p._id,
        _creationTime: p._creationTime,
        name: p.name,
        species: p.species,
        breed: p.breed,
        birthYear: p.birthYear,
        photoUrl: p.photoUrl,
      }));
  },
});

export const get = query({
  args: { petId: v.id("pets") },
  returns: v.union(
    v.object({
      _id: v.id("pets"),
      _creationTime: v.number(),
      name: v.string(),
      species: v.union(v.literal("dog"), v.literal("cat")),
      breed: v.optional(v.string()),
      sex: v.optional(v.union(v.literal("male"), v.literal("female"))),
      neutered: v.optional(v.boolean()),
      birthYear: v.optional(v.number()),
      weightKg: v.optional(v.number()),
      knownAllergies: v.optional(v.string()),
      photoUrl: v.optional(v.string()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const { householdId } = await requireHousehold(ctx);
    const pet = await ctx.db.get(args.petId);
    if (
      !pet ||
      pet.householdId !== householdId ||
      pet.deletedAt !== undefined
    ) {
      return null;
    }
    return {
      _id: pet._id,
      _creationTime: pet._creationTime,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      sex: pet.sex,
      neutered: pet.neutered,
      birthYear: pet.birthYear,
      weightKg: pet.weightKg,
      knownAllergies: pet.knownAllergies,
      photoUrl: pet.photoUrl,
    };
  },
});

export const create = mutation({
  args: petCoreFields,
  returns: v.id("pets"),
  handler: async (ctx, args) => {
    const { householdId } = await requireHousehold(ctx);
    if (args.name.trim().length === 0 || args.name.length > 40) {
      throw new ConvexError({
        code: "INVALID_NAME",
        message: "Pet name must be 1-40 characters",
      });
    }
    const now = Date.now();
    return await ctx.db.insert("pets", {
      householdId,
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    petId: v.id("pets"),
    patch: v.object({
      name: v.optional(v.string()),
      breed: v.optional(v.string()),
      sex: v.optional(v.union(v.literal("male"), v.literal("female"))),
      neutered: v.optional(v.boolean()),
      birthYear: v.optional(v.number()),
      weightKg: v.optional(v.number()),
      knownAllergies: v.optional(v.string()),
    }),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { householdId } = await requireHousehold(ctx);
    const pet = await ctx.db.get(args.petId);
    if (
      !pet ||
      pet.householdId !== householdId ||
      pet.deletedAt !== undefined
    ) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Pet not found",
      });
    }
    if (
      args.patch.name !== undefined &&
      (args.patch.name.trim().length === 0 || args.patch.name.length > 40)
    ) {
      throw new ConvexError({
        code: "INVALID_NAME",
        message: "Pet name must be 1-40 characters",
      });
    }
    await ctx.db.patch(args.petId, {
      ...args.patch,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const remove = mutation({
  args: { petId: v.id("pets") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { householdId } = await requireHousehold(ctx);
    const pet = await ctx.db.get(args.petId);
    if (!pet || pet.householdId !== householdId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Pet not found",
      });
    }
    await ctx.db.patch(args.petId, {
      householdId: undefined,
      deletedAt: Date.now(),
      updatedAt: Date.now(),
    });
    return null;
  },
});
