// src/sections/FAQSection.tsx
import React, { useState } from "react";
import { FAQ } from "../../data/content";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import "./FAQSection.css";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faqItem">
      <button
        className="faqItem__q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="faqItem__icon" aria-hidden="true">
          {open ? "–" : "+"}
        </span>
      </button>
      {open && <div className="faqItem__a">{a}</div>}
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <SectionTitle
          eyebrow="FAQ"
          title="Quick answers."
          desc="Transparent policies and a smooth experience."
        />
        <div className="faq">
          {FAQ.map((x) => (
            <FAQItem key={x.q} q={x.q} a={x.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
