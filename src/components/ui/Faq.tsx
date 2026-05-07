"use client";

import { useState } from "react";

export type FaqEntry = { q: string; a: string };

export function FaqList({ items }: { items: FaqEntry[] }) {
  return (
    <div className="faq-list">
      {items.map((item, idx) => (
        <FaqItem key={idx} item={item} />
      ))}
    </div>
  );
}

function FaqItem({ item }: { item: FaqEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" data-open={open ? "" : undefined}>
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{item.q}</span>
        <span className="icon" aria-hidden="true" />
      </button>
      <div className="faq-panel">
        <div className="faq-panel-inner">{item.a}</div>
      </div>
    </div>
  );
}
