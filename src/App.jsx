import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Pricing from "./components/Pricing.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Testimonials from "./components/Testimonials.jsx";
import LocationMap from "./components/LocationMap.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <About />
        <Gallery />
        <Testimonials />
        <LocationMap />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
