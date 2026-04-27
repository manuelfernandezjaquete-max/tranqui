import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg bg-bg-elevated p-6 shadow-sm transition-shadow",
  {
    variants: {
      interactive: {
        true: "cursor-pointer hover:shadow-md",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ interactive }), className)}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";
