import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

const SERVICES = [
  "Haircut & Styling",
  "Colour / Balayage",
  "Keratin & Smoothening",
  "Bridal & Occasion",
  "Facial & Skin",
  "Nails & Extras",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: SERVICES[0], message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your booking backend, form service (e.g. Formspree), or CRM.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-ivory-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow text-gold-dark mb-4">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink text-balance font-medium">
            Reserve your{" "}
            <span className="italic text-gold-dark">chair.</span>
          </h2>
          <p className="mt-5 text-ink/60 text-lg leading-relaxed">
            Tell us what you're after and preferred timing — our front desk
            confirms every appointment personally within a few hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white p-8 md:p-10 shadow-card"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <CheckCircle2 size={44} className="text-gold" />
                <h3 className="mt-5 font-display text-2xl text-ink">Request received</h3>
                <p className="mt-2 text-ink/60 max-w-sm">
                  Thank you, {form.name || "there"}. Our front desk will call
                  you shortly to confirm your slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-ink/70">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory/40 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-ink/70">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 90000 00000"
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory/40 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="text-sm font-medium text-ink/70">
                    Service you're interested in
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-ink/70">
                    Preferred date/time &amp; notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="E.g. Saturday afternoon, first-time balayage"
                    className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory/40 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-ivory transition-all hover:bg-ink-light hover:-translate-y-0.5 hover:shadow-soft"
                >
                  Send Booking Request
                  <Send size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
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
