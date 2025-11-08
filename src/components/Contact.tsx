import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "./general/ImageWithFallback";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build nicely formatted plain text email body
    const subject = encodeURIComponent('🇩🇪 German Tutoring - Free Trial Lesson Request');
    const body = encodeURIComponent(
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NEW STUDENT INQUIRY
  Free Meet And Greet Request
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STUDENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:           ${formData.name}
Email:          ${formData.email}
Phone:          ${formData.phone || 'Not provided'}
German Level:   ${formData.level}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEARNING GOALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );

    // Open user's default email client with pre-filled information
    window.location.href = `mailto:info@yyclanguages.ca?subject=${subject}&body=${body}`;

    // Clear the form
    setFormData({ name: '', email: '', phone: '', level: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600">
            Schedule your free Meet and Greet appointment today and take the first step toward German fluency.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 ... "
                  />
                </div>
                <div>
                  <label htmlFor="level" className="block text-gray-700 mb-2">
                    Current German Level *
                  </label>
                  <select
                    id="level"
                    name="level"
                    required
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your level</option>
                    <option value="complete-beginner">Complete Beginner (A1)</option>
                    <option value="elementary">Elementary (A2)</option>
                    <option value="intermediate">Intermediate (B1)</option>
                    <option value="upper-intermediate">Upper Intermediate (B2)</option>
                    <option value="advanced">Advanced (C1)</option>
                    <option value="proficient">Proficient (C2)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Tell us about your goals
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="I want to learn German because..."
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Your Free Meet And Greet
                </Button>
              </form>
            </Card>
          </div>
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="/images/german-flag.png"
                alt="German flag"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">andrea@yyclanguages.ca</p>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">+1 (587) 7775505 </p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9:00 AM - 2:00 PM MT </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600">Millrise SW, Calgary</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
