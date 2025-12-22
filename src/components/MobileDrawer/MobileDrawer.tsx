// src/components/MobileDrawer.tsx
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

  const closeAndScroll = (id: string) => {
    onClose();

    // Wait for drawer to unmount + body scroll to unlock (important on iOS Safari)
    requestAnimationFrame(() => {
      setTimeout(() => scrollToId(id), 0);
    });
  };

  return (
    <div
      className="drawer drawer--light"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <button
        type="button"
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

          <button
            type="button"
            className="iconBtn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="drawer__links">
          <button
            type="button"
            className="drawerLink"
            onClick={() => closeAndScroll("services")}
          >
            Services
          </button>

          <button
            type="button"
            className="drawerLink"
            onClick={() => closeAndScroll("barbers")}
          >
            Barbers
          </button>

          <button
            type="button"
            className="drawerLink"
            onClick={() => closeAndScroll("gallery")}
          >
            Gallery
          </button>

          {/* ✅ Money Transfer */}
          <button
            type="button"
            className="drawerLink"
            onClick={() => closeAndScroll("transfer")}
          >
            Money Transfer
          </button>

          <button
            type="button"
            className="drawerLink"
            onClick={() => closeAndScroll("contact")}
          >
            Contact & Hours
          </button>

          <div className="drawer__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                onClose();
                // optional: open booking after close (same iOS rule)
                requestAnimationFrame(() => setTimeout(() => onBook(), 0));
              }}
            >
              Book an appointment
            </button>

            <a className="btn" href="tel:+6466012151">
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
