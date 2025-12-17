import React from "react";
import { BARBERS } from "../../data/content";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import "./BarbersSection.css";

type Props = {
  onBook: (barberId: string, serviceId?: string) => void;
};

export function BarbersSection({ onBook }: Props) {
  return (
    <section id="barbers" className="section section--alt">
      <div className="container">
        <SectionTitle
          eyebrow="Barbers"
          title="Real people. Consistent results."
          desc="Choose your barber based on style, experience, and vibe."
        />

        <div className="grid grid--barbers">
          {BARBERS.map((b) => (
            <div className="card barberCard" key={b.id}>
              {/* Top */}
              <div className="barberCard__top">
                <img
                  src={b.image}
                  alt={b.name}
                  className="barberPhoto"
                  onClick={() => onBook(b.id)}
                />

                <div className="barberCard__who">
                  <div className="barberCard__name">
                    {b.name}
                    {
                      ("popular" in b && b.popular && (
                        <span className="badge badge--popular">Popular</span>
                      )) as React.ReactNode
                    }
                  </div>
                  <div className="muted">{b.title}</div>
                </div>
              </div>

              {/* Specialties */}
              <div className="barberCard__chips">
                {b.specialty.map((s) => (
                  <span key={s} className="chip chip--soft">
                    {s}
                  </span>
                ))}
              </div>

              {/* Actions */}
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
