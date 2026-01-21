import { useState } from "react";
import {
  BookingForm,
  type BookingDraft,
} from "../../components/BookingForm/BookingForm";
import { sendBookingEmail } from "../../utils/sendBookingEmail";

type Props = {
  initialServiceId?: string;
  initialBarberId?: string;
  onClose: () => void;
};

export function BookingFlow({
  initialServiceId,
  initialBarberId,
  onClose,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleDone = async (booking: BookingDraft) => {
    setStatus("sending");
    setErrorMsg("");

    try {
      await sendBookingEmail(booking);
      setStatus("sent");

      // Close modal shortly after success
      setTimeout(() => onClose(), 800);
    } catch (err: unknown) {
      console.error("[EmailJS] failed full error:", err);

      // EmailJS errors often include: status, text
      let details = "Unknown error";
      if (typeof err === "object" && err !== null) {
        const maybeErr = err as {
          text?: string;
          message?: string;
          status?: string | number;
        };
        details =
          maybeErr.text ||
          maybeErr.message ||
          `Unknown error (status: ${maybeErr.status ?? "n/a"})`;
      } else if (typeof err === "string") {
        details = err;
      }

      setStatus("error");
      setErrorMsg(details);
    }
  };

  return (
    <div>
      <BookingForm
        initialServiceId={initialServiceId}
        initialBarberId={initialBarberId}
        onDone={handleDone}
      />

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
