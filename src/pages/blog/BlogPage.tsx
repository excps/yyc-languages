import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "common-mistakes-german-learners",
    title: "7 Common Mistakes German Learners Make (And How to Avoid Them)",
    excerpt: "Learning German comes with its challenges, and many students fall into the same traps. Understanding these common mistakes can help you avoid them and accelerate your progress. Here are the seven most frequent errors German learners make and practical strategies to overcome them.",
    date: "2025-11-29",
    readTime: "6 min read",
    category: "Learning Tips"
  },
  {
    id: "essential-tips-learning-german",
    title: "5 Essential Tips for Learning German as a Beginner",
    excerpt: "Starting your German learning journey can feel overwhelming, but with the right approach and mindset, you'll be speaking German with confidence in no time. Here are five essential tips that will help you build a strong foundation in the German language.",
    date: "2025-11-29",
    readTime: "5 min read",
    category: "Learning Tips"
  }
];

export function BlogPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600">
            Tips, insights, and resources for your German learning journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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

              <h2 className="text-3xl text-gray-900 mb-4">{post.title}</h2>

              <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span className="font-medium">Continue reading</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
