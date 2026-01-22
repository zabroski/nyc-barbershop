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
      overlayClickNext: false,
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Done",
    });

    d.defineSteps([
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
        onNextClick: () => {
          onOpenBooking();
          d.moveNext();
        },
      },
    ]);

    d.drive();

    // Mark seen after starting; change to mark-on-done if you prefer.
    localStorage.setItem("tutorial_seen_v1", "true");
  }, [onOpenBooking]);

  return null;
}
