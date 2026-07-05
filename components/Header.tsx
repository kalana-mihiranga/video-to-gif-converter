import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border/60 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
          aria-label={`${SITE_NAME} home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-reel-gradient text-sm font-bold text-canvas">
            GR
          </span>
          <span>
            {SITE_NAME}
            <span className="ml-1 hidden text-ink-muted sm:inline">.app</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            Features
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            FAQ
          </Link>
          <Link
            href="/#related-tools"
            className="text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            Tools
          </Link>
        </nav>

        <Link
          href="/video-to-gif"
          className="rounded-full bg-reel-gradient px-5 py-2.5 text-sm font-semibold text-canvas shadow-glow transition hover:opacity-90 focus-visible:opacity-90"
        >
          Open Converter
        </Link>
      </div>
    </header>
  );
}
