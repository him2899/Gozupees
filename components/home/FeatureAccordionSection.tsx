'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FeatureAccordionSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const features = [
    {
      id: 1,
      title: "Do More Without Hiring",
      description: "No need to build a big team. Our AI agents can call, chat, email, and help - just like a real employee. But faster. And cheaper.",
      imageUrl: "/images/features/team-productivity.jpg"
    },
    {
      id: 2,
      title: "Work 24/7, No Breaks", 
      description: "Always on, never tired. They answer leads, book calls, and help customers anytime - even at 3AM.",
      imageUrl: "/images/features/24-7-service.jpg"
    },
    {
      id: 3,
      title: "Talk Like a Real Human",
      description: "No weird robot voices. They speak clearly, adapt to your style, and sound just like your team would.",
      imageUrl: "/images/features/human-voice.jpg"
    },
    {
      id: 4,
      title: "Handle Everything - Sales, Support & Marketing",
      description: "One tool, many jobs. They can sell your product, answer questions, follow up, and send emails - all in one place.",
      imageUrl: "/images/features/all-in-one.jpg"
    },
    {
      id: 5,
      title: "Easy to Set Up",
      description: "No tech skills needed. Start using an AI agent in just a few clicks. You're in full control.",
      imageUrl: "/images/features/easy-setup.jpg"
    },
    {
      id: 6,
      title: "Save Money, Get More Done",
      description: "No salary. No office. No time off. You only pay for what they do. And they never ask for a raise.",
      imageUrl: "/images/features/cost-savings.jpg"
    }
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-600 mb-2">
              Why AI Agents?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Smart. Fast. Scalable.
            </h2>
            <p className="text-base text-gray-600">
              You don't have to choose between time, cost, and quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`bg-white rounded-lg border transition-all duration-300 overflow-hidden ${
                    selectedIndex === index
                      ? 'border-blue-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <button
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      {selectedIndex === index && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: selectedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col lg:ml-8">
              <motion.div
                className="bg-gray-50 rounded-lg overflow-hidden flex-1 mb-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ minHeight: '400px', backgroundColor: '#F9FAFB' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    {features[selectedIndex].imageUrl ? (
                      <div className="w-full h-full relative overflow-hidden">
                        <img 
                          src={features[selectedIndex].imageUrl} 
                          alt={features[selectedIndex].title}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            const parent = target.parentElement;
                            if (parent) {
                              parent.style.display = 'none';
                              const fallback = parent.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center" style={{display: features[selectedIndex].imageUrl ? 'none' : 'flex', backgroundColor: '#F9FAFB'}}>
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm-2 9a4 4 0 00-4-4v4h4zm6-1a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium">{features[selectedIndex].title}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              <button 
                onClick={() => {
                  const liveVoiceSection = document.getElementById('live-voice-agents');
                  if (liveVoiceSection) {
                    liveVoiceSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Try This Agent Live
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}