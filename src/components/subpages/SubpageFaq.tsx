import { FaqList, type FaqEntry } from "@/components/ui/Faq";

type Props = {
  /** Defaults to "Antworten" / "Answers" / "Atsakymai" via the homeFaq.eyebrow on the caller. */
  eyebrow: string;
  title: string;
  items: FaqEntry[];
  /** Cream background — used on /rechtliche-betreuung. */
  variant?: "default" | "cream";
};

export function SubpageFaq({ eyebrow, title, items, variant = "default" }: Props) {
  return (
    <section
      className="band tight"
      id="faq"
      style={variant === "cream" ? { background: "#F4EFE5" } : undefined}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
