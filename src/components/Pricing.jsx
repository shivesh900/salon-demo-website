import { motion } from "framer-motion";
import { Check } from "lucide-react";

const menus = [
  {
    category: "Hair",
    items: [
      { name: "Precision Haircut", price: "₹1,800" },
      { name: "Blow-dry & Styling", price: "₹1,200" },
      { name: "Global Colour", price: "₹4,500" },
      { name: "Balayage / Highlights", price: "₹7,500" },
      { name: "Keratin Smoothening", price: "₹6,500" },
      { name: "Bridal Hair (Trial + Day)", price: "₹15,000" },
    ],
  },
  {
    category: "Skin & Body",
    items: [
      { name: "Signature Facial", price: "₹2,200" },
      { name: "Gold Radiance Facial", price: "₹3,800" },
      { name: "De-tan & Polish", price: "₹1,500" },
      { name: "Body Massage (60 min)", price: "₹3,200" },
      { name: "Threading (Brow + Lip)", price: "₹200" },
      { name: "Bridal Makeup (HD)", price: "₹18,000" },
    ],
  },
  {
    category: "Nails & Extras",
    items: [
      { name: "Classic Manicure", price: "₹800" },
      { name: "Luxe Spa Pedicure", price: "₹1,400" },
      { name: "Gel Polish", price: "₹1,200" },
      { name: "Nail Extensions", price: "₹2,500" },
      { name: "Hair Spa & Deep Conditioning", price: "₹1,800" },
      { name: "Head Massage (30 min)", price: "₹900" },
    ],
  },
];

const perks = [
  "15% off every visit, all year",
  "2 complimentary hair spa sessions",
  "Priority booking with your preferred stylist",
  "A birthday-month facial, on us",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-ink py-24 md:py-32 text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow text-gold-light mb-4">The Investment</p>
          <h2 className="font-display text-4xl md:text-5xl text-balance font-medium">
            Transparent pricing,{" "}
            <span className="italic text-gold-light">no surprises at checkout.</span>
          </h2>
          <p className="mt-5 text-ivory/60 text-lg leading-relaxed">
            Final pricing depends on hair length, density and product used —
            your stylist will confirm the exact quote at consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {menus.map((menu, mi) => (
            <motion.div
              key={menu.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: mi * 0.1 }}
              className="rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-8"
            >
              <h3 className="font-display text-2xl text-gold-light mb-6">{menu.category}</h3>
              <ul className="space-y-4">
                {menu.items.map((item) => (
                  <li key={item.name} className="flex items-baseline text-sm">
                    <span className="text-ivory/80">{item.name}</span>
                    <span className="leader border-ivory/15" />
                    <span className="font-semibold text-ivory">{item.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Highlighted membership card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 via-ivory/[0.03] to-transparent p-8 md:p-12"
        >
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <p className="eyebrow text-gold-light mb-3">Membership</p>
              <h3 className="font-display text-3xl md:text-4xl">The Luxe Circle</h3>
              <p className="mt-4 text-ivory/65 leading-relaxed max-w-lg">
                For clients who visit often. One annual membership,
                unlocking preferred pricing and priority scheduling across
                every service on the menu.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ivory/80">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-gold-light" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="text-left md:text-right">
                <span className="font-display text-4xl text-gold-light">₹9,999</span>
                <span className="text-ivory/50 text-sm"> / year</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-soft"
              >
                Join the Circle
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
