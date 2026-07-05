import Link from "next/link";

export default function CTA() {
  return (
    <section className="border-t border-surface-border/60 bg-canvas-soft py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Ready to turn your video into a GIF?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          It takes seconds, stays on your device, and there is nothing to
          install. Try it now — completely free.
        </p>
        <div className="mt-8">
          <Link
            href="/video-to-gif"
            className="inline-block rounded-full bg-reel-gradient px-8 py-3.5 font-display text-sm font-semibold text-canvas shadow-glow transition hover:opacity-90"
          >
            Open the converter
          </Link>
        </div>
      </div>
    </section>
  );
}
