import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, CalendarPlus, MessageCircle, X } from "lucide-react";
import {
  SERVICES,
  MAX_DAYS_AHEAD,
  availableSlots,
  validateBooking,
  createBooking,
  whatsappLink,
  bookingICS,
  loadBookings,
  saveBookings,
  formatDate,
  formatINR,
  toISODate,
} from "../lib/booking.js";

const inputCls =
  "mt-2 w-full rounded-lg border bg-ivory/40 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-gold";
const borderFor = (err) => (err ? "border-wine" : "border-ink/15");

function FieldError({ id, msg }) {
  return msg ? (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-wine">
      {msg}
    </p>
  ) : null;
}

function downloadICS(b) {
  const blob = new Blob([bookingICS(b)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `luxe-salon-${b.ref}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const EMPTY = { name: "", phone: "", serviceId: SERVICES[0].id, date: "", time: "", notes: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState(() => loadBookings());
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => saveBookings(bookings), [bookings]);

  const today = toISODate(new Date());
  const maxDate = toISODate(new Date(Date.now() + MAX_DAYS_AHEAD * 86400000));
  const slots = useMemo(
    () => (form.date ? availableSlots(form.date, form.serviceId, { bookings }) : []),
    [form.date, form.serviceId, bookings]
  );
  const service = SERVICES.find((s) => s.id === form.serviceId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value, ...(name === "date" || name === "serviceId" ? { time: "" } : {}) }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateBooking(form, { bookings });
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    const booking = createBooking(form);
    setBookings((list) => [...list, booking]);
    setConfirmed(booking);
    setForm(EMPTY);
  };

  const cancelBooking = (ref) =>
    setBookings((list) => list.map((b) => (b.ref === ref ? { ...b, status: "cancelled" } : b)));

  const upcoming = bookings
    .filter((b) => b.status !== "cancelled" && b.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <section id="contact" className="bg-ivory-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow text-gold-dark mb-4">Book an Appointment</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink text-balance font-medium">
            Reserve your{" "}
            <span className="italic text-gold-dark">chair.</span>
          </h2>
          <p className="mt-5 text-ink/60 text-lg leading-relaxed">
            Pick a service, a day and a free slot. You'll get a booking reference, a
            calendar invite and a one-tap WhatsApp message to confirm with our front desk.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white p-8 md:p-10 shadow-card"
          >
            {confirmed ? (
              <div className="flex flex-col items-center justify-center text-center py-8" data-testid="booking-confirmed">
                <CheckCircle2 size={44} className="text-gold" />
                <h3 className="mt-5 font-display text-2xl text-ink">Slot held, {confirmed.name.split(" ")[0]}!</h3>
                <p className="mt-2 text-ink/60 max-w-sm">
                  {confirmed.serviceName} on <strong className="text-ink">{formatDate(confirmed.date)}</strong> at{" "}
                  <strong className="text-ink">{confirmed.time}</strong>
                </p>
                <p className="mt-3 rounded-full bg-ivory px-4 py-1.5 text-xs font-semibold tracking-widest text-gold-dark">
                  REF {confirmed.ref}
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink(confirmed)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f8f4e] px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform"
                  >
                    <MessageCircle size={16} /> Confirm on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadICS(confirmed)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:border-gold transition-colors"
                  >
                    <CalendarPlus size={16} /> Add to calendar
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="mt-6 text-sm text-ink/55 underline underline-offset-4 hover:text-ink"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Booking form">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-ink/70">Full name</label>
                    <input id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" aria-invalid={!!errors.name} aria-describedby="name-err"
                      className={`${inputCls} ${borderFor(errors.name)}`} />
                    <FieldError id="name-err" msg={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-ink/70">Mobile number</label>
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone}
                      onChange={handleChange} placeholder="+91 90000 00000" aria-invalid={!!errors.phone}
                      aria-describedby="phone-err" className={`${inputCls} ${borderFor(errors.phone)}`} />
                    <FieldError id="phone-err" msg={errors.phone} />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceId" className="text-sm font-medium text-ink/70">Service</label>
                  <select id="serviceId" name="serviceId" value={form.serviceId} onChange={handleChange}
                    className={`${inputCls} ${borderFor(errors.serviceId)}`}>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} · ~{s.minutes} min · from {formatINR(s.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="text-sm font-medium text-ink/70">Date</label>
                  <input id="date" name="date" type="date" min={today} max={maxDate} value={form.date}
                    onChange={handleChange} aria-invalid={!!errors.date} aria-describedby="date-err"
                    className={`${inputCls} ${borderFor(errors.date)}`} />
                  <FieldError id="date-err" msg={errors.date} />
                </div>

                {form.date && !errors.date && (
                  <fieldset>
                    <legend className="text-sm font-medium text-ink/70">
                      Available times {service ? `(${service.minutes} min)` : ""}
                    </legend>
                    {slots.length ? (
                      <div id="time" tabIndex={-1} className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2" role="radiogroup">
                        {slots.map((t) => (
                          <button key={t} type="button" role="radio" aria-checked={form.time === t}
                            onClick={() => handleChange({ target: { name: "time", value: t } })}
                            className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                              form.time === t ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink/75 hover:border-gold"
                            }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-ink/55">
                        {new Date(form.date + "T00:00").getDay() === 1 ? "We're closed on Mondays." : "No free slots that day — try another date."}
                      </p>
                    )}
                    <FieldError id="time-err" msg={errors.time} />
                  </fieldset>
                )}

                <div>
                  <label htmlFor="notes" className="text-sm font-medium text-ink/70">Notes (optional)</label>
                  <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange}
                    placeholder="E.g. first-time balayage, shoulder-length hair"
                    className={`${inputCls} border-ink/15 resize-none`} />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-ivory transition-all hover:bg-ink-light hover:-translate-y-0.5 hover:shadow-soft"
                >
                  Book Appointment
                  <Send size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}

            {upcoming.length > 0 && (
              <div className="mt-10 border-t border-ink/10 pt-6" data-testid="my-bookings">
                <p className="eyebrow text-gold-dark mb-3">Your bookings on this device</p>
                <ul className="space-y-2">
                  {upcoming.map((b) => (
                    <li key={b.ref} className="flex items-center justify-between gap-3 rounded-lg bg-ivory/60 px-4 py-3 text-sm">
                      <span className="text-ink/80">
                        <strong className="text-ink">{b.serviceName}</strong> · {formatDate(b.date)}, {b.time}
                        <span className="ml-2 text-xs text-ink/45">{b.ref}</span>
                      </span>
                      <button type="button" onClick={() => cancelBooking(b.ref)} aria-label={`Cancel booking ${b.ref}`}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/45 hover:bg-white hover:text-wine">
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl bg-ink text-ivory p-8 md:p-10 space-y-7"
          >
            <div>
              <p className="eyebrow text-gold-light mb-2">Prefer to talk?</p>
              <p className="text-ivory/65 text-sm leading-relaxed">
                Call or message our front desk directly, Tuesday to Sunday.
              </p>
            </div>

            <a href="tel:+919876543210" className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-gold-light transition-colors group-hover:bg-gold group-hover:text-ink">
                <Phone size={17} />
              </span>
              <span className="text-sm text-ivory/85">+91 98765 43210</span>
            </a>

            <a href="mailto:hello@luxesalon.in" className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-gold-light transition-colors group-hover:bg-gold group-hover:text-ink">
                <Mail size={17} />
              </span>
              <span className="text-sm text-ivory/85">hello@luxesalon.in</span>
            </a>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-gold-light flex-shrink-0">
                <MapPin size={17} />
              </span>
              <span className="text-sm text-ivory/85 leading-relaxed">
                14 Khader Nawaz Khan Road, Nungambakkam,
                <br /> Chennai 600006
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
