import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-reel-gradient-soft blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface px-4 py-1.5 text-xs font-medium text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            100% client-side &middot; nothing is uploaded
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Turn any video into a{" "}
            <span className="bg-reel-gradient bg-clip-text text-transparent">
              perfect GIF
            </span>{" "}
            — right in your browser
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted">
            Drop in an MP4, MOV, AVI or WebM file and get a smooth, shareable
            GIF in seconds. No uploads, no watermark, no sign-up — your video
            never leaves your device.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/video-to-gif"
              className="w-full rounded-full bg-reel-gradient px-8 py-3.5 text-center font-display text-sm font-semibold text-canvas shadow-glow transition hover:opacity-90 sm:w-auto"
            >
              Convert a video now
            </Link>
            <Link
              href="#how-it-works"
              className="w-full rounded-full border border-surface-border bg-surface px-8 py-3.5 text-center text-sm font-semibold text-ink transition hover:border-ink-faint sm:w-auto"
            >
              See how it works
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs font-mono text-ink-faint">
            <span>fps=12</span>
            <span className="h-1 w-1 rounded-full bg-ink-faint" />
            <span>scale=480:-1</span>
            <span className="h-1 w-1 rounded-full bg-ink-faint" />
            <span>palettegen + paletteuse</span>
          </div>
        </div>

        {/* Signature element: a film-leader style frame strip framing the product */}
        <div className="film-strip relative mx-auto mt-16 max-w-4xl rounded-xl2 border border-surface-border bg-surface p-2 shadow-glow">
          <div className="flex items-center gap-2 rounded-lg bg-canvas px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
            </div>
            <span className="ml-2 font-mono text-xs text-ink-faint">
              video-to-gif.converter
            </span>
          </div>
          <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-lg sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-canvas"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,92,170,0.12), rgba(77,225,255,0.12))",
                }}
              >
                <div className="flex h-full items-center justify-center font-mono text-[10px] text-ink-faint">
                  frame {String(i * 4).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
