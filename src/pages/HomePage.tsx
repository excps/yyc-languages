import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Courses } from "../components/Courses";
import { Testimonials } from "../components/Testimonials";
import { Pricing } from "../components/Pricing";
import { Contact } from "../components/Contact";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling when navigating to home page with a hash
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Scroll to top when navigating to home page without a hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <Features />
      <Courses />
      {/*<Testimonials />*/}
      <Pricing />
      <Contact />
    </div>
  );
}
