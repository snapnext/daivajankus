import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Wip } from "@/components/subpages/Wip";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "subpages.about" });
  return { title: `${t("title")} | Daiva Jankus` };
}

export default async function UeberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "subpages.about" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumb" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Wip
      title={t("title")}
      lead={t("lead")}
      breadcrumb={{ home: tBc("home"), current: tNav("about") }}
    />
  );
}
