import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type Props = {
  /** Title shown above the WIP body. */
  title: string;
  /** Optional lead text describing the page. */
  lead?: string;
  breadcrumb: { home: string; current: string };
};

/**
 * Placeholder used by /dolmetschen, /rechtliche-betreuung, /ueber, etc. until
 * those pages get their full content. Keeps internal links from 404'ing and
 * mirrors the subhero layout from the design.
 */
export function Wip({ title, lead, breadcrumb }: Props) {
  const t = useTranslations("subpages.wip");
  return (
    <section className="subhero wip">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">{breadcrumb.home}</Link>
          <span className="sep">/</span>
          <span aria-current="page">{breadcrumb.current}</span>
        </div>
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        <p className="lead muted" style={{ marginTop: 16 }}>
          {t("body")}
        </p>
        <Link href="/" className="arrow-link">
          <span>{t("back")}</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
