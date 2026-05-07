import type { ReactNode } from "react";

export type ServiceItem = {
  title: string;
  desc: string;
  bullets: string[];
  icon: ReactNode;
};

type Props = {
  eyebrow: string;
  title: string;
  /** Optional intro paragraph rendered as `.lede`. */
  lede?: string;
  items: [ServiceItem, ServiceItem, ServiceItem];
  /** Color of icons + bullets. Forest is used on /rechtliche-betreuung Aufgabenkreise. */
  accent?: "amber" | "forest";
  /** Section background — when set the section gets `.subpage` and the cream background. */
  variant?: "default" | "cream";
};

export function Services3Up({
  eyebrow,
  title,
  lede,
  items,
  accent = "amber",
  variant = "default",
}: Props) {
  return (
    <section
      className="band subpage"
      style={variant === "cream" ? { background: "#F4EFE5" } : undefined}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          {lede ? <p className="lede">{lede}</p> : null}
        </div>
        <div className="services-grid">
          {items.map((item, idx) => (
            <article key={idx} className={`service${accent === "forest" ? " forest" : ""}`}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ul>
                {item.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
