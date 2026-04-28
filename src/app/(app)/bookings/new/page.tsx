"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CalendarGrid } from "@/components/bookings/CalendarGrid";
import { TriageBadge } from "@/components/chat/TriageBadge";

const DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

function NewBookingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const consultationId = searchParams.get("consultationId");

  const consultation = useQuery(
    api.consultations.get,
    consultationId
      ? { consultationId: consultationId as Id<"consultations"> }
      : "skip",
  );

  const [range] = useState(() => {
    const fromTs = Date.now();
    const toTs = fromTs + DAYS * DAY_MS;
    return { fromTs, toTs };
  });
  const slots = useQuery(api.availability.listOpenSlots, range);
  const createBooking = useMutation(api.bookings.create);

  const [selected, setSelected] = useState<{
    _id: Id<"availabilitySlots">;
    startsAt: number;
    endsAt: number;
    vetName: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!consultationId) {
    return (
      <div className="text-text-secondary">
        Faltan parámetros. Vuelve a la consulta y pulsa &quot;Reservar
        veterinario&quot;.
      </div>
    );
  }

  const onConfirm = async () => {
    if (!selected) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const result = await createBooking({
        consultationId: consultationId as Id<"consultations">,
        slotId: selected._id,
      });
      router.push(`/bookings/${result.bookingId}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al reservar.";
      setErrorMessage(
        message.includes("SLOT_TAKEN")
          ? "Ese hueco ya no está disponible. Refresca y prueba otro."
          : message,
      );
      setSelected(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Reservar veterinario
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Elige un hueco en los próximos 7 días.
        </p>
      </header>

      {consultation && (
        <Card className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {consultation.triageLevel && (
              <TriageBadge level={consultation.triageLevel} />
            )}
            <p className="font-medium text-text-primary">
              {consultation.summaryTitle ?? "Consulta"}
            </p>
          </div>
          <p className="text-sm text-text-secondary">
            {consultation.petName ?? "Mascota"}
          </p>
        </Card>
      )}

      {slots === undefined ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-md bg-bg-muted" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <Card>
          <p className="text-sm text-text-primary">
            No hay huecos disponibles en los próximos 7 días. Si es urgente,
            acude a una clínica de urgencias 24/7.
          </p>
        </Card>
      ) : (
        <CalendarGrid
          slots={slots}
          fromTs={range.fromTs}
          days={DAYS}
          onSelect={(s) =>
            setSelected({
              _id: s._id,
              startsAt: s.startsAt,
              endsAt: s.endsAt,
              vetName: s.vetName,
            })
          }
          selectedSlotId={selected?._id}
        />
      )}

      {errorMessage && (
        <p className="text-sm text-tranqui-danger" role="alert">
          {errorMessage}
        </p>
      )}

      {selected && (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <p className="font-medium text-text-primary">
              {new Date(selected.startsAt).toLocaleString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-text-secondary">{selected.vetName}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setSelected(null)}
              disabled={isSubmitting}
            >
              Cambiar
            </Button>
            <Button onClick={onConfirm} loading={isSubmitting}>
              Confirmar reserva
            </Button>
          </div>
        </Card>
      )}
    </section>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense fallback={null}>
      <NewBookingInner />
    </Suspense>
  );
}
