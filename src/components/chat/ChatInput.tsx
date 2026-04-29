"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Send, Paperclip, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export interface ChatInputProps {
  onSend: (content: string, imageStorageId?: Id<"_storage">) => Promise<void> | void;
  disabled?: boolean;
  placeholder?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ChatInput({
  onSend,
  disabled,
  placeholder = "Escribe tu mensaje...",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);

  const canSend =
    (value.trim().length > 0 || imageStorageId !== null) &&
    !disabled &&
    !isSending &&
    !isUploading;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Solo se admiten imágenes JPEG, PNG, WebP o GIF.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("La imagen no puede superar 5 MB.");
      return;
    }

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to Convex storage
    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      setImageStorageId(storageId);
    } catch {
      setUploadError("Error al subir la imagen. Inténtalo de nuevo.");
      setImagePreview(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageStorageId(null);
    setUploadError(null);
  };

  const submit = async () => {
    if (!canSend) return;
    const content = value.trim();
    const sid = imageStorageId ?? undefined;
    setIsSending(true);
    try {
      // If only an image (no text), send a space so the message isn't empty
      await onSend(content || " ", sid);
      setValue("");
      setImagePreview(null);
      setImageStorageId(null);
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
    <div className="space-y-2">
      {/* Image preview */}
      {imagePreview && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreview}
            alt="Imagen adjunta"
            className="h-24 w-24 rounded-lg border border-border-default object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-text-primary text-text-inverse hover:opacity-80"
            aria-label="Eliminar imagen"
          >
            <X className="h-3 w-3" />
          </button>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-tranqui-danger" role="alert">
          {uploadError}
        </p>
      )}

      <div className="flex items-end gap-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          className="sr-only"
          onChange={handleFileChange}
        />

        {/* Attach button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isSending || isUploading}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-border-default bg-bg-elevated text-text-secondary hover:bg-bg-muted hover:text-text-primary disabled:pointer-events-none disabled:opacity-50"
          aria-label="Adjuntar imagen"
        >
          <Paperclip className="h-4 w-4" aria-hidden />
        </button>

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
    </div>
  );
}
