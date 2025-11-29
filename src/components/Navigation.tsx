import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  to?: string;
  scrollTo?: string;
  ariaLabel?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About Us", to: "/about" },
  { label: "Meet Andrea", to: "/meet-andrea" },
  { label: "Courses", scrollTo: "courses", ariaLabel: "Navigate to Courses section" },
  { label: "Testimonials", scrollTo: "testimonials", ariaLabel: "Navigate to Testimonials section" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", scrollTo: "contact", ariaLabel: "Navigate to Contact section" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";

  const renderNavLink = (link: NavLink, isMobile: boolean = false) => {
    const baseClassName = isMobile
      ? "block w-full text-left px-4 py-3 text-lg text-muted-foreground hover:bg-accent rounded"
      : "text-lg text-muted-foreground hover:text-foreground transition-colors";

    // If it's a scroll link
    if (link.scrollTo) {
      // On home page, use button for smooth scroll
      if (isHomePage) {
        return (
          <button
            key={link.label}
            onClick={() => scrollToSection(link.scrollTo!)}
            className={baseClassName}
            aria-label={link.ariaLabel}
          >
            {link.label}
          </button>
        );
      }
      // On other pages, use Link with hash
      return (
        <Link
          key={link.label}
          to={`/#${link.scrollTo}`}
          onClick={() => setIsMenuOpen(false)}
          className={baseClassName}
          aria-label={link.ariaLabel}
        >
          {link.label}
        </Link>
      );
    }

    // Regular page link
    return (
      <Link
        key={link.label}
        to={link.to!}
        onClick={() => setIsMenuOpen(false)}
        className={baseClassName}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 bg-background shadow-sm z-50 border-b" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors"
              aria-label="YYC Languages - Home"
            >
              YYC-Languages
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="navigation" aria-label="Desktop navigation">
            {NAV_LINKS.map((link) => renderNavLink(link, false))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 space-y-4" role="navigation" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => renderNavLink(link, true))}
          </div>
        )}
      </div>
    </nav>
  );
}
