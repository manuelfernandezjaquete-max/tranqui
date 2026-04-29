"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { MessageBubble } from "./MessageBubble";
import { AnalysisCard } from "./AnalysisCard";

export interface MessageListProps {
  consultationId: Id<"consultations">;
  accessToken?: string;
}

export function MessageList({ consultationId, accessToken }: MessageListProps) {
  const messages = useQuery(api.messages.listByConsultation, {
    consultationId,
    accessToken,
  });
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  if (messages === undefined) {
    return (
      <div className="space-y-3">
        <div className="h-12 animate-pulse rounded-2xl bg-bg-muted" />
        <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m._id}>
          <MessageBubble
            role={m.role}
            content={m.content}
            imageUrl={m.imageUrl}
            isStreaming={m.isStreaming}
            hideAnalysis={m.isFinalAnalysis}
          />
          {m.isFinalAnalysis && m.structuredAnalysis && (
            <div className="mt-4">
              <AnalysisCard
                analysis={m.structuredAnalysis}
                consultationId={consultationId}
              />
            </div>
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
