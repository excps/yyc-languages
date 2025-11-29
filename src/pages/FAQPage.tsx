import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Getting Started",
    question: "Do I need any prior German language experience?",
    answer:
      "No prior experience is necessary! We welcome complete beginners (A1 level) as well as advanced learners (up to C2). During your free Meet & Greet session, we'll assess your current level and create a personalized learning plan tailored to your starting point and goals.",
  },
  {
    category: "Getting Started",
    question: "What happens during the Meet & Greet session?",
    answer:
      "The Meet & Greet is a free 30-minute introductory session where we get to know each other, assess your current German level, discuss your learning goals, and create a customized lesson plan. It's also a great opportunity for you to ask questions and see if our teaching style is a good fit for you. There's no obligation to continue after this session.",
  },
  {
    category: "Lesson Format",
    question: "How long are the lessons?",
    answer:
      "Standard lessons are 60 minutes long. This duration allows for comprehensive coverage of topics, practice exercises, and Q&A time. For intensive learners or exam preparation, we suggest to book 90-minute sessions upon request.",
  },
  {
    category: "Lesson Format",
    question: "Are lessons conducted online or in-person?",
    answer:
      "We primarily offer online lessons via Zoom or Google Meet, which provides flexibility and convenience. In-person lessons in Calgary may be available upon request and subject to scheduling and location arrangements. Online lessons are just as effective and allow for screen sharing of materials, interactive exercises, and recording capabilities.",
  },
  {
    category: "Lesson Format",
    question: "What does a typical lesson include?",
    answer:
      "Each lesson is customized to your needs, but typically includes: review of previous material and homework, introduction of new vocabulary and grammar concepts, speaking practice and conversation, pronunciation exercises, reading comprehension, and listening activities. Lessons are interactive and focus on practical, real-world German usage.",
  },
  {
    category: "Scheduling",
    question: "How flexible is the scheduling?",
    answer:
      "Very flexible! We work around your schedule. You can book lessons at times that work best for you, whether that's early morning, evening, or weekends. Regular weekly slots can be reserved, or you can schedule lessons on an ad-hoc basis.",
  },
  {
    category: "Scheduling",
    question: "What is your cancellation policy?",
    answer: `**Canceling Individual Lessons**
      Need to cancel a lesson? No problem! Just give us at least 24 hours notice by email or phone (or both, if possible). We'll reschedule at the next available time that works for you.
      **Late Cancellations & No-Shows**
      If you cancel with less than 24 hours notice or arrive more than 20 minutes late without contacting us, the lesson deposit will be forfeited.
      **Canceling Your Package**
      During your first month, you can cancel at any time with a full refund of lessons not taken.
      After your first month, you can cancel your lesson package anytime with a 30 day written notice via email.`,
  },
  {
    category: "Learning Materials",
    question: "Do I need to buy textbooks?",
    answer:
      "No expensive textbooks required! We provide all learning materials digitally, including custom worksheets, vocabulary lists, grammar explanations, and practice exercises. Materials are tailored to your learning style and goals. If you prefer working with a specific textbook, we can incorporate that into your lessons.",
  },
  {
    category: "Learning Materials",
    question: "Will I receive homework?",
    answer:
      "Yes, homework is an essential part of language learning. You'll receive optional but highly recommended exercises to practice between lessons. The amount can be adjusted based on your schedule and learning pace. Homework typically takes 30-60 minutes and includes exercises to reinforce what you've learned in class.",
  },
  {
    category: "Progress & Assessment",
    question: "How do you track my progress?",
    answer:
      "We track your progress through regular informal assessments, homework review, and periodic comprehensive evaluations. You'll receive feedback after each lesson and detailed progress reports every 10 lessons. We follow the Common European Framework of Reference (CEFR) levels A1-C2, so you'll always know exactly where you stand.",
  },
  {
    category: "Progress & Assessment",
    question: "How long does it take to reach fluency?",
    answer:
      "This varies based on your starting level, learning pace, and time commitment. Generally, reaching conversational proficiency (B1 level) takes 200-300 hours of instruction and practice for most learners. With one lesson per week plus regular homework, you can expect to progress one CEFR level (e.g., A1 to A2) in 6-9 months. Consistency and practice outside of lessons significantly accelerate progress.",
  },
  {
    category: "Exam Preparation",
    question: "Can you help me prepare for German language exams?",
    answer:
      "Absolutely! We specialize in preparing students for Goethe-Zertifikat (A1-C2), and Telc exams. Exam preparation includes familiarization with test format, practice with past papers, time management strategies, and targeted work on weak areas. We've helped numerous students successfully pass these exams.",
  },
  {
    category: "Exam Preparation",
    question: "How long does exam preparation take?",
    answer:
      "For students at or near the target level, focused exam preparation typically takes 10 lessons. If you need to improve your German level before exam prep, we'll first work on building your skills to the required level, then focus on exam-specific strategies. During your Meet & Greet, we'll assess your current level and provide a realistic timeline.",
  },
  {
    category: "Pricing & Payment",
    question: "What are your rates?",
    answer:
      "Our current pricing is displayed on the Pricing section of our homepage. We offer single lessons and 10-lesson packages with discounted rates for larger packages. The Meet & Greet session is always free. Payment is accepted via e-transfer, cash, or other arranged methods. An invoice will outline your payments.",
  },
  {
    category: "Pricing & Payment",
    question: "Do lesson packages expire?",
    answer: `Yes, prepaid lesson packages are valid for 6 months from the date of purchase. Unused lessons after this date will be forfeited unless an
      extension is granted at our discretion. This ensures consistent progress and maintains learning momentum. If you have special circumstances that prevent you from using your lessons within this timeframe, please contact us to discuss options.`,
  },
  {
    category: "Technical Requirements",
    question: "What do I need for online lessons?",
    answer:
      "You'll need: a computer, tablet, or smartphone with a webcam and microphone, a stable internet connection (at least 5 Mbps), and Zoom or Google Meet installed. A headset is recommended for better audio quality but not required. We'll do a tech check during your Meet & Greet to ensure everything works smoothly.",
  },
  {
    category: "Technical Requirements",
    question: "What if I have technical difficulties during a lesson?",
    answer:
      "Technical issues happen! If you experience problems on your end (internet outage, computer crash), we'll pause the timer and reschedule the remaining time. If the issue is on our end, you'll receive full credit for the lesson. We always test our setup before lessons to minimize disruptions.",
  },
  {
    category: "Teaching Approach",
    question: "What is your teaching methodology?",
    answer:
      "We use a communicative, student-centered approach that emphasizes practical usage and real-world communication. Lessons incorporate all four language skills: speaking, listening, reading, and writing. We focus on building confidence through conversation while systematically developing grammar and vocabulary. Every lesson is customized to your learning style, pace, and goals.",
  },
  {
    category: "Teaching Approach",
    question:
      "Can you help with specialized German (business, medical, academic)?",
    answer:
      "Yes! We can tailor lessons to specific fields like business German, academic German for university studies, medical terminology, or any professional context. Let us know your specific needs during the Meet & Greet, and we'll design a curriculum that focuses on the vocabulary, phrases, and communication styles relevant to your field.",
  },
  {
    category: "General",
    question:
      "Can I learn German if I'm a complete beginner with no language learning experience?",
    answer:
      "Absolutely! Many of our students are learning their first foreign language. We make the process approachable and enjoyable, breaking down complex concepts into manageable steps. German has logical grammar rules and many similarities to English, which actually makes it more learnable than you might think. Everyone starts somewhere, and we'll guide you every step of the way.",
  },
  {
    category: "General",
    question: "Do you offer group lessons?",
    answer:
      "Currently, we focus on one-on-one instruction to provide the most personalized and effective learning experience. Individual lessons allow us to tailor content, pace, and methodology specifically to you. However, if you have friends or family members interested in learning together, please contact us to discuss small group options.",
  },
];

// Helper function to render FAQ answers with formatting
function renderAnswer(answer: string) {
  return answer.split('\n').map((line, idx) => {
    const trimmedLine = line.trim();

    // Check if line should be bold (starts and ends with **)
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      const boldText = trimmedLine.slice(2, -2);
      return (
        <strong key={idx} className="block font-semibold text-gray-900 mt-4 first:mt-0">
          {boldText}
        </strong>
      );
    }

    // Regular text line
    if (trimmedLine) {
      return (
        <span key={idx} className="block">
          {trimmedLine}
        </span>
      );
    }

    // Empty line (preserve spacing)
    return <br key={idx} />;
  });
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(faqData.map((item) => item.category))),
  ];

  const filteredFAQs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-5xl text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our German language
              tutoring services
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="text-gray-600 leading-relaxed">
                      {renderAnswer(faq.answer)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              We're here to help! Contact us and we'll get back to you as soon
              as possible.
            </p>
            <a
              href="mailto:info@yyclanguages.ca"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
