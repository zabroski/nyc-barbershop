import { useState } from "react";
import {
  BookingForm,
  type BookingDraft,
} from "../components/BookingForm/BookingForm";
import { sendBookingEmail } from "../utils/sendBookingEmail";

export function BookingFlow() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleDone = async (booking: BookingDraft) => {
    console.log("[BookingFlow] onDone payload:", booking);

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await sendBookingEmail(booking);
      console.log("[EmailJS] success:", res);

      setStatus("sent");
    } catch (err) {
      console.error("[EmailJS] failed:", err);

      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send booking email."
      );
    }
  };

  return (
    <div>
      <BookingForm onDone={handleDone} />

      {status === "sending" && (
        <div className="toast" role="status" aria-live="polite">
          Sending booking email…
        </div>
      )}

      {status === "sent" && (
        <div className="toast" role="status" aria-live="polite">
          Booking confirmed. Email sent.
        </div>
      )}

      {status === "error" && (
        <div className="toast toast--error" role="status" aria-live="polite">
          Email failed: {errorMsg}
        </div>
      )}
    </div>
  );
}
