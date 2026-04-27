"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { SettingsForm } from "@/components/shared/SettingsForm";

export default function SettingsPage() {
  const me = useQuery(api.users.me);

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Ajustes
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Edita tu perfil y los detalles de tu hogar.
        </p>
      </header>

      {me === undefined ? (
        <div className="h-64 animate-pulse rounded-lg bg-bg-muted" />
      ) : me === null ? (
        <p className="text-text-secondary">
          No se pudo cargar tu perfil. Refresca la página.
        </p>
      ) : (
        <SettingsForm
          initialName={me.name ?? ""}
          initialLocale={me.locale ?? "es-ES"}
          initialHouseholdName={me.household.name}
        />
      )}
    </section>
  );
}
