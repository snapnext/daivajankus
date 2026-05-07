import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Mandates } from "@/components/home/Mandates";
import { Intersection } from "@/components/home/Intersection";
import { Differentiation } from "@/components/home/Differentiation";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ClosingCta } from "@/components/home/ClosingCta";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

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
    </>
  );
}
