// src/components/BookingForm.tsx
import React, { useMemo, useState } from "react";
import { BARBERS, SERVICES, TIMES } from "../data/content";
import { formatMoney } from "../utils/format";

export type BookingDraft = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
};

export function BookingForm({
  initialServiceId,
  initialBarberId,
  onDone,
}: {
  initialServiceId?: string;
  initialBarberId?: string;
  onDone: () => void;
}) {
  const defaultDate = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
  }, []);

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
