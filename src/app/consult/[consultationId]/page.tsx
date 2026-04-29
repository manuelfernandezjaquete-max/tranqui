"use client";

import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { DisclaimerBanner } from "@/components/chat/DisclaimerBanner";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";

export default function ActiveConsultationPage({
  params,
}: {
  params: Promise<{ consultationId: string }>;
}) {
  const { consultationId } = use(params);
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("token") ?? undefined;
  const id = consultationId as Id<"consultations">;

  const consultation = useQuery(api.consultations.get, {
    consultationId: id,
    accessToken,
  });
  const messages = useQuery(api.messages.listByConsultation, {
    consultationId: id,
    accessToken,
  });
  const appendUserMessage = useMutation(api.messages.appendUserMessage);
  const [isSending, setIsSending] = useState(false);

  if (consultation === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="h-32 animate-pulse rounded-lg bg-bg-muted" />
      </div>
    );
  }
  if (consultation === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-text-secondary">
          Consulta no encontrada o sin permisos.
        </p>
      </div>
    );
  }

  const lastMessage = messages?.[messages.length - 1];
  const isStreaming = lastMessage?.isStreaming === true;
  const isClosed = consultation.status === "closed";

  const onSend = async (content: string, imageStorageId?: Id<"_storage">) => {
    setIsSending(true);
    try {
      await appendUserMessage({
        consultationId: id,
        content,
        imageStorageId,
        accessToken,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="mx-auto flex h-screen max-w-3xl flex-col px-4 py-4">
      <ChatHeader
        petName={consultation.petName}
        petSpecies={consultation.petSpecies}
        startedAt={consultation.createdAt}
        backHref={consultation.isAnonymous ? undefined : "/history"}
      />

      <div className="my-4">
        <DisclaimerBanner />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <MessageList consultationId={id} accessToken={accessToken} />
      </div>

      <div className="mt-4 border-t border-border-default pt-4">
        <ChatInput
          onSend={onSend}
          disabled={isStreaming || isClosed || isSending}
          placeholder={
            isClosed
              ? "Esta consulta está cerrada"
              : isStreaming
                ? "Tranqui está respondiendo..."
                : "Escribe tu mensaje..."
          }
        />
      </div>
    </main>
  );
}
