"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: "Pro",
      price: isAnnual ? 4 : 5,
      description: "Perfect for individuals starting out",
      features: [
        "20 thumbnails per month",
        "Export in PNG, JPG formats",
        "Basic customization options",
        "Email support",
      ],
      highlight: false,
      ctaText: "Get Started",
    },
    {
      name: "Plus",
      price: isAnnual ? 12 : 15,
      description: "Great for professionals needing more capacity",
      features: [
        "45 thumbnails per month",
        "Export in all formats",
        "Advanced customization options",
        "Priority email support",
        "Custom branding",
      ],
      highlight: true,
      ctaText: "Upgrade Now",
    },
    {
      name: "Creator",
      price: isAnnual ? 20 : 25,
      description: "For teams and businesses with high volume needs",
      features: [
        "100 thumbnails per month",
        "Export in all formats",
        "Premium customization options",
        "Dedicated support",
        "Custom branding",
        "API access",
      ],
      highlight: false,
      ctaText: "Contact Sales",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans include access to our core thumbnail generation features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`flex flex-col ${plan.highlight ? "border-primary shadow-lg relative overflow-hidden" : ""}`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${plan.highlight ? "bg-primary hover:bg-primary/90" : ""}`}
                variant={plan.highlight ? "default" : "outline"}
              >
                {plan.ctaText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-medium text-lg">Can I change plans later?</h3>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the next billing cycle.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">What happens if I exceed my thumbnail limit?</h3>
            <p className="text-gray-600">You'll receive a notification when you're close to your limit. You can purchase additional thumbnails or upgrade to a higher plan.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Do you offer refunds?</h3>
            <p className="text-gray-600">We offer a 7-day money-back guarantee for all plans. If you're not satisfied, contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;