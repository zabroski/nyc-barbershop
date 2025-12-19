// // src/components/Modal.tsx
// import React, { useEffect } from "react";
// import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
// import "./Modal.css";

// export function Modal({
//   open,
//   title,
//   onClose,
//   children,
// }: {
//   open: boolean;
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   useLockBodyScroll(open);

//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   if (!open) return null;

//   return (
//     <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
//       <button
//         className="modal__backdrop"
//         aria-label="Close dialog"
//         onClick={onClose}
//       />
//       <div className="modal__panel">
//         <div className="modal__header">
//           <div>
//             <div className="modal__kicker">NYC Booking</div>
//             <h3 className="modal__title">{title}</h3>
//           </div>
//           <button className="iconBtn" onClick={onClose} aria-label="Close">
//             ✕
//           </button>
//         </div>
//         <div className="modal__content">{children}</div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import "./Modal.css";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
  useLockBodyScroll(open);

  // ESC key close
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
      {/* Backdrop */}
      <div
        className="modal__backdrop"
        onClick={onClose}
        aria-label="Close dialog"
      />

      {/* Panel (click shield) */}
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
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
