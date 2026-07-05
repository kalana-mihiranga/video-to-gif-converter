import Link from "next/link";
import { RELATED_TOOLS } from "@/lib/constants";

export default function RelatedTools() {
  return (
    <section
      id="related-tools"
      className="border-t border-surface-border/60 bg-canvas py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            More tools for your media workflow
          </h2>
          <p className="mt-4 text-ink-muted">
            Explore other browser-based tools that keep your files private.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group flex flex-col justify-between rounded-xl2 border border-surface-border bg-surface p-6 transition hover:border-magenta/50 hover:shadow-glow"
            >
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {tool.description}
                </p>
              </div>
              <span className="mt-4 text-sm font-semibold text-cyan transition group-hover:translate-x-1">
                Try it &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
