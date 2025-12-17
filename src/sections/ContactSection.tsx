// src/sections/ContactSection.tsx
import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { scrollToId } from "../utils/scroll";

export function ContactSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Contact"
          title="Find us fast."
          desc="Prime NYC access. Easy call and map links."
        />

        <div className="grid grid--contact">
          <div className="card contactCard">
            <div className="contactCard__title">NoHo Barber Co.</div>

            <div className="contactCard__row">
              <span className="muted">Address</span>
              <span>123 Lafayette St, New York, NY</span>
            </div>

            <div className="contactCard__row">
              <span className="muted">Phone</span>
              <a className="inlineLink" href="tel:+12125550123">
                (212) 555-0123
              </a>
            </div>

            <div className="contactCard__actions">
              <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/maps/search/?api=1&query=123+Lafayette+St+New+York+NY"
              >
                Open in Maps
              </a>
              <button className="btn btn--primary" onClick={onBook}>
                Book appointment
              </button>
            </div>
          </div>

          <div className="card mapCard">
            <div className="mapCard__fake mapCard__fake--light">
              <div className="mapCard__pin" aria-hidden="true" />
              <div className="mapCard__label mapCard__label--light">
                <div className="strong">SoHo / NoHo</div>
                <div className="muted">Tap “Open in Maps” for directions</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer footer--light">
          <div className="muted">
            © {new Date().getFullYear()} NoHo Barber Co.
          </div>
          <div className="footer__links">
            <button className="link" onClick={() => scrollToId("services")}>
              Services
            </button>
            <button className="link" onClick={() => scrollToId("barbers")}>
              Barbers
            </button>
            <button className="link" onClick={() => scrollToId("faq")}>
              FAQ
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
