import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold",
  {
    variants: {
      variant: {
        neutral: "bg-bg-muted text-text-secondary",
        sage: "bg-sage-200 text-sage-700",
        coral: "bg-coral-100 text-coral-600",
        success: "bg-tranqui-success/12 text-tranqui-success",
        warning: "bg-tranqui-warning/14 text-tranqui-warning",
        danger: "bg-tranqui-danger/12 text-tranqui-danger",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";
