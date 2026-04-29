import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ErrorState({
  title = "Algo ha ido mal",
  description = "No hemos podido cargar esta sección. Prueba a recargar la página.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-tranqui-danger/20 bg-tranqui-danger/5 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tranqui-danger/10 text-tranqui-danger">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h2 className="font-display text-xl font-semibold text-text-primary">
          {title}
        </h2>
        <p className="max-w-xs text-sm text-text-secondary">{description}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </Button>
      )}
    </div>
  );
}
