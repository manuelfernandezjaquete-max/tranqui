import { Info } from "lucide-react";
import { DISCLAIMER_TEXT_SHORT } from "@/lib/disclaimer";
import { cn } from "@/lib/utils";

export type DisclaimerBannerProps = React.HTMLAttributes<HTMLDivElement>;

export function DisclaimerBanner({
  className,
  ...props
}: DisclaimerBannerProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-md border-l-4 border-tranqui-info bg-bg-muted px-4 py-3 text-sm text-text-secondary",
        className,
      )}
      {...props}
    >
      <Info
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-tranqui-info"
        aria-hidden
      />
      <p>{DISCLAIMER_TEXT_SHORT}</p>
    </div>
  );
}
