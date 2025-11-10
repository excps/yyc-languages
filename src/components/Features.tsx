import {
  GraduationCap,
  Users,
  Clock,
  Award,
  Globe,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Native German Tutors",
    description:
      "Learn from experienced native speakers who understand the nuances of the language and culture.",
  },
  {
    icon: GraduationCap,
    title: "All Levels Welcome",
    description:
      "From complete beginners (A1) to advanced learners (C2), we have the right program for you.",
  },
  {
    icon: MessageSquare,
    title: "Personalized Curriculum",
    description:
      "Customized lesson plans tailored to your learning style, goals, and interests.",
  },
  {
    icon: Award,
    title: "Exam Preparation",
    description: "Specialized training for Goethe-Zertifikat, Telc.",
  },
  {
    icon: Globe,
    title: "Interactive Learning",
    description:
      "Engaging materials, real-world conversations, and practical exercises to accelerate your progress.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Convenient online classes that fit your schedule, whether you're a busy professional or a student.",
  },
];

export function Features() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Why Choose Our German Tutoring?
          </h2>
          <p className="text-xl text-gray-600">
            We combine expert instruction with modern technology to deliver an
            exceptional learning experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
