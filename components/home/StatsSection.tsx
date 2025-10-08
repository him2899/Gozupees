'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    number: '12M+',
    label: 'Customer Interactions Handled',
    description: 'Automated tasks completed across all client businesses'
  },
  {
    number: '4x',
    label: 'Faster Lead Replies',
    description: 'Response time improvement with AI automation'
  },
  {
    number: '40%',
    label: 'More Conversions',
    description: 'Average conversion rate increase for our clients'
  },
  {
    number: '99.99%',
    label: 'Uptime, 24/7',
    description: 'Reliable AI operations with enterprise-grade reliability'
  }
];

export default function StatsSection() {
  return (
    <section className="bg-gray-900 py-12 md:py-16 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real Results, No Extra Headcount
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Big Number */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {stat.number}
              </div>
              
              {/* Label */}
              <div className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
                {stat.label}
              </div>
              
              {/* Description */}
              <div className="text-sm text-gray-400 max-w-48 mx-auto leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}