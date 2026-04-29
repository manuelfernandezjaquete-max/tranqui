"use node";

import Anthropic from "@anthropic-ai/sdk";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { buildSystemPrompt } from "./lib/prompt";

const MODEL = "claude-sonnet-4-6";

// Anthropic Sonnet 4.6 pricing (USD per million tokens, conservative).
// Adjusted by ~0.92 EUR/USD. Used for cost telemetry only — not billing.
const INPUT_COST_EUR_PER_TOKEN = (3 / 1_000_000) * 0.92;
const OUTPUT_COST_EUR_PER_TOKEN = (15 / 1_000_000) * 0.92;

const ANALYSIS_OPEN = "<analysis>";
const ANALYSIS_CLOSE = "</analysis>";

interface StructuredAnalysisShape {
  summaryTitle: string;
  probableCauses: Array<{
    title: string;
    likelihood: "alta" | "media" | "baja";
    explanation: string;
  }>;
  recommendedActions: string[];
  observationGuidance: string;
  triageLevel: "urgente" | "preferente" | "orientativo";
  escalateAvailable: boolean;
}

function extractStructuredAnalysis(
  fullText: string,
): StructuredAnalysisShape | null {
  const start = fullText.indexOf(ANALYSIS_OPEN);
  const end = fullText.indexOf(ANALYSIS_CLOSE);
  if (start === -1 || end === -1 || end < start) return null;
  const json = fullText.slice(start + ANALYSIS_OPEN.length, end).trim();
  try {
    const parsed = JSON.parse(json);
    if (
      typeof parsed.summaryTitle !== "string" ||
      !Array.isArray(parsed.probableCauses) ||
      !Array.isArray(parsed.recommendedActions) ||
      typeof parsed.observationGuidance !== "string" ||
      !["urgente", "preferente", "orientativo"].includes(parsed.triageLevel)
    ) {
      return null;
    }
    // Validate causes
    for (const c of parsed.probableCauses) {
      if (
        typeof c?.title !== "string" ||
        !["alta", "media", "baja"].includes(c?.likelihood) ||
        typeof c?.explanation !== "string"
      ) {
        return null;
      }
    }
    return {
      summaryTitle: parsed.summaryTitle,
      probableCauses: parsed.probableCauses,
      recommendedActions: parsed.recommendedActions,
      observationGuidance: parsed.observationGuidance,
      triageLevel: parsed.triageLevel,
      escalateAvailable: parsed.escalateAvailable !== false,
    };
  } catch {
    return null;
  }
}

export const continueConversation = internalAction({
  args: { consultationId: v.id("consultations") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY missing — cannot run AI action.");
      return null;
    }

    const consultation = await ctx.runQuery(
      internal.consultations._internalGet,
      { consultationId: args.consultationId },
    );
    if (!consultation) {
      console.error(`Consultation ${args.consultationId} not found.`);
      return null;
    }

    // Resolve pet context.
    let petContext;
    if (consultation.petId) {
      const pet = await ctx.runQuery(internal.pets._internalGetForPrompt, {
        petId: consultation.petId,
      });
      if (pet) {
        petContext = {
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          sex: pet.sex,
          neutered: pet.neutered,
          birthYear: pet.birthYear,
          weightKg: pet.weightKg,
          knownAllergies: pet.knownAllergies,
        };
      }
    }
    if (!petContext && consultation.anonymousPet) {
      petContext = {
        name: consultation.anonymousPet.name,
        species: consultation.anonymousPet.species,
        ageYears: consultation.anonymousPet.ageYears,
      };
    }
    if (!petContext) {
      console.error("No pet context available for consultation.");
      return null;
    }

    const messages = await ctx.runQuery(
      internal.messages._internalListByConsultation,
      { consultationId: args.consultationId },
    );

    // Resolve image URLs for any messages that have an attached photo.
    // ctx.storage.getUrl returns a signed public URL valid for ~1 hour.
    const imageUrls = new Map<string, string>();
    for (const m of messages) {
      if (m.imageStorageId) {
        const url = await ctx.storage.getUrl(m.imageStorageId);
        if (url) imageUrls.set(m._id, url);
      }
    }

    const systemPrompt = buildSystemPrompt({
      pet: petContext,
      recentConsultations: [], // TODO Phase 2.1: include via internal query
    });

    const placeholderId = await ctx.runMutation(
      internal.messages._createAssistantPlaceholder,
      { consultationId: args.consultationId },
    );

    const client = new Anthropic({ apiKey });

    let buffer = "";
    let lastFlushAt = Date.now();
    const FLUSH_INTERVAL_MS = 200;
    const FLUSH_CHARS = 200;

    const flushDelta = async () => {
      if (buffer.length === 0) return;
      const delta = buffer;
      buffer = "";
      lastFlushAt = Date.now();
      await ctx.runMutation(internal.messages._appendAssistantDelta, {
        messageId: placeholderId,
        delta,
      });
    };

    let fullText = "";
    let inputTokens = 0;
    let outputTokens = 0;

    // Build message content — for user messages with an image, send a
    // multipart content array [image, text]; otherwise send plain text.
    type AnthropicMessage = {
      role: "user" | "assistant";
      content:
        | string
        | Array<
            | { type: "text"; text: string }
            | { type: "image"; source: { type: "url"; url: string } }
          >;
    };

    const anthropicMessages: AnthropicMessage[] = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => {
        const imageUrl = imageUrls.get(m._id);
        if (m.role === "user" && imageUrl) {
          return {
            role: "user" as const,
            content: [
              { type: "image" as const, source: { type: "url" as const, url: imageUrl } },
              { type: "text" as const, text: m.content || "¿Qué observas en esta imagen?" },
            ],
          };
        }
        return {
          role: m.role as "user" | "assistant",
          content: m.content,
        };
      });

    try {
      const stream = client.messages.stream({
        model: MODEL,
        max_tokens: 2048,
        system: [
          {
            type: "text",
            text: systemPrompt,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: anthropicMessages,
      });

      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          buffer += event.delta.text;
          fullText += event.delta.text;
          const now = Date.now();
          if (
            buffer.length >= FLUSH_CHARS ||
            now - lastFlushAt >= FLUSH_INTERVAL_MS
          ) {
            await flushDelta();
          }
        }
      }

      // Final flush of any remaining buffer.
      await flushDelta();

      const finalMessage = await stream.finalMessage();
      inputTokens = finalMessage.usage?.input_tokens ?? 0;
      outputTokens = finalMessage.usage?.output_tokens ?? 0;

      const analysis = extractStructuredAnalysis(fullText);
      const costEur =
        inputTokens * INPUT_COST_EUR_PER_TOKEN +
        outputTokens * OUTPUT_COST_EUR_PER_TOKEN;

      await ctx.runMutation(internal.messages._finalizeAssistantMessage, {
        messageId: placeholderId,
        structuredAnalysis: analysis ?? undefined,
        inputTokens,
        outputTokens,
        costEur,
      });
    } catch (err) {
      console.error("Anthropic streaming failed:", err);
      await ctx.runMutation(internal.messages._markErrored, {
        messageId: placeholderId,
        errorMessage:
          "Tranqui está descansando un momento. Vuelve a intentarlo en unos segundos.",
      });
    }

    return null;
  },
});
