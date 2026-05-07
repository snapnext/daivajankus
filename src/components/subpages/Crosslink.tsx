import { Link } from "@/i18n/navigation";

type Href = "/dolmetschen" | "/rechtliche-betreuung" | "/ueber" | "/kontakt";

type Props = {
  eyebrow: string;
  body: string;
  cta: string;
  href: Href;
};

export function Crosslink({ eyebrow, body, cta, href }: Props) {
  return (
    <aside className="crosslink">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <p>{body}</p>
        <Link href={href} className="arrow-link">
          <span>{cta}</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </aside>
  );
}
