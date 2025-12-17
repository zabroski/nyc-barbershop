// src/components/Topbar.tsx
import React from "react";
import "./Topbar.css";

export function Topbar({ onBook }: { onBook: () => void }) {
  return (
    <div className="topbar topbar--light">
      <div className="container topbar__inner">
        <span className="topbar__badge">New</span>
        <span className="topbar__text">
          Same-day appointments available. Book in under 30 seconds.
        </span>
        <button className="topbar__cta" onClick={onBook}>
          Book now
        </button>
      </div>
    </div>
  );
}
