"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Video } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const PRECALL_OPEN_MS = 10 * 60 * 1000; // can join 10 min before start

function getMode(
  scheduledStartAt: number,
  scheduledEndAt: number,
  status: string,
  now: number,
): "pre-call" | "ready" | "in-call" | "post-call" | "canceled" {
  if (status === "completed") return "post-call";
  if (status.startsWith("canceled_") || status.startsWith("no_show_")) {
    return "canceled";
  }
  if (now < scheduledStartAt - PRECALL_OPEN_MS) return "pre-call";
  if (now < scheduledEndAt + 5 * 60 * 1000) {
    return now < scheduledStartAt ? "ready" : "in-call";
  }
  return "post-call";
}

function CountdownLabel({ targetTs }: { targetTs: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(() => Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = targetTs - now;
  if (ms <= 0) return <span>Empezando...</span>;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return (
    <span>
      {h > 0 ? `${h}h ` : ""}
      {m}m {s}s
    </span>
  );
}

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = use(params);
  const id = bookingId as Id<"bookings">;
  const booking = useQuery(api.bookings.get, { bookingId: id });
  const cancel = useMutation(api.bookings.cancelByUser);
  const [isCanceling, setIsCanceling] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(() => Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  if (booking === undefined) {
    return <div className="h-64 animate-pulse rounded-lg bg-bg-muted" />;
  }
  if (booking === null) {
    return <p className="text-text-secondary">Reserva no encontrada.</p>;
  }

  const mode = getMode(
    booking.scheduledStartAt,
    booking.scheduledEndAt,
    booking.status,
    now,
  );

  const dateLabel = new Date(booking.scheduledStartAt).toLocaleString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  const onCancel = async () => {
    if (!confirm("¿Cancelar esta reserva?")) return;
    setIsCanceling(true);
    try {
      await cancel({ bookingId: id });
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Videoconsulta
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          {booking.petName ?? "Mascota"} con {booking.vetName}
        </p>
      </header>

      {mode === "canceled" && (
        <Card className="space-y-3">
          <Badge variant="danger">Cancelada</Badge>
          <p className="text-sm text-text-primary">
            Esta reserva ya no está activa.
          </p>
        </Card>
      )}

      {mode === "post-call" && booking.status === "completed" && (
        <Card className="space-y-3">
          <h2 className="font-display text-xl font-semibold">
            Consulta completada
          </h2>
          {booking.vetNotesAfter ? (
            <blockquote className="border-l-2 border-sage-500 pl-3 text-sm text-text-primary">
              {booking.vetNotesAfter}
            </blockquote>
          ) : (
            <p className="text-sm text-text-secondary">
              {booking.vetName} ha cerrado la consulta. Si dejó notas las verás
              aquí pronto.
            </p>
          )}
          <Link href="/bookings">
            <Button variant="secondary">Volver a reservas</Button>
          </Link>
        </Card>
      )}

      {mode === "pre-call" && (
        <Card className="space-y-4">
          <div>
            <p className="text-sm text-text-secondary">Empieza en</p>
            <p className="font-display text-2xl font-semibold text-text-primary">
              <CountdownLabel targetTs={booking.scheduledStartAt} />
            </p>
            <p className="mt-1 text-sm text-text-primary">{dateLabel}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled>
              <Video className="h-4 w-4" aria-hidden />
              Entrar (disponible 10 min antes)
            </Button>
            <Button
              variant="ghost"
              onClick={onCancel}
              disabled={isCanceling}
            >
              Cancelar reserva
            </Button>
          </div>
        </Card>
      )}

      {mode === "ready" && (
        <Card className="space-y-3">
          <p className="text-sm text-text-primary">{dateLabel}</p>
          {booking.dailyRoomUrl ? (
            <a href={booking.dailyRoomUrl} target="_blank" rel="noreferrer">
              <Button>
                <Video className="h-4 w-4" aria-hidden />
                Entrar a la videoconsulta
              </Button>
            </a>
          ) : (
            <p className="text-sm text-tranqui-warning">
              Aún preparando la sala. Refresca en unos segundos.
            </p>
          )}
        </Card>
      )}

      {mode === "in-call" && booking.dailyRoomUrl && (
        <Card className="space-y-3 p-0">
          <iframe
            allow="microphone; camera; autoplay; display-capture; fullscreen; speaker"
            src={booking.dailyRoomUrl}
            className="h-[640px] w-full rounded-md border-0"
            title="Videoconsulta Tranqui"
          />
        </Card>
      )}
    </section>
  );
}
