import emailjs from "@emailjs/browser";
import type { BookingDraft } from "../components/BookingForm/BookingForm";

/**
 * IMPORTANT:
 * - Uses Vite env vars (import.meta.env.VITE_*)
 * - Uses the recommended EmailJS signature: emailjs.send(service, template, params, publicKey)
 * - Throws clear errors with context for debugging.
 */
export async function sendBookingEmail(booking: BookingDraft) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as
    | string
    | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
    | string
    | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
    | string
    | undefined;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS env vars missing. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY and restart dev server."
    );
  }

  // Template params MUST match your EmailJS template variables exactly.
  const params = {
    serviceId: booking.serviceId,
    barberId: booking.barberId,
    date: booking.date,
    time: booking.time,
    name: booking.name,
    phone: booking.phone,
    notes: booking.notes || "",
  };

  try {
    const res = await emailjs.send(serviceId, templateId, params, publicKey);

    // Helpful debug
    if (import.meta.env.DEV) {
      console.log("[EmailJS] sent:", res.status, res.text, params);
    }

    return res;
  } catch (err: any) {
    // Bubble up a readable error
    const msg =
      err?.text ||
      err?.message ||
      "EmailJS failed. Check template variables, service/template IDs, public key, and EmailJS dashboard logs.";

    throw new Error(msg);
  }
}
