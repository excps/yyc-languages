import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export function Contact() {
  const [state, handleSubmit] = useForm("mnnwjaje");

  return (
    <div
      id="contact"
      className="py-8 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600">
            Schedule your free Meet and Greet appointment today and take the
            first step toward German fluency.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="p-8">
              {state.succeeded && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 font-medium">
                    Thank you for your interest! We've received your request and will get back to you within 24 hours.
                  </p>
                </div>
              )}

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
                    placeholder="Your Name"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-600 text-sm mt-1"
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
                    placeholder="email@example.com"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-600 text-sm mt-1"
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
                    placeholder="+1 ... "
                  />
                  <ValidationError
                    prefix="Phone"
                    field="phone"
                    errors={state.errors}
                    className="text-red-600 text-sm mt-1"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your level</option>
                    <option value="complete-beginner">
                      Complete Beginner (A1)
                    </option>
                    <option value="elementary">Elementary (A2)</option>
                    <option value="intermediate">Intermediate (B1)</option>
                    <option value="upper-intermediate">
                      Upper Intermediate (B2)
                    </option>
                    <option value="advanced">Advanced (C1)</option>
                    <option value="proficient">Proficient (C2)</option>
                  </select>
                  <ValidationError
                    prefix="Level"
                    field="level"
                    errors={state.errors}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Tell us about your goals
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="I want to learn German because..."
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Sending..." : "Schedule Your Free Meet And Greet"}
                </Button>
              </form>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-white">
              <h3 className="text-2xl text-gray-900 mb-6">Why Choose YYC-Languages?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Personalized Learning</h4>
                    <p className="text-gray-600">
                      One-on-one lessons tailored to your goals, learning style, and pace
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Native German Speaker</h4>
                    <p className="text-gray-600">
                      Learn from Andrea, a native speaker with 25+ years of teaching experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Flexible & Convenient</h4>
                    <p className="text-gray-600">
                      Schedule lessons that fit your lifestyle, online or in-person
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">info@yyclanguages.ca</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
              {/*<div className="flex items-start gap-4">
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
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
