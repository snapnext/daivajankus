import type { Metadata } from "next";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing, type Locale } from "@/i18n/routing";
import {
  alternatesFor,
  breadcrumbLD,
  openGraphFor,
  profilePageLD,
  twitterFor,
} from "@/lib/seo";

import { Bio } from "@/components/subpages/Bio";
import { CredentialsGrid } from "@/components/subpages/CredentialsGrid";
import { Subhero } from "@/components/subpages/Subhero";
import { SubpageClosingCta } from "@/components/subpages/SubpageClosingCta";
import { Timeline } from "@/components/subpages/Timeline";
import { JsonLd } from "@/components/seo/JsonLd";

const PATH = "/ueber";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "ueber" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: alternatesFor(locale as Locale, PATH),
    openGraph: openGraphFor({ locale: locale as Locale, path: PATH, title, description }),
    twitter: twitterFor({ title, description }),
  };
}

export default async function UeberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ueber" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumb" });

  const ld = [
    breadcrumbLD(locale as Locale, [
      { name: tBc("home"), path: "/" },
      { name: t("breadcrumb"), path: PATH },
    ]),
    profilePageLD(locale as Locale, t("hero.title"), t("hero.lead")),
  ];

  return (
    <>
      <PageBody />
      <JsonLd data={ld} />
    </>
  );
}

function PageBody() {
  const t = useTranslations("ueber");
  const tBc = useTranslations("breadcrumb");
  const tClosing = useTranslations("closing");

  const bioParas = [t("bio.p1"), t("bio.p2"), t("bio.p3"), t("bio.p4")];
  const timelineItems = t.raw("timeline.items") as Array<{
    year: string;
    title: string;
    body: string;
  }>;
  const credGroups = t.raw("credentials.groups") as Array<{
    title: string;
    items: string[];
  }>;

  return (
    <>
      <Subhero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        breadcrumb={{ home: tBc("home"), current: t("breadcrumb") }}
      />

      <Bio
        title={t("bio.title")}
        paragraphs={bioParas}
        photoAlt={t("bio.photoAlt")}
        photoSrc="/images/daiva-werdegang.png"
      />

      <Timeline
        eyebrow={t("timeline.eyebrow")}
        title={t("timeline.title")}
        items={timelineItems}
      />

      <CredentialsGrid
        eyebrow={t("credentials.eyebrow")}
        title={t("credentials.title")}
        groups={credGroups}
      />

      <SubpageClosingCta title={tClosing("title")} />
    </>
  );
}
