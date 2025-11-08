import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
              Learn German with Andrea
            </h1>
            <p className="text-xl text-gray-600">
              Personalized one-on-one lessons tailored to your goals. Whether you're preparing for exams, advancing your career, or exploring German culture, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={scrollToContact}
              >
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Explore Courses
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl text-blue-600">500+</div>
                <div className="text-gray-600">Students Taught</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/yycl-logo.jpeg"
                alt="YYC Languages Logo"
                className="w-full h-[500px] object-contain bg-white"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                  <div className="text-xl text-gray-900">98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
