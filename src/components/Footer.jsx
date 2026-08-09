import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import JasmineDivider from "./JasmineDivider.jsx";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
];

const serviceLinks = [
  "Haircut & Styling",
  "Colour & Balayage",
  "Keratin Smoothening",
  "Bridal Styling",
  "Facials & Skin",
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-12 pb-16">
          <div>
            <a href="#home" className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-ivory">Luxe</span>
              <span className="eyebrow text-gold-light">Salon</span>
            </a>
            <p className="mt-5 text-sm text-ivory/55 leading-relaxed max-w-xs">
              Chennai's private hair and beauty atelier in Nungambakkam —
              one client, one stylist, every appointment.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold-light"
              >
                <Instagram size={17} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold-light"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-ivory/50 mb-5">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ivory/70 hover:text-gold-light transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-ivory/50 mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l}>
                  <a href="#services" className="text-sm text-ivory/70 hover:text-gold-light transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-ivory/50 mb-5">Visit</h4>
            <ul className="space-y-4 text-sm text-ivory/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-light mt-0.5 flex-shrink-0" />
                14 Khader Nawaz Khan Road, Nungambakkam, Chennai 600006
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-light flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-light flex-shrink-0" />
                hello@luxesalon.in
              </li>
            </ul>
          </div>
        </div>
      </div>

      <JasmineDivider tone="dark" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-ivory/40">
          &copy; {new Date().getFullYear()} Luxe Salon, Chennai. All rights reserved.
        </p>
        <p className="text-xs text-ivory/40">
          Demo portfolio site — website design &amp; development by{" "}
          <span className="text-gold-light">[Your Name]</span>
        </p>
      </div>
    </footer>
  );
}
