import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const sourcePath = resolve(projectRoot, "skills/agente-veterinario-ia.md");
const outputPath = resolve(projectRoot, "convex/lib/clinicalSkill.generated.ts");

const skillContent = readFileSync(sourcePath, "utf8");

const generated = `// AUTO-GENERATED FROM skills/agente-veterinario-ia.md — do not edit by hand.
// Regenerate with: pnpm build:skill

export const CLINICAL_SKILL = ${JSON.stringify(skillContent)};
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, generated, "utf8");

console.log(
  `Wrote ${outputPath} (${skillContent.length} chars from skill source).`,
);
