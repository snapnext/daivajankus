type Item = { title: string; body: string };

type Props = {
  eyebrow: string;
  title: string;
  items: Item[];
  /** Forest variant matches the homepage band-forest treatment used on /dolmetschen. */
  variant?: "default" | "forest";
};

export function DifferentiationBand({ eyebrow, title, items, variant = "default" }: Props) {
  const sectionClass = `band tight${variant === "forest" ? " band-forest" : ""}`;
  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className={`eyebrow${variant === "forest" ? " on-forest" : ""}`}>
              {eyebrow}
            </span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="diff-grid">
          {items.map((item, idx) => (
            <div key={idx} className="diff-item">
              <div className="diff-numeral">{String(idx + 1).padStart(2, "0")}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
