import { useMemo, useState } from "react";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import "./MoneyTransferSection.css";

type TransferProviderId = "moneygram" | "western" | "coris";

type TransferProvider = {
  id: TransferProviderId;
  name: string;
  tagline: string;
  details: string[];
  note?: string;
  badge: string;
};

const PROVIDERS: TransferProvider[] = [
  {
    id: "moneygram",
    name: "MoneyGram",
    badge: "Fast",
    tagline: "Quick transfers + cash pickup support.",
    details: [
      "Send money in minutes (depends on destination).",
      "Cash pickup options available.",
      "Bring a valid government ID for in-store transactions.",
    ],
  },
  {
    id: "western",
    name: "Western Union",
    badge: "Global",
    tagline: "Worldwide network with convenient pickup.",
    details: [
      "International transfers supported.",
      "Cash pickup and transfer support in-store.",
      "We can help you verify forms + receipts.",
    ],
  },
  {
    id: "coris",
    name: "Coris Bank International",
    badge: "Bank",
    tagline: "Banking support for select destinations.",
    details: [
      "Assistance for Coris Bank International services.",
      "Useful for some West Africa corridors (service dependent).",
      "Ask in-store for supported routes + requirements.",
    ],
    note: "Availability may vary by destination and partner rules.",
  },
];

function ProviderIcon({ id }: { id: TransferProviderId }) {
  // simple inline “logo” badge (no extra deps)
  const letter = id === "moneygram" ? "M" : id === "western" ? "W" : "C";
  return <div className={`providerMark providerMark--${id}`}>{letter}</div>;
}

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
      <div className="transferCard__head">
        <div className="transferCard__identity">
          <ProviderIcon id={provider.id} />
          <div>
            <div className="transferCard__nameRow">
              <div className="transferCard__name">{provider.name}</div>
              <span className="transferBadge">{provider.badge}</span>
            </div>
            <div className="transferCard__tagline muted">
              {provider.tagline}
            </div>
          </div>
        </div>

        <div className="transferCard__hint">
          <span className="inlineLink">Details</span>
          <span className="muted">→</span>
        </div>
      </div>

      <div className="transferCard__bullets">
        {provider.details.slice(0, 2).map((d) => (
          <div key={d} className="transferBullet">
            <span className="transferBullet__dot" aria-hidden="true" />
            <span>{d}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

export function MoneyTransferSection() {
  const [activeId, setActiveId] = useState<TransferProviderId>("moneygram");

  const active = useMemo(
    () => PROVIDERS.find((p) => p.id === activeId)!,
    [activeId]
  );

  const address = "2273 7th AVE, New York, NY";
  const mapsHref =
    "https://www.google.com/maps/@40.814454,-73.9442016,3a,75y,119.22h,90t/data=!3m7!1e1!3m5!1sgGnZYbfTibTJz7zUxpVy4w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DgGnZYbfTibTJz7zUxpVy4w%26yaw%3D119.22!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D";

  const quickRequirements = useMemo(
    () => [
      {
        title: "Bring ID",
        desc: "Government-issued ID required for most transfers.",
      },
      {
        title: "Know receiver info",
        desc: "Full name + destination details help speed things up.",
      },
      { title: "Keep receipt", desc: "Useful for verification and tracking." },
    ],
    []
  );

  return (
    <section id="transfer" className="section section--alt">
      <div className="container">
        <SectionTitle
          eyebrow="Money Transfer"
          title="Send money while you’re here."
          desc="Same location as the barbershop—fast, convenient, and supported in-store."
        />

        <div className="transferGrid">
          {/* LEFT */}
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
              <div className="transferInfo__top">
                <div>
                  <div className="transferInfo__kicker muted">
                    Selected provider
                  </div>
                  <div className="transferInfo__title">
                    {active.name} <span className="muted">— What to bring</span>
                  </div>
                </div>

                <div className="transferInfo__chipRow">
                  <span className="chip chip--soft">In-store help</span>
                  <span className="chip chip--soft">Receipt verification</span>
                  <span className="chip chip--soft">
                    Cash pickup (where available)
                  </span>
                </div>
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
                <a className="btn" href="tel:+6466012151">
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
                Location: {address} · Mon–Sat 10am–10pm · Sun 11am–7pm
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="card transferRight">
            <div className="transferRight__header">
              <div className="transferRight__title">Same place, two needs</div>
              <div className="muted">
                Get a clean cut and handle a transfer in one stop.
              </div>
            </div>

            <div className="transferRight__steps">
              {quickRequirements.map((s, idx) => (
                <div key={s.title} className="transferStep">
                  <div className="transferStep__num">{idx + 1}</div>
                  <div>
                    <div className="strong">{s.title}</div>
                    <div className="muted">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="transferRight__footer">
              <div>
                <div className="strong">Questions before you come?</div>
                <div className="muted">
                  Call and we’ll confirm what’s available.
                </div>
              </div>
              <a className="btn btn--primary" href="tel:+6466012151">
                Call now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
