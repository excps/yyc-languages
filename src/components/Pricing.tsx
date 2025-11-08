import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Meet & Greet",
    price: "Free",
    period: "one-time",
    description: "Get to know Andrea and explore how we can help you",
    features: [
      "30-minute introductory session",
      "Discuss your German learning goals",
      "Learn about our teaching approach",
      "Ask any questions you have",
      "No commitment required"
    ],
    cta: "Book Your Meet & Greet",
    popular: false
  },
  {
    name: "Standard",
    price: "$60",
    period: "per lesson",
    description: "Ideal for consistent progress and regular practice",
    features: [
      "60-minute lessons",
      "Agreed scheduling",
      "Custom learning materials included",
      "Homework and exercises applicable",
      "Email support 24 hours",
      "Progress tracking quarterly"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Package",
    price: "$540",
    period: "10 lessons",
    description: "Best value for committed learners",
    features: [
      "10x 60-minute lessons",
      "Save $60 ($54/lesson)",
      "Priority scheduling",
      "All Standard features",
      "Providing additional documents",
      "Valid for 6 months"
    ],
    cta: "Buy Package",
    popular: false
  }
];

export function Pricing() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Flexible Options for Every Learner
          </h2>
          <p className="text-xl text-gray-600">
            Choose the option that works best for you. Quality tutoring tailored to your goals and schedule.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-xl scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center text-gray-600">
          <p>All plans include a satisfaction guarantee. Not happy? Get a full refund within 7 days.</p>
        </div>
      </div>
    </div>
  );
}
