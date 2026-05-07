"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  current: Locale;
  variant?: "default" | "full";
};

const SHORT_LABEL: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  lt: "LT",
};

export function LangToggle({ current, variant = "default" }: Props) {
  const t = useTranslations("lang");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`lang-toggle${variant === "full" ? " lang-toggle-full" : ""}`}
      role="group"
      aria-label={t("selectLabel")}
    >
      {routing.locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <button
            key={locale}
            type="button"
            aria-pressed={isCurrent}
            aria-current={isCurrent ? "true" : undefined}
            onClick={() => {
              if (isCurrent) return;
              // pathname here is the locale-stripped path, so passing { locale } switches.
              router.replace(pathname, { locale });
            }}
          >
            {variant === "full" ? t(locale) : SHORT_LABEL[locale]}
          </button>
        );
      })}
    </div>
  );
}
