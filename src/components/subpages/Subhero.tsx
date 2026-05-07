import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type Props = {
  /** Top label, e.g. "Mandat I · OLG Düsseldorf". */
  eyebrow: string;
  /** Optional bullet color before the eyebrow text. */
  eyebrowDot?: "amber" | "forest";
  title: string;
  lead: string;
  breadcrumb: { home: string; current: string };
  /** Action buttons; omit for pure-content subheros (e.g. /ueber). */
  actions?: ReactNode;
};

export function Subhero({ eyebrow, eyebrowDot, title, lead, breadcrumb, actions }: Props) {
  return (
    <section className="subhero">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">{breadcrumb.home}</Link>
          <span className="sep">/</span>
          <span aria-current="page">{breadcrumb.current}</span>
        </div>
        <span className="eyebrow">
          {eyebrowDot ? (
            <span className={eyebrowDot === "forest" ? "dot forest" : "dot"} />
          ) : null}
          <span>{eyebrow}</span>
        </span>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
