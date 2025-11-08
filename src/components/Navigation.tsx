import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white">DE</span>
            </div>
            <span className="text-xl text-gray-900">YYC-Languages</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('courses')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => scrollToSection('contact')}
            >
              Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('courses')} 
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              Courses
            </button>
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }} 
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              Contact
            </button>
            <div className="px-4">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => scrollToSection('contact')}
              >
                Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
