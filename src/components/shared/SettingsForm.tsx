"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface SettingsFormProps {
  initialName: string;
  initialLocale: string;
  initialHouseholdName: string;
}

export function SettingsForm({
  initialName,
  initialLocale,
  initialHouseholdName,
}: SettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [locale, setLocale] = useState(initialLocale);
  const [householdName, setHouseholdName] = useState(initialHouseholdName);
  const [isSaving, setIsSaving] = useState(false);
  const [touched, setTouched] = useState({ name: false, householdName: false });
  const [feedback, setFeedback] = useState<
    { kind: "success" | "error"; text: string } | null
  >(null);

  const nameError = touched.name && name.trim().length === 0 ? "El nombre es obligatorio." : null;
  const householdError = touched.householdName && householdName.trim().length === 0 ? "El nombre del hogar es obligatorio." : null;
  const hasErrors = !!nameError || !!householdError;

  const updateProfile = useMutation(api.users.updateProfile);
  const renameHousehold = useMutation(api.users.renameHousehold);

  const profileDirty =
    name.trim() !== initialName.trim() ||
    locale.trim() !== initialLocale.trim();
  const householdDirty =
    householdName.trim() !== initialHouseholdName.trim();
  const dirty = profileDirty || householdDirty;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, householdName: true });
    if (hasErrors || name.trim().length === 0 || householdName.trim().length === 0) return;
    setIsSaving(true);
    setFeedback(null);
    try {
      const ops: Promise<unknown>[] = [];
      if (profileDirty) {
        ops.push(updateProfile({ name: name.trim(), locale: locale.trim() }));
      }
      if (householdDirty) {
        ops.push(renameHousehold({ name: householdName.trim() }));
      }
      await Promise.all(ops);
      setFeedback({ kind: "success", text: "Cambios guardados." });
    } catch (err) {
      setFeedback({
        kind: "error",
        text: err instanceof Error ? err.message : "Error al guardar.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold text-text-primary">
          Tu perfil
        </legend>
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            maxLength={60}
            error={!!nameError}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && (
            <p id="name-error" className="text-xs text-tranqui-danger" role="alert">
              {nameError}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="locale" className="text-sm font-medium">
            Idioma
          </label>
          <Input
            id="locale"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            placeholder="es-ES"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold text-text-primary">
          Tu hogar
        </legend>
        <div className="space-y-1.5">
          <label htmlFor="householdName" className="text-sm font-medium">
            Nombre del hogar
          </label>
          <Input
            id="householdName"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, householdName: true }))}
            maxLength={60}
            error={!!householdError}
            aria-describedby={householdError ? "householdName-error" : undefined}
          />
          {householdError && (
            <p id="householdName-error" className="text-xs text-tranqui-danger" role="alert">
              {householdError}
            </p>
          )}
          <p className="text-xs text-text-secondary">
            Ej: &ldquo;Casa Marta &amp; David&rdquo;.
          </p>
        </div>
      </fieldset>

      <div className="flex items-center gap-3 border-t border-border-default pt-6">
        <Button type="submit" disabled={!dirty || hasErrors} loading={isSaving}>
          Guardar cambios
        </Button>
        {feedback && (
          <p
            role="status"
            className={
              feedback.kind === "success"
                ? "text-sm text-tranqui-success"
                : "text-sm text-tranqui-danger"
            }
          >
            {feedback.text}
          </p>
        )}
      </div>
    </form>
  );
}
