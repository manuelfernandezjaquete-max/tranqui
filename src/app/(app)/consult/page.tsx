"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cat, Dog } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { DisclaimerBanner } from "@/components/chat/DisclaimerBanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";

export default function ConsultEntryPage() {
  const router = useRouter();
  const pets = useQuery(api.pets.list);
  const startConsultation = useMutation(api.consultations.start);

  const [petId, setPetId] = useState<Id<"pets"> | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (pets === undefined) {
    return <div className="h-64 animate-pulse rounded-lg bg-bg-muted" />;
  }

  if (pets.length === 0) {
    return (
      <EmptyState
        title="Añade una mascota primero"
        description="Para empezar una consulta, necesitamos saber sobre quién quieres consultar."
        action={
          <Link href="/pets/new">
            <Button>Añadir mascota</Button>
          </Link>
        }
      />
    );
  }

  const selected = petId ?? pets[0]._id;
  const canSubmit =
    message.trim().length > 0 && !isSubmitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      const id = await startConsultation({
        petId: selected,
        initialUserMessage: message.trim(),
      });
      router.push(`/consult/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Nueva consulta
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Cuéntame qué te preocupa y te oriento.
        </p>
      </header>

      <DisclaimerBanner />

      <Card className="space-y-5">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              ¿Sobre qué mascota?
            </label>
            <div className="flex flex-wrap gap-2">
              {pets.map((pet) => {
                const Icon = pet.species === "dog" ? Dog : Cat;
                const isActive = selected === pet._id;
                return (
                  <button
                    type="button"
                    key={pet._id}
                    onClick={() => setPetId(pet._id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-sage-500 bg-sage-200 text-sage-700"
                        : "border-border-default bg-bg-muted text-text-secondary hover:bg-bg-elevated",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {pet.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-text-primary"
            >
              ¿Qué te preocupa hoy?
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej: Lleva 2 días rascándose la oreja derecha y huele un poco raro..."
              rows={5}
              maxLength={2000}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={isSubmitting} disabled={!canSubmit}>
              Empezar consulta
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
