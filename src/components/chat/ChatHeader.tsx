"use client";

import Link from "next/link";
import { ArrowLeft, Cat, Dog } from "lucide-react";

export interface ChatHeaderProps {
  petName?: string;
  petSpecies?: "dog" | "cat";
  startedAt: number;
  backHref?: string;
}

export function ChatHeader({
  petName,
  petSpecies,
  startedAt,
  backHref,
}: ChatHeaderProps) {
  const SpeciesIcon = petSpecies === "cat" ? Cat : petSpecies === "dog" ? Dog : null;
  const dateLabel = new Date(startedAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border-default pb-4">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="rounded-md p-1.5 text-text-secondary hover:bg-bg-muted"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </Link>
        )}
        {SpeciesIcon && (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-muted text-sage-700"
            aria-hidden
          >
            <SpeciesIcon className="h-5 w-5" />
          </span>
        )}
        <div>
          <h1 className="font-display text-lg font-semibold text-text-primary">
            {petName ?? "Consulta"}
          </h1>
          <p className="text-xs text-text-secondary">Iniciada {dateLabel}</p>
        </div>
      </div>
    </header>
  );
}
