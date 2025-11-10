import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Target, BookOpen, Users, ArrowRight } from "lucide-react";

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl text-gray-900 mb-4">About YYC-Languages</h1>
            <p className="text-xl text-gray-600">
              Your trusted partner in German language learning, based in Calgary
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600">
                At YYC-Languages, we believe learning German should be both
                inspiring and rewarding. Based in Calgary, we offer personalized
                lessons for learners of all levels—from those just starting out
                to those refining advanced skills.
              </p>
              <p className="text-lg text-gray-600">
                Our teaching style combines trusted language-learning techniques
                with modern tools and interactive activities, making each
                session engaging and effective. Whether you’re learning German
                for work, study, travel, or simply for the joy of it, we’re here
                to guide you every step of the way.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900 mb-4">Your Instructor</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
                <h3 className="text-2xl text-gray-900">Andrea</h3>
                <p className="text-lg text-gray-600">
                  Native German speaker with over 25 years of professional
                  teaching experience. Andrea specializes in exam preparation
                  and brings a unique perspective from living in both Germany
                  and Canada.
                </p>
                <Link
                  to="/meet-andrea"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-lg font-medium"
                >
                  Learn more about Andrea
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
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
