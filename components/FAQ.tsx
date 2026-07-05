import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-surface-border/60 bg-canvas-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-ink-muted">
            Everything you need to know about converting video to GIF in your
            browser.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl2 border border-surface-border bg-surface px-6 py-4 open:shadow-glow"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink marker:content-none">
                {item.question}
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-surface-border text-ink-muted transition group-open:rotate-45 group-open:text-cyan"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
