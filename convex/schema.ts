import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const triageLevel = v.union(
  v.literal("urgente"),
  v.literal("preferente"),
  v.literal("orientativo"),
);

const structuredAnalysis = v.object({
  summaryTitle: v.string(),
  probableCauses: v.array(
    v.object({
      title: v.string(),
      likelihood: v.union(
        v.literal("alta"),
        v.literal("media"),
        v.literal("baja"),
      ),
      explanation: v.string(),
    }),
  ),
  recommendedActions: v.array(v.string()),
  observationGuidance: v.string(),
  triageLevel,
  escalateAvailable: v.boolean(),
});

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(
      v.literal("owner"),
      v.literal("vet"),
      v.literal("admin"),
    ),
    locale: v.optional(v.string()),
    householdId: v.optional(v.id("households")),
    createdAt: v.number(),
    lastSeenAt: v.optional(v.number()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_household", ["householdId"]),

  households: defineTable({
    name: v.string(),
    ownerUserId: v.id("users"),
    createdAt: v.number(),
  }),

  pets: defineTable({
    householdId: v.optional(v.id("households")),
    name: v.string(),
    species: v.union(v.literal("dog"), v.literal("cat")),
    breed: v.optional(v.string()),
    sex: v.optional(v.union(v.literal("male"), v.literal("female"))),
    neutered: v.optional(v.boolean()),
    birthYear: v.optional(v.number()),
    weightKg: v.optional(v.number()),
    knownAllergies: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
  }).index("by_household", ["householdId"]),

  // Consultations — owner-initiated conversations about a symptom episode.
  // householdId, initiatorUserId, petId all optional to support the anonymous
  // free-trial flow (where pet info is captured inline and there is no user yet).
  consultations: defineTable({
    householdId: v.optional(v.id("households")),
    initiatorUserId: v.optional(v.id("users")),
    petId: v.optional(v.id("pets")),
    // Anonymous fallback fields (only set on free-trial flow)
    anonymousEmail: v.optional(v.string()),
    anonymousPet: v.optional(
      v.object({
        name: v.string(),
        species: v.union(v.literal("dog"), v.literal("cat")),
        ageYears: v.optional(v.number()),
      }),
    ),
    // Access token for unauthenticated free-trial sessions
    accessToken: v.optional(v.string()),

    status: v.union(
      v.literal("anamnesis"),
      v.literal("analyzed"),
      v.literal("escalated"),
      v.literal("closed"),
    ),
    triageLevel: v.optional(triageLevel),
    summaryTitle: v.optional(v.string()),
    finalAnalysisMessageId: v.optional(v.id("messages")),
    createdAt: v.number(),
    closedAt: v.optional(v.number()),
    // Cost tracking (FR-015)
    totalInputTokens: v.optional(v.number()),
    totalOutputTokens: v.optional(v.number()),
    totalCostEur: v.optional(v.number()),
  })
    .index("by_household", ["householdId"])
    .index("by_pet", ["petId"])
    .index("by_initiator", ["initiatorUserId"])
    .index("by_anonymous_email", ["anonymousEmail"])
    .index("by_household_and_created", ["householdId", "createdAt"])
    .index("by_access_token", ["accessToken"]),

  messages: defineTable({
    consultationId: v.id("consultations"),
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system"),
    ),
    content: v.string(),
    isStreaming: v.boolean(),
    isFinalAnalysis: v.boolean(),
    structuredAnalysis: v.optional(structuredAnalysis),
    createdAt: v.number(),
  }).index("by_consultation", ["consultationId", "createdAt"]),

  // Free-trial usage tracking by email (FR-001).
  // Limit: 3 consultations per email per calendar month.
  freeTrialUsage: defineTable({
    email: v.string(),
    consultationsUsed: v.number(),
    firstUsedAt: v.number(),
    lastUsedAt: v.number(),
    // We track per calendar month; reset by inspecting lastUsedAt's month.
    periodStartedAt: v.number(),
  }).index("by_email", ["email"]),
});
