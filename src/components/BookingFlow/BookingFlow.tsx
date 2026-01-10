import { useState } from "react";
import { BookingForm } from "../BookingForm/BookingForm";
import type { BookingDraft } from "../BookingForm/BookingForm";
import { sendBookingToGoogleSheet } from "../../integrations/googleSheets";
import { sendBookingEmail } from "../../integrations/email";

export function BookingFlow({
  initialServiceId,
  initialBarberId,
  onClose,
}: {
  initialServiceId?: string;
  initialBarberId?: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [lastBooking, setLastBooking] = useState<BookingDraft | null>(null);

  const handleDone = async (booking: BookingDraft) => {
    setStatus("sending");
    setErrorMsg("");
    setLastBooking(booking);

    try {
      // Send both in parallel
      await Promise.all([
        sendBookingToGoogleSheet(booking),
        sendBookingEmail(booking),
      ]);

      setStatus("sent");

      // close modal after a short moment
      setTimeout(() => onClose(), 900);
    } catch (err: unknown) {
      setStatus("error");
      if (err && typeof err === "object" && "message" in err) {
        setErrorMsg(
          (err as { message?: string }).message || "Failed to send booking"
        );
      } else {
        setErrorMsg("Failed to send booking");
      }
      // Keep modal open so user can retry
      console.error(err);
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
          Sending booking to email + Google Sheet…
        </div>
      )}

      {status === "sent" && (
        <div className="toast" role="status" aria-live="polite">
          Booking sent successfully.
        </div>
      )}

      {status === "error" && (
        <div className="toast" role="alert" aria-live="assertive">
          Could not send booking: {errorMsg}
        </div>
      )}

      {/* Optional: debug display */}
      {lastBooking && status !== "idle" && (
        <div className="card" style={{ marginTop: 12, padding: 12 }}>
          <div className="strong">Payload (debug)</div>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(lastBooking, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
