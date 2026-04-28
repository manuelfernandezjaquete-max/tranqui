"use client";

import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/shared/EmptyState";

const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmada",
  in_progress: "En curso",
  completed: "Completada",
  canceled_by_user: "Cancelada por ti",
  canceled_by_vet: "Cancelada por el veterinario",
  no_show_user: "No asististe",
  no_show_vet: "Vet no asistió",
};

const STATUS_VARIANT: Record<
  string,
  "neutral" | "sage" | "coral" | "success" | "warning" | "danger"
> = {
  confirmed: "sage",
  in_progress: "warning",
  completed: "success",
  canceled_by_user: "neutral",
  canceled_by_vet: "danger",
  no_show_user: "danger",
  no_show_vet: "danger",
};

export default function BookingsPage() {
  const bookings = useQuery(api.bookings.listMine);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Reservas
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Tus videoconsultas pasadas y próximas.
        </p>
      </header>

      {bookings === undefined ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-bg-muted" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          icon={<Calendar className="h-8 w-8" aria-hidden />}
          title="Sin reservas todavía"
          description="Cuando reserves una videoconsulta aparecerá aquí."
        />
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => {
            const date = new Date(b.scheduledStartAt).toLocaleString("es-ES", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <li key={b._id}>
                <Link href={`/bookings/${b._id}`} className="block">
                  <Card interactive className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-text-primary">
                        {b.petName ?? "Mascota"} · {b.vetName}
                      </p>
                      <p className="text-xs text-text-secondary">{date}</p>
                    </div>
                    <Badge variant={STATUS_VARIANT[b.status] ?? "neutral"}>
                      {STATUS_LABEL[b.status] ?? b.status}
                    </Badge>
                    <ChevronRight
                      className="h-4 w-4 flex-shrink-0 text-text-secondary"
                      aria-hidden
                    />
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
