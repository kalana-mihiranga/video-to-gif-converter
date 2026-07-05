import { ACCEPTED_EXTENSIONS, ACCEPTED_VIDEO_TYPES, MAX_FILE_SIZE_BYTES } from "./constants";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateVideoFile(file: File): FileValidationResult {
  const hasValidType =
    ACCEPTED_VIDEO_TYPES.includes(file.type as (typeof ACCEPTED_VIDEO_TYPES)[number]) ||
    ACCEPTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

  if (!hasValidType) {
    return {
      valid: false,
      error: "Unsupported file type. Please upload an MP4, MOV, AVI, WebM or MKV video.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "File is too large. Please upload a video under 300 MB.",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "This file appears to be empty.",
    };
  }

  return { valid: true };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
