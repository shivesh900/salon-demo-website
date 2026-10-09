// Booking logic for Luxe Salon — pure functions, no framework, so it can be
// unit-tested with `node --test` and reused by any UI.

export const SALON = {
  name: "Luxe Salon",
  // Demo WhatsApp Business number (E.164 without "+"). Replace with the client's.
  whatsapp: "919876543210",
  address: "14 Khader Nawaz Khan Road, Nungambakkam, Chennai 600006",
  timeZone: "Asia/Kolkata",
};

// Opening hours per weekday (0 = Sunday). Times are minutes after midnight.
export const HOURS = {
  0: { open: 9 * 60 + 30, close: 21 * 60 }, // Sun 9:30 AM – 9:00 PM
  1: null, //                                  Mon closed
  2: { open: 10 * 60, close: 20 * 60 }, //     Tue–Fri 10:00 AM – 8:00 PM
  3: { open: 10 * 60, close: 20 * 60 },
  4: { open: 10 * 60, close: 20 * 60 },
  5: { open: 10 * 60, close: 20 * 60 },
  6: { open: 9 * 60 + 30, close: 21 * 60 }, // Sat 9:30 AM – 9:00 PM
};

// Bookable services with durations (minutes) and starting prices (INR).
export const SERVICES = [
  { id: "cut", name: "Haircut & Styling", minutes: 60, price: 1800 },
  { id: "colour", name: "Colour / Balayage", minutes: 150, price: 4500 },
  { id: "keratin", name: "Keratin & Smoothening", minutes: 180, price: 6500 },
  { id: "bridal", name: "Bridal & Occasion (trial)", minutes: 120, price: 12000 },
  { id: "facial", name: "Facial & Skin", minutes: 60, price: 2200 },
  { id: "nails", name: "Manicure & Pedicure", minutes: 90, price: 1400 },
];

export const SLOT_STEP = 30; // minutes between start times
export const MAX_DAYS_AHEAD = 60;

const pad = (n) => String(n).padStart(2, "0");

/** "YYYY-MM-DD" for a local Date. */
export function toISODate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parse "YYYY-MM-DD" as a local date at midnight (avoids UTC shifting). */
export function parseISODate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 ? d : null;
}

export function minutesToLabel(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${pad(m)} ${suffix}`;
}

export function labelToMinutes(label) {
  const m = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(label || "");
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3] === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

export function getService(id) {
  return SERVICES.find((s) => s.id === id) || null;
}

/**
 * Start times available on a date for a service.
 * A slot is offered only if the whole service fits before closing, it is not in
 * the past (with a 60-minute buffer when booking for today) and it does not
 * overlap an existing booking.
 */
export function availableSlots(dateStr, serviceId, { now = new Date(), bookings = [] } = {}) {
  const date = parseISODate(dateStr);
  const service = getService(serviceId);
  if (!date || !service) return [];
  const hours = HOURS[date.getDay()];
  if (!hours) return [];

  const today = toISODate(now);
  if (dateStr < today) return [];
  const earliest = dateStr === today ? now.getHours() * 60 + now.getMinutes() + 60 : 0;

  const taken = bookings
    .filter((b) => b.date === dateStr && b.status !== "cancelled")
    .map((b) => {
      const start = labelToMinutes(b.time);
      const svc = getService(b.serviceId);
      return [start, start + (svc ? svc.minutes : 60)];
    });

  const slots = [];
  for (let t = hours.open; t + service.minutes <= hours.close; t += SLOT_STEP) {
    if (t < earliest) continue;
    const end = t + service.minutes;
    if (taken.some(([s, e]) => t < e && end > s)) continue;
    slots.push(minutesToLabel(t));
  }
  return slots;
}

/** Indian mobile numbers: optional +91 / 0 prefix, then 10 digits starting 6–9. */
export function normalisePhone(raw) {
  const digits = String(raw || "").replace(/[^\d]/g, "");
  const local = digits.replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(local) ? `+91 ${local.slice(0, 5)} ${local.slice(5)}` : null;
}

/** Returns an object of field -> error message (empty when valid). */
export function validateBooking(form, { now = new Date(), bookings = [] } = {}) {
  const errors = {};
  const name = (form.name || "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (!/^[\p{L} .'-]+$/u.test(name)) errors.name = "Use letters only for your name.";

  if (!normalisePhone(form.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (!getService(form.serviceId)) errors.serviceId = "Choose a service.";

  const date = parseISODate(form.date);
  if (!date) {
    errors.date = "Pick a date.";
  } else {
    const today = parseISODate(toISODate(now));
    const days = Math.round((date - today) / 86400000);
    if (days < 0) errors.date = "That date has passed.";
    else if (days > MAX_DAYS_AHEAD) errors.date = `We take bookings up to ${MAX_DAYS_AHEAD} days ahead.`;
    else if (!HOURS[date.getDay()]) errors.date = "We're closed on Mondays.";
  }

  if (!errors.date && !errors.serviceId) {
    const slots = availableSlots(form.date, form.serviceId, { now, bookings });
    if (!form.time) errors.time = slots.length ? "Pick a time." : "No free slots that day — try another date.";
    else if (!slots.includes(form.time)) errors.time = "That time isn't available any more.";
  }
  return errors;
}

/** Short, human-friendly reference such as "LX-7K2Q9". */
export function bookingRef(rand = Math.random) {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let s = "";
  for (let i = 0; i < 5; i++) s += alphabet[Math.floor(rand() * alphabet.length)];
  return `LX-${s}`;
}

export function createBooking(form, { now = new Date(), rand = Math.random } = {}) {
  const service = getService(form.serviceId);
  return {
    ref: bookingRef(rand),
    name: form.name.trim(),
    phone: normalisePhone(form.phone),
    serviceId: service.id,
    serviceName: service.name,
    minutes: service.minutes,
    price: service.price,
    date: form.date,
    time: form.time,
    notes: (form.notes || "").trim(),
    status: "requested",
    createdAt: now.toISOString(),
  };
}

export function formatDate(dateStr) {
  const d = parseISODate(dateStr);
  return d
    ? d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : dateStr;
}

export const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

/** The message the customer sends to the salon on WhatsApp. */
export function whatsappMessage(b) {
  return [
    `Hi ${SALON.name}, I'd like to confirm a booking.`,
    `Ref: ${b.ref}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Service: ${b.serviceName} (~${b.minutes} min, from ${formatINR(b.price)})`,
    `When: ${formatDate(b.date)} at ${b.time}`,
    b.notes ? `Notes: ${b.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function whatsappLink(b) {
  return `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(whatsappMessage(b))}`;
}

const icsEscape = (s) => String(s).replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

/** RFC 5545 calendar file for the appointment (local Chennai time). */
export function bookingICS(b, now = new Date()) {
  const start = labelToMinutes(b.time);
  const end = start + b.minutes;
  const day = b.date.replace(/-/g, "");
  const hhmm = (m) => `${pad(Math.floor(m / 60))}${pad(m % 60)}00`;
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Luxe Salon//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.ref}@luxesalon.demo`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${SALON.timeZone}:${day}T${hhmm(start)}`,
    `DTEND;TZID=${SALON.timeZone}:${day}T${hhmm(end)}`,
    `SUMMARY:${icsEscape(`${b.serviceName} at ${SALON.name}`)}`,
    `LOCATION:${icsEscape(SALON.address)}`,
    `DESCRIPTION:${icsEscape(`Booking ${b.ref} for ${b.name}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

// ── Persistence (browser localStorage, injectable for tests) ──────────────
const KEY = "luxe-salon-bookings";

export function loadBookings(storage = globalThis.localStorage) {
  try {
    const data = JSON.parse(storage?.getItem(KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveBookings(list, storage = globalThis.localStorage) {
  try {
    storage?.setItem(KEY, JSON.stringify(list));
  } catch {
    /* private mode / quota — bookings simply aren't remembered */
  }
}
