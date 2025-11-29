import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
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

  return (
    <nav className="sticky top-0 bg-background shadow-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-xl text-foreground hover:text-muted-foreground transition-colors"
            >
              YYC-Languages
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/meet-andrea"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Meet Andrea
            </Link>
            {location.pathname === "/" ? (
              <>
                <button
                  onClick={() => scrollToSection("courses")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Courses
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Testimonials
                </button>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/#courses"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Courses
                </Link>
                <Link
                  to="/#testimonials"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Testimonials
                </Link>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  to="/#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
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
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 space-y-4">
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
            >
              About Us
            </Link>
            <Link
              to="/meet-andrea"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
            >
              Meet Andrea
            </Link>
            {location.pathname === "/" ? (
              <>
                <button
                  onClick={() => scrollToSection("courses")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Courses
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Testimonials
                </button>
                <Link
                  to="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Blog
                </Link>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/#courses"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Courses
                </Link>
                <Link
                  to="/#testimonials"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Testimonials
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Blog
                </Link>
                <Link
                  to="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded"
                >
                  Contact
                </Link>
              </>
            )}
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setIsMenuOpen(false);
              }}
              className="hidden w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded flex items-center gap-2"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
