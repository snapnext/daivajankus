type Item = { year: string; title: string; body: string };

type Props = {
  eyebrow: string;
  title: string;
  items: Item[];
};

export function Timeline({ eyebrow, title, items }: Props) {
  return (
    <section className="band subpage" data-bg="cream" style={{ background: "#F4EFE5" }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <ol className="timeline">
          {items.map((item, idx) => (
            <li key={idx}>
              <span className="year">{item.year}</span>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
