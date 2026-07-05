interface ProgressBarProps {
  ratio: number; // 0..1
  label: string;
}

export default function ProgressBar({ ratio, label }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(ratio, 0), 1) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between font-mono text-xs text-ink-muted">
        <span>{label}</span>
        <span aria-hidden="true">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2.5 w-full overflow-hidden rounded-full bg-surface-raised"
      >
        <div
          className="h-full rounded-full bg-reel-gradient transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
