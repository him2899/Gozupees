'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart3, 
  Users, 
  UserCog, 
  Target, 
  TrendingUp
} from 'lucide-react';
import GradientHeading from '../ui/GradientHeading';

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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 transform group-hover:scale-105 transition-all duration-300"></div>
      <div className="relative p-8 h-full">
        <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600">
          {icon}
        </div>
        <GradientHeading 
          level={3} 
          highlightWords={title}
          fullGradient={true}
          className="text-xl font-semibold mb-3"
        >
          {title}
        </GradientHeading>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
};

export default function HermesFeatures() {
  const features = [
    {
      title: "Sales Analytics",
      description: "Comprehensive dashboards showcasing your team's performance with real-time data visualization",
      icon: <LineChart className="w-6 h-6" />,
      delay: 0.1,
    },
    {
      title: "Lead Tracking",
      description: "Monitor your sales funnel from initial contact to closed deals with advanced filtering options",
      icon: <Users className="w-6 h-6" />,
      delay: 0.2,
    },
    {
      title: "Conversion Optimization",
      description: "Identify bottlenecks in your sales process and get AI-powered recommendations to improve conversion rates",
      icon: <TrendingUp className="w-6 h-6" />,
      delay: 0.3,
    },
    {
      title: "Performance Reports",
      description: "Generate detailed reports on individual and team performance with exportable charts and metrics",
      icon: <BarChart3 className="w-6 h-6" />,
      delay: 0.4,
    },
    {
      title: "Team Management",
      description: "Assign leads, set targets, and manage your sales team with intuitive tools for better collaboration",
      icon: <UserCog className="w-6 h-6" />,
      delay: 0.5,
    },
    {
      title: "Goal Setting",
      description: "Set realistic targets based on historical data and track progress with visual goal completion indicators",
      icon: <Target className="w-6 h-6" />,
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