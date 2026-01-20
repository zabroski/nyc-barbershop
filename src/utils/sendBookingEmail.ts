import emailjs from "@emailjs/browser";
import type { BookingDraft } from "../components/BookingForm/BookingForm";

export async function sendBookingEmail(booking: BookingDraft) {
  const serviceId = "service_hdnia0q";
  const templateId = "template_7eva9cq";
  const publicKey = "WK_3SacTDGCKivJ8I";

  console.log("EMAILJS KEYS CHECK", {
    serviceId,
    templateId,
    publicKey,
  });

  return emailjs.send(
    serviceId,
    templateId,
    {
      serviceId: booking.serviceId,
      barberId: booking.barberId,
      date: booking.date,
      time: booking.time,
      name: booking.name,
      phone: booking.phone,
      notes: booking.notes || "(none)",
    },
    { publicKey }
  );
}
