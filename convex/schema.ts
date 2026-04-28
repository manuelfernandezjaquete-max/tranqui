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

  // Veterinarians — extended profile for users with role: "vet".
  veterinarians: defineTable({
    userId: v.id("users"),
    fullName: v.string(),
    licenseNumber: v.string(),
    specialty: v.optional(v.string()),
    bio: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    timezone: v.string(),
    isActive: v.boolean(),
    revenueShareBps: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_active", ["isActive"]),

  // Bookable 30-min windows (20-min consultation + 10-min buffer).
  availabilitySlots: defineTable({
    veterinarianId: v.id("veterinarians"),
    startsAt: v.number(),
    endsAt: v.number(),
    status: v.union(
      v.literal("open"),
      v.literal("booked"),
      v.literal("blocked"),
    ),
    bookingId: v.optional(v.id("bookings")),
    createdAt: v.number(),
  })
    .index("by_vet_and_start", ["veterinarianId", "startsAt"])
    .index("by_status_and_start", ["status", "startsAt"]),

  // Confirmed video consultations.
  bookings: defineTable({
    consultationId: v.id("consultations"),
    petId: v.id("pets"),
    requesterUserId: v.id("users"),
    veterinarianId: v.id("veterinarians"),
    slotId: v.id("availabilitySlots"),
    scheduledStartAt: v.number(),
    scheduledEndAt: v.number(),
    status: v.union(
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("canceled_by_user"),
      v.literal("canceled_by_vet"),
      v.literal("no_show_user"),
      v.literal("no_show_vet"),
    ),
    paymentMode: v.union(
      v.literal("included_in_subscription"),
      v.literal("paid_extra"),
    ),
    extraPaymentEur: v.optional(v.number()),
    polarOrderId: v.optional(v.string()),
    dailyRoomUrl: v.optional(v.string()),
    vetNotesAfter: v.optional(v.string()),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["requesterUserId"])
    .index("by_vet", ["veterinarianId"])
    .index("by_consultation", ["consultationId"])
    .index("by_status", ["status"]),
});
