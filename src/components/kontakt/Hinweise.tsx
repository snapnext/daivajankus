import { useTranslations } from "next-intl";

type Note = { title: string; body: string };

export function Hinweise() {
  const t = useTranslations("kontakt");
  const items = t.raw("hinweise") as Note[];
  return (
    <section className="band tight">
      <div className="container">
        <div className="hinweise">
          {items.map((item, idx) => (
            <div key={idx}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
