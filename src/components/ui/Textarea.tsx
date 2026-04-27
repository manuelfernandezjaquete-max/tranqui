import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "block w-full rounded-md bg-bg-muted px-4 py-3 text-base text-text-primary placeholder:text-text-secondary",
          "border border-transparent transition-colors",
          "focus:bg-bg-elevated focus:border-sage-500 focus:outline-none focus:ring-0",
          "min-h-24 resize-y",
          error && "border-tranqui-danger focus:border-tranqui-danger",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
