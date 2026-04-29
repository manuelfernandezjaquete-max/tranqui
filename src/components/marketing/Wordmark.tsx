import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({
  size = "md",
  href = "/",
}: {
  size?: "sm" | "md";
  href?: string;
}) {
  const dotSize = size === "sm" ? "h-6 w-6 text-base" : "h-7 w-7 text-lg";
  const textSize = size === "sm" ? "text-base" : "text-xl";
  return (
    <Link href={href} className="flex items-center gap-2">
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-sage-700 font-display font-semibold text-cream-100",
          dotSize,
        )}
      >
        t
      </span>
      <span
        className={cn(
          "font-display font-semibold tracking-tight text-text-primary",
          textSize,
        )}
      >
        tranqui
      </span>
    </Link>
  );
}
