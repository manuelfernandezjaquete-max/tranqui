import { CLINICAL_SKILL } from "./clinicalSkill";
import { DISCLAIMER_TEXT_LONG } from "./disclaimerText";

export interface PetContext {
  name: string;
  species: "dog" | "cat";
  breed?: string;
  sex?: "male" | "female";
  neutered?: boolean;
  birthYear?: number;
  ageYears?: number;
  weightKg?: number;
  knownAllergies?: string;
}

export interface PriorConsultationSummary {
  summaryTitle?: string;
  triageLevel?: "urgente" | "preferente" | "orientativo";
  createdAt: number;
}

export interface BuildSystemPromptInput {
  pet: PetContext;
  recentConsultations: PriorConsultationSummary[];
}

const STRUCTURED_OUTPUT_INSTRUCTION = `

# Cuándo cerrar la consulta con análisis estructurado

Tras 3-5 preguntas de anamnesis, cuando consideres que tienes información suficiente, devuelve el análisis final en un único bloque XML \`<analysis>...</analysis>\` que contenga JSON válido con esta forma exacta:

\`\`\`xml
<analysis>
{
  "summaryTitle": "Frase corta (≤80 caracteres) que resuma el motivo de la consulta para el histórico (ej. \\"Vómitos en Luna tras paseo\\").",
  "probableCauses": [
    { "title": "Causa probable 1", "likelihood": "alta" | "media" | "baja", "explanation": "Una frase explicando por qué encaja con lo descrito." }
  ],
  "recommendedActions": ["Acción concreta 1", "Acción concreta 2"],
  "observationGuidance": "Qué observar las próximas horas/días y cuándo volver a contactar.",
  "triageLevel": "urgente" | "preferente" | "orientativo",
  "escalateAvailable": true
}
</analysis>
\`\`\`

Reglas de uso del bloque:
- Antes del bloque \`<analysis>\`, puedes escribir un párrafo corto en lenguaje natural dirigido al usuario que introduzca el análisis (sin repetir literalmente lo que va dentro del JSON).
- El JSON debe ser parseable directamente (sin trailing commas, sin comentarios).
- Incluye entre 1 y 3 causas probables, ordenadas por likelihood descendente.
- \`triageLevel\`:
  - \`urgente\`: signos de emergencia veterinaria, requiere atención inmediata.
  - \`preferente\`: agendar veterinario en 24-48h.
  - \`orientativo\`: observable en casa, sin urgencia.
- \`escalateAvailable\`: \`true\` salvo casos donde no aplique reservar videoconsulta.
- Mientras NO tengas suficiente información, NO incluyas el bloque \`<analysis>\` — sigue haciendo preguntas conversacionales.`;

const VOICE_INSTRUCTION = `

# Voz y tono

- Habla siempre en español de España y tutea (\"tú\", no \"usted\").
- Llama a la mascota por su nombre cuando lo conozcas.
- Lenguaje probabilístico (\"lo más frecuente sería\", \"podría tratarse de\"), nunca diagnóstico (\"tu perro tiene\").
- Frases cortas, claras, sin jerga clínica innecesaria. Si usas un término técnico, explícalo.
- Cálido, sereno, fiable. Empatiza pero sin dramatizar.
- 3-5 preguntas de anamnesis máximo antes del análisis final. Refleja lo que ya entiendes (\"ya me has contado que…, ahora dime…\") para que el usuario sienta progreso.
- Nunca prometas curación, recetas ni dosificación de medicamentos.`;

function describePet(pet: PetContext): string {
  const lines: string[] = [];
  lines.push(`- Nombre: ${pet.name}`);
  lines.push(`- Especie: ${pet.species === "dog" ? "perro" : "gato"}`);
  if (pet.breed) lines.push(`- Raza: ${pet.breed}`);
  if (pet.sex) lines.push(`- Sexo: ${pet.sex === "male" ? "macho" : "hembra"}`);
  if (pet.neutered !== undefined) {
    lines.push(`- Esterilizado/castrado: ${pet.neutered ? "sí" : "no"}`);
  }
  if (pet.ageYears !== undefined) {
    lines.push(`- Edad aproximada: ${pet.ageYears} años`);
  } else if (pet.birthYear) {
    const age = new Date().getFullYear() - pet.birthYear;
    lines.push(`- Edad aproximada: ${age} años (nacido en ${pet.birthYear})`);
  }
  if (pet.weightKg) lines.push(`- Peso: ${pet.weightKg} kg`);
  if (pet.knownAllergies) lines.push(`- Alergias conocidas: ${pet.knownAllergies}`);
  return lines.join("\n");
}

function describeHistory(history: PriorConsultationSummary[]): string {
  if (history.length === 0) {
    return "Sin consultas previas registradas.";
  }
  return history
    .slice(0, 3)
    .map((c) => {
      const date = new Date(c.createdAt).toISOString().slice(0, 10);
      const title = c.summaryTitle ?? "Consulta sin título";
      const triage = c.triageLevel ? ` [${c.triageLevel}]` : "";
      return `- ${date}: ${title}${triage}`;
    })
    .join("\n");
}

export function buildSystemPrompt(input: BuildSystemPromptInput): string {
  const sections = [
    CLINICAL_SKILL,
    "\n\n# Mascota actual\n",
    describePet(input.pet),
    "\n\n# Historial reciente\n",
    describeHistory(input.recentConsultations),
    "\n\n# Disclaimer\n",
    DISCLAIMER_TEXT_LONG,
    VOICE_INSTRUCTION,
    STRUCTURED_OUTPUT_INSTRUCTION,
  ];
  return sections.join("");
}

// Re-export for tests / debug.
export { CLINICAL_SKILL, DISCLAIMER_TEXT_LONG };
