import { motion } from "framer-motion";
import { Scissors, Palette, Sparkles, Crown, Flower2, Hand } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Signature Cut & Style",
    desc: "A consultation-led cut finished with a blow-dry styled for your face shape and texture.",
    price: "From ₹1,800",
  },
  {
    icon: Palette,
    title: "Colour, Balayage & Highlights",
    desc: "Hand-painted colour and dimensional highlights using ammonia-light, gentle formulas.",
    price: "From ₹4,500",
  },
  {
    icon: Sparkles,
    title: "Keratin & Smoothening",
    desc: "Frizz-free, salon-smooth hair that lasts up to 5 months, tailored to your hair's density.",
    price: "From ₹6,500",
  },
  {
    icon: Crown,
    title: "Bridal & Occasion Styling",
    desc: "Trial-first bridal hair and draping, styled to hold through sangeet, muhurtham and reception.",
    price: "From ₹12,000",
  },
  {
    icon: Flower2,
    title: "Signature Facials & Skin",
    desc: "Diagnostic skin therapy using cold-pressed actives, closed with gua sha sculpting.",
    price: "From ₹2,200",
  },
  {
    icon: Hand,
    title: "Manicure & Pedicure Rituals",
    desc: "A slow, spa-paced hand and foot ritual finished with paraffin therapy and gel polish.",
    price: "From ₹1,400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  return (
    <section id="services" className="bg-ivory py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow text-gold-dark mb-4">The Menu</p>
          <h2 className="font-display text-4xl md:text-5xl text-balance text-ink font-medium">
            Rituals for hair,{" "}
            <span className="italic text-gold-dark">skin &amp; occasion.</span>
          </h2>
          <p className="mt-5 text-ink/60 text-lg leading-relaxed">
            Every service opens with a five-minute consultation, so what you
            book is exactly what your hair and skin need — not a standard
            package.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                variants={cardVariants}
                className="group relative rounded-2xl border border-ink/10 bg-white/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft hover:border-gold/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-gold-light transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="text-sm font-semibold text-gold-dark">{s.price}</span>
                  <a
                    href="#contact"
                    className="text-xs font-semibold tracking-wide text-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-ink"
                  >
                    Book &rarr;
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
