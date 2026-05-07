import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  left: ReactNode;
  right: ReactNode;
  /** When true, renders `.twocol.flip` (5fr 7fr instead of 7fr 5fr). */
  flip?: boolean;
  /** Cream background for the section. */
  variant?: "default" | "cream";
  className?: string;
};

export function Twocol({ eyebrow, title, left, right, flip, variant = "default", className }: Props) {
  return (
    <section
      className={`band subpage${className ? ` ${className}` : ""}`}
      style={variant === "cream" ? { background: "#F4EFE5" } : undefined}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className={flip ? "twocol flip" : "twocol"}>
          <div className="col">{left}</div>
          <div className="col">{right}</div>
        </div>
      </div>
    </section>
  );
}
