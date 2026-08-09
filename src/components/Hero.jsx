import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck2 } from "lucide-react";

const stats = [
  { value: "2016", label: "Est. in Nungambakkam" },
  { value: "12", label: "Master Stylists" },
  { value: "4.9", label: "Average Rating" },
  { value: "9,000+", label: "Appointments Styled" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* Background image — replace with your own salon photography (recommended: 2400x1600, interior or styling shot) */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2400&q=80"
          alt="Interior of Luxe Salon styling floor in Chennai"
          className="h-full w-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30" />
      </div>

      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-32 pb-16 md:pt-24">
          <div className="max-w-3xl">
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="eyebrow text-gold-light mb-6"
            >
              Nungambakkam, Chennai — By Appointment
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="font-display text-ivory text-balance text-[2.75rem] leading-[1.08] sm:text-6xl md:text-[4.75rem] md:leading-[1.04] font-medium"
            >
              Beauty, tended to{" "}
              <span className="italic font-normal text-gold-light">unhurried.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="mt-7 text-ivory/75 text-lg md:text-xl leading-relaxed max-w-xl"
            >
              Luxe Salon is Chennai's private hair and beauty atelier — colour,
              cut, keratin and bridal styling, each service booked one client
              at a time, never rushed, never shared.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-all hover:bg-gold-light hover:shadow-soft hover:-translate-y-0.5"
              >
                <CalendarCheck2 size={18} />
                Book Your Appointment
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-8 py-4 text-sm font-semibold tracking-wide text-ivory transition-all hover:bg-ivory/10 hover:border-ivory/60"
              >
                View Services &amp; Pricing
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative border-t border-ivory/10 bg-ink/40 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-2xl md:text-3xl text-gold-light">{s.value}</div>
              <div className="mt-1 text-xs md:text-sm text-ivory/60">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
