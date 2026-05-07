import { ImageSlot } from "@/components/ui/ImageSlot";

type Props = {
  title: string;
  paragraphs: string[];
  photoAlt: string;
  /** Pass when a real bio photo is available under /public. */
  photoSrc?: string;
};

export function Bio({ title, paragraphs, photoAlt, photoSrc }: Props) {
  return (
    <section className="band subpage">
      <div className="container">
        <div className="about-bio-grid">
          <ImageSlot
            src={photoSrc}
            shape="rect"
            filter="low"
            alt={photoAlt}
            placeholder={photoAlt}
            className="photo"
          />
          <div className="bio-text">
            <h2>{title}</h2>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
