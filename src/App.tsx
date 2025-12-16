// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";

// ✅ Gallery images (put these files in src/assets/gallery/)
import fadeImg from "./assets/gallery/fade.jpg";
import beardImg from "./assets/gallery/beard.jpg";
import lineupImg from "./assets/gallery/lineup.jpg";
import classicImg from "./assets/gallery/classic.jpg";
import taperImg from "./assets/gallery/taper.jpg";

// ✅ Barber images (put these files in src/assets/barbers/)
import marcusImg from "./assets/barbers/marcus.jpg";
import julesImg from "./assets/barbers/jules.jpg";
import aminaImg from "./assets/barbers/amina.jpg";

type Service = {
  id: string;
  name: string;
  minutes: number;
  priceFrom: number;
  description: string;
  popular?: boolean;
};

type Barber = {
  id: string;
  name: string;
  title: string;
  image: string;
  specialty: string[];
};

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
};

type BookingDraft = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
};

const SERVICES: Service[] = [
  {
    id: "cut",
    name: "Signature Cut",
    minutes: 30,
    priceFrom: 45,
    description: "Precision cut with clean finish. NYC-ready.",
    popular: true,
  },
  {
    id: "fade",
    name: "Skin Fade",
    minutes: 40,
    priceFrom: 55,
    description: "Seamless fade with crisp lineup and detail work.",
    popular: true,
  },
  {
    id: "beard",
    name: "Beard Sculpt",
    minutes: 25,
    priceFrom: 35,
    description: "Trim, shape, and finish oils for a refined look.",
  },
  {
    id: "cutbeard",
    name: "Cut + Beard Combo",
    minutes: 55,
    priceFrom: 85,
    description: "Full look: cut, fade, beard sculpt, premium finish.",
    popular: true,
  },
  {
    id: "kids",
    name: "Kids Cut (12 & under)",
    minutes: 25,
    priceFrom: 35,
    description: "Patient, friendly service with clean results.",
  },
  {
    id: "lineup",
    name: "Lineup / Shape-Up",
    minutes: 15,
    priceFrom: 20,
    description: "Quick refresh for hairline, beard line, and edges.",
  },
];

const BARBERS: Barber[] = [
  {
    id: "marcus",
    name: "Marcus Reed",
    title: "Master Barber",
    image: marcusImg,
    specialty: ["Skin fades", "Lineups", "Texture work"],
  },
  {
    id: "jules",
    name: "Jules Santos",
    title: "Senior Barber",
    image: julesImg,
    specialty: ["Beards", "Classic cuts", "Kids cuts"],
  },
  {
    id: "amina",
    name: "Amina Diallo",
    title: "Barber-Stylist",
    image: aminaImg,
    specialty: ["Tapers", "Designs", "Detail work"],
  },
];

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Devon P.",
    rating: 5,
    date: "Nov 2025",
    text: "Best fade I’ve had in NYC. Booking was easy and the shop vibe is premium.",
  },
  {
    id: "r2",
    name: "Chris M.",
    rating: 5,
    date: "Oct 2025",
    text: "Beard sculpt is elite. Walked out looking brand new.",
  },
  {
    id: "r3",
    name: "Samira K.",
    rating: 5,
    date: "Sep 2025",
    text: "Super patient with my son. Great results every time.",
  },
  {
    id: "r4",
    name: "Anthony L.",
    rating: 4,
    date: "Aug 2025",
    text: "Great service and punctual. The lineup stays sharp.",
  },
];

const FAQ = [
  {
    q: "Do you take walk-ins?",
    a: "Yes, when we have availability. Booking ahead is fastest.",
  },
  {
    q: "What if I’m running late?",
    a: "We offer a 7-minute grace period. After that we may need to reschedule.",
  },
  {
    q: "Do you cut all hair types?",
    a: "Yes. Our team works with all textures and styles.",
  },
  {
    q: "What payments do you accept?",
    a: "Cards, cash, and contactless payments. Tips appreciated.",
  },
];

const TIMES = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
];

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="sectionTitle">
      <div className="sectionTitle__eyebrow">{eyebrow}</div>
      <h2 className="sectionTitle__h2">{title}</h2>
      <p className="sectionTitle__p">{desc}</p>
    </div>
  );
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <button
        className="modal__backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <div className="modal__kicker">NYC Booking</div>
            <h3 className="modal__title">{title}</h3>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}

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

function BookingForm({
  initialServiceId,
  initialBarberId,
  onDone,
}: {
  initialServiceId?: string;
  initialBarberId?: string;
  onDone: () => void;
}) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${yyyy}-${mm}-${dd}`;

  const [draft, setDraft] = useState<BookingDraft>({
    serviceId: initialServiceId ?? SERVICES[0].id,
    barberId: initialBarberId ?? "any",
    date: defaultDate,
    time: TIMES[2],
    name: "",
    phone: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const service = SERVICES.find((s) => s.id === draft.serviceId)!;

  const missing =
    !draft.name.trim() ||
    !draft.phone.trim() ||
    !draft.date.trim() ||
    !draft.time.trim() ||
    !draft.serviceId;

  return (
    <div className="booking">
      <div className="booking__summary">
        <div className="booking__summaryRow">
          <div className="muted">Service</div>
          <div className="booking__summaryValue">
            <strong>{service.name}</strong>{" "}
            <span className="muted">({service.minutes} min)</span>
          </div>
        </div>
        <div className="booking__summaryRow">
          <div className="muted">From</div>
          <div className="booking__summaryValue">
            <strong>{formatMoney(service.priceFrom)}</strong>
          </div>
        </div>
        <div className="booking__summaryHint">
          Demo booking flow. Connect your real scheduling tool later.
        </div>
      </div>

      <div className="booking__grid">
        <label className="field">
          <span className="field__label">Service</span>
          <select
            className="field__input"
            value={draft.serviceId}
            onChange={(e) =>
              setDraft((d) => ({ ...d, serviceId: e.target.value }))
            }
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.minutes} min · from {formatMoney(s.priceFrom)}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Preferred barber</span>
          <select
            className="field__input"
            value={draft.barberId}
            onChange={(e) =>
              setDraft((d) => ({ ...d, barberId: e.target.value }))
            }
          >
            <option value="any">No preference</option>
            {BARBERS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} · {b.title}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Date</span>
          <input
            className="field__input"
            type="date"
            value={draft.date}
            onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          />
        </label>

        <label className="field">
          <span className="field__label">Time</span>
          <select
            className="field__input"
            value={draft.time}
            onChange={(e) => setDraft((d) => ({ ...d, time: e.target.value }))}
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--span2">
          <span className="field__label">Your name</span>
          <input
            className="field__input"
            placeholder="e.g., Issouf"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
        </label>

        <label className="field field--span2">
          <span className="field__label">Phone</span>
          <input
            className="field__input"
            placeholder="(212) 555-0123"
            value={draft.phone}
            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          />
          <span className="field__hint">
            We’ll only use this for booking updates.
          </span>
        </label>

        <label className="field field--span2">
          <span className="field__label">Notes (optional)</span>
          <textarea
            className="field__input field__textarea"
            placeholder="Fade level, beard preferences, inspiration, etc."
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
          />
        </label>
      </div>

      <div className="booking__actions">
        <button
          className="btn btn--primary"
          disabled={missing}
          onClick={() => {
            setSubmitted(true);
            setTimeout(() => onDone(), 650);
          }}
        >
          Confirm booking
        </button>
        <div className="muted booking__fineprint">
          By confirming, you agree to our punctual scheduling policy.
        </div>
      </div>

      {submitted && (
        <div className="toast" role="status" aria-live="polite">
          Booking request received. Sending confirmation…
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSeed, setBookingSeed] = useState<{
    serviceId?: string;
    barberId?: string;
  }>({});

  useLockBodyScroll(navOpen);

  const openBooking = (opts?: { serviceId?: string; barberId?: string }) => {
    setBookingSeed(opts ?? {});
    setBookingOpen(true);
    setNavOpen(false);
  };

  const stats = useMemo(
    () => [
      { label: "Avg rating", value: "4.9/5" },
      { label: "Return clients", value: "71%" },
      { label: "Typical wait", value: "Under 5 min" },
    ],
    []
  );

  const gallery = useMemo(
    () => [
      { label: "Skin Fade", image: fadeImg },
      { label: "Beard Sculpt", image: beardImg },
      { label: "Sharp Lineup", image: lineupImg },
      { label: "Classic Cut", image: classicImg },
      { label: "Taper Fade", image: taperImg },
    ],
    []
  );

  return (
    <div className="app app--light">
      {/* Top bar */}
      <div className="topbar topbar--light">
        <div className="container topbar__inner">
          <span className="topbar__badge">New</span>
          <span className="topbar__text">
            Same-day appointments available. Book in under 30 seconds.
          </span>
          <button className="topbar__cta" onClick={() => openBooking()}>
            Book now
          </button>
        </div>
      </div>

      {/* Navbar */}
      <header className="nav nav--light">
        <div className="container nav__inner">
          <button
            className="nav__burger"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className="brand"
            onClick={() => scrollToId("home")}
            role="button"
            tabIndex={0}
          >
            <div className="brand__mark" aria-hidden="true">
              ✦
            </div>
            <div className="brand__text">
              <div className="brand__name">NOHO BARBER CO.</div>
              <div className="brand__sub">NYC · Cuts, Fades, Beard</div>
            </div>
          </div>

          <nav className="nav__links" aria-label="Primary">
            <button className="link" onClick={() => scrollToId("services")}>
              Services
            </button>
            <button className="link" onClick={() => scrollToId("barbers")}>
              Barbers
            </button>
            <button className="link" onClick={() => scrollToId("gallery")}>
              Gallery
            </button>
            <button className="link" onClick={() => scrollToId("faq")}>
              FAQ
            </button>
            <button className="btn" onClick={() => scrollToId("contact")}>
              Contact
            </button>
            <button className="btn btn--primary" onClick={() => openBooking()}>
              Book
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      {navOpen && (
        <div
          className="drawer drawer--light"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            className="drawer__backdrop"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          />
          <div className="drawer__panel">
            <div className="drawer__header">
              <div className="brand brand--small">
                <div className="brand__mark" aria-hidden="true">
                  ✦
                </div>
                <div className="brand__text">
                  <div className="brand__name">NOHO BARBER CO.</div>
                  <div className="brand__sub">NYC</div>
                </div>
              </div>
              <button
                className="iconBtn"
                onClick={() => setNavOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="drawer__links">
              <button
                className="drawerLink"
                onClick={() => (setNavOpen(false), scrollToId("services"))}
              >
                Services
              </button>
              <button
                className="drawerLink"
                onClick={() => (setNavOpen(false), scrollToId("barbers"))}
              >
                Barbers
              </button>
              <button
                className="drawerLink"
                onClick={() => (setNavOpen(false), scrollToId("gallery"))}
              >
                Gallery
              </button>
              <button
                className="drawerLink"
                onClick={() => (setNavOpen(false), scrollToId("faq"))}
              >
                FAQ
              </button>
              <button
                className="drawerLink"
                onClick={() => (setNavOpen(false), scrollToId("contact"))}
              >
                Contact & Hours
              </button>

              <div className="drawer__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => openBooking()}
                >
                  Book an appointment
                </button>
                <a className="btn" href="tel:+12125550123">
                  Call (212) 555-0123
                </a>
              </div>

              <div className="drawer__fineprint">
                <div className="muted">Hours</div>
                <div>Mon–Sat 10am–7pm · Sun 11am–5pm</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <main id="home">
        <section className="hero hero--light">
          <div className="container hero__grid">
            <div className="hero__left">
              <div className="hero__badgeRow">
                <span className="pill">NYC barbershop</span>
                <span className="pill">Walk-ins welcome</span>
                <span className="pill">Clean finish</span>
              </div>

              <h1 className="hero__h1 hero__h1--light">
                Look sharp in NYC.
                <span className="hero__accent hero__accent--light">
                  {" "}
                  Book in seconds.
                </span>
              </h1>

              <p className="hero__p">
                Premium cuts, fades, and beard sculpting—built for busy New
                Yorkers. Clean booking, clear pricing, and a calm experience.
              </p>

              <div className="hero__ctaRow">
                <button
                  className="btn btn--primary btn--lg"
                  onClick={() => openBooking()}
                >
                  Book your appointment
                </button>
                <button
                  className="btn btn--lg"
                  onClick={() => scrollToId("services")}
                >
                  Explore services
                </button>
              </div>

              <div className="hero__trust hero__trust--light">
                {stats.map((s) => (
                  <div className="trust trust--light" key={s.label}>
                    <div className="trust__value">{s.value}</div>
                    <div className="trust__label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero__micro">
                <span className="muted">Address:</span> 123 Lafayette St, New
                York, NY ·{" "}
                <a
                  className="inlineLink"
                  href="https://www.google.com/maps/search/?api=1&query=123+Lafayette+St+New+York+NY"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="hero__right">
              <div className="heroMediaCard">
                <img
                  className="heroMediaCard__img"
                  src={fadeImg}
                  alt="Fresh skin fade"
                />
                <div className="heroMediaCard__info">
                  <div className="strong">Most booked today</div>
                  <div className="muted">
                    Skin Fade · from {formatMoney(55)}
                  </div>
                  <button
                    className="btn btn--primary btn--sm"
                    onClick={() => openBooking({ serviceId: "fade" })}
                  >
                    Book a fade
                  </button>
                </div>
              </div>

              <div className="heroMiniGrid">
                <div className="miniCard">
                  <div className="miniCard__title">Fast booking</div>
                  <div className="muted">Choose service · pick time · done</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__title">Real barbers</div>
                  <div className="muted">Specialists for fades & beards</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__title">Clear pricing</div>
                  <div className="muted">No surprises at checkout</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__title">Mobile-first</div>
                  <div className="muted">Simple, thumb-friendly UI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
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
                      {s.name}{" "}
                      {s.popular && <span className="tag">Popular</span>}
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
                      onClick={() => openBooking({ serviceId: s.id })}
                    >
                      Book {s.name}
                    </button>
                    <button
                      className="btn"
                      onClick={() => scrollToId("barbers")}
                    >
                      Choose barber
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BARBERS */}
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
                      onClick={() => openBooking({ barberId: b.id })}
                    >
                      Book with {b.name.split(" ")[0]}
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        openBooking({ barberId: b.id, serviceId: "fade" })
                      }
                    >
                      Quick fade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Gallery"
              title="Work that sells itself."
              desc="Real images—optimized layout for mobile and desktop."
            />

            <div className="grid grid--gallery">
              {gallery.map((g) => (
                <div key={g.label} className="galleryTile">
                  <img
                    src={g.image}
                    alt={g.label}
                    className="galleryImg"
                    loading="lazy"
                  />
                  <div className="galleryLabel">{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CONTACT */}
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
                    rel="noreferrer"
                    href="https://www.google.com/maps/search/?api=1&query=123+Lafayette+St+New+York+NY"
                  >
                    Open in Maps
                  </a>
                  <button
                    className="btn btn--primary"
                    onClick={() => openBooking()}
                  >
                    Book appointment
                  </button>
                </div>
              </div>

              <div className="card mapCard">
                <div className="mapCard__fake mapCard__fake--light">
                  <div className="mapCard__pin" aria-hidden="true" />
                  <div className="mapCard__label mapCard__label--light">
                    <div className="strong">SoHo / NoHo</div>
                    <div className="muted">
                      Tap “Open in Maps” for directions
                    </div>
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
      </main>

      {/* Floating mobile CTA */}
      <button
        className="floatBook floatBook--light"
        onClick={() => openBooking()}
        aria-label="Book now"
      >
        Book now
      </button>

      {/* Booking modal */}
      <Modal
        open={bookingOpen}
        title="Book an appointment"
        onClose={() => setBookingOpen(false)}
      >
        <BookingForm
          initialServiceId={bookingSeed.serviceId}
          initialBarberId={bookingSeed.barberId}
          onDone={() => setBookingOpen(false)}
        />
      </Modal>
    </div>
  );
}
