'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GradientHeading from '../ui/GradientHeading';

export default function HermesFunnel() {
  const funnelSteps = [
    { 
      label: 'Received Leads', 
      value: '1,524', 
      percentage: '100%',
      color: 'bg-blue-500',
      width: 'w-full'
    },
    { 
      label: 'Sales Qualified', 
      value: '983', 
      percentage: '64.5%',
      color: 'bg-blue-600',
      width: 'w-5/6'
    },
    { 
      label: 'Discovery Call', 
      value: '764', 
      percentage: '50.1%',
      color: 'bg-blue-700',
      width: 'w-4/6'
    },
    { 
      label: 'Proposal Sent', 
      value: '526', 
      percentage: '34.5%',
      color: 'bg-indigo-600',
      width: 'w-3/6'
    },
    { 
      label: 'Negotiation', 
      value: '387', 
      percentage: '25.4%',
      color: 'bg-indigo-700',
      width: 'w-2/5'
    },
    { 
      label: 'Closed Won', 
      value: '215', 
      percentage: '14.1%',
      color: 'bg-indigo-800',
      width: 'w-1/4'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center mb-8">
        <GradientHeading 
          level={2} 
          highlightWords="Funnel Performance"
          className="mb-3 text-gray-900"
        >
          Recent Funnel Performance
        </GradientHeading>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Track your entire sales process from initial contact through closed deals
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Funnel Visualization */}
        <div className="flex-1">
          <div className="flex flex-col items-center">
            {funnelSteps.map((step, index) => (
              <motion.div 
                key={index} 
                className="mb-3 relative w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`${step.width} mx-auto h-14 rounded-md ${step.color} flex items-center justify-center transition-all duration-300 hover:shadow-lg group`}>
                  <span className="text-white font-medium">{step.label}</span>
                  <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/20 px-2 py-1 rounded text-white text-xs">
                      {step.percentage}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex-1">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Conversion Rate (Overall)</span>
                  <span className="font-medium">14.1%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-600 rounded-full w-[14.1%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Qualified to Discovery</span>
                  <span className="font-medium">77.7%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-600 rounded-full w-[77.7%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Proposal to Closed</span>
                  <span className="font-medium">40.9%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-600 rounded-full w-[40.9%]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Improvement Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-gray-700">Increase discovery call conversion with better qualification questions</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-gray-700">Focus on proposal to negotiation stage which has the largest drop-off</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-gray-700">Revisit lead qualification process to improve overall quality</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}