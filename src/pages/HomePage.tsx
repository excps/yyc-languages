import { useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";

// Lazy load components that are below the fold
const Courses = lazy(() => import("../components/Courses"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Pricing = lazy(() => import("../components/Pricing"));
const Contact = lazy(() => import("../components/Contact"));

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling when navigating to home page with a hash
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Scroll to top when navigating to home page without a hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <Features />
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <Courses />
        <Testimonials />
        <Pricing />
        <Contact />
      </Suspense>
    </div>
  );
}
