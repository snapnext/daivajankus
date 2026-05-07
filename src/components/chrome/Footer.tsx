import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const COL1 = [
  { href: "/dolmetschen", key: "interpreting" },
  { href: "/rechtliche-betreuung", key: "guardianship" },
] as const;

const COL2 = [
  { href: "/ueber", key: "about" },
  { href: "/kontakt", key: "contact" },
] as const;

const COL3 = [
  { href: "/impressum", key: "imprint" },
  { href: "/datenschutz", key: "privacy" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tlegal = useTranslations("footer");
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-wordmark">
            <div className="name">Daiva Jankus</div>
            <div className="tag">{t("tag")}</div>
            <div className="olg">{t("olg")}</div>
          </div>
          <div>
            <h5>{t("col1")}</h5>
            <ul>
              {COL1.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{tn(item.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t("col2")}</h5>
            <ul>
              {COL2.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{tn(item.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t("col3")}</h5>
            <ul>
              {COL3.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{tlegal(item.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t("copy")}</span>
          <span>{t("langs")}</span>
        </div>
      </div>
    </footer>
  );
}
