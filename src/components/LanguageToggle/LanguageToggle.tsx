import React from "react";
// Update the import path or import statement to match the actual export
import { useTranslation } from "react-i18next";
// or, if your LanguageContext exports a default or named context, use the correct import:

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const next = lang === "en" ? "fr" : "en";

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={lang === "en" ? "Passer en français" : "Switch to English"}
    >
      <span className={`langToggle__pill ${lang === "en" ? "is-en" : "is-fr"}`}>
        <span className="langToggle__label">EN</span>
        <span className="langToggle__separator">/</span>
        <span className="langToggle__label">FR</span>
      </span>
    </button>
  );
}
