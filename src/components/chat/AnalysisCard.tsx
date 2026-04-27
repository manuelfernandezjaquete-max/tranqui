import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TriageBadge } from "./TriageBadge";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Id } from "../../../convex/_generated/dataModel";

export interface StructuredAnalysis {
  summaryTitle: string;
  probableCauses: Array<{
    title: string;
    likelihood: "alta" | "media" | "baja";
    explanation: string;
  }>;
  recommendedActions: string[];
  observationGuidance: string;
  triageLevel: "urgente" | "preferente" | "orientativo";
  escalateAvailable: boolean;
}

const LIKELIHOOD_VARIANT: Record<
  StructuredAnalysis["probableCauses"][number]["likelihood"],
  "danger" | "warning" | "sage"
> = {
  alta: "danger",
  media: "warning",
  baja: "sage",
};

const LIKELIHOOD_LABEL: Record<
  StructuredAnalysis["probableCauses"][number]["likelihood"],
  string
> = {
  alta: "Probable",
  media: "Posible",
  baja: "Menos probable",
};

export interface AnalysisCardProps {
  analysis: StructuredAnalysis;
  consultationId: Id<"consultations">;
}

export function AnalysisCard({ analysis, consultationId }: AnalysisCardProps) {
  const isUrgent = analysis.triageLevel === "urgente";
  const showBookingCta =
    analysis.escalateAvailable &&
    (analysis.triageLevel === "urgente" ||
      analysis.triageLevel === "preferente");

  return (
    <Card className="space-y-5 bg-sage-100 text-zinc-900">
      <div className="flex flex-wrap items-center gap-3">
        <TriageBadge level={analysis.triageLevel} />
        <h2 className="font-display text-xl font-semibold text-zinc-900">
          {analysis.summaryTitle}
        </h2>
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sage-700">
          Causas probables
        </h3>
        <ul className="space-y-2">
          {analysis.probableCauses.map((cause, i) => (
            <li key={i} className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-zinc-900">{cause.title}</span>
                <Badge variant={LIKELIHOOD_VARIANT[cause.likelihood]}>
                  {LIKELIHOOD_LABEL[cause.likelihood]}
                </Badge>
              </div>
              <p className="text-sm text-zinc-700">{cause.explanation}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sage-700">
          Qué hacer ahora
        </h3>
        <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-900 marker:text-sage-700">
          {analysis.recommendedActions.map((action, i) => (
            <li key={i}>{action}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sage-700">
          Qué observar
        </h3>
        <p className="text-sm text-zinc-900">{analysis.observationGuidance}</p>
      </section>

      {(showBookingCta || isUrgent) && (
        <div className="flex flex-wrap gap-3 border-t border-sage-200 pt-4">
          {showBookingCta && (
            <Link
              href={`/bookings/new?consultationId=${consultationId}`}
              aria-disabled
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
              title="Disponible en Fase 3"
            >
              <Button disabled>Reservar veterinario</Button>
            </Link>
          )}
          {isUrgent && (
            <a
              href="https://www.google.com/maps/search/veterinario+urgencias+24h"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">
                Urgencias 24/7 cerca
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Button>
            </a>
          )}
        </div>
      )}

      <DisclaimerBanner />
    </Card>
  );
}
