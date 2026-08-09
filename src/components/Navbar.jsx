import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled || open ? "text-ink/80 hover:text-ink" : "text-ivory/85 hover:text-ivory";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(20,36,32,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-baseline gap-2 group">
            <span
              className={`font-display text-2xl tracking-wide transition-colors ${
                scrolled || open ? "text-ink" : "text-ivory"
              }`}
            >
              Luxe
            </span>
            <span className="eyebrow text-gold">Salon</span>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${linkColor}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink shadow-card transition-all hover:bg-gold-light hover:shadow-soft hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
          </div>

          <button
            className={`lg:hidden p-2 ${scrolled || open ? "text-ink" : "text-ivory"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? "max-h-[26rem]" : "max-h-0"
        } bg-ivory/98 backdrop-blur-md`}
      >
        <div className="px-6 pb-8 pt-2 flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-ink/80 border-b border-ink/10 hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex justify-center items-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
