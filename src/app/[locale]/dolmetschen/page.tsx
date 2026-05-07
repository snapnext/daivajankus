import type { Metadata } from "next";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";
import { routing, type Locale } from "@/i18n/routing";
import {
  alternatesFor,
  breadcrumbLD,
  faqPageLD,
  legalServiceLD,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

import { Crosslink } from "@/components/subpages/Crosslink";
import { DifferentiationBand } from "@/components/subpages/DifferentiationBand";
import {
  BuildingIcon,
  DocumentIcon,
  ScalesIcon,
} from "@/components/subpages/icons";
import { Services3Up, type ServiceItem } from "@/components/subpages/Services3Up";
import { Subhero } from "@/components/subpages/Subhero";
import { SubpageClosingCta } from "@/components/subpages/SubpageClosingCta";
import { SubpageFaq } from "@/components/subpages/SubpageFaq";
import { Twocol } from "@/components/subpages/Twocol";
import { JsonLd } from "@/components/seo/JsonLd";

const PATH = "/dolmetschen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "dolmetschen" });
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

export default async function DolmetschenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "dolmetschen" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumb" });
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  const ld = [
    breadcrumbLD(locale as Locale, [
      { name: tBc("home"), path: "/" },
      { name: t("breadcrumb"), path: PATH },
    ]),
    legalServiceLD(locale as Locale, t("hero.title"), t("hero.lead")),
    faqPageLD(faqItems),
  ];

  return (
    <>
      <PageBody />
      <JsonLd data={ld} />
    </>
  );
}

function PageBody() {
  const t = useTranslations("dolmetschen");
  const tBc = useTranslations("breadcrumb");
  const tHero = useTranslations("hero");
  const tHomeFaq = useTranslations("homeFaq");

  const services = t.raw("services.items") as Array<{
    title: string;
    desc: string;
    bullets: string[];
  }>;
  const items: [ServiceItem, ServiceItem, ServiceItem] = [
    { ...services[0], icon: <ScalesIcon className="service-icon" /> },
    { ...services[1], icon: <BuildingIcon className="service-icon" /> },
    { ...services[2], icon: <DocumentIcon className="service-icon" /> },
  ];

  const cities = t.raw("locations.cities") as string[];
  const ueList = t.raw("uebersetzungen.list") as string[];
  const diffItems = t.raw("differentiation.items") as Array<{
    title: string;
    body: string;
  }>;
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  return (
    <>
      <Subhero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        breadcrumb={{ home: tBc("home"), current: t("breadcrumb") }}
        actions={
          <>
            <Link
              href={{ pathname: "/kontakt", query: { topic: "dolmetschen" } }}
              className="btn btn-primary"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <a href={`tel:${CONTACT.phoneTel}`} className="btn btn-ghost">
              <span>{tHero("ctaSecondary")}</span>
            </a>
          </>
        }
      />

      <Services3Up
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        lede={t("services.lede")}
        items={items}
      />

      <Twocol
        eyebrow={t("uebersetzungen.eyebrow")}
        title={t("uebersetzungen.title")}
        variant="cream"
        left={
          <>
            <p>{t("uebersetzungen.p1")}</p>
            <p>{t("uebersetzungen.p2")}</p>
          </>
        }
        right={
          <>
            <h3>{t("uebersetzungen.h2")}</h3>
            <ul className="checklist">
              {ueList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        }
      />

      <Twocol
        eyebrow={t("locations.eyebrow")}
        title={t("locations.title")}
        left={<p>{t("locations.p1")}</p>}
        right={
          <ul className="locations-grid">
            {cities.map((city) => (
              <li key={city}>{city}</li>
            ))}
            <li className="note">{t("locations.note")}</li>
          </ul>
        }
      />

      <DifferentiationBand
        eyebrow={t("differentiation.eyebrow")}
        title={t("differentiation.title")}
        items={diffItems}
        variant="forest"
      />

      <SubpageFaq
        eyebrow={tHomeFaq("eyebrow")}
        title={t("faq.title")}
        items={faqItems}
      />

      <Crosslink
        eyebrow={t("crosslink.eyebrow")}
        body={t("crosslink.body")}
        cta={t("crosslink.cta")}
        href="/rechtliche-betreuung"
      />

      <SubpageClosingCta title={t("closing.title")} topic="dolmetschen" />
    </>
  );
}
