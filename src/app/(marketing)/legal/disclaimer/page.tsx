import { DISCLAIMER_TEXT_LONG } from "@/lib/disclaimer";
import { LegalPage, LegalSection } from "@/components/marketing/LegalPage";

export const metadata = {
  title: "Disclaimer médico — Tranqui",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer médico"
      lastUpdated="29 de abril de 2026"
      draft={false}
    >
      <p className="text-base font-medium text-text-primary">
        {DISCLAIMER_TEXT_LONG}
      </p>

      <LegalSection title="Naturaleza del servicio">
        <p>
          Tranqui es un asistente conversacional basado en inteligencia
          artificial diseñado para orientar a personas que conviven con perros y
          gatos cuando observan síntomas o cambios en el comportamiento de sus
          mascotas.
        </p>
        <p>
          Tranqui <strong>no es un veterinario</strong>, no realiza diagnósticos
          médicos, no prescribe tratamientos y no sustituye en ningún caso la
          consulta presencial con un veterinario colegiado.
        </p>
      </LegalSection>

      <LegalSection title="Limitaciones">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            No puede ver, palpar, auscultar ni explorar físicamente al animal.
          </li>
          <li>
            No puede realizar análisis, radiografías ni ninguna prueba
            diagnóstica.
          </li>
          <li>
            Trabaja con probabilidades y orientación, nunca con certezas
            clínicas.
          </li>
          <li>
            La información facilitada se basa en literatura veterinaria de
            referencia, que puede no reflejar el caso individual de cada
            animal.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cuándo acudir a urgencias">
        <p>
          Ante cualquier signo de gravedad —dificultad respiratoria, pérdida de
          consciencia, sangrado abundante, ingesta de tóxicos, traumatismo
          severo, o ausencia de orina superior a 24 horas en gatos macho—
          acude inmediatamente a una clínica veterinaria de urgencias o llama a
          tu veterinario de confianza. <strong>No esperes</strong> a la
          orientación de Tranqui ni de ningún otro asistente digital.
        </p>
        <p>
          Tranqui clasifica cada caso en uno de tres niveles (Urgente,
          Preferente, Orientativo). Cuando el nivel es Urgente, recomendamos
          siempre acudir presencialmente sin demora.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilidad">
        <p>
          Tranqui no se responsabiliza de las decisiones médicas tomadas a
          partir de las orientaciones facilitadas. La responsabilidad última
          sobre la salud de la mascota recae siempre en su persona responsable
          y, en su caso, en el veterinario colegiado que la atienda.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
