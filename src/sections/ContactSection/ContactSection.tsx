// src/sections/ContactSection.tsx
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { scrollToId } from "../../utils/scroll";
import "./ContactSection.css";

export function ContactSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Contact"
          title="Find us fast."
          desc="Prime NYC access. Easy call and map links."
        />

        <div className="grid grid--contact">
          <div className="card contactCard">
            <div className="contactCard__title">Yentema Salon</div>

            <div className="contactCard__row">
              <span className="muted">Address</span>
              <span>2273 7th AVE, New York, NY</span>
            </div>

            <div className="contactCard__row">
              <span className="muted">Phone</span>
              <a className="inlineLink" href="tel:+12125550123">
                (212) 000-0000
              </a>
            </div>

            <div className="contactCard__actions">
              <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/maps/@40.814454,-73.9442016,3a,75y,119.22h,90t/data=!3m7!1e1!3m5!1sgGnZYbfTibTJz7zUxpVy4w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DgGnZYbfTibTJz7zUxpVy4w%26yaw%3D119.22!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
              >
                Open in Maps
              </a>
              <button className="btn btn--primary" onClick={onBook}>
                Book appointment
              </button>
            </div>
          </div>

          <div className="card mapCard">
            <div className="mapCard__fake mapCard__fake--light">
              <div className="mapCard__pin" aria-hidden="true" />
              <div className="mapCard__label mapCard__label--light">
                <div className="strong">Yentema Salon</div>
                <div className="muted">Tap “Open in Maps” for directions</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer footer--light">
          <div className="muted">
            © {new Date().getFullYear()} Yentema Salon.
          </div>
          <div className="footer__links">
            <button className="link" onClick={() => scrollToId("services")}>
              Services
            </button>
            <button className="link" onClick={() => scrollToId("barbers")}>
              Barbers
            </button>
            <button className="link" onClick={() => scrollToId("faq")}>
              FAQ
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
