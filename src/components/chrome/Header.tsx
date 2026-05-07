import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";
import type { Locale } from "@/i18n/routing";

import { BrandMark } from "./BrandMark";
import { HeaderShell } from "./HeaderShell";
import { LangToggle } from "./LangToggle";
import { MobileSheet } from "./MobileSheet";
import { NavLink } from "./NavLink";
import { PhoneIcon } from "./PhoneIcon";

const NAV_ITEMS = [
  { href: "/dolmetschen", key: "interpreting" },
  { href: "/rechtliche-betreuung", key: "guardianship" },
  { href: "/ueber", key: "about" },
  { href: "/kontakt", key: "contact" },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("header");
  const tn = useTranslations("nav");

  return (
    <HeaderShell>
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="Daiva Jankus">
          <BrandMark />
          <span className="wordmark-text">
            <span className="wordmark-name">Daiva Jankus</span>
            <span className="wordmark-sub">{t("subline")}</span>
          </span>
        </Link>
        <nav className="nav" aria-label={tn("ariaLabel")}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {tn(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="header-right">
          <LangToggle current={locale} />
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="tel-btn"
            aria-label={t("callAria")}
          >
            <PhoneIcon />
            <span>{CONTACT.phone}</span>
          </a>
          <MobileSheet>
            <nav aria-label={tn("ariaLabel")}>
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {tn(item.key)}
                </NavLink>
              ))}
            </nav>
            <div className="mobile-sheet-foot">
              <LangToggle current={locale} variant="full" />
              <div className="mobile-sheet-contact">
                <a href={`tel:${CONTACT.phoneTel}`} className="big-link">
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="big-link">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </MobileSheet>
        </div>
      </div>
    </HeaderShell>
  );
}
