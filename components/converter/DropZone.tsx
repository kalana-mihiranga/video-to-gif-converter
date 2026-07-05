"use client";

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export default function DropZone({ onFileSelected, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const file = event.dataTransfer.files?.[0];
      if (file) onFileSelected(file);
    },
    [disabled, onFileSelected]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) onFileSelected(file);
      // Allow re-selecting the same file later.
      event.target.value = "";
    },
    [onFileSelected]
  );

  const handleBrowseClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleBrowseClick();
      }
    },
    [handleBrowseClick]
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="Upload a video file by dragging it here or pressing enter to browse"
      onClick={handleBrowseClick}
      onKeyDown={handleKeyDown}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "film-strip flex flex-col items-center justify-center rounded-xl2 border-2 border-dashed px-6 py-16 text-center transition-colors cursor-pointer",
        isDragging
          ? "border-cyan bg-cyan/5"
          : "border-surface-border bg-surface hover:border-violet/60",
        disabled && "pointer-events-none opacity-60"
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-reel-gradient-soft">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-8 w-8 text-cyan"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>

      <p className="mt-6 font-display text-lg font-semibold text-ink">
        Drag &amp; drop your video here
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        or{" "}
        <span className="font-semibold text-cyan underline underline-offset-4">
          browse your device
        </span>
      </p>
      <p className="mt-4 font-mono text-xs text-ink-faint">
        MP4 &middot; MOV &middot; AVI &middot; WebM &middot; MKV &middot; up to 300MB
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/x-msvideo,video/webm,video/x-matroska,.mp4,.mov,.avi,.webm,.mkv"
        className="sr-only"
        onChange={handleInputChange}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
