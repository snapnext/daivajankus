"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { CONTACT } from "@/lib/contact";

import { PhoneIcon } from "./PhoneIcon";

const SHOW_AT_PX = 200;

export function FloatingCall() {
  const t = useTranslations("header");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow(window.scrollY > SHOW_AT_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      href={`tel:${CONTACT.phoneTel}`}
      className="floating-call"
      data-show={show ? "" : undefined}
      aria-label={t("callAria")}
    >
      <PhoneIcon />
    </a>
  );
}
