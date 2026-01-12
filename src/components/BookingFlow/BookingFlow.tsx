import { useState } from "react";
import type { BookingDraft } from "../BookingForm/BookingForm";
import { BookingForm } from "../BookingForm/BookingForm";
import { sendBookingEmail } from "../../integrations/email";

export function BookingFlow({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleDone = async (booking: BookingDraft) => {
    setStatus("sending");
    setErrorMsg("");

    try {
      await sendBookingEmail(booking); // IMPORTANT: await this
      setStatus("sent");
      setTimeout(onClose, 800);
    } catch (e: any) {
      console.error("[Booking email] failed:", e);
      setStatus("error");
      setErrorMsg(e?.message || "Failed to send email");
    }
  };

  return (
    <div>
      <BookingForm onDone={handleDone} />

      {status === "sending" && (
        <div className="toast" role="status" aria-live="polite">
          Sending confirmation…
        </div>
      )}

      {status === "sent" && (
        <div className="toast" role="status" aria-live="polite">
          Booking sent successfully.
        </div>
      )}

      {status === "error" && (
        <div className="toast" role="alert" aria-live="assertive">
          Email failed: {errorMsg}
        </div>
      )}
    </div>
  );
}
