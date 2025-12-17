// src/sections/GallerySection.tsx
import React from "react";
import { GALLERY } from "../data/content";
import { SectionTitle } from "../components/SectionTitle";

export function GallerySection() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Gallery"
          title="Work that sells itself."
          desc="Real images—optimized layout for mobile and desktop."
        />

        <div className="grid grid--gallery">
          {GALLERY.map((g) => (
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
  );
}
