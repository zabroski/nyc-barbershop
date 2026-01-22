// src/components/Navbar.tsx
import { scrollToId } from "../../utils/scroll";
// import logo from "../../assets/logo-yentema.png";
// import logo from "../../assets/logo-yentema-art-salon.png";

import "./Navbar.css";

export function Navbar({
  onOpenMenu,
  onBook,
}: {
  onOpenMenu: () => void;
  onBook: () => void;
}) {
  return (
    <header className="nav nav--light">
      <div className="container nav__inner">
        <button
          className="nav__burger"
          aria-label="Open menu"
          onClick={onOpenMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className="brand"
          onClick={() => scrollToId("home")}
          role="button"
          tabIndex={0}
        >
          {/* <div className="brand__mark" aria-hidden="true">
            ✦
          </div> */}

          {/* <div className="brand__mark" aria-hidden="true">
            <img
              src={logo}
              alt="Yentema Art Salon logo"
              className="brand__logo"
            />
          </div> */}

          <div className="brand__text">
            <div className="brand__name">Yentema Art Salon</div>
          </div>
        </div>

        <nav className="nav__links" aria-label="Primary">
          <button className="link" onClick={() => scrollToId("services")}>
            Services
          </button>
          <button className="link" onClick={() => scrollToId("barbers")}>
            Barbers
          </button>
          <button className="link" onClick={() => scrollToId("gallery")}>
            Gallery
          </button>
          {/* <button className="link" onClick={() => scrollToId("faq")}>
            FAQ
          </button> */}

          <button className="link" onClick={() => scrollToId("transfer")}>
            Money Transfer
          </button>
          <button className="btn" onClick={() => scrollToId("contact")}>
            Contact
          </button>
          <button className="btn btn--primary" onClick={onBook}>
            Book
          </button>
        </nav>
      </div>
    </header>
  );
}
