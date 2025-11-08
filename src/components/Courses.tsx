import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const courses = [
  {
    level: "Beginner",
    subtitle: "A1 - A2",
    description: "Start your German journey with fundamental grammar, vocabulary, and everyday conversations.",
    features: [
      "Basic grammar and sentence structure",
      "Essential vocabulary (1000+ words)",
      "Pronunciation and listening skills",
      "Simple conversations and dialogues",
      "Cultural introduction",
      "Travel and living in Germany"
    ],
    color: "bg-green-50 border-green-200"
  },
  {
    level: "Intermediate",
    subtitle: "B1 - B2",
    description: "Build confidence with complex grammar, expand your vocabulary, and engage in detailed discussions.",
    features: [
      "Advanced grammar structures",
      "Vocabulary expansion (3000+ words)",
      "Reading comprehension",
      "Practicing real-life conversations",
      "Writing skills development",
       "Basic Business German"
    ],
    color: "bg-blue-50 border-blue-200",
    popular: true
  },
  {
    level: "Advanced",
    subtitle: "C1 - C2",
    description: "Achieve fluency with sophisticated expression, nuanced understanding, and near-native proficiency.",
    features: [
      "Complex language structures",
      "Idiomatic expressions",
      "Professional and academic fluency",
      "Literature and media analysis",
      "Exam preparation (TestDaF, Goethe, Telc)",
      "Cultural immersion"
    ],
    color: "bg-purple-50 border-purple-200"
  }
];

export function Courses() {
  return (
    <div id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Programs for Every Level
          </h2>
          <p className="text-xl text-gray-600">
            Tailored German lessons for beginners, intermediate learners, and advanced speakers. We have the right course for you!
            
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className={`p-4 ${course.color} border-2 relative overflow-hidden`}>
              <div className="mb-3">
                <h3 className="text-xl text-gray-900 mb-0.5 leading-tight">{course.level}</h3>
                <p className="text-sm text-gray-600 leading-tight">{course.subtitle}</p>
              </div>
              <p className="text-sm text-gray-700 mb-3 leading-tight">{course.description}</p>
              <ul className="space-y-1.5 mb-4">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
