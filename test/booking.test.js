import { test } from "node:test";
import assert from "node:assert/strict";
import {
  availableSlots, validateBooking, createBooking, normalisePhone,
  whatsappMessage, whatsappLink, bookingICS, minutesToLabel, labelToMinutes,
} from "../src/lib/booking.js";

// Wednesday 14 Oct 2026, 11:10 AM local time
const NOW = new Date(2026, 9, 14, 11, 10);

test("time labels round-trip", () => {
  for (const m of [0, 570, 600, 720, 765, 1230]) assert.equal(labelToMinutes(minutesToLabel(m)), m);
  assert.equal(minutesToLabel(570), "9:30 AM");
  assert.equal(minutesToLabel(720), "12:00 PM");
});

test("closed on Mondays, no slots in the past", () => {
  assert.deepEqual(availableSlots("2026-10-19", "cut", { now: NOW }), []); // Monday
  assert.deepEqual(availableSlots("2026-10-13", "cut", { now: NOW }), []); // yesterday
});

test("today's slots start an hour from now and the service fits before closing", () => {
  const slots = availableSlots("2026-10-14", "cut", { now: NOW });
  assert.equal(slots[0], "12:30 PM");
  assert.equal(slots.at(-1), "7:00 PM"); // 60-min cut, closes 8 PM
  const keratin = availableSlots("2026-10-17", "keratin", { now: NOW }); // Saturday
  assert.equal(keratin[0], "9:30 AM");
  assert.equal(keratin.at(-1), "6:00 PM"); // 180 min before 9 PM
});

test("an existing booking blocks overlapping slots", () => {
  const bookings = [{ date: "2026-10-15", time: "2:00 PM", serviceId: "colour", status: "requested" }];
  const slots = availableSlots("2026-10-15", "cut", { now: NOW, bookings });
  assert.ok(slots.includes("1:00 PM"));
  assert.ok(!slots.includes("1:30 PM")); // would run into the 2 PM colour
  assert.ok(!slots.includes("3:30 PM")); // colour runs until 4:30 PM
  assert.ok(slots.includes("4:30 PM"));
  const freed = availableSlots("2026-10-15", "cut", { now: NOW, bookings: [{ ...bookings[0], status: "cancelled" }] });
  assert.ok(freed.includes("2:00 PM"));
});

test("phone numbers are validated and normalised", () => {
  assert.equal(normalisePhone("98765 43210"), "+91 98765 43210");
  assert.equal(normalisePhone("+91-9876543210"), "+91 98765 43210");
  assert.equal(normalisePhone("09876543210"), "+91 98765 43210");
  assert.equal(normalisePhone("12345"), null);
  assert.equal(normalisePhone("5876543210"), null);
});

test("validation reports each problem", () => {
  const errs = validateBooking({ name: "", phone: "1", serviceId: "cut", date: "2026-10-19", time: "" }, { now: NOW });
  assert.deepEqual(Object.keys(errs).sort(), ["date", "name", "phone"]);
  const ok = validateBooking({ name: "Anika R", phone: "9876543210", serviceId: "facial", date: "2026-10-16", time: "11:00 AM" }, { now: NOW });
  assert.deepEqual(ok, {});
  const taken = validateBooking(
    { name: "Anika R", phone: "9876543210", serviceId: "facial", date: "2026-10-16", time: "11:00 AM" },
    { now: NOW, bookings: [{ date: "2026-10-16", time: "11:00 AM", serviceId: "facial" }] });
  assert.match(taken.time, /isn't available/);
});

test("a booking produces a WhatsApp message and a calendar file", () => {
  const b = createBooking(
    { name: " Anika R ", phone: "9876543210", serviceId: "facial", date: "2026-10-16", time: "11:00 AM", notes: "sensitive skin" },
    { now: NOW, rand: () => 0.5 });
  assert.match(b.ref, /^LX-[2-9A-Z]{5}$/);
  assert.equal(b.name, "Anika R");
  const msg = whatsappMessage(b);
  assert.match(msg, /Facial & Skin/);
  assert.match(msg, /11:00 AM/);
  assert.match(msg, /sensitive skin/);
  assert.ok(whatsappLink(b).startsWith("https://wa.me/919876543210?text="));
  const ics = bookingICS(b, NOW);
  assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20261016T110000/);
  assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20261016T120000/);
  assert.ok(ics.includes("\r\nEND:VCALENDAR"));
});
