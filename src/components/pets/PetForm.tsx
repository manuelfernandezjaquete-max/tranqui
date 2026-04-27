"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

const petFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(40, "Máximo 40 caracteres"),
  species: z.enum(["dog", "cat"]),
  breed: z.string().max(60),
  sex: z.enum(["", "male", "female"]),
  neutered: z.boolean(),
  birthYear: z.string().refine(
    (v) =>
      v === "" ||
      (Number.isInteger(Number(v)) &&
        Number(v) >= currentYear - 40 &&
        Number(v) <= currentYear),
    { message: `Año entre ${currentYear - 40} y ${currentYear}` },
  ),
  weightKg: z.string().refine(
    (v) =>
      v === "" ||
      (Number.isFinite(Number(v)) && Number(v) >= 0.1 && Number(v) <= 120),
    { message: "Peso entre 0.1 y 120 kg" },
  ),
  knownAllergies: z.string().max(500),
});

type PetFormValues = z.infer<typeof petFormSchema>;

export interface PetFormProps {
  mode: "create" | "edit";
  petId?: Id<"pets">;
  defaultValues?: Partial<PetFormValues>;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="text-xs text-tranqui-danger"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function PetForm({ mode, petId, defaultValues }: PetFormProps) {
  const router = useRouter();
  const createPet = useMutation(api.pets.create);
  const updatePet = useMutation(api.pets.update);
  const removePet = useMutation(api.pets.remove);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      species: defaultValues?.species ?? "dog",
      breed: defaultValues?.breed ?? "",
      sex: defaultValues?.sex ?? "",
      neutered: defaultValues?.neutered ?? false,
      birthYear: defaultValues?.birthYear ?? "",
      weightKg: defaultValues?.weightKg ?? "",
      knownAllergies: defaultValues?.knownAllergies ?? "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const cleaned = {
      name: values.name.trim(),
      breed: values.breed === "" ? undefined : values.breed.trim(),
      sex: values.sex === "" ? undefined : values.sex,
      neutered: values.neutered,
      birthYear: values.birthYear === "" ? undefined : Number(values.birthYear),
      weightKg: values.weightKg === "" ? undefined : Number(values.weightKg),
      knownAllergies:
        values.knownAllergies === ""
          ? undefined
          : values.knownAllergies.trim(),
    };

    if (mode === "create") {
      await createPet({
        ...cleaned,
        species: values.species,
      });
    } else if (petId) {
      await updatePet({ petId, patch: cleaned });
    }
    router.push("/pets");
    router.refresh();
  });

  const onDelete = async () => {
    if (!petId) return;
    if (!confirm("¿Seguro que quieres eliminar esta mascota?")) return;
    await removePet({ petId });
    router.push("/pets");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            error={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>

        <Field
          label="Especie"
          htmlFor="species"
          error={errors.species?.message}
        >
          <select
            id="species"
            disabled={mode === "edit"}
            className={cn(
              "block w-full rounded-md bg-bg-muted px-4 py-3 text-base text-text-primary",
              "border border-transparent transition-colors",
              "focus:bg-bg-elevated focus:border-sage-500 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
            {...register("species")}
          >
            <option value="dog">Perro</option>
            <option value="cat">Gato</option>
          </select>
        </Field>

        <Field label="Raza" htmlFor="breed" error={errors.breed?.message}>
          <Input id="breed" placeholder="Mestizo" {...register("breed")} />
        </Field>

        <Field label="Sexo" htmlFor="sex" error={errors.sex?.message}>
          <select
            id="sex"
            className={cn(
              "block w-full rounded-md bg-bg-muted px-4 py-3 text-base text-text-primary",
              "border border-transparent transition-colors",
              "focus:bg-bg-elevated focus:border-sage-500 focus:outline-none",
            )}
            {...register("sex")}
          >
            <option value="">Sin especificar</option>
            <option value="male">Macho</option>
            <option value="female">Hembra</option>
          </select>
        </Field>

        <Field
          label="Año de nacimiento"
          htmlFor="birthYear"
          error={errors.birthYear?.message}
        >
          <Input
            id="birthYear"
            type="number"
            inputMode="numeric"
            placeholder={String(currentYear - 5)}
            {...register("birthYear")}
          />
        </Field>

        <Field
          label="Peso (kg)"
          htmlFor="weightKg"
          error={errors.weightKg?.message}
        >
          <Input
            id="weightKg"
            type="number"
            step="0.1"
            inputMode="decimal"
            placeholder="8.5"
            {...register("weightKg")}
          />
        </Field>
      </div>

      <Field label="Alergias conocidas" htmlFor="knownAllergies">
        <Textarea
          id="knownAllergies"
          rows={3}
          placeholder="Ej: pollo, polen, ácaros..."
          {...register("knownAllergies")}
        />
      </Field>

      <div className="flex items-center gap-2">
        <input
          id="neutered"
          type="checkbox"
          className="h-4 w-4 rounded border-border-strong text-sage-500 focus:ring-sage-500"
          {...register("neutered")}
        />
        <label
          htmlFor="neutered"
          className="text-sm text-text-primary"
        >
          Esterilizado / castrado
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-6">
        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting}>
            {mode === "create" ? "Añadir mascota" : "Guardar cambios"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/pets")}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        </div>
        {mode === "edit" && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting}
          >
            Eliminar mascota
          </Button>
        )}
      </div>
    </form>
  );
}
