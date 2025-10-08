'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Settings, BarChart2 } from 'lucide-react';
import GradientHeading from '../ui/GradientHeading';

export default function HermesProcess() {
  const steps = [
    {
      title: "Connect Your Data",
      description: "Easily integrate with your existing CRM, marketing tools, and sales platforms.",
      icon: <Settings className="w-8 h-8 text-white" />,
      color: "bg-blue-600",
      delay: 0.1
    },
    {
      title: "Generate Insights",
      description: "Our AI engine automatically analyzes your sales data to identify patterns and opportunities.",
      icon: <BarChart2 className="w-8 h-8 text-white" />,
      color: "bg-indigo-600",
      delay: 0.3
    },
    {
      title: "Boost Performance",
      description: "Implement recommendations, track improvements, and watch your conversion rates increase.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "bg-purple-600",
      delay: 0.5
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="flex flex-col items-center text-center"
            >
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                {step.icon}
              </div>
              <GradientHeading 
                level={3} 
                highlightWords={step.title}
                fullGradient={true}
                className="text-xl font-bold mb-2"
              >
                {step.title}
              </GradientHeading>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Numbered badge */}
              <div className="mt-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                {index + 1}
              </div>
            </motion.div>
            
            {/* Arrow between steps (except after the last step) */}
            {index < steps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                className="hidden md:flex items-center justify-center"
              >
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* CTA Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-12"
      >
        <a 
          href="/hermes/demo" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg duration-300 hover:shadow-blue-600/30"
        >
          Start Your Free Trial
        </a>
        <p className="mt-3 text-sm text-gray-500">No credit card required</p>
      </motion.div>
    </div>
  );
}