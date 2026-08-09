import { motion } from "framer-motion";

// Replace every src below with real photography from your own salon.
const images = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
    caption: "The styling floor",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
    caption: "Colour bar",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1522337194846-9c8f7e9d1f0d?auto=format&fit=crop&w=800&q=80",
    caption: "Signature blow-dry",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1000&q=80",
    caption: "Facial therapy suite",
    span: "md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    caption: "Bridal styling",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=800&q=80",
    caption: "Reception & lounge",
    span: "",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow text-gold-dark mb-4">Inside Luxe</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink text-balance font-medium">
              A room built for{" "}
              <span className="italic text-gold-dark">unhurried mornings.</span>
            </h2>
          </div>
          <p className="text-ink/55 max-w-sm text-sm leading-relaxed">
            Natural light, low-volume playlists and a single-client-per-stylist
            floor plan — take a look inside before you book.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[160px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
