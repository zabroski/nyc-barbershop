import type { BookingDraft } from "../components/BookingForm/BookingForm";

type GoogleSheetsResponse = {
  ok: boolean;
  error?: string;
  [key: string]: unknown;
};

export async function sendBookingToGoogleSheet(booking: BookingDraft) {
  const url = import.meta.env.VITE_SHEETS_WEBAPP_URL as string | undefined;
  if (!url) throw new Error("Missing VITE_SHEETS_WEBAPP_URL in .env");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(booking),
  });

  const data: GoogleSheetsResponse = await res
    .json()
    .catch(() => ({ ok: false }));
  if (!res.ok || data?.ok !== true) {
    throw new Error(data?.error || "Failed to write booking to Google Sheet");
  }

  return data;
}
