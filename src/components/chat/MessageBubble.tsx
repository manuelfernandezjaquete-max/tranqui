import { Fragment } from "react";
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

// Lightweight markdown: render **bold** and *italic* spans without
// shipping a full markdown lib. Anything else stays as plain text.
function renderInlineMarkdown(text: string) {
  const tokens: Array<string | { kind: "bold" | "italic"; text: string }> = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      tokens.push({ kind: "bold", text: match[1] });
    } else if (match[2] !== undefined) {
      tokens.push({ kind: "italic", text: match[2] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }
  return tokens.map((t, i) => {
    if (typeof t === "string") return <Fragment key={i}>{t}</Fragment>;
    if (t.kind === "bold") return <strong key={i}>{t.text}</strong>;
    return <em key={i}>{t.text}</em>;
  });
}

export function MessageBubble({
  role,
  content,
  isStreaming,
  hideAnalysis,
}: MessageBubbleProps) {
  if (role === "system") return null;

  // Always strip — the <analysis> block is an internal protocol artifact
  // and must never reach the user. The hideAnalysis prop is a no-op kept
  // for forward compat. stripAnalysisBlock handles partial streams too:
  // if the opening tag has arrived but the closing tag hasn't, we cut
  // everything from the opening tag forward.
  void hideAnalysis;
  const displayContent = stripAnalysisBlock(content);
  const showCursor = isStreaming && role === "assistant";
  const trimmed = displayContent.trim();

  if (role === "user") {
    return (
      <div className="flex justify-end" aria-live="off">
        <div
          className={cn(
            "max-w-[75%] whitespace-pre-wrap break-words rounded-2xl bg-coral-100 px-4 py-3 text-sm text-zinc-900",
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
          "max-w-[75%] whitespace-pre-wrap break-words rounded-2xl bg-sage-100 px-4 py-3 text-sm leading-relaxed text-zinc-900",
          "rounded-bl-sm",
        )}
      >
        {trimmed.length === 0 && isStreaming ? (
          <StreamingCursor />
        ) : (
          <>
            {renderInlineMarkdown(displayContent)}
            {showCursor && <StreamingCursor />}
          </>
        )}
      </div>
    </div>
  );
}
