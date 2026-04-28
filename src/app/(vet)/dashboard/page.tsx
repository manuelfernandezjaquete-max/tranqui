"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, Plus, Trash2, Video } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const SLOT_DURATION_MS = 30 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CalendarTab() {
  const [range] = useState(() => {
    const fromTs = Date.now();
    const toTs = fromTs + 14 * DAY_MS;
    return { fromTs, toTs };
  });
  const slots = useQuery(api.availability.listMine, range);
  const openSlot = useMutation(api.availability.openSlot);
  const removeSlot = useMutation(api.availability.removeSlot);

  const [whenLocal, setWhenLocal] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whenLocal) return;
    const startsAt = new Date(whenLocal).getTime();
    if (Number.isNaN(startsAt)) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await openSlot({ startsAt, endsAt: startsAt + SLOT_DURATION_MS });
      setWhenLocal("");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Error al abrir slot.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Abrir nuevo hueco</h2>
        <form onSubmit={onAdd} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-60 space-y-1.5">
            <label
              htmlFor="when"
              className="text-sm font-medium text-text-primary"
            >
              Inicio (30 min)
            </label>
            <Input
              id="when"
              type="datetime-local"
              value={whenLocal}
              onChange={(e) => setWhenLocal(e.target.value)}
            />
          </div>
          <Button type="submit" loading={isSubmitting} disabled={!whenLocal}>
            <Plus className="h-4 w-4" aria-hidden />
            Abrir
          </Button>
        </form>
        {errorMessage && (
          <p className="text-sm text-tranqui-danger" role="alert">
            {errorMessage}
          </p>
        )}
      </Card>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold">
          Mis huecos (próximos 14 días)
        </h2>
        {slots === undefined ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-md bg-bg-muted"
              />
            ))}
          </div>
        ) : slots.length === 0 ? (
          <p className="text-sm text-text-secondary">Sin huecos abiertos.</p>
        ) : (
          <ul className="space-y-2">
            {slots.map((s) => (
              <li
                key={s._id}
                className="flex items-center justify-between rounded-md border border-border-default bg-bg-elevated px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-text-primary">
                    {formatDateTime(s.startsAt)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {Math.round((s.endsAt - s.startsAt) / 60000)} min
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      s.status === "open"
                        ? "sage"
                        : s.status === "booked"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {s.status === "open"
                      ? "Abierto"
                      : s.status === "booked"
                        ? "Reservado"
                        : "Bloqueado"}
                  </Badge>
                  {s.status === "open" && (
                    <button
                      type="button"
                      onClick={() => removeSlot({ slotId: s._id })}
                      aria-label="Eliminar slot"
                      className="rounded-md p-1.5 text-text-secondary hover:bg-bg-muted"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {s.status === "booked" && s.bookingId && (
                    <Link
                      href={`/consultation/${s.bookingId}`}
                      className="text-sm font-medium text-sage-700 hover:underline"
                    >
                      Ver caso
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BookingsTab() {
  const bookings = useQuery(api.bookings.listForVet);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(() => Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  if (bookings === undefined) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-bg-muted" />
        ))}
      </div>
    );
  }
  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "in_progress",
  );

  if (upcoming.length === 0) {
    return (
      <p className="text-sm text-text-secondary">
        No tienes consultas próximas.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {upcoming.map((b) => {
        const canJoin = now >= b.scheduledStartAt - 10 * 60 * 1000;
        return (
          <li key={b._id}>
            <Card className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-text-primary">
                  {b.petName ?? "Mascota"}
                </p>
                <p className="text-xs text-text-secondary">
                  {formatDateTime(b.scheduledStartAt)}
                </p>
              </div>
              <Link href={`/consultation/${b._id}`}>
                <Button size="sm" disabled={!canJoin}>
                  <Video className="h-4 w-4" aria-hidden />
                  {canJoin ? "Entrar" : "Próximamente"}
                </Button>
              </Link>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

function VetDashboardInner() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") === "bookings" ? "bookings" : "calendar";

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Panel veterinario
        </h1>
      </header>

      <div className="flex border-b border-border-default">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium",
            tab === "calendar"
              ? "border-b-2 border-sage-500 text-sage-700"
              : "text-text-secondary",
          )}
        >
          <Calendar className="h-4 w-4" aria-hidden />
          Mi calendario
        </Link>
        <Link
          href="/dashboard?tab=bookings"
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium",
            tab === "bookings"
              ? "border-b-2 border-sage-500 text-sage-700"
              : "text-text-secondary",
          )}
        >
          <Video className="h-4 w-4" aria-hidden />
          Próximas consultas
        </Link>
      </div>

      {tab === "calendar" ? <CalendarTab /> : <BookingsTab />}
    </section>
  );
}

export default function VetDashboardPage() {
  return (
    <Suspense fallback={null}>
      <VetDashboardInner />
    </Suspense>
  );
}
