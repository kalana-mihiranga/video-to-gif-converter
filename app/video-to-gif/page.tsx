import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import VideoToReelConverter from "@/components/converter/VideoToReelConverter";
import { SITE_URL } from "@/lib/constants";
import { getBreadcrumbSchema, getSoftwareApplicationSchema } from "@/lib/schema";

const PAGE_TITLE = "Video to Facebook Reel Converter — Free & Private";
const PAGE_DESCRIPTION =
  "Reformat any video into a 9:16 Facebook Reel in your browser — auto-cropped, scaled to 720x1280, and trimmed to 90 seconds. Nothing is uploaded.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/video-to-reel",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/video-to-reel`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function VideoToReelPage() {
  const softwareSchema = getSoftwareApplicationSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Video to Facebook Reel", path: "/video-to-reel" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b border-surface-border/60 bg-canvas py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex justify-center gap-2 text-xs text-ink-faint">
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink-muted" aria-current="page">
              Video to Facebook Reel
            </span>
          </nav>

          <h1 className="text-balance font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Video to Facebook Reel Converter
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Upload a video below. It is cropped to 9:16, scaled to 720×1280
            and trimmed to 90 seconds entirely on your device — no file ever
            touches a server.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center rounded-xl2 border border-surface-border bg-surface text-sm text-ink-muted">
                Loading converter…
              </div>
            }
          >
            <VideoToReelConverter />
          </Suspense>
        </div>
      </section>
    </>
  );
}