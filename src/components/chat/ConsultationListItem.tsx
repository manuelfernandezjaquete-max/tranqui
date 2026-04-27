import Link from "next/link";
import { Cat, ChevronRight, Dog } from "lucide-react";
import { TriageBadge } from "./TriageBadge";
import { Card } from "@/components/ui/Card";
import type { Id } from "../../../convex/_generated/dataModel";

export interface ConsultationListItemProps {
  consultationId: Id<"consultations">;
  status: "anamnesis" | "analyzed" | "escalated" | "closed";
  triageLevel?: "urgente" | "preferente" | "orientativo";
  summaryTitle?: string;
  petName?: string;
  petSpecies?: "dog" | "cat";
  createdAt: number;
}

export function ConsultationListItem({
  consultationId,
  status,
  triageLevel,
  summaryTitle,
  petName,
  petSpecies,
  createdAt,
}: ConsultationListItemProps) {
  const SpeciesIcon = petSpecies === "cat" ? Cat : Dog;
  const date = new Date(createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const title =
    summaryTitle ??
    (status === "anamnesis"
      ? "Consulta en curso..."
      : "Consulta sin título");

  return (
    <Link href={`/consult/${consultationId}`} className="block">
      <Card interactive className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-bg-muted text-sage-700"
          aria-hidden
        >
          <SpeciesIcon className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium text-text-primary">{title}</p>
          <p className="text-xs text-text-secondary">
            {petName ?? "Anónima"} · {date}
          </p>
        </div>
        {triageLevel && <TriageBadge level={triageLevel} />}
        <ChevronRight
          className="h-4 w-4 flex-shrink-0 text-text-secondary"
          aria-hidden
        />
      </Card>
    </Link>
  );
}
