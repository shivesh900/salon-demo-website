# Luxe Salon — Premium Landing Page

A premium, single-page marketing site for a luxury salon, built with
**React + Vite + Tailwind CSS**. Built as a client-style demo for a
web development portfolio.

## Design concept

- **Palette:** deep pine ink (`#142420`), warm ivory (`#F6F1E6`), brass
  gold (`#B98B42`), and a muted wine accent (`#6E2A3B`) — evoking silk,
  brass and jasmine rather than a generic "spa" look.
- **Type:** `Fraunces` (a warm, editorial serif) for headlines paired
  with `Manrope` for body text and small caps labels.
- **Signature element:** a hand-drawn-style jasmine garland (`malli poo`)
  rendered in gold line-art (`JasmineDivider.jsx`), used as a recurring
  section divider — a nod to the jasmine strands worn and sold at real
  Chennai salons.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
luxe-salon/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── JasmineDivider.jsx   ← signature section divider
        ├── Services.jsx
        ├── Pricing.jsx
        ├── About.jsx
        ├── Gallery.jsx
        ├── Testimonials.jsx
        ├── LocationMap.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        └── WhatsAppButton.jsx
```

## Replacing placeholder content before handing off to a client

1. **Images** — every `<img>` uses hotlinked Unsplash photos as
   stand-ins. Search each component for `images.unsplash.com` and swap
   in the client's real photography (recommended: 1600–2400px wide,
   `.jpg`/`.webp`).
2. **WhatsApp number** — set the real number in
   `src/components/WhatsAppButton.jsx` (`WHATSAPP_NUMBER`, E.164
   format, no `+` or spaces) and in `Contact.jsx` / `Footer.jsx`.
3. **Address, phone, email, hours** — update in `LocationMap.jsx`,
   `Contact.jsx`, and `Footer.jsx`.
4. **Google Map embed** — in `LocationMap.jsx`, go to Google Maps →
   Share → Embed a map → copy the exact `src` URL for the client's
   real location and replace the placeholder `iframe` `src`.
5. **Prices & services** — edit the arrays at the top of
   `Services.jsx` and `Pricing.jsx`.
6. **Booking form** — `Contact.jsx` currently only shows a success
   state on submit. Wire `handleSubmit` up to a real backend, a form
   service (Formspree, Getform), or a booking CRM.
7. **Fonts/colors** — all design tokens live in `tailwind.config.js`
   under `theme.extend` — change them once, and the whole site
   updates.

## Notes

- Fully responsive from small mobile up through large desktop.
- Respects `prefers-reduced-motion`.
- All interactive elements have a visible keyboard focus state.
- Uses `framer-motion` for scroll-reveal and entrance animations, and
  `lucide-react` for icons.
