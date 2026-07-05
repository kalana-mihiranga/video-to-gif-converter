import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SeoContent from "@/components/SeoContent";
import FAQ from "@/components/FAQ";
import RelatedTools from "@/components/RelatedTools";
import CTA from "@/components/CTA";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/constants";
import { getFaqSchema, getSoftwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const softwareSchema = getSoftwareApplicationSchema();
  const faqSchema = getFaqSchema();

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero />
      <Features />
      <SeoContent />
      <FAQ />
      <RelatedTools />
      <CTA />
    </>
  );
}
