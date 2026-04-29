import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Wordmark } from "@/components/marketing/Wordmark";

const FAQS = [
  {
    category: "Sobre el asistente IA",
    items: [
      {
        q: "¿Y si la IA se equivoca?",
        a: "Tranqui usa lenguaje probabilístico y siempre marca el nivel de urgencia. Cuando tiene la más mínima duda, te deriva a un veterinario humano. El conocimiento clínico está revisado por veterinarios colegiados, y nunca da diagnósticos definitivos — siempre orientaciones con probabilidades.",
      },
      {
        q: "¿Por qué pagar si Google es gratis?",
        a: "Google te da 100 respuestas distintas y muchas alarmistas. Tranqui te da una respuesta estructurada, con triage clínico, y un humano detrás cuando hace falta. Por menos de lo que cuesta una visita al vet.",
      },
      {
        q: "¿Tranqui diagnostica enfermedades?",
        a: "No. Tranqui orienta, informa y triaje — nunca diagnostica ni prescribe medicamentos. El diagnóstico siempre requiere un veterinario que pueda explorar físicamente al animal. Cuando hace falta ese paso, te conectamos con uno.",
      },
      {
        q: "¿El asistente funciona de madrugada o en festivos?",
        a: "Siempre. El asistente IA está disponible 24/7, incluidos festivos, fines de semana y madrugadas. Las videoconsultas con veterinarios tienen horarios, pero el primer nivel de orientación nunca para.",
      },
    ],
  },
  {
    category: "Veterinarios y videoconsultas",
    items: [
      {
        q: "Mi vet ya me responde por WhatsApp. ¿Para qué necesito Tranqui?",
        a: "Genial — sigue contando con él. Tranqui es para el momento en que no responde, o para evitar molestar por dudas pequeñas que tampoco quieres callar. Y cuando la situación lo requiere, te conectamos con un vet disponible hoy.",
      },
      {
        q: "¿Sois veterinarios?",
        a: "No. Somos una herramienta de orientación que conecta con vets colegiados. Nuestro trabajo es hacer que tu visita al veterinario llegue en el momento justo y mejor preparada.",
      },
      {
        q: "¿Qué pasa en una situación de urgencia?",
        a: "Si Tranqui detecta señales de urgencia, te lo dice claro, sin rodeos y sin paywall. La información completa se muestra siempre en casos urgentes — nunca bloqueamos por suscripción cuando hay un riesgo real.",
      },
      {
        q: "¿Puedo elegir el veterinario?",
        a: "Verás los vets disponibles con su especialidad y bio. Puedes elegir el slot que mejor te venga. En el MVP la red está creciendo — más vets se irán incorporando.",
      },
    ],
  },
  {
    category: "Cuenta y suscripción",
    items: [
      {
        q: "¿Cuántas mascotas puedo registrar?",
        a: "Todas las que quieras. Un hogar, múltiples mascotas — sin coste adicional. Cada una tiene su propio perfil.",
      },
      {
        q: "¿Puedo cancelar cuando quiera?",
        a: "Sí, en cualquier momento desde Ajustes. Sin llamadas, sin formularios. La cancelación surte efecto al final del periodo en curso.",
      },
      {
        q: "¿Qué datos guardaréis de mi mascota?",
        a: "Los que tú nos das: nombre, especie, raza, edad y el historial de consultas. Todo está en tu poder — puedes solicitar la exportación o eliminación de tus datos escribiéndonos a hola@tranqui.app.",
      },
    ],
  },
];

export const metadata = {
  title: "FAQ — Tranqui",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <MarketingNav />

      <section className="mx-auto max-w-2xl px-6 py-20 sm:px-10">
        <div className="mb-14">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-sage-700">
            FAQ
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-text-primary sm:text-5xl">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 text-text-secondary">
            Si no encuentras lo que buscas, escríbenos a{" "}
            <a href="mailto:hola@tranqui.app" className="font-medium text-text-primary underline">
              hola@tranqui.app
            </a>
            .
          </p>
        </div>

        <div className="space-y-14">
          {FAQS.map((section) => (
            <div key={section.category}>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary/70">
                {section.category}
              </p>
              <div className="space-y-6">
                {section.items.map((faq) => (
                  <div key={faq.q} className="border-t border-border-default pt-6">
                    <p className="font-medium text-text-primary">{faq.q}</p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-text-secondary">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-border-default bg-bg-elevated p-8 text-center">
          <h2 className="font-display text-2xl font-medium tracking-tight text-text-primary">
            ¿Listo para probarlo?
          </h2>
          <p className="mt-2 text-text-secondary">
            Sin tarjeta. Sin compromiso. En 3 minutos.
          </p>
          <Link href="/consult/new" className="mt-6 inline-block">
            <Button size="lg">
              Empezar consulta gratis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
