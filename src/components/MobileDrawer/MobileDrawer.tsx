// src/components/MobileDrawer.tsx
import React from "react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { scrollToId } from "../../utils/scroll";
import "./MobileDrawer.css";

export function MobileDrawer({
  open,
  onClose,
  onBook,
}: {
  open: boolean;
  onClose: () => void;
  onBook: () => void;
}) {
  useLockBodyScroll(open);
  if (!open) return null;

  return (
    <div
      className="drawer drawer--light"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <button
        className="drawer__backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="drawer__panel">
        <div className="drawer__header">
          <div className="brand brand--small">
            <div className="brand__mark" aria-hidden="true">
              ✦
            </div>
            <div className="brand__text">
              <div className="brand__name">Yentema Salon</div>
              <div className="brand__sub">Harlem</div>
            </div>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer__links">
          <button
            className="drawerLink"
            onClick={() => (onClose(), scrollToId("services"))}
          >
            Services
          </button>
          <button
            className="drawerLink"
            onClick={() => (onClose(), scrollToId("barbers"))}
          >
            Barbers
          </button>
          <button
            className="drawerLink"
            onClick={() => (onClose(), scrollToId("gallery"))}
          >
            Gallery
          </button>
          <button
            className="drawerLink"
            onClick={() => (onClose(), scrollToId("faq"))}
          >
            FAQ
          </button>
          <button
            className="drawerLink"
            onClick={() => (onClose(), scrollToId("contact"))}
          >
            Contact & Hours
          </button>

          <div className="drawer__actions">
            <button className="btn btn--primary" onClick={onBook}>
              Book an appointment
            </button>
            <a className="btn" href="tel:000-000-0000">
              Call (000) 000-0000
            </a>
          </div>

          <div className="drawer__fineprint">
            <div className="muted">Hours</div>
            <div>Mon–Sat 10am–10pm · Sun 11am–7pm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
