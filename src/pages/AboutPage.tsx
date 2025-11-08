import { useEffect } from "react";
import { Heart, Target, BookOpen, Users } from "lucide-react";

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl text-gray-900 mb-4">
              About YYC-Languages
            </h1>
            <p className="text-xl text-gray-600">
              Your trusted partner in German language learning, based in Calgary
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600">
                YYC-Languages was founded with a simple mission: to make high-quality German language education accessible to everyone in Calgary and beyond. With over a decade of teaching experience, we've helped hundreds of students achieve their language learning goals.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're learning German for career advancement, academic requirements, travel, or personal enrichment, we provide a supportive and engaging environment where you can thrive.
              </p>
              <p className="text-lg text-gray-600">
                Our approach combines traditional teaching methods with modern technology, ensuring that every lesson is both effective and enjoyable. We believe that language learning should be a journey of discovery, not just memorization.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900 mb-4">Meet Andrea</h2>
              <p className="text-lg text-gray-600">
                Andrea is a native German speaker with over 10 years of professional teaching experience. Having lived in both Germany and Canada, she brings a unique perspective that bridges cultural differences and makes learning more relevant.
              </p>
              <p className="text-lg text-gray-600">
                With certifications in language instruction and exam preparation, Andrea specializes in helping students prepare for Goethe-Zertifikat, and Telc exams. Her personalized approach ensures that each student receives instruction tailored to their learning style and goals.
              </p>
              <p className="text-lg text-gray-600">
                Andrea's passion for teaching and deep understanding of German culture make every lesson engaging and insightful. Her students consistently achieve their language goals and develop a lasting appreciation for the German language.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Passion</h3>
              <p className="text-gray-600">
                We love what we do and it shows in every lesson
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">
                Your success is our priority and we track your progress
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Expertise</h3>
              <p className="text-gray-600">
                Certified instructors with proven teaching methods
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Join a supportive community of language learners
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
