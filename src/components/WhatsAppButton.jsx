// Replace the phone number below with the salon's real WhatsApp Business number (E.164 format, no + or spaces).
const WHATSAPP_NUMBER = "919876543210";
const PREFILLED_MESSAGE = "Hi Luxe Salon, I'd like to book an appointment.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Luxe Salon on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center"
    >
      <span className="pointer-events-none absolute right-0 mr-16 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-medium text-ivory opacity-0 shadow-card transition-opacity duration-300 group-hover:opacity-100">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-soft transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
            <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.373.694 4.586 1.894 6.44L4 29l7.75-1.86A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.75a9.7 9.7 0 0 1-4.95-1.36l-.355-.21-4.6 1.1 1.12-4.49-.23-.365A9.7 9.7 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.937 24.75 16.001 24.75z" />
            <path d="M21.6 17.72c-.303-.152-1.792-.884-2.07-.985-.278-.101-.48-.152-.682.152-.202.303-.783.985-.96 1.187-.176.202-.353.227-.656.076-.303-.152-1.28-.472-2.438-1.505-.901-.804-1.51-1.797-1.686-2.1-.176-.303-.019-.467.133-.618.137-.136.303-.354.454-.53.152-.177.202-.303.303-.505.101-.202.05-.379-.025-.53-.076-.152-.682-1.646-.935-2.254-.246-.591-.497-.511-.682-.52l-.581-.01c-.202 0-.53.076-.808.379-.278.303-1.06 1.035-1.06 2.526 0 1.49 1.086 2.93 1.237 3.132.152.202 2.138 3.266 5.182 4.579.724.313 1.288.5 1.729.64.727.231 1.388.198 1.911.12.583-.087 1.792-.733 2.045-1.44.253-.708.253-1.314.177-1.44-.076-.126-.278-.202-.581-.354z" />
          </svg>
        </span>
      </span>
    </a>
  );
}
