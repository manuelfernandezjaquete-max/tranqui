import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Wordmark } from "@/components/marketing/Wordmark";

export const metadata: Metadata = {
  title: "Precio — Tranqui",
  description:
    "Tranqui Mensual por 9,99 €/mes. Consultas IA ilimitadas, triage clínico y 1 videoconsulta mensual con veterinario colegiado incluida.",
  openGraph: {
    title: "Precio — Tranqui",
    description:
      "9,99 €/mes. Consultas IA ilimitadas y 1 videoconsulta mensual con veterinario colegiado incluida.",
    type: "website",
    locale: "es_ES",
  },
  alternates: {
    canonical: "/pricing",
  },
};

const INCLUDES = [
  "Consultas ilimitadas con el asistente IA 24/7",
  "Triage clínico en 3 niveles: Urgente, Preferente, Orientativo",
  "1 videoconsulta mensual con veterinario colegiado",
  "Historial de consultas y perfil de cada mascota",
  "Alertas de urgencia siempre gratuitas, sin paywall",
];

const FAQS = [
  {
    q: "¿Qué pasa cuando se acaba la videoconsulta mensual?",
    a: "Puedes reservar consultas adicionales por 25 € cada una. Las consultas de urgencia con el asistente IA nunca tienen límite.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Cancela desde Ajustes en un clic. Sin llamadas, sin formularios. La cancelación surte efecto al final del periodo en curso.",
  },
  {
    q: "¿La primera consulta es realmente gratis?",
    a: "Sí, sin tarjeta. Prueba el asistente ahora mismo — si Tranqui te ayuda, ya decidirás si te suscribes.",
  },
  {
    q: "¿Cuántos animales puedo registrar?",
    a: "Todos los que quieras. Un hogar, múltiples mascotas — sin coste adicional.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <MarketingNav />

      <section className="mx-auto max-w-2xl px-6 py-20 sm:px-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-sage-700">
            Precio
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-text-primary sm:text-5xl">
            Sin letra pequeña.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            Un plan. Un precio. Todo incluido.
          </p>
        </div>

        {/* Pricing card */}
        <div className="relative overflow-hidden rounded-2xl border border-border-default bg-bg-elevated p-8 shadow-md">
          {/* Beta badge */}
          <div className="mb-6 inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-[12px] font-medium text-sage-700">
            🎉 Beta abierta — gratis ahora
          </div>

          <div className="mb-2 font-display text-5xl font-medium tracking-tight text-text-primary">
            9,99 €
            <span className="ml-2 text-xl font-normal text-text-secondary">
              / mes
            </span>
          </div>
          <p className="mb-8 text-sm text-text-secondary">
            IVA incluido · Actualmente gratis durante el periodo beta
          </p>

          <ul className="mb-8 space-y-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-text-primary">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-tranqui-success" />
                {item}
              </li>
            ))}
          </ul>

          <Link href="/consult/new" className="block">
            <Button size="lg" className="w-full">
              Empezar gratis ahora
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-3 text-center text-[13px] text-text-secondary/70">
            Sin tarjeta · Cancela cuando quieras
          </p>
        </div>

        {/* Extra consults */}
        <div className="mt-6 rounded-xl border border-border-default bg-bg-muted px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary">
                Videoconsulta adicional
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                Cuando necesitas más de una al mes
              </p>
            </div>
            <div className="font-display text-2xl font-medium text-text-primary">
              25 €
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-8 font-display text-2xl font-medium tracking-tight text-text-primary">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-t border-border-default pt-6">
                <p className="font-medium text-text-primary">{faq.q}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-text-secondary">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary">
            ¿Tienes más dudas?{" "}
            <a
              href="mailto:hola@tranqui.app"
              className="font-medium text-text-primary underline"
            >
              hola@tranqui.app
            </a>
          </p>
        </div>
      </section>

      <footer className="border-t border-border-default px-6 py-10 sm:px-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-text-secondary/70">
          <Wordmark size="sm" />
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/terms" className="hover:text-text-primary">Aviso legal</Link>
            <Link href="/legal/privacy" className="hover:text-text-primary">Privacidad</Link>
            <Link href="/legal/disclaimer" className="hover:text-text-primary">Disclaimer médico</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
