import { useEffect } from "react";
import { Heart, BookOpen, Award, Globe } from "lucide-react";

export function MeetAndreaPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl text-gray-900 mb-4">Meet Andrea</h1>
            <p className="text-xl text-gray-600">
              Your dedicated German language instructor with 25 years of experience
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 md:p-12 flex items-center justify-center bg-gray-50">
                  <img
                    src="/images/andrea.jpg"
                    alt="Andrea - German Language Instructor"
                    className="rounded-xl shadow-lg max-w-full h-auto"
                  />
                </div>
                <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                  <p className="text-lg text-gray-600">
                    Andrea is a native German speaker with over 25 years of
                    professional teaching experience. Having lived in both Germany
                    and Canada, she brings a unique perspective that bridges
                    cultural differences and makes learning more relevant.
                  </p>
                  <p className="text-lg text-gray-600">
                    Andrea's passion for teaching and deep understanding of German
                    culture make every lesson engaging and insightful. Her students
                    consistently achieve their language goals and develop a lasting
                    appreciation for the German language.
                  </p>
                  <p className="text-lg text-gray-600">
                    Specializing in exam preparation, Andrea helps students prepare
                    for Goethe-Zertifikat and Telc exams. Her personalized approach
                    ensures that each student receives instruction tailored to their
                    learning style and goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Passionate Teacher</h3>
              <p className="text-gray-600">
                Dedicated to making every lesson engaging and meaningful
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">25+ Years Experience</h3>
              <p className="text-gray-600">
                Extensive professional teaching experience across multiple levels
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Exam Specialist</h3>
              <p className="text-gray-600">
                Expert in Goethe-Zertifikat and Telc exam preparation
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Cultural Bridge</h3>
              <p className="text-gray-600">
                Native German speaker with deep understanding of Canadian culture
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
