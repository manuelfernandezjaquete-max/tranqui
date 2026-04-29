import * as React from "react";

export function LegalPage({
  title,
  lastUpdated,
  draft = true,
  children,
}: {
  title: string;
  lastUpdated: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-sage-700">
        Tranqui · Legal
      </p>
      <h1 className="font-display text-4xl font-medium tracking-tight text-text-primary sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-text-secondary/70">
        Última actualización: {lastUpdated}
      </p>
      {draft && (
        <div className="mt-6 rounded-lg border border-tranqui-warning/30 bg-tranqui-warning/10 p-4 text-sm text-text-primary">
          <strong className="font-semibold">Borrador.</strong> Este texto es una
          plantilla pendiente de revisión por asesor legal español antes del
          lanzamiento público.
        </div>
      )}
      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-text-primary">
        {children}
      </div>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-medium tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="space-y-3 text-text-secondary">{children}</div>
    </section>
  );
}
