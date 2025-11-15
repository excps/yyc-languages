import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const courses = [
  {
    level: "Beginner",
    description:
      "Start your German journey with fundamental grammar, vocabulary, and everyday conversations.",
    features: [
      "Basic grammar and sentence structure",
      "Essential vocabulary (1000+ words)",
      "Pronunciation and listening skills",
      "Simple conversations and dialogues",
      "Cultural introduction",
      "Travel and living in Germany",
    ],
    courseLevel: "A1 - A2",
    color: "bg-gray-100 border-gray-300",
    titleColor: "text-gray-700",
  },
  {
    level: "Intermediate",
    description:
      "Build confidence with complex grammar, expand your vocabulary, and engage in detailed discussions.",
    features: [
      "Advanced grammar structures",
      "Vocabulary expansion (3000+ words)",
      "Reading comprehension",
      "Practicing real-life conversations",
      "Writing skills development",
      "Basic Business German",
    ],
    courseLevel: "B1 - B2",
    color: "bg-red-50 border-red-200",
    titleColor: "text-red-600",
    // popular: true
  },
  {
    level: "Advanced",
    description:
      "Achieve fluency with sophisticated expression, nuanced understanding, and near-native proficiency.",
    features: [
      "Complex language structures",
      "Idiomatic expressions",
      "Professional and academic fluency",
      "Literature and media analysis",
      "Exam preparation (Goethe, Telc)",
      "Cultural immersion",
    ],
    courseLevel: "C1 - C2",
    color: "bg-amber-50 border-amber-200",
    titleColor: "text-amber-600",
  },
];

export function Courses() {
  return (
    <div
      id="courses"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Programs for Every Level
          </h2>
          <p className="text-xl text-gray-600">
            Tailored German lessons for beginners, intermediate learners, and
            advanced speakers. We have the right course for you!
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className={`p-8 ${course.color} border-2 relative overflow-hidden flex flex-col h-full`}
            >
              <div className="flex-grow">
                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold ${course.titleColor} mb-2`}
                  >
                    {course.level}
                  </h3>
                  <p className="text-gray-600">{course.subtitle}</p>
                </div>
                <p className="text-gray-600 mb-8">{course.description}</p>
                <ul className="space-y-2 mb-4">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`text-lg font-semibold ${course.titleColor} text-center`}
              >
                (equivalent) {course.courseLevel}
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
