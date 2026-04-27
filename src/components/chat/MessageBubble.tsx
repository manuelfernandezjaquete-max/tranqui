import { Bot } from "lucide-react";
import { StreamingCursor } from "./StreamingCursor";
import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: string;
  isStreaming?: boolean;
  hideAnalysis?: boolean;
}

const ANALYSIS_OPEN = "<analysis>";
const ANALYSIS_CLOSE = "</analysis>";

function stripAnalysisBlock(content: string): string {
  const start = content.indexOf(ANALYSIS_OPEN);
  if (start === -1) return content;
  const end = content.indexOf(ANALYSIS_CLOSE);
  if (end === -1) return content.slice(0, start).trimEnd();
  return (
    content.slice(0, start).trimEnd() +
    content.slice(end + ANALYSIS_CLOSE.length).trimStart()
  );
}

export function MessageBubble({
  role,
  content,
  isStreaming,
  hideAnalysis,
}: MessageBubbleProps) {
  if (role === "system") return null;

  const displayContent = hideAnalysis ? stripAnalysisBlock(content) : content;
  const showCursor = isStreaming && role === "assistant";
  const trimmed = displayContent.trim();

  if (role === "user") {
    return (
      <div className="flex justify-end" aria-live="off">
        <div
          className={cn(
            "max-w-[75%] whitespace-pre-wrap break-words rounded-2xl bg-coral-100 px-4 py-3 text-sm text-text-primary",
            "rounded-br-sm",
          )}
        >
          {displayContent}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-end gap-2"
      aria-live={isStreaming ? "polite" : "off"}
    >
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sage-200 text-sage-700"
        aria-hidden
      >
        <Bot className="h-4 w-4" />
      </div>
      <div
        className={cn(
          "max-w-[75%] whitespace-pre-wrap break-words rounded-2xl bg-sage-100 px-4 py-3 text-sm text-text-primary",
          "rounded-bl-sm",
        )}
      >
        {trimmed.length === 0 && isStreaming ? (
          <StreamingCursor />
        ) : (
          <>
            {displayContent}
            {showCursor && <StreamingCursor />}
          </>
        )}
      </div>
    </div>
  );
}
