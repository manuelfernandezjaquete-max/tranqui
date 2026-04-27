import Link from "next/link";
import { Cat, Dog } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface PetCardProps {
  petId: string;
  name: string;
  species: "dog" | "cat";
  breed?: string;
  birthYear?: number;
  photoUrl?: string;
  className?: string;
}

function formatAge(birthYear: number | undefined): string | null {
  if (!birthYear) return null;
  const years = new Date().getFullYear() - birthYear;
  if (years <= 0) return "Menos de 1 año";
  return `${years} ${years === 1 ? "año" : "años"}`;
}

export function PetCard({
  petId,
  name,
  species,
  breed,
  birthYear,
  photoUrl,
  className,
}: PetCardProps) {
  const SpeciesIcon = species === "dog" ? Dog : Cat;
  const age = formatAge(birthYear);

  return (
    <Link href={`/pets/${petId}`} className="block">
      <Card interactive className={cn("flex flex-col gap-3", className)}>
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-md bg-bg-muted text-sage-500">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <SpeciesIcon className="h-16 w-16" aria-hidden />
          )}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-text-primary">
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
            <SpeciesIcon className="h-4 w-4" aria-hidden />
            <span>{breed ?? (species === "dog" ? "Perro" : "Gato")}</span>
            {age && (
              <>
                <span aria-hidden>·</span>
                <span>{age}</span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
