'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  BarChart, 
  LineChart, 
  Workflow, 
  LightbulbIcon, 
  Zap 
} from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Feature = ({ title, description, icon, delay }: FeatureProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 transform group-hover:scale-105 transition-all duration-300"></div>
      <div className="relative p-8 h-full">
        <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
};

export default function FeatureGrid() {
  const features = [
    {
      title: "AI Strategy Consulting",
      description: "Develop enterprise-wide AI adoption strategies that align with your business objectives and future vision",
      icon: <Brain className="w-6 h-6" />,
      delay: 0.1,
    },
    {
      title: "Predictive Analytics",
      description: "Forecast market trends and consumer behavior with advanced machine learning models",
      icon: <LineChart className="w-6 h-6" />,
      delay: 0.2,
    },
    {
      title: "AI-Powered Marketing",
      description: "Transform campaign performance with hyper-personalization and automated optimization",
      icon: <BarChart className="w-6 h-6" />,
      delay: 0.3,
    },
    {
      title: "Business Process Automation",
      description: "Streamline operations and reduce costs with intelligent automation solutions",
      icon: <Workflow className="w-6 h-6" />,
      delay: 0.4,
    },
    {
      title: "Innovation Workshops",
      description: "Discover new opportunities through guided innovation sessions with our AI experts",
      icon: <LightbulbIcon className="w-6 h-6" />,
      delay: 0.5,
    },
    {
      title: "Digital Transformation",
      description: "Accelerate your digital journey with AI as the cornerstone of your transformation",
      icon: <Zap className="w-6 h-6" />,
      delay: 0.6,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Feature 
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          delay={feature.delay}
        />
      ))}
    </div>
  );
}