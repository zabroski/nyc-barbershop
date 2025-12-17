// src/sections/ServicesSection.tsx
import React from "react";
import { SERVICES } from "../../data/content";
import { formatMoney } from "../../utils/format";
import { scrollToId } from "../../utils/scroll";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import "./ServicesSection.css";

export function ServicesSection({
  onBook,
}: {
  onBook: (serviceId: string) => void;
}) {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Services"
          title="Clear prices. Zero confusion."
          desc="Pick a service, choose a barber (or no preference), and lock a time."
        />

        <div className="grid grid--services">
          {SERVICES.map((s) => (
            <div
              className={`card serviceCard ${
                s.popular ? "serviceCard--popular" : ""
              }`}
              key={s.id}
            >
              <div className="serviceCard__top">
                <div className="serviceCard__name">
                  {s.name} {s.popular && <span className="tag">Popular</span>}
                </div>
                <div className="serviceCard__meta">
                  <span className="muted">{s.minutes} min</span>
                  <span className="dot">•</span>
                  <span className="strong">
                    from {formatMoney(s.priceFrom)}
                  </span>
                </div>
              </div>
              <p className="serviceCard__desc">{s.description}</p>
              <div className="serviceCard__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => onBook(s.id)}
                >
                  Book {s.name}
                </button>
                <button className="btn" onClick={() => scrollToId("barbers")}>
                  Choose barber
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
