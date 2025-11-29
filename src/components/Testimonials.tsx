import { Card } from "./ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie",
    role: "IT Manager",
    rating: 5,
    text: "I really enjoy learning with Andrea. She explains everything clearly and patiently, ensuring I truly understand before moving forward. The lessons are well-structured yet flexible, and Andrea creates a comfortable environment where I'm not afraid to make mistakes. Her teaching style is both professional and personable, making each session something I genuinely look forward to.",
  },
  {
    name: "Gervais",
    role: "Business Owner",
    rating: 5,
    text: "I found that Andrea approaches our lessons with humour and grace, having also done a considerable amount of pertinent preparation. That said, she is thorough and is quite insistent that I learn what is necessary, which I appreciate. She paces the lessons well to ensure that I have every opportunity to understand and learn. I would heartily recommend Andrea is a German Tutor if you are looking for a fun and thorough learning experience.",
  },
  {
    name: "Annemarie",
    role: "Musician",
    rating: 5,
    text: "As a musician, I appreciate how Andrea helps me develop natural German pronunciation and intonation. Her creative teaching methods resonate with my learning style, making even challenging grammar feel manageable. The lessons are engaging and productive, and Andrea's approach makes learning genuinely enjoyable. I look forward to every session!",
  },
];

export function Testimonials() {
  return (
    <div
      id="testimonials"
      className="py-8 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Success Stories from Our Students
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-1 flex-1">"{testimonial.text}"</p>
              <div className="min-h-[3rem]">
                <div className="text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
