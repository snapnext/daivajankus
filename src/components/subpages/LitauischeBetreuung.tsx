type Case = { title: string; body: string };

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  cases: Case[];
};

/**
 * Forest band on /rechtliche-betreuung that mirrors the homepage Intersection
 * layout — body left, three numbered cases right. No CTA at the bottom
 * (the page already has its own closing CTA further down).
 */
export function LitauischeBetreuung({ eyebrow, title, body, cases }: Props) {
  return (
    <section className="band band-forest subpage">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow on-forest">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="inter-grid">
          <p className="inter-body">{body}</p>
          <div className="inter-cases">
            {cases.map((c, idx) => (
              <div key={idx} className="inter-case">
                <span className="num">{String(idx + 1).padStart(2, "0")}</span>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
