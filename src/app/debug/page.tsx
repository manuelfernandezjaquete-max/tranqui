import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TriageBadge } from "@/components/chat/TriageBadge";
import { DisclaimerBanner } from "@/components/chat/DisclaimerBanner";

export default function DebugPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <header>
        <h1 className="font-display text-3xl font-semibold text-sage-700">
          UI primitives — debug
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Verificación visual de Phase 0 — componentes base.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Reservar</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Saltar</Button>
          <Button variant="destructive">Eliminar</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Cargando</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Inputs</h2>
        <Input placeholder="Nombre de la mascota" />
        <Input placeholder="Con error" error />
        <Textarea placeholder="¿Qué te preocupa hoy?" rows={3} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Card</h2>
        <Card>
          <h3 className="font-display text-xl font-semibold">Card title</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Una card básica usando los tokens del design system.
          </p>
        </Card>
        <Card interactive>
          <p className="text-sm">Card interactiva (hover para ver shadow-md).</p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Neutral</Badge>
          <Badge variant="sage">Sage</Badge>
          <Badge variant="coral">Coral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">TriageBadge</h2>
        <div className="flex flex-wrap gap-2">
          <TriageBadge level="urgente" />
          <TriageBadge level="preferente" />
          <TriageBadge level="orientativo" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">DisclaimerBanner</h2>
        <DisclaimerBanner />
      </section>
    </main>
  );
}
