import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Courses } from "./components/Courses";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}