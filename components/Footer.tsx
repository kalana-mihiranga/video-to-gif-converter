import Link from "next/link";
import { RELATED_TOOLS, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border/60 bg-canvas-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-reel-gradient text-xs font-bold text-canvas">
                GR
              </span>
              {SITE_NAME}
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              A privacy-first Video to GIF converter. Every frame is decoded and
              rendered locally in your browser with FFmpeg.wasm — your files
              never touch a server.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Product
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <Link href="/video-to-gif" className="transition hover:text-ink">
                  Video to GIF
                </Link>
              </li>
              <li>
                <Link href="/#features" className="transition hover:text-ink">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition hover:text-ink">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Related tools
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              {RELATED_TOOLS.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="transition hover:text-ink">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-border/60 pt-6 text-xs text-ink-faint md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All processing happens
            on your device.
          </p>
          <p>Built with Next.js, React and FFmpeg.wasm.</p>
        </div>
      </div>
    </footer>
  );
}
