'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import GradientHeading from '../ui/GradientHeading';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  delay: number;
}

const PricingTier = ({ name, price, description, features, highlighted = false, buttonText, delay }: PricingTierProps) => {
  return (
    <motion.div 
      className={`rounded-2xl p-1 ${highlighted ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`h-full rounded-xl p-6 ${highlighted ? 'bg-gray-900' : 'bg-gray-800'} flex flex-col`}>
        <GradientHeading 
          level={3} 
          highlightWords={name}
          fullGradient={true}
          className="text-xl font-bold mb-1"
        >
          {name}
        </GradientHeading>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== 'Custom' && <span className="text-gray-400 ml-2">/month</span>}
        </div>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className={`w-5 h-5 mr-2 mt-0.5 ${highlighted ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <a 
          href={`/hermes/signup?plan=${name.toLowerCase()}`}
          className={`w-full py-3 rounded-lg font-medium text-center transition-all duration-300 ${
            highlighted 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg' 
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          {buttonText}
        </a>
      </div>
    </motion.div>
  );
};

export default function HermesPricing() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small teams just getting started",
      features: [
        "Up to 5 team members",
        "500 leads per month",
        "Basic analytics",
        "Email support",
        "API access"
      ],
      highlighted: false,
      buttonText: "Get Started",
      delay: 0.1
    },
    {
      name: "Professional",
      price: "$149",
      description: "Ideal for growing sales teams",
      features: [
        "Up to 20 team members",
        "2,500 leads per month",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom dashboards",
        "Sales forecasting"
      ],
      highlighted: true,
      buttonText: "Start Free Trial",
      delay: 0.2
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited team members",
        "Unlimited leads",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Advanced API access",
        "Custom integrations",
        "White labeling",
        "Dedicated account manager"
      ],
      highlighted: false,
      buttonText: "Contact Sales",
      delay: 0.3
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => (
          <PricingTier
            key={index}
            name={tier.name}
            price={tier.price}
            description={tier.description}
            features={tier.features}
            highlighted={tier.highlighted}
            buttonText={tier.buttonText}
            delay={tier.delay}
          />
        ))}
      </div>
      
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-gray-400 mb-2">All plans include:</p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-300 text-sm">
          <span className="bg-gray-800 px-3 py-1 rounded-full">No credit card required for trial</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full">Cancel anytime</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full">Free data migration</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full">Regular updates</span>
        </div>
      </motion.div>
    </div>
  );
}