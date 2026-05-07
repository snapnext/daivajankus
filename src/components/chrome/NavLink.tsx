"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/navigation";

type Href = "/" | "/dolmetschen" | "/rechtliche-betreuung" | "/ueber" | "/kontakt";

export function NavLink({ href, children }: { href: Href; children: ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
