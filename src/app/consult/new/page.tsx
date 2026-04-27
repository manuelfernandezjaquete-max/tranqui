"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { DisclaimerBanner } from "@/components/chat/DisclaimerBanner";
import { cn } from "@/lib/utils";

type Species = "dog" | "cat";

export default function FreeTrialPage() {
  const router = useRouter();
  const startFreeTrial = useMutation(api.consultations.startFreeTrial);

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState<Species>("dog");
  const [ageYears, setAgeYears] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const step1Valid =
    email.includes("@") &&
    email.length <= 200 &&
    petName.trim().length > 0 &&
    petName.length <= 40;

  const step2Valid = message.trim().length > 0 && message.length <= 2000;

  const onContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step1Valid) setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!step2Valid || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const result = await startFreeTrial({
        email: email.trim().toLowerCase(),
        petName: petName.trim(),
        petSpecies: species,
        petAgeYears: ageYears ? Number(ageYears) : undefined,
        initialUserMessage: message.trim(),
      });
      if (result.isLimitReached) {
        setIsLimitReached(true);
        return;
      }
      if (result.consultationId && result.accessToken) {
        router.push(
          `/consult/${result.consultationId}?token=${result.accessToken}`,
        );
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Algo no salió bien. Vuelve a intentarlo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLimitReached) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-12">
        <Card className="space-y-4 text-center">
          <h1 className="font-display text-2xl font-semibold text-sage-700">
            Has usado tus 3 consultas gratis este mes
          </h1>
          <p className="text-sm text-text-secondary">
            Crea una cuenta para seguir consultando — incluye 1 videoconsulta
            mensual con un veterinario humano.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/sign-up">
              <Button>Crear cuenta</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="secondary">Ya tengo cuenta</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-12">
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Tranqui
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Tu primera consulta es gratis. Sin tarjeta, sin login.
        </p>
      </header>

      <DisclaimerBanner />

      <Card className="space-y-5">
        {step === 1 ? (
          <form onSubmit={onContinue} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="email">
                Tu email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                required
              />
              <p className="text-xs text-text-secondary">
                Lo usamos solo para el límite de consultas gratis y para
                guardar tu histórico si te registras después.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="petName">
                Nombre de tu mascota
              </label>
              <Input
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Luna"
                maxLength={40}
                required
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-sm font-medium">Especie</span>
              <div className="flex gap-2">
                {(["dog", "cat"] as const).map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setSpecies(opt)}
                    className={cn(
                      "flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                      species === opt
                        ? "border-sage-500 bg-sage-200 text-sage-700"
                        : "border-border-default bg-bg-muted text-text-secondary",
                    )}
                  >
                    {opt === "dog" ? "Perro" : "Gato"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="ageYears">
                Edad aproximada (años) — opcional
              </label>
              <Input
                id="ageYears"
                type="number"
                inputMode="numeric"
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                placeholder="3"
                min={0}
                max={40}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={!step1Valid}>
                Continuar
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="message">
                ¿Qué te preocupa hoy?
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Cuéntame qué le pasa a ${petName || "tu mascota"}...`}
                rows={6}
                maxLength={2000}
                autoFocus
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-tranqui-danger" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="flex justify-between gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Volver
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!step2Valid || isSubmitting}
              >
                Enviar consulta
              </Button>
            </div>
          </form>
        )}
      </Card>
    </main>
  );
}
