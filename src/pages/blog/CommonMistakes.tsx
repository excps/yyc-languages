import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

const post = {
  id: "common-mistakes-german-learners",
  title: "The Little Steps Method: How Jess Learned German Without Feeling Overwhelmed",
  excerpt: "When Jess moved to Calgary, she wanted to learn German but felt completely unsure about where to begin. Discover how the Little Steps Method transformed her learning journey with one simple rule: Small steps every day. BIG progress.",
  date: "2025-11-29",
  readTime: "4 min read",
  category: "Success Stories",
};

function BlogContent() {
  return (
    <>
      <p className="text-lg text-gray-600 mb-6">
        When Jess moved to Calgary, she wanted to learn German, but she felt completely unsure about where to begin. Then she discovered my service.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Turning Point: A Simple Rule</h2>
      <p className="text-gray-700 mb-4">During our complimentary "Meet & Greet" lesson, I shared one simple rule with Jess:</p>
      <p className="text-gray-700 mb-4 text-xl font-semibold text-blue-600">"Small steps every day. BIG progress."</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How the Little Steps Method Works</h2>
      <p className="text-gray-700 mb-4">In addition to our weekly 90-minute lesson, Jess now follows a simple daily routine:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
        <li>Learns just a few words each day</li>
        <li>Watches short videos (with subtitles)</li>
        <li>Reads tiny texts</li>
        <li>Reviews once a week</li>
      </ul>
      <p className="text-gray-700 mb-4">The tasks are so easy that she never feels overwhelmed. That's the key—when learning feels manageable, it becomes sustainable.</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Results Speak for Themselves</h2>
      <p className="text-gray-700 mb-4">After a few weeks, Jess realized she could understand basic sentences. After a month, she could already talk a little.</p>
      <p className="text-gray-700 mb-4">The secret is simple: <strong>Consistency beats intensity.</strong> Short and regular wins every time.</p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why the Little Steps Method Works</h2>
      <p className="text-gray-700 mb-4">My secret approach to start with the little-steps method makes learning suddenly feel possible—almost effortless. Instead of cramming hours of study that lead to burnout, small daily actions build momentum and confidence.</p>
      <p className="text-gray-700 mb-4">We shared the start of our journey with a cup of hot chocolate 😊. That relaxed, friendly atmosphere continues in every lesson, making language learning not just effective, but enjoyable.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8 mb-6">
        <p className="text-gray-800 font-medium mb-2">Ready to start your own Little Steps journey?</p>
        <p className="text-gray-700">Book your complimentary "Meet & Greet" lesson today and discover how small steps can lead to big progress in your German learning. Let's share a cup of hot chocolate and plan your personalized learning path!</p>
      </div>
    </>
  );
}

export function CommonMistakes() {
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
