import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
              <h2 className="text-4xl text-gray-900 mb-4">Page Not Found</h2>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, the page you're looking for doesn't exist.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl text-gray-900 mb-4">
                Looking for German lessons?
              </h3>
              <p className="text-gray-600 mb-4">
                While you're here, why not explore our German language courses?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/#courses">View Courses</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/#contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/about">About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
