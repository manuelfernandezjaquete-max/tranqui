import { Card } from "@/components/ui";
import { TriageBadge } from "@/components/chat/TriageBadge";

export function HeroPreview() {
  return (
    <div className="relative">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[40px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(232,155,123,.16), transparent 70%)",
        }}
      />
      <Card className="relative z-10 overflow-hidden p-0">
        {/* fake browser chrome */}
        <div className="flex items-center gap-2.5 border-b border-border-default bg-bg-muted px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c2]" />
          </div>
          <div className="flex-1 text-center font-mono text-[11px] text-text-secondary/60">
            tranqui.app/consult
          </div>
        </div>

        <div className="flex flex-col gap-3.5 p-6">
          {/* user msg */}
          <div className="self-end max-w-[78%]">
            <div className="rounded-2xl rounded-br-sm bg-coral-100 px-3.5 py-2.5 text-sm text-text-primary">
              Luna lleva toda la tarde rascándose la oreja derecha y huele un poco
              raro.
            </div>
          </div>
          {/* assistant msg */}
          <div className="flex items-end gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-700 font-display text-xs font-semibold text-cream-100">
              t
            </span>
            <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-sage-100 px-3.5 py-2.5 text-sm leading-relaxed text-text-primary">
              Entiendo. Para orientarte mejor, ¿se rasca <em>solo</em> la oreja
              derecha o las dos? ¿Y cuándo notaste el olor por primera vez?
            </div>
          </div>

          {/* mini analysis */}
          <div className="mt-2 rounded-xl border border-border-default bg-bg-muted p-4">
            <div className="mb-2.5 flex items-center gap-2.5">
              <TriageBadge level="orientativo" />
              <span className="text-xs text-text-secondary/70">
                Análisis preliminar
              </span>
            </div>
            <div className="mb-2.5 font-display text-base font-medium text-text-primary">
              Lo más probable: otitis externa leve
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                "Limpia con suero fisiológico, no introduzcas nada.",
                "Observa 24-48h.",
                "Si aparece dolor o secreción amarilla, escríbenos.",
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-[13px] text-text-primary"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-sage-500" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
