import "../globals.css";

import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { FloatingCall } from "@/components/chrome/FloatingCall";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  alternatesFor,
  openGraphFor,
  personAndBusinessLD,
  twitterFor,
} from "@/lib/seo";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    alternates: alternatesFor(locale as Locale, "/"),
    openGraph: openGraphFor({
      locale: locale as Locale,
      path: "/",
      title,
      description,
    }),
    twitter: twitterFor({ title, description }),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={barlow.variable}>
      <body>
        <NextIntlClientProvider>
          <Header locale={locale as Locale} />
          <main id="top">{children}</main>
          <Footer />
          <FloatingCall />
          <JsonLd data={personAndBusinessLD()} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
