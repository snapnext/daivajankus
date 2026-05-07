import { useTranslations } from "next-intl";

import { CONTACT } from "@/lib/contact";

type Channel = { title: string; hint: string; value?: string };

export function ContactChannels() {
  const t = useTranslations("kontakt");
  const channels = t.raw("channels") as Channel[];
  // [phone, email, address] — order is fixed by design.
  const [phone, email, address] = channels;

  return (
    <section className="band subpage">
      <div className="container">
        <div className="contact-channels">
          <Channel num="01" title={phone.title} hint={phone.hint}>
            <a className="big-link" href={`tel:${CONTACT.phoneTel}`}>
              {CONTACT.phone}
            </a>
          </Channel>
          <Channel num="02" title={email.title} hint={email.hint}>
            <a className="big-link" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </Channel>
          <Channel num="03" title={address.title} hint={address.hint}>
            <span className="big-link" style={{ border: "none", cursor: "default" }}>
              {address.value ?? `${CONTACT.city}, NRW`}
            </span>
          </Channel>
        </div>
      </div>
    </section>
  );
}

function Channel({
  num,
  title,
  hint,
  children,
}: {
  num: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="channel">
      <span className="num">{num}</span>
      <h3>{title}</h3>
      {children}
      <p className="hint">{hint}</p>
    </div>
  );
}
