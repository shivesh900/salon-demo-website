import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import JasmineDivider from "./JasmineDivider.jsx";

const testimonials = [
  {
    name: "Ananya Krishnan",
    role: "Marketing Director",
    quote:
      "The only salon in Chennai where I've never once felt rushed. My colourist actually remembers what I asked for last time — down to the tone.",
    rating: 5,
  },
  {
    name: "Meera Sundaram",
    role: "Bride, February 2025",
    quote:
      "Three trials before my wedding day and every single one was patient and unhurried. My hair held through a 9-hour reception without a single touch-up.",
    rating: 5,
  },
  {
    name: "Priya Varadarajan",
    role: "Client since 2019",
    quote:
      "I drive in from OMR just for the head massage. It's the one hour of my week where nobody's asking me for anything.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ivory py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow text-gold-dark mb-4">Client Word</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink text-balance font-medium">
            Chennai keeps{" "}
            <span className="italic text-gold-dark">coming back.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-2xl bg-white p-8 shadow-card"
            >
              <Quote className="text-gold/30" size={32} strokeWidth={1.5} />
              <p className="mt-4 text-ink/75 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={15} className="fill-gold text-gold" />
                ))}
              </div>
              <div className="mt-3">
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <JasmineDivider />
      </div>
    </section>
  );
}
