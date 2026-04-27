import { v, ConvexError } from "convex/values";
import {
  mutation,
  query,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { rateLimiter } from "./lib/rateLimit";

const messageRole = v.union(
  v.literal("user"),
  v.literal("assistant"),
  v.literal("system"),
);

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

const messageDoc = v.object({
  _id: v.id("messages"),
  _creationTime: v.number(),
  consultationId: v.id("consultations"),
  role: messageRole,
  content: v.string(),
  isStreaming: v.boolean(),
  isFinalAnalysis: v.boolean(),
  structuredAnalysis: v.optional(structuredAnalysis),
  createdAt: v.number(),
});

export const listByConsultation = query({
  args: {
    consultationId: v.id("consultations"),
    accessToken: v.optional(v.string()),
  },
  returns: v.array(messageDoc),
  handler: async (ctx, args) => {
    const consultation = await ctx.db.get(args.consultationId);
    if (!consultation) return [];

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
    if (!isAuthorized) return [];

    return await ctx.db
      .query("messages")
      .withIndex("by_consultation", (q) =>
        q.eq("consultationId", args.consultationId),
      )
      .collect();
  },
});

export const appendUserMessage = mutation({
  args: {
    consultationId: v.id("consultations"),
    content: v.string(),
    accessToken: v.optional(v.string()),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    const trimmed = args.content.trim();
    if (trimmed.length === 0 || trimmed.length > 2000) {
      throw new ConvexError({
        code: "INVALID_MESSAGE",
        message: "El mensaje debe tener entre 1 y 2000 caracteres",
      });
    }

    const consultation = await ctx.db.get(args.consultationId);
    if (!consultation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Consulta no encontrada",
      });
    }
    if (consultation.status === "closed") {
      throw new ConvexError({
        code: "CONSULTATION_CLOSED",
        message: "La consulta está cerrada",
      });
    }

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
    if (!isAuthorized) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Sin permiso",
      });
    }

    // Rate-limit per user (or per access token for anon) — FR-016.
    const rateLimitKey = consultation.householdId
      ? `user:${consultation.householdId}`
      : `anon:${consultation.accessToken}`;
    await rateLimiter.limit(ctx, "aiMessages", { key: rateLimitKey, throws: true });

    const messageId = await ctx.db.insert("messages", {
      consultationId: args.consultationId,
      role: "user",
      content: trimmed,
      isStreaming: false,
      isFinalAnalysis: false,
      createdAt: Date.now(),
    });

    await ctx.scheduler.runAfter(
      0,
      internal.ai.continueConversation,
      { consultationId: args.consultationId },
    );

    return messageId;
  },
});

// Internal — invoked from convex/ai.ts. Not exposed to the client.
export const _createAssistantPlaceholder = internalMutation({
  args: { consultationId: v.id("consultations") },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      consultationId: args.consultationId,
      role: "assistant",
      content: "",
      isStreaming: true,
      isFinalAnalysis: false,
      createdAt: Date.now(),
    });
  },
});

export const _appendAssistantDelta = internalMutation({
  args: {
    messageId: v.id("messages"),
    delta: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const msg = await ctx.db.get(args.messageId);
    if (!msg) return null;
    await ctx.db.patch(args.messageId, {
      content: msg.content + args.delta,
    });
    return null;
  },
});

export const _finalizeAssistantMessage = internalMutation({
  args: {
    messageId: v.id("messages"),
    structuredAnalysis: v.optional(structuredAnalysis),
    inputTokens: v.optional(v.number()),
    outputTokens: v.optional(v.number()),
    costEur: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const msg = await ctx.db.get(args.messageId);
    if (!msg) return null;
    const isFinal = args.structuredAnalysis !== undefined;
    await ctx.db.patch(args.messageId, {
      isStreaming: false,
      isFinalAnalysis: isFinal,
      structuredAnalysis: args.structuredAnalysis,
    });

    if (isFinal && args.structuredAnalysis) {
      const consultation = await ctx.db.get(msg.consultationId);
      if (consultation) {
        await ctx.db.patch(msg.consultationId, {
          status: "analyzed",
          triageLevel: args.structuredAnalysis.triageLevel,
          summaryTitle: args.structuredAnalysis.summaryTitle,
          finalAnalysisMessageId: args.messageId,
          totalInputTokens:
            (consultation.totalInputTokens ?? 0) + (args.inputTokens ?? 0),
          totalOutputTokens:
            (consultation.totalOutputTokens ?? 0) + (args.outputTokens ?? 0),
          totalCostEur:
            (consultation.totalCostEur ?? 0) + (args.costEur ?? 0),
        });
      }
    } else {
      const consultation = await ctx.db.get(msg.consultationId);
      if (consultation) {
        await ctx.db.patch(msg.consultationId, {
          totalInputTokens:
            (consultation.totalInputTokens ?? 0) + (args.inputTokens ?? 0),
          totalOutputTokens:
            (consultation.totalOutputTokens ?? 0) + (args.outputTokens ?? 0),
          totalCostEur:
            (consultation.totalCostEur ?? 0) + (args.costEur ?? 0),
        });
      }
    }
    return null;
  },
});

export const _markErrored = internalMutation({
  args: { messageId: v.id("messages"), errorMessage: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const msg = await ctx.db.get(args.messageId);
    if (!msg) return null;
    await ctx.db.patch(args.messageId, {
      isStreaming: false,
      content: msg.content || args.errorMessage,
    });
    return null;
  },
});

export const _internalListByConsultation = internalQuery({
  args: { consultationId: v.id("consultations") },
  returns: v.array(messageDoc),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_consultation", (q) =>
        q.eq("consultationId", args.consultationId),
      )
      .collect();
  },
});
