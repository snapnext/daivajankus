import type { Metadata } from "next";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";
import { routing } from "@/i18n/routing";

import { Crosslink } from "@/components/subpages/Crosslink";
import { DifferentiationBand } from "@/components/subpages/DifferentiationBand";
import {
  HeartIcon,
  HouseIcon,
  WalletIcon,
} from "@/components/subpages/icons";
import { LitauischeBetreuung } from "@/components/subpages/LitauischeBetreuung";
import { Services3Up, type ServiceItem } from "@/components/subpages/Services3Up";
import { Subhero } from "@/components/subpages/Subhero";
import { SubpageClosingCta } from "@/components/subpages/SubpageClosingCta";
import { SubpageFaq } from "@/components/subpages/SubpageFaq";
import { Twocol } from "@/components/subpages/Twocol";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "betreuung" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function BetreuungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <PageBody />;
}

function PageBody() {
  const t = useTranslations("betreuung");
  const tBc = useTranslations("breadcrumb");
  const tHero = useTranslations("hero");
  const tHomeFaq = useTranslations("homeFaq");

  const scope = t.raw("scope.items") as Array<{
    title: string;
    desc: string;
    bullets: string[];
  }>;
  const items: [ServiceItem, ServiceItem, ServiceItem] = [
    { ...scope[0], icon: <WalletIcon className="service-icon" /> },
    { ...scope[1], icon: <HeartIcon className="service-icon" /> },
    { ...scope[2], icon: <HouseIcon className="service-icon" /> },
  ];

  const whatList = t.raw("what.list") as string[];
  const steps = t.raw("vorschlag.steps") as string[];
  const litCases = t.raw("litauisch.cases") as Array<{ title: string; body: string }>;
  const diffItems = t.raw("differentiation.items") as Array<{ title: string; body: string }>;
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  return (
    <>
      <Subhero
        eyebrow={t("hero.eyebrow")}
        eyebrowDot="forest"
        title={t("hero.title")}
        lead={t("hero.lead")}
        breadcrumb={{ home: tBc("home"), current: t("breadcrumb") }}
        actions={
          <>
            <Link
              href={{ pathname: "/kontakt", query: { topic: "betreuung" } }}
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
        eyebrow={t("scope.eyebrow")}
        title={t("scope.title")}
        lede={t("scope.lede")}
        items={items}
        accent="forest"
      />

      <Twocol
        eyebrow={t("what.eyebrow")}
        title={t("what.title")}
        variant="cream"
        left={
          <>
            <h3>{t("what.h1")}</h3>
            <p>{t("what.p1")}</p>
            <p>{t("what.p2")}</p>
          </>
        }
        right={
          <>
            <h3>{t("what.h2")}</h3>
            <ul className="checklist crosslist">
              {whatList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        }
      />

      <Twocol
        eyebrow={t("vorschlag.eyebrow")}
        title={t("vorschlag.title")}
        flip
        left={
          <>
            <h3>{t("vorschlag.h1")}</h3>
            <p>{t("vorschlag.p1")}</p>
            <p>{t("vorschlag.p2")}</p>
          </>
        }
        right={
          <>
            <h3>{t("vorschlag.h2")}</h3>
            <ol className="checklist">
              {steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </>
        }
      />

      <LitauischeBetreuung
        eyebrow={t("litauisch.eyebrow")}
        title={t("litauisch.title")}
        body={t("litauisch.body")}
        cases={litCases}
      />

      <DifferentiationBand
        eyebrow={t("differentiation.eyebrow")}
        title={t("differentiation.title")}
        items={diffItems}
      />

      <SubpageFaq
        eyebrow={tHomeFaq("eyebrow")}
        title={t("faq.title")}
        items={faqItems}
        variant="cream"
      />

      <Crosslink
        eyebrow={t("crosslink.eyebrow")}
        body={t("crosslink.body")}
        cta={t("crosslink.cta")}
        href="/dolmetschen"
      />

      <SubpageClosingCta title={t("closing.title")} topic="betreuung" />
    </>
  );
}
