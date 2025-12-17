import React, { useMemo, useState } from "react";
import { SectionTitle } from "../components/SectionTitle";

type TransferProvider = {
  id: "moneygram" | "western" | "coris";
  name: string;
  tagline: string;
  details: string[];
  note?: string;
};

const PROVIDERS: TransferProvider[] = [
  {
    id: "moneygram",
    name: "MoneyGram",
    tagline: "Fast transfers + cash pickup support.",
    details: [
      "Send money in minutes (depending on destination).",
      "Cash pickup options available.",
      "Bring a valid ID for in-store transactions.",
    ],
  },
  {
    id: "western",
    name: "Western Union",
    tagline: "Global transfer network with convenient pickup.",
    details: [
      "Send money internationally.",
      "Cash pickup and transfer support in-store.",
      "We can help you with forms and receipt verification.",
    ],
  },
  {
    id: "coris",
    name: "Coris Bank International",
    tagline: "Banking support for select destinations.",
    details: [
      "Assistance for Coris Bank International services.",
      "Helpful for West Africa corridors (depending on service availability).",
      "Ask in-store for supported routes and requirements.",
    ],
    note: "Availability may vary by destination and partner rules.",
  },
];

function ProviderCard({
  provider,
  active,
  onSelect,
}: {
  provider: TransferProvider;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`transferCard ${active ? "transferCard--active" : ""}`}
      onClick={onSelect}
      aria-pressed={active}
    >
      <div className="transferCard__top">
        <div className="transferCard__name">{provider.name}</div>
        <div className="transferCard__tagline muted">{provider.tagline}</div>
      </div>

      <div className="transferCard__bullets">
        {provider.details.slice(0, 2).map((d) => (
          <div key={d} className="transferBullet">
            <span className="transferBullet__dot" aria-hidden="true" />
            <span>{d}</span>
          </div>
        ))}
      </div>

      <div className="transferCard__ctaRow">
        <span className="inlineLink">View details</span>
        <span className="muted">→</span>
      </div>
    </button>
  );
}

export function MoneyTransferSection() {
  const [activeId, setActiveId] = useState<TransferProvider["id"]>("moneygram");

  const active = useMemo(
    () => PROVIDERS.find((p) => p.id === activeId)!,
    [activeId]
  );

  const address = "123 Lafayette St, New York, NY";
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=123+Lafayette+St+New+York+NY";

  return (
    <section id="transfer" className="section section--alt">
      <div className="container">
        <SectionTitle
          eyebrow="Money Transfer"
          title="Send money while you’re here."
          desc="Same location as the barbershop—easy, quick, and supported in-store."
        />

        <div className="transferGrid">
          <div className="transferLeft">
            <div className="transferCards">
              {PROVIDERS.map((p) => (
                <ProviderCard
                  key={p.id}
                  provider={p}
                  active={p.id === activeId}
                  onSelect={() => setActiveId(p.id)}
                />
              ))}
            </div>

            <div className="card transferInfo">
              <div className="transferInfo__title">
                {active.name} — What to bring
              </div>

              <div className="transferInfo__list">
                {active.details.map((d) => (
                  <div key={d} className="transferInfo__row">
                    <span className="transferCheck" aria-hidden="true">
                      ✓
                    </span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {active.note && <div className="note">{active.note}</div>}

              <div className="transferInfo__actions">
                <a className="btn" href="tel:+12125550123">
                  Call for availability
                </a>
                <a
                  className="btn btn--primary"
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps
                </a>
              </div>

              <div className="transferInfo__meta muted">
                Location: {address} · Mon–Sat 10am–7pm · Sun 11am–5pm
              </div>
            </div>
          </div>

          <div className="card transferRight">
            <div className="transferRight__header">
              <div className="transferRight__title">Same place, two needs</div>
              <div className="muted">
                Get a clean cut and handle a money transfer in one stop.
              </div>
            </div>

            <div className="transferRight__steps">
              <div className="transferStep">
                <div className="transferStep__num">1</div>
                <div>
                  <div className="strong">Choose a provider</div>
                  <div className="muted">
                    MoneyGram, Western Union, or Coris.
                  </div>
                </div>
              </div>
              <div className="transferStep">
                <div className="transferStep__num">2</div>
                <div>
                  <div className="strong">Bring your ID</div>
                  <div className="muted">
                    We’ll guide you through the process.
                  </div>
                </div>
              </div>
              <div className="transferStep">
                <div className="transferStep__num">3</div>
                <div>
                  <div className="strong">Confirm & keep your receipt</div>
                  <div className="muted">
                    Helpful for tracking and verification.
                  </div>
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="transferRight__footer">
              <div>
                <div className="strong">Questions before you come?</div>
                <div className="muted">
                  Call and we’ll confirm what’s available.
                </div>
              </div>
              <a className="btn btn--primary" href="tel:+12125550123">
                Call now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
