export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg mb-4">German Tutoring Pro</h3>
            <p className="text-sm">
              Expert German language instruction tailored to your goals. Learn from native speakers and achieve fluency faster.
            </p>
          </div>
          <div>
            <h4 className="text-white mb-4">Courses</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Beginner (A1-A2)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Intermediate (B1-B2)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advanced (C1-C2)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business German</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exam Preparation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Tutors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learning Materials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} German Tutoring Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
