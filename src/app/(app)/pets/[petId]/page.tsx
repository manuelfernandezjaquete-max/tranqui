"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { PetForm } from "@/components/pets/PetForm";

export default function EditPetPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = use(params);
  const pet = useQuery(api.pets.get, { petId: petId as Id<"pets"> });

  if (pet === undefined) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="h-64 animate-pulse rounded-lg bg-bg-muted" />
      </div>
    );
  }

  if (pet === null) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-text-secondary">
          Mascota no encontrada o sin permisos.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          {pet.name}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Edita la ficha de tu mascota.
        </p>
      </header>
      <PetForm
        mode="edit"
        petId={pet._id}
        defaultValues={{
          name: pet.name,
          species: pet.species,
          breed: pet.breed ?? "",
          sex: pet.sex ?? "",
          neutered: pet.neutered ?? false,
          birthYear: pet.birthYear ? String(pet.birthYear) : "",
          weightKg: pet.weightKg ? String(pet.weightKg) : "",
          knownAllergies: pet.knownAllergies ?? "",
        }}
      />
    </section>
  );
}
