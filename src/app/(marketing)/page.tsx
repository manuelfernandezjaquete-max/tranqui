import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { HeroPreview } from "@/components/marketing/HeroPreview";
import { Wordmark } from "@/components/marketing/Wordmark";

const STATS: Array<[string, string]> = [
  ["3 min", "respuesta media"],
  ["9,99 €", "/mes después del trial"],
  ["24 / 7", "incluido fin de semana"],
];

const VALUE_PROPS = [
  {
    kicker: "01 / Tranquilidad",
    title: "Respuesta en 3 minutos",
    body: "Sin esperas, sin foros contradictorios, sin pánico. Una IA con criterio clínico te orienta paso a paso.",
  },
  {
    kicker: "02 / Honestidad",
    title: "Triage en 3 niveles",
    body: "Urgente, preferente u orientativo. Cuando es urgente lo decimos sin paywall ni rodeos.",
  },
  {
    kicker: "03 / Continuidad",
    title: "Veterinario humano si hace falta",
    body: "Reservas videoconsulta el mismo día con un colegiado de la red — con tu caso ya preparado.",
  },
];

export default function MarketingHome() {
  return (
    <div className="min-h-screen bg-bg-base">
      <MarketingNav />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-14 sm:pb-20 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.08em] text-sage-700">
              ◦ Asistente veterinario · 24/7
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              Respira.
              <br />
              <span className="italic text-sage-700">Vamos paso a paso.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-text-secondary">
              Cuando algo no va bien con tu mascota, Tranqui te da una respuesta
              clara en menos de 3 minutos. Y si hace falta, te conectamos hoy con
              un veterinario colegiado — sin que el animal salga de casa.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/consult/new">
                <Button size="lg">
                  Empezar consulta gratis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-[13px] text-text-secondary/70">
                Sin tarjeta · sin login
              </span>
            </div>
            <div className="mt-14 flex flex-wrap gap-9">
              {STATS.map(([n, t]) => (
                <div key={n}>
                  <div className="font-display text-3xl font-medium tracking-tight text-text-primary">
                    {n}
                  </div>
                  <div className="mt-0.5 text-[13px] text-text-secondary/70">
                    {t}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      {/* Value props */}
      <section
        id="como-funciona"
        className="border-t border-border-default bg-bg-elevated px-6 py-20 sm:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-sage-700">
              Cómo funciona
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-text-primary sm:text-[40px]">
              Primero la IA. Después el humano,
              <br />
              solo si aporta más.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((p) => (
              <div
                key={p.kicker}
                className="border-t border-border-default pt-6"
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary/70">
                  {p.kicker}
                </p>
                <h3 className="mb-3 font-display text-xl font-medium tracking-tight text-text-primary">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section
        id="precio"
        className="border-t border-border-default px-6 py-20 sm:px-14"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-sage-700">
            Empieza ahora
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-text-primary">
            Tu primera consulta es gratis.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Sin tarjeta. Sin compromisos. Pruébalo ahora — si Tranqui te ayuda,
            ya hablaremos del plan.
          </p>
          <Link href="/consult/new" className="mt-8 inline-block">
            <Button size="lg">
              Empezar consulta gratis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default px-6 py-10 sm:px-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-text-secondary/70">
          <Wordmark size="sm" />
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/terms" className="hover:text-text-primary">
              Aviso legal
            </Link>
            <Link href="/legal/privacy" className="hover:text-text-primary">
              Privacidad
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-text-primary">
              Disclaimer médico
            </Link>
            <a
              href="mailto:hola@tranqui.app"
              className="hover:text-text-primary"
            >
              hola@tranqui.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
