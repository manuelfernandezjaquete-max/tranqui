import { PetForm } from "@/components/pets/PetForm";

export default function NewPetPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          Añadir mascota
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Cuéntanos lo básico sobre tu mascota — luego podrás afinar.
        </p>
      </header>
      <PetForm mode="create" />
    </section>
  );
}
