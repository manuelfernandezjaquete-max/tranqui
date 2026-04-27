import { v, ConvexError } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { requireHousehold } from "./lib/auth";
import type { Id } from "./_generated/dataModel";

const FREE_TRIAL_MONTHLY_LIMIT = 3;

function startOfMonth(ts: number): number {
  const d = new Date(ts);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
}

function generateToken(): string {
  // 32 hex chars — sufficient entropy for an unguessable session token.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const start = mutation({
  args: {
    petId: v.id("pets"),
    initialUserMessage: v.string(),
  },
  returns: v.id("consultations"),
  handler: async (ctx, args) => {
    const { user, householdId } = await requireHousehold(ctx);
    const trimmed = args.initialUserMessage.trim();
    if (trimmed.length === 0 || trimmed.length > 2000) {
      throw new ConvexError({
        code: "INVALID_MESSAGE",
        message: "El mensaje debe tener entre 1 y 2000 caracteres",
      });
    }

    const pet = await ctx.db.get(args.petId);
    if (
      !pet ||
      pet.householdId !== householdId ||
      pet.deletedAt !== undefined
    ) {
      throw new ConvexError({
        code: "PET_NOT_FOUND",
        message: "Mascota no encontrada",
      });
    }

    const now = Date.now();
    const consultationId = await ctx.db.insert("consultations", {
      householdId,
      initiatorUserId: user._id,
      petId: args.petId,
      status: "anamnesis",
      createdAt: now,
    });

    await ctx.db.insert("messages", {
      consultationId,
      role: "user",
      content: trimmed,
      isStreaming: false,
      isFinalAnalysis: false,
      createdAt: now,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.ai.continueConversation,
      { consultationId },
    );

    return consultationId;
  },
});

export const startFreeTrial = mutation({
  args: {
    email: v.string(),
    petName: v.string(),
    petSpecies: v.union(v.literal("dog"), v.literal("cat")),
    petAgeYears: v.optional(v.number()),
    initialUserMessage: v.string(),
  },
  returns: v.object({
    consultationId: v.union(v.id("consultations"), v.null()),
    accessToken: v.union(v.string(), v.null()),
    isLimitReached: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!email.includes("@") || email.length > 200) {
      throw new ConvexError({
        code: "INVALID_EMAIL",
        message: "Email no válido",
      });
    }
    const petName = args.petName.trim();
    if (petName.length === 0 || petName.length > 40) {
      throw new ConvexError({
        code: "INVALID_PET_NAME",
        message: "El nombre de la mascota es obligatorio",
      });
    }
    const message = args.initialUserMessage.trim();
    if (message.length === 0 || message.length > 2000) {
      throw new ConvexError({
        code: "INVALID_MESSAGE",
        message: "El mensaje debe tener entre 1 y 2000 caracteres",
      });
    }

    const now = Date.now();
    const monthStart = startOfMonth(now);

    const usage = await ctx.db
      .query("freeTrialUsage")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (usage) {
      const inSamePeriod = usage.periodStartedAt >= monthStart;
      const used = inSamePeriod ? usage.consultationsUsed : 0;
      if (used >= FREE_TRIAL_MONTHLY_LIMIT) {
        return {
          consultationId: null,
          accessToken: null,
          isLimitReached: true,
        };
      }
      await ctx.db.patch(usage._id, {
        consultationsUsed: used + 1,
        lastUsedAt: now,
        periodStartedAt: inSamePeriod ? usage.periodStartedAt : monthStart,
      });
    } else {
      await ctx.db.insert("freeTrialUsage", {
        email,
        consultationsUsed: 1,
        firstUsedAt: now,
        lastUsedAt: now,
        periodStartedAt: monthStart,
      });
    }

    const accessToken = generateToken();
    const consultationId = await ctx.db.insert("consultations", {
      anonymousEmail: email,
      anonymousPet: {
        name: petName,
        species: args.petSpecies,
        ageYears: args.petAgeYears,
      },
      accessToken,
      status: "anamnesis",
      createdAt: now,
    });

    await ctx.db.insert("messages", {
      consultationId,
      role: "user",
      content: message,
      isStreaming: false,
      isFinalAnalysis: false,
      createdAt: now,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.ai.continueConversation,
      { consultationId },
    );

    return { consultationId, accessToken, isLimitReached: false };
  },
});

const consultationListItem = v.object({
  _id: v.id("consultations"),
  _creationTime: v.number(),
  status: v.union(
    v.literal("anamnesis"),
    v.literal("analyzed"),
    v.literal("escalated"),
    v.literal("closed"),
  ),
  triageLevel: v.optional(
    v.union(
      v.literal("urgente"),
      v.literal("preferente"),
      v.literal("orientativo"),
    ),
  ),
  summaryTitle: v.optional(v.string()),
  petName: v.optional(v.string()),
  petSpecies: v.optional(v.union(v.literal("dog"), v.literal("cat"))),
  createdAt: v.number(),
});

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    petId: v.optional(v.id("pets")),
  },
  returns: v.object({
    page: v.array(consultationListItem),
    isDone: v.boolean(),
    continueCursor: v.string(),
    splitCursor: v.optional(v.union(v.string(), v.null())),
    pageStatus: v.optional(
      v.union(
        v.null(),
        v.literal("SplitRecommended"),
        v.literal("SplitRequired"),
      ),
    ),
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const empty = {
      page: [],
      isDone: true,
      continueCursor: "",
      splitCursor: null,
      pageStatus: null,
    };
    if (!identity) return empty;
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user || !user.householdId) return empty;
    const householdId = user.householdId;

    const result = args.petId
      ? await ctx.db
          .query("consultations")
          .withIndex("by_pet", (q) => q.eq("petId", args.petId))
          .order("desc")
          .paginate(args.paginationOpts)
      : await ctx.db
          .query("consultations")
          .withIndex("by_household_and_created", (q) =>
            q.eq("householdId", householdId),
          )
          .order("desc")
          .paginate(args.paginationOpts);

    const filtered = args.petId
      ? result.page.filter((c) => c.householdId === householdId)
      : result.page;

    const petCache = new Map<Id<"pets">, { name: string; species: "dog" | "cat" }>();
    const enriched = await Promise.all(
      filtered.map(async (c) => {
        let petName: string | undefined;
        let petSpecies: "dog" | "cat" | undefined;
        if (c.petId) {
          const cached = petCache.get(c.petId);
          if (cached) {
            petName = cached.name;
            petSpecies = cached.species;
          } else {
            const pet = await ctx.db.get(c.petId);
            if (pet) {
              petName = pet.name;
              petSpecies = pet.species;
              petCache.set(c.petId, { name: pet.name, species: pet.species });
            }
          }
        }
        return {
          _id: c._id,
          _creationTime: c._creationTime,
          status: c.status,
          triageLevel: c.triageLevel,
          summaryTitle: c.summaryTitle,
          petName,
          petSpecies,
          createdAt: c.createdAt,
        };
      }),
    );

    return {
      page: enriched,
      isDone: result.isDone,
      continueCursor: result.continueCursor,
      splitCursor: result.splitCursor,
      pageStatus: result.pageStatus,
    };
  },
});

const consultationDetail = v.object({
  _id: v.id("consultations"),
  status: v.union(
    v.literal("anamnesis"),
    v.literal("analyzed"),
    v.literal("escalated"),
    v.literal("closed"),
  ),
  triageLevel: v.optional(
    v.union(
      v.literal("urgente"),
      v.literal("preferente"),
      v.literal("orientativo"),
    ),
  ),
  summaryTitle: v.optional(v.string()),
  petName: v.optional(v.string()),
  petSpecies: v.optional(v.union(v.literal("dog"), v.literal("cat"))),
  isAnonymous: v.boolean(),
  createdAt: v.number(),
  closedAt: v.optional(v.number()),
});

export const get = query({
  args: {
    consultationId: v.id("consultations"),
    accessToken: v.optional(v.string()),
  },
  returns: v.union(consultationDetail, v.null()),
  handler: async (ctx, args) => {
    const consultation = await ctx.db.get(args.consultationId);
    if (!consultation) return null;

    let isAuthorized = false;
    if (consultation.householdId) {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        const user = await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
          .unique();
        if (
          user &&
          user.householdId &&
          user.householdId === consultation.householdId
        ) {
          isAuthorized = true;
        }
      }
    } else if (consultation.accessToken && args.accessToken) {
      isAuthorized = consultation.accessToken === args.accessToken;
    }
    if (!isAuthorized) return null;

    let petName: string | undefined;
    let petSpecies: "dog" | "cat" | undefined;
    if (consultation.petId) {
      const pet = await ctx.db.get(consultation.petId);
      if (pet) {
        petName = pet.name;
        petSpecies = pet.species;
      }
    } else if (consultation.anonymousPet) {
      petName = consultation.anonymousPet.name;
      petSpecies = consultation.anonymousPet.species;
    }

    return {
      _id: consultation._id,
      status: consultation.status,
      triageLevel: consultation.triageLevel,
      summaryTitle: consultation.summaryTitle,
      petName,
      petSpecies,
      isAnonymous: consultation.householdId === undefined,
      createdAt: consultation.createdAt,
      closedAt: consultation.closedAt,
    };
  },
});

export const close = mutation({
  args: { consultationId: v.id("consultations") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { householdId } = await requireHousehold(ctx);
    const consultation = await ctx.db.get(args.consultationId);
    if (!consultation || consultation.householdId !== householdId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Consulta no encontrada",
      });
    }
    await ctx.db.patch(args.consultationId, {
      status: "closed",
      closedAt: Date.now(),
    });
    return null;
  },
});

// Internal — used by the AI action to fetch the consultation context.
export const _internalGet = internalQuery({
  args: { consultationId: v.id("consultations") },
  returns: v.union(
    v.object({
      _id: v.id("consultations"),
      petId: v.optional(v.id("pets")),
      anonymousPet: v.optional(
        v.object({
          name: v.string(),
          species: v.union(v.literal("dog"), v.literal("cat")),
          ageYears: v.optional(v.number()),
        }),
      ),
      status: v.union(
        v.literal("anamnesis"),
        v.literal("analyzed"),
        v.literal("escalated"),
        v.literal("closed"),
      ),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const c = await ctx.db.get(args.consultationId);
    if (!c) return null;
    return {
      _id: c._id,
      petId: c.petId,
      anonymousPet: c.anonymousPet,
      status: c.status,
    };
  },
});
