import { useState } from "react";

import { Modal } from "./components/Modal/Modal";
import { Topbar } from "./components/Topbar/Topbar";
import { Navbar } from "./components/Navbar/Navbar";
import { MobileDrawer } from "./components/MobileDrawer/MobileDrawer";
import { BookingForm } from "./components/BookingForm/BookingForm";

import { Hero } from "./sections/Hero/Hero";
import { ServicesSection } from "./sections/ServicesSection/ServicesSection";
import { BarbersSection } from "./sections/BarbersSection/BarbersSection";
import { GallerySection } from "./sections/GallerySection/GallerySection";
// import { FAQSection } from "./sections/FAQSection/FAQSection";
import { ContactSection } from "./sections/ContactSection/ContactSection";
import { MoneyTransferSection } from "./sections/MoneyTransferSection/MoneyTransferSection";

type BookingSeed = { serviceId?: string; barberId?: string };

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSeed, setBookingSeed] = useState<BookingSeed>({});

  const openBooking = (opts?: BookingSeed) => {
    setBookingSeed(opts ?? {});
    setBookingOpen(true);
    setNavOpen(false);
  };

  return (
    <div className="app app--light">
      <Topbar onBook={() => openBooking()} />
      <Navbar
        onOpenMenu={() => setNavOpen(true)}
        onBook={() => openBooking()}
      />
      <MobileDrawer
        open={navOpen}
        onClose={() => setNavOpen(false)}
        onBook={() => openBooking()}
      />

      <main id="home">
        <Hero
          onBook={() => openBooking()}
          onBookFade={() => openBooking({ serviceId: "fade" })}
        />
        <ServicesSection onBook={(serviceId) => openBooking({ serviceId })} />
        <BarbersSection
          onBook={(barberId, serviceId) => openBooking({ barberId, serviceId })}
        />
        <GallerySection />
        {/* <FAQSection /> */}
        <MoneyTransferSection />
        <ContactSection onBook={() => openBooking()} />
      </main>

      <button
        className="floatBook floatBook--light"
        onClick={() => openBooking()}
        aria-label="Book now"
      >
        Book now
      </button>

      <Modal
        open={bookingOpen}
        title="Book an appointment"
        onClose={() => setBookingOpen(false)}
      >
        <BookingForm
          initialServiceId={bookingSeed.serviceId}
          initialBarberId={bookingSeed.barberId}
          onDone={() => setBookingOpen(false)}
        />
      </Modal>
    </div>
  );
}
