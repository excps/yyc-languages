import { Button } from "./ui/button";
import { ImageWithFallback } from "./general/ImageWithFallback";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl text-gray-900 mb-1">
            Ready to Speak German with Confidence?
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg font-semibold tracking-wider text-blue-600 uppercase">
              Calgary German Language Tutoring
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              From complete beginners to exam preparation—learn German the way
              that works best for you, with personalized guidance from Calgary's
              trusted German tutor.
            </p>
            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-base">
                Native German Speaker | Personalized Approach
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={scrollToContact}
                aria-label="Get started with German language tutoring - Navigate to contact form"
              >
                Let's Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="View available German language courses"
              >
                See Course Options
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <ImageWithFallback
                src="/images/main-image-m.jpg"
                alt="One-on-one German language tutoring session with native speaker Andrea in Calgary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
