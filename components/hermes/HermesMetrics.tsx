'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart4, Clock } from 'lucide-react';
import GradientHeading from '../ui/GradientHeading';

export default function HermesMetrics() {
  const metrics = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      value: "34%",
      label: "Average Increase in Conversion Rate",
      description: "Customers see significant gains within 60 days",
      delay: 0.1
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      value: "2.7x",
      label: "Lead Qualification Efficiency",
      description: "Spend less time on poor-fit prospects",
      delay: 0.2
    },
    {
      icon: <BarChart4 className="w-8 h-8 text-indigo-600" />,
      value: "46%",
      label: "Revenue Growth",
      description: "Year-over-year for enterprise clients",
      delay: 0.3
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      value: "18hrs",
      label: "Time Saved Per Rep Monthly",
      description: "Through automated reporting and insights",
      delay: 0.4
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GradientHeading 
            level={2}
            highlightWords="Results"
            className="text-gray-900"
          >
            Real Results for Sales Teams
          </GradientHeading>
        </motion.div>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Companies using Hermes see measurable improvements in their sales metrics
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: metric.delay }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-gray-50">
                {metric.icon}
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {metric.value}
            </div>
            <div className="font-medium text-gray-800 mb-1">
              {metric.label}
            </div>
            <div className="text-sm text-gray-600">
              {metric.description}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="inline-block bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-gray-500 text-sm font-medium">Trusted by industry leaders:</div>
            <div className="flex space-x-6">
              <div className="w-20 h-8 bg-gray-200 rounded opacity-70"></div>
              <div className="w-20 h-8 bg-gray-200 rounded opacity-70"></div>
              <div className="w-20 h-8 bg-gray-200 rounded opacity-70"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}