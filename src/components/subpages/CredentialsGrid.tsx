type Group = { title: string; items: string[] };

type Props = {
  eyebrow: string;
  title: string;
  groups: Group[];
};

export function CredentialsGrid({ eyebrow, title, groups }: Props) {
  return (
    <section className="band subpage">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="credentials-grid">
          {groups.map((group, idx) => (
            <div key={idx} className="cred">
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
