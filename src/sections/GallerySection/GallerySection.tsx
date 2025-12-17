import React, { useMemo, useState } from "react";
import { GALLERY } from "../../data/content";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import "./GallerySection.css";

type GalleryItem = { label: string; image: string };

export function GallerySection() {
  const items = useMemo(() => [...GALLERY] as GalleryItem[], []);
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Gallery"
          title="Work that sells itself."
          desc="Tap any photo to view it bigger. Optimized for mobile + desktop."
        />

        <div className="grid grid--gallery galleryGrid">
          {items.map((g) => (
            <button
              key={g.label}
              className="galleryTile"
              onClick={() => setActive(g)}
              aria-label={`Open ${g.label}`}
            >
              <img
                src={g.image}
                alt={g.label}
                className="galleryImg"
                loading="lazy"
              />
              <div className="galleryOverlay" aria-hidden="true" />
              <div className="galleryLabel">{g.label}</div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {active && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${active.label}`}
          >
            <button
              className="lightbox__backdrop"
              onClick={() => setActive(null)}
              aria-label="Close"
            />
            <div className="lightbox__panel">
              <div className="lightbox__top">
                <div className="lightbox__title">{active.label}</div>
                <button
                  className="iconBtn"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <img
                src={active.image}
                alt={active.label}
                className="lightbox__img"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
