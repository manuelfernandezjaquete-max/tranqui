import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const triageBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold uppercase tracking-wide",
  {
    variants: {
      level: {
        urgente:
          "border-tranqui-danger/30 bg-tranqui-danger/12 text-tranqui-danger",
        preferente:
          "border-tranqui-warning/30 bg-tranqui-warning/14 text-amber-700",
        orientativo:
          "border-tranqui-success/30 bg-tranqui-success/12 text-tranqui-success",
      },
    },
    defaultVariants: {
      level: "orientativo",
    },
  },
);

const TRIAGE_LABELS: Record<NonNullable<TriageLevel>, string> = {
  urgente: "Urgente",
  preferente: "Preferente",
  orientativo: "Orientativo",
};

export type TriageLevel = "urgente" | "preferente" | "orientativo";

export interface TriageBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof triageBadgeVariants> {
  level: TriageLevel;
}

export const TriageBadge = React.forwardRef<HTMLSpanElement, TriageBadgeProps>(
  ({ className, level, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(triageBadgeVariants({ level }), className)}
        {...props}
      >
        {TRIAGE_LABELS[level]}
      </span>
    );
  },
);
TriageBadge.displayName = "TriageBadge";
