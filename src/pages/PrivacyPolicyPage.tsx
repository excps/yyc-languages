import { useEffect } from "react";

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                YYC-Languages ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our language tutoring services and visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed mb-2">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Register for our services or create an account</li>
                    <li>Contact us through our website or email</li>
                    <li>Schedule lessons or consultations</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-2">
                    This information may include: name, email address, phone number, language proficiency level, learning goals, and payment information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide, operate, and maintain our tutoring services</li>
                <li>Process your transactions and manage your bookings</li>
                <li>Communicate with you about lessons, schedules, and updates</li>
                <li>Send you promotional materials and special offers (with your consent)</li>
                <li>Improve our services and develop new features</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Sharing Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>With your tutors to facilitate lessons and track progress</li>
                <li>With service providers who assist us in operating our website and services (e.g., payment processors, email service providers)</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Access: Request a copy of the personal information we hold about you</li>
                <li>Correction: Request that we correct any inaccurate information</li>
                <li>Deletion: Request that we delete your personal information</li>
                <li>Opt-out: Unsubscribe from marketing communications</li>
                <li>Data portability: Request a copy of your data in a machine-readable format</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-900 font-semibold mb-2">YYC-Languages</p>
                <p className="text-gray-600">Calgary, Alberta, Canada</p>
                <p className="text-gray-600">Email: info@yyclanguages.ca</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
