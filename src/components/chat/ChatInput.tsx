"use client";

import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export interface ChatInputProps {
  onSend: (content: string) => Promise<void> | void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled,
  placeholder = "Escribe tu mensaje...",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const canSend = value.trim().length > 0 && !disabled && !isSending;

  const submit = async () => {
    if (!canSend) return;
    const content = value.trim();
    setIsSending(true);
    try {
      await onSend(content);
      setValue("");
    } finally {
      setIsSending(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={2}
        maxLength={2000}
        disabled={disabled || isSending}
        className="min-h-12 resize-none"
        aria-label="Mensaje"
      />
      <Button
        type="button"
        onClick={submit}
        disabled={!canSend}
        loading={isSending}
        size="md"
        aria-label="Enviar"
      >
        <Send className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
