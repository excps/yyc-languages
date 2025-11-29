import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

const post = {
  id: "essential-tips-learning-german",
  title: "5 Essential Tips for Learning German as a Beginner",
  excerpt: "Starting your German learning journey can feel overwhelming, but with the right approach and mindset, you'll be speaking German with confidence in no time. Here are five essential tips that will help you build a strong foundation in the German language.",
  date: "2025-11-29",
  readTime: "5 min read",
  category: "Learning Tips",
};

function BlogContent() {
  return (
    <>
      <p className="text-lg text-gray-600 mb-6">
        Starting your German learning journey can feel overwhelming, but with the right approach and mindset, you'll be speaking German with confidence in no time. Here are five essential tips that will help you build a strong foundation in the German language.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Master the Fundamentals First</h2>
      <p className="text-gray-700 mb-4">Before diving into complex grammar rules, focus on building a solid foundation. Start with basic vocabulary, common phrases, and essential grammar concepts. Learning the German alphabet, pronunciation, and basic sentence structure will serve as your building blocks for more advanced learning.</p>
      <p className="text-gray-700 mb-4">Don't rush through the basics. Take your time to really understand how German sounds and feels. Practice the unique sounds like "ä," "ö," and "ü" until they become natural. This foundation will make everything else much easier.</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Practice Speaking from Day One</h2>
      <p className="text-gray-700 mb-4">Don't wait until you feel "ready" to start speaking. Even if you only know a handful of words, practice using them in sentences. Speaking from the beginning helps you develop confidence and get comfortable with German pronunciation and rhythm.</p>
      <p className="text-gray-700 mb-4">Find a language partner, tutor, or even practice speaking to yourself in the mirror. The key is to get your mouth and brain working together to produce German sounds. Every mistake is a learning opportunity, so don't be afraid to make them!</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Immerse Yourself in the Language</h2>
      <p className="text-gray-700 mb-4">Surround yourself with German as much as possible. Listen to German podcasts, watch German movies or TV shows with subtitles, and try to think in German throughout your day. This constant exposure helps your brain naturally absorb the language patterns.</p>
      <p className="text-gray-700 mb-4">Create a German-rich environment: change your phone's language settings, follow German social media accounts, listen to German music during your commute. The more you expose yourself to the language, the faster you'll progress.</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Learn Grammar in Context</h2>
      <p className="text-gray-700 mb-4">Instead of memorizing grammar rules in isolation, learn them through real examples and conversations. Understanding how native speakers use grammar in everyday situations makes it easier to remember and apply the rules correctly.</p>
      <p className="text-gray-700 mb-4">When you encounter a new grammar structure, try to find multiple examples of it being used naturally. Create your own sentences using the structure. This contextual learning makes grammar stick much better than rote memorization.</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Be Patient and Consistent</h2>
      <p className="text-gray-700 mb-4">Language learning is a marathon, not a sprint. Set realistic goals, practice regularly (even if it's just 15 minutes a day), and celebrate your progress along the way. Consistency is more important than intensity when it comes to language acquisition.</p>
      <p className="text-gray-700 mb-4">Keep a learning journal to track your progress. Look back at where you started and acknowledge how far you've come. Remember that every expert was once a beginner, and every small step forward is worth celebrating.</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Get Professional Support</h2>
      <p className="text-gray-700 mb-4">At YYC-Languages, we incorporate all these principles into our personalized German lessons. Whether you're a complete beginner or looking to advance your skills, we're here to support your learning journey every step of the way.</p>
      <p className="text-gray-700 mb-4">Our one-on-one lessons are tailored to your specific goals, learning style, and schedule. We focus on practical communication skills while building a strong grammatical foundation, ensuring you can use your German in real-world situations.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8 mb-6">
        <p className="text-gray-800 font-medium mb-2">Ready to start your German learning journey?</p>
        <p className="text-gray-700">Contact us today to schedule your first lesson and experience the YYC-Languages difference!</p>
      </div>
    </>
  );
}

export default function EssentialTips() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <BlogContent />
          </div>
        </article>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
