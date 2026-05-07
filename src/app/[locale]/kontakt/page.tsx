import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Link } from "@/i18n/navigation";
import { ContactChannels } from "@/components/kontakt/ContactChannels";
import { ContactForm } from "@/components/kontakt/ContactForm";
import { Hinweise } from "@/components/kontakt/Hinweise";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "kontakt" });
  return { title: `${t("title")} | Daiva Jankus` };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "kontakt" });
  const tForm = await getTranslations({ locale, namespace: "kontakt.form" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumb" });

  return (
    <>
      <section className="subhero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{tBc("home")}</Link>
            <span className="sep">/</span>
            <span aria-current="page">{tBc("contact")}</span>
          </div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1>{t("title")}</h1>
          <p className="lead">{t("lead")}</p>
        </div>
      </section>

      <ContactChannels />

      <section className="band subpage" style={{ background: "#F4EFE5" }}>
        <div className="container narrow">
          <div className="section-head">
            <div>
              <span className="eyebrow">{tForm("eyebrow")}</span>
              <h2>{tForm("title")}</h2>
            </div>
            <p className="lede">{tForm("lede")}</p>
          </div>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <Hinweise />
    </>
  );
}
