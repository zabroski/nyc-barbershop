import type { BookingDraft } from "../components/BookingForm/BookingForm";

export async function sendBooking(booking: BookingDraft) {
  const url = import.meta.env.VITE_BOOKING_WEBAPP_URL as string | undefined;
  if (!url) throw new Error("Missing VITE_BOOKING_WEBAPP_URL in .env");

  const res = await fetch(url, {
    method: "POST",
    // Apps Script often works best with text/plain
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(booking),
  });

  type BookingResponse = { ok?: boolean; error?: string };
  const data: BookingResponse = await res
    .json()
    .catch(() => ({} as BookingResponse));

  if (!res.ok || data?.ok !== true) {
    throw new Error(data?.error || "Booking submit failed");
  }

  return data;
}
