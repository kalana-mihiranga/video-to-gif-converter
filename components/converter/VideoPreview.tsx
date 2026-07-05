import type { SyntheticEvent } from "react";
import { formatBytes } from "@/lib/utils";

interface VideoPreviewProps {
  file: File;
  url: string;
  duration: number | null;
  onLoadedMetadata?: (event: SyntheticEvent<HTMLVideoElement>) => void;
}

export default function VideoPreview({
  file,
  url,
  duration,
  onLoadedMetadata,
}: VideoPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl2 border border-surface-border bg-surface">
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
        <p className="truncate text-sm font-medium text-ink" title={file.name}>
          {file.name}
        </p>
        <span className="ml-3 shrink-0 font-mono text-xs text-ink-faint">
          {formatBytes(file.size)}
          {duration ? ` · ${duration.toFixed(1)}s` : ""}
        </span>
      </div>
      <video
        src={url}
        controls
        onLoadedMetadata={onLoadedMetadata}
        className="max-h-96 w-full bg-canvas"
        aria-label={`Preview of ${file.name}`}
      />
    </div>
  );
}
