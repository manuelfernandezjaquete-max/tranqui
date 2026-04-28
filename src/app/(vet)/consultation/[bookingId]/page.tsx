"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { MessageList } from "@/components/chat/MessageList";

export default function VetActiveConsultationPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const router = useRouter();
  const { bookingId } = use(params);
  const id = bookingId as Id<"bookings">;

  const booking = useQuery(api.bookings.get, { bookingId: id });
  const markCompleted = useMutation(api.bookings.markCompleted);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (booking === undefined) {
    return <div className="h-64 animate-pulse rounded-lg bg-bg-muted" />;
  }
  if (booking === null) {
    return <p className="text-text-secondary">Reserva no encontrada.</p>;
  }

  const onComplete = async () => {
    setIsSubmitting(true);
    try {
      await markCompleted({ bookingId: id, notes: notes.trim() || undefined });
      router.push("/dashboard?tab=bookings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-2xl font-semibold text-sage-700">
            {booking.petName ?? "Mascota"}
          </h1>
          <p className="text-sm text-text-secondary">
            {new Date(booking.scheduledStartAt).toLocaleString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </header>

        <Card className="space-y-2">
          <h2 className="font-display text-lg font-semibold">
            Conversación previa
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            <MessageList consultationId={booking.consultationId} />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-0">
          {booking.dailyRoomUrl ? (
            <iframe
              allow="microphone; camera; autoplay; display-capture; fullscreen; speaker"
              src={booking.dailyRoomUrl}
              className="h-[420px] w-full rounded-md border-0"
              title="Videoconsulta vet"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center p-6 text-sm text-text-secondary">
              La sala se está creando. Refresca en unos segundos.
            </div>
          )}
        </Card>

        <Card className="space-y-3">
          <h2 className="font-display text-lg font-semibold">
            Notas para el dueño
          </h2>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Resumen de la consulta, próximos pasos, tratamiento si procede..."
          />
          <Button
            onClick={onComplete}
            loading={isSubmitting}
            disabled={booking.status === "completed"}
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Marcar como completada
          </Button>
        </Card>
      </div>
    </section>
  );
}
