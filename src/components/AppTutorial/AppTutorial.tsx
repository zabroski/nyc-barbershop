import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type AppTutorialProps = {
  onOpenBooking: () => void;
};

export function AppTutorial({ onOpenBooking }: AppTutorialProps) {
  useEffect(() => {
    const seen = localStorage.getItem("tutorial_seen_v1");
    if (seen) return;

    const d = driver({
      showProgress: true,
      allowClose: true,
      // Removed: overlayClickNext (not in your Config type)
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Done",
      steps: [
        {
          element: ".navbar",
          popover: {
            title: "Navigation",
            description:
              "Use the menu to explore services, barbers, gallery, and contact.",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: ".servicesSection",
          popover: {
            title: "Services",
            description: "Choose a service to start your booking.",
            side: "top",
            align: "center",
          },
        },
        {
          element: ".floatBook",
          popover: {
            title: "Book anytime",
            description: "Tap here anytime to book an appointment.",
            side: "left",
            align: "center",
          },
          // driver.js supports hooks on popover in some versions, but to stay compatible:
          // we won't use onNextClick here. We'll open booking right after tour starts instead if desired.
        },
      ],
    });

    d.drive();

    // Mark as seen so it doesn't show again.
    localStorage.setItem("tutorial_seen_v1", "true");

    // OPTIONAL: open booking after the tour starts (remove if you don't want this)
    // onOpenBooking();
  }, [onOpenBooking]);

  return null;
}
