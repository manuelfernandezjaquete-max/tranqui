"use client";

import { useState } from "react";
import Link from "next/link";
import { History, Plus } from "lucide-react";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConsultationListItem } from "@/components/chat/ConsultationListItem";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [petFilter, setPetFilter] = useState<Id<"pets"> | undefined>(undefined);
  const pets = useQuery(api.pets.list);
  const {
    results: consultations,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.consultations.list,
    { petId: petFilter },
    { initialNumItems: 20 },
  );

  const isLoading = status === "LoadingFirstPage";
  const canLoadMore = status === "CanLoadMore";

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Historial
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Tus consultas anteriores.
        </p>
      </header>

      {pets && pets.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPetFilter(undefined)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              petFilter === undefined
                ? "border-sage-500 bg-sage-200 text-sage-700"
                : "border-border-default bg-bg-muted text-text-secondary",
            )}
          >
            Todas
          </button>
          {pets.map((pet) => (
            <button
              type="button"
              key={pet._id}
              onClick={() => setPetFilter(pet._id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                petFilter === pet._id
                  ? "border-sage-500 bg-sage-200 text-sage-700"
                  : "border-border-default bg-bg-muted text-text-secondary",
              )}
            >
              {pet.name}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-bg-muted" />
          ))}
        </div>
      ) : consultations.length === 0 ? (
        <EmptyState
          icon={<History className="h-8 w-8" aria-hidden />}
          title="No hay consultas todavía"
          description="Cuando hagas tu primera consulta aparecerá aquí."
          action={
            <Link href="/consult">
              <Button>
                <Plus className="h-4 w-4" aria-hidden />
                Nueva consulta
              </Button>
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {consultations.map((c) => (
            <li key={c._id}>
              <ConsultationListItem
                consultationId={c._id}
                status={c.status}
                triageLevel={c.triageLevel}
                summaryTitle={c.summaryTitle}
                petName={c.petName}
                petSpecies={c.petSpecies}
                createdAt={c.createdAt}
              />
            </li>
          ))}
        </ul>
      )}

      {canLoadMore && (
        <div className="text-center">
          <Button variant="ghost" onClick={() => loadMore(20)}>
            Cargar más
          </Button>
        </div>
      )}
    </section>
  );
}
