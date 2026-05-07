import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Mandates } from "@/components/home/Mandates";
import { Intersection } from "@/components/home/Intersection";
import { Differentiation } from "@/components/home/Differentiation";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ClosingCta } from "@/components/home/ClosingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { faqPageLD } from "@/lib/seo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Emit a FAQPage schema for the top-of-funnel questions on the homepage.
  const t = await getTranslations({ locale, namespace: "homeFaq" });
  const faqItems = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <>
      <Hero />
      <TrustBar />
      <Mandates />
      <Intersection />
      <Differentiation />
      <AboutTeaser />
      <HomeFaq />
      <ClosingCta />
      <JsonLd data={faqPageLD(faqItems)} />
    </>
  );
}
