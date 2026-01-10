import emailjs from "@emailjs/browser";
import type { BookingDraft } from "../components/BookingForm/BookingForm";

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
      "Missing EmailJS env vars (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY)"
    );
  }

  const params = {
    serviceId: booking.serviceId,
    barberId: booking.barberId,
    date: booking.date,
    time: booking.time,
    name: booking.name,
    phone: booking.phone,
    notes: booking.notes,
  };

  return emailjs.send(serviceId, templateId, params, { publicKey });
}
