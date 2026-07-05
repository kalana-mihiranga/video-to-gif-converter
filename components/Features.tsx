const FEATURES = [
  {
    label: "Private by design",
    title: "Nothing ever leaves your device",
    description:
      "Conversion runs fully inside your browser tab using WebAssembly. There is no upload step and no server ever sees your video.",
  },
  {
    label: "High quality output",
    title: "Two-pass palette optimization",
    description:
      "We generate a custom color palette for every clip with palettegen, then apply it with paletteuse for smooth gradients and fewer artifacts.",
  },
  {
    label: "Fast",
    title: "Hardware-accelerated in-browser",
    description:
      "FFmpeg.wasm loads once and processes frames locally, so repeated conversions in the same session are near-instant.",
  },
  {
    label: "Works everywhere",
    title: "Any modern browser, any device",
    description:
      "No installs, no plugins. Works on desktop and mobile browsers that support WebAssembly — which is nearly all of them.",
  },
  {
    label: "No limits",
    title: "Free, unlimited conversions",
    description:
      "Convert as many videos as you like. There's no watermark, no daily cap and no account required.",
  },
  {
    label: "Format flexible",
    title: "MP4, MOV, AVI, WebM, MKV",
    description:
      "Upload almost any common video container and get a clean, optimized animated GIF back out.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-surface-border/60 bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Built for speed, privacy and quality
          </h2>
          <p className="mt-4 text-ink-muted">
            Everything you would expect from a desktop video editor, packed
            into a single browser tab.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl2 border border-surface-border bg-surface p-6 transition hover:border-violet/50 hover:shadow-glow"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                {feature.label}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
