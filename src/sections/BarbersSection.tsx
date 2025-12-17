// src/sections/BarbersSection.tsx
import React from "react";
import { BARBERS } from "../data/content";
import { SectionTitle } from "../components/SectionTitle";

export function BarbersSection({
  onBook,
}: {
  onBook: (barberId: string, serviceId?: string) => void;
}) {
  return (
    <section id="barbers" className="section section--alt">
      <div className="container">
        <SectionTitle
          eyebrow="Barbers"
          title="Real people. Consistent results."
          desc="Pick your style—precision fades, classic cuts, or beard artistry."
        />

        <div className="grid grid--barbers">
          {BARBERS.map((b) => (
            <div className="card barberCard" key={b.id}>
              <div className="barberCard__top">
                <img src={b.image} alt={b.name} className="barberPhoto" />
                <div className="barberCard__who">
                  <div className="barberCard__name">{b.name}</div>
                  <div className="muted">{b.title}</div>
                </div>
              </div>

              <div className="barberCard__chips">
                {b.specialty.map((s) => (
                  <span key={s} className="chip chip--soft">
                    {s}
                  </span>
                ))}
              </div>

              <div className="barberCard__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => onBook(b.id)}
                >
                  Book with {b.name.split(" ")[0]}
                </button>
                <button className="btn" onClick={() => onBook(b.id, "fade")}>
                  Quick fade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
