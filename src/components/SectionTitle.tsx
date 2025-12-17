// src/components/SectionTitle.tsx
import React from "react";

export function SectionTitle({
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
