"use client";

import Link from "next/link";
import { PawPrint, Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { PetCard } from "@/components/pets/PetCard";

function PetsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="aspect-[5/6] animate-pulse rounded-lg bg-bg-muted"
        />
      ))}
    </div>
  );
}

export default function PetsPage() {
  const pets = useQuery(api.pets.list);

  return (
    <section className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-sage-700">
            Mascotas
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {pets && pets.length > 0
              ? `${pets.length} ${pets.length === 1 ? "mascota" : "mascotas"} en tu hogar`
              : "Tus perros y gatos."}
          </p>
        </div>
        {pets && pets.length > 0 && (
          <Link href="/pets/new">
            <Button size="sm">
              <Plus className="h-4 w-4" aria-hidden />
              Añadir
            </Button>
          </Link>
        )}
      </header>

      {pets === undefined ? (
        <PetsSkeleton />
      ) : pets.length === 0 ? (
        <EmptyState
          icon={<PawPrint className="h-8 w-8" aria-hidden />}
          title="Aún no tienes mascotas"
          description="Añade la primera para empezar a usar Tranqui."
          action={
            <Link href="/pets/new">
              <Button>
                <Plus className="h-4 w-4" aria-hidden />
                Añadir mascota
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard
              key={pet._id}
              petId={pet._id}
              name={pet.name}
              species={pet.species}
              breed={pet.breed}
              birthYear={pet.birthYear}
              photoUrl={pet.photoUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
}
