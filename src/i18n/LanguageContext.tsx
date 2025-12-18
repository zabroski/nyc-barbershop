import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Language = "en" | "fr";

type Translations = Record<string, string>;

const translationTable: Record<Language, Translations> = {
  en: {
    "app.bookNow": "Book now",
    "app.bookNowAria": "Book now",
    "app.modalTitle": "Book an appointment",

    // You can add more shared keys here and reuse them in components
    "topbar.callUs": "Call us",
    "topbar.walkIns": "Walk-ins welcome",
    "navbar.home": "Home",
    "navbar.services": "Services",
    "navbar.barbers": "Barbers",
    "navbar.gallery": "Gallery",
    "navbar.faq": "FAQ",
    "navbar.contact": "Contact",
    "navbar.moneyTransfer": "Money transfer",
  },
  fr: {
    "app.bookNow": "Réserver",
    "app.bookNowAria": "Réserver maintenant",
    "app.modalTitle": "Prendre un rendez-vous",

    "topbar.callUs": "Appelez-nous",
    "topbar.walkIns": "Sans rendez-vous bienvenus",
    "navbar.home": "Accueil",
    "navbar.services": "Services",
    "navbar.barbers": "Coiffeurs",
    "navbar.gallery": "Galerie",
    "navbar.faq": "FAQ",
    "navbar.contact": "Contact",
    "navbar.moneyTransfer": "Transfert d’argent",
  },
};

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = useCallback(
    (key: string) => {
      const table = translationTable[lang];
      const fallbackTable = translationTable["en"];
      return table[key] ?? fallbackTable[key] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
};
