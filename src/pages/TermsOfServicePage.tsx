import { useEffect } from "react";

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using YYC-Languages' services, website, or materials, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Services Provided</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                YYC-Languages provides German language tutoring services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>One-on-one German language instruction</li>
                <li>Group lessons and workshops</li>
                <li>Exam preparation for Goethe-Zertifikat, and Telc</li>
                <li>Customized learning materials and resources</li>
                <li>Progress tracking and assessment</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Services are provided online via video conferencing platforms or in-person at agreed-upon locations, subject to availability.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Registration and Account</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                To use our services, you may be required to create an account and provide accurate, complete information. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your contact information is current and accurate</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                You must be at least 18 years old to create an account. For students under 18, a parent or legal guardian must create the account and accept these terms on their behalf.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Booking and Scheduling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lesson Booking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lessons must be scheduled in advance through our booking system or by direct communication with your tutor. Lesson availability is subject to tutor schedules and may vary.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Students are expected to attend scheduled lessons on time. Late arrivals may result in shortened lesson time at the tutor's discretion, without refund or credit.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Cancellation and Rescheduling Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Cancellations</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Cancellations made 24 hours or more before the scheduled lesson: Full credit or refund</li>
                    <li>Cancellations made less than 24 hours before the lesson: No credit or refund</li>
                    <li>No-shows: No credit or refund, lesson is considered completed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tutor Cancellations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If a tutor must cancel a lesson, students will receive full credit and be offered priority rescheduling. In rare circumstances of extended tutor unavailability, a full refund will be provided for affected lessons.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pricing and Fees</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Current pricing is displayed on our website and may be subject to change. Price changes will not affect lessons already purchased. All prices are in Canadian dollars (CAD) unless otherwise specified.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Methods</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We accept payment via credit card, e-transfer, and other methods as specified during booking. Payment is required before the lesson or at the time of package purchase.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lesson Packages</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Prepaid lesson packages must be used within the specified validity period (typically 6-12 months from purchase). Unused lessons in expired packages are non-refundable and non-transferable.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Refund Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Refunds are provided under the following conditions:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Lessons cancelled with proper notice (24+ hours) will receive full credit</li>
                <li>Unused lessons in unexpired packages may be refunded at our discretion</li>
                <li>Meet & Greet sessions are free and non-refundable</li>
                <li>Refunds are processed within 7-14 business days to the original payment method</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Special promotional packages may have different refund terms, which will be clearly stated at the time of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Student Conduct</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Students are expected to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Treat tutors and staff with respect and professionalism</li>
                <li>Be prepared for lessons with required materials</li>
                <li>Complete assigned homework and exercises</li>
                <li>Provide a distraction-free learning environment for online lessons</li>
                <li>Not record lessons without prior written consent from the tutor</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                We reserve the right to terminate services without refund for students who engage in harassment, abusive behavior, or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All learning materials, lesson plans, worksheets, and content provided by YYC-Languages remain our intellectual property. Students may use these materials for personal learning purposes only and may not reproduce, distribute, or sell them without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                YYC-Languages provides educational services to the best of our ability but does not guarantee specific learning outcomes or exam results. We are not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the affected services.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our services, you consent to the practices described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Technical Requirements</h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                For online lessons, students are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Having a stable internet connection</li>
                <li>Providing a device with camera and microphone capabilities</li>
                <li>Installing required video conferencing software</li>
                <li>Testing equipment before lessons</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Technical issues on the student's end do not qualify for refunds or credits, though we will make reasonable efforts to accommodate rescheduling.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                Either party may terminate the tutoring relationship at any time. Students who wish to discontinue services may request a refund for unused lessons in accordance with our refund policy. YYC-Languages reserves the right to terminate services for violation of these terms, with refunds provided at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service are governed by the laws of the Province of Alberta, Canada. Any disputes arising from these terms or use of our services will be resolved in the courts of Alberta.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
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
