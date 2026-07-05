import { formatBytes } from "@/lib/utils";

interface GifPreviewProps {
  url: string;
  sizeBytes: number;
  fileName: string;
  onDownload: () => void;
  onReset: () => void;
}

export default function GifPreview({
  url,
  sizeBytes,
  fileName,
  onDownload,
  onReset,
}: GifPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl2 border border-success/40 bg-surface">
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-ink">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          GIF ready
        </p>
        <span className="font-mono text-xs text-ink-faint">
          {formatBytes(sizeBytes)}
        </span>
      </div>

      <img
        src={url}
        alt={`Converted GIF preview of ${fileName}`}
        className="max-h-96 w-full bg-canvas object-contain"
      />

      <div className="flex flex-col gap-3 p-4 sm:flex-row">
        <button
          type="button"
          onClick={onDownload}
          className="flex-1 rounded-full bg-reel-gradient px-6 py-3 text-center text-sm font-semibold text-canvas shadow-glow transition hover:opacity-90"
        >
          Download GIF
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full border border-surface-border bg-surface px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink-faint"
        >
          Convert another video
        </button>
      </div>
    </div>
  );
}
