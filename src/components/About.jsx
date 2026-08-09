import { motion } from "framer-motion";
import JasmineDivider from "./JasmineDivider.jsx";

const stats = [
  { value: "8+", label: "Years on Khader Nawaz Khan Road" },
  { value: "12", label: "Stylists trained in London & Mumbai" },
  { value: "1", label: "Client per stylist, per slot" },
  { value: "4.9/5", label: "From 1,200+ Google reviews" },
];

export default function About() {
  return (
    <section id="about" className="bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
              {/* Replace with a real photo of your founder / senior stylist */}
              <img
                src="https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=1200&q=80"
                alt="Senior stylist at Luxe Salon working with a client"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden sm:block w-40 rounded-xl bg-ink text-ivory p-5 shadow-soft">
              <p className="font-display text-2xl text-gold-light">2016</p>
              <p className="mt-1 text-xs text-ivory/60 leading-snug">
                Founded on Khader Nawaz Khan Road, Nungambakkam
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="eyebrow text-gold-dark mb-4">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink text-balance font-medium">
              An atelier, not a{" "}
              <span className="italic text-gold-dark">walk-in salon.</span>
            </h2>
            <p className="mt-6 text-ink/65 text-lg leading-relaxed">
              Luxe Salon opened in 2016 with a simple idea: Chennai deserved
              a salon that booked one client at a time. No stacked
              appointments, no rushed blow-dries between two other heads of
              hair. Every stylist on our floor trains under a fixed
              client load, so the two hours you give us are spent on you
              alone.
            </p>
            <p className="mt-4 text-ink/65 text-lg leading-relaxed">
              We use cold-pressed, ammonia-light colour and skin actives
              sourced through Chennai and Mumbai distributors, and we still
              hand-string a fresh jasmine strand for every bride who sits in
              our chair — a small ritual we've kept since our first year.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-gold/50 pl-4">
                  <div className="font-display text-2xl text-ink">{s.value}</div>
                  <div className="mt-1 text-sm text-ink/55 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <JasmineDivider className="pb-6" />
    </section>
  );
}
