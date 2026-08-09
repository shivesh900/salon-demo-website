import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";

const hours = [
  { day: "Tuesday – Friday", time: "10:00 AM – 8:00 PM" },
  { day: "Saturday – Sunday", time: "9:30 AM – 9:00 PM" },
  { day: "Monday", time: "Closed" },
];

export default function LocationMap() {
  return (
    <section id="location" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow text-gold-dark mb-4">Find Us</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink text-balance font-medium">
            Nungambakkam,{" "}
            <span className="italic text-gold-dark">on Khader Nawaz Khan Road.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-ink text-ivory p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gold-light mt-1 flex-shrink-0" />
                <p className="text-ivory/85 leading-relaxed">
                  14 Khader Nawaz Khan Road,
                  <br /> Nungambakkam, Chennai 600006
                </p>
              </div>

              <div className="mt-8 flex items-start gap-3">
                <Clock size={20} className="text-gold-light mt-1 flex-shrink-0" />
                <div className="space-y-1.5">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 text-sm">
                      <span className="text-ivory/60">{h.day}</span>
                      <span className="text-ivory/90 font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Khader+Nawaz+Khan+Road+Nungambakkam+Chennai"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-gold-light hover:-translate-y-0.5"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="min-h-[320px] overflow-hidden rounded-2xl shadow-card"
          >
            {/* Replace this src with your exact "Share > Embed a map" link from Google Maps */}
            <iframe
              title="Luxe Salon location on Google Maps"
              src="https://www.google.com/maps?q=Khader+Nawaz+Khan+Road,+Nungambakkam,+Chennai,+Tamil+Nadu&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
