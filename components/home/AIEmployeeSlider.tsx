'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, Users, HeadphonesIcon } from 'lucide-react';

interface AIEmployee {
  id: string;
  name: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  avatar: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  actionButtonText: string;
  actionButtonVariant: 'primary' | 'secondary' | 'accent';
}

const aiEmployees: AIEmployee[] = [
  {
    id: 'marketing',
    name: 'Maya',
    role: 'Marketing AI Agent',
    shortDescription: 'Content creation & campaign optimization',
    fullDescription: 'Maya specializes in creating compelling marketing content, optimizing campaigns across multiple channels, and analyzing performance metrics to drive better ROI. She can generate blog posts, social media content, email campaigns, and provide strategic marketing insights 24/7.',
    avatar: '🎯',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-purple-600',
    icon: <MessageSquare className="w-6 h-6" />,
    actionButtonText: 'Start Creating Content',
    actionButtonVariant: 'primary'
  },
  {
    id: 'sales',
    name: 'Sam',
    role: 'Sales AI Agent',
    shortDescription: 'Lead qualification & follow-up automation',
    fullDescription: 'Sam handles lead qualification, personalized outreach, and follow-up sequences. He can engage with prospects, qualify leads based on your criteria, schedule meetings, and maintain consistent communication throughout the sales funnel.',
    avatar: '💼',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-600',
    icon: <Users className="w-6 h-6" />,
    actionButtonText: 'Qualify Leads Now',
    actionButtonVariant: 'secondary'
  },
  {
    id: 'support',
    name: 'Sophie',
    role: 'Customer Support AI Agent',
    shortDescription: '24/7 customer assistance & issue resolution',
    fullDescription: 'Sophie provides round-the-clock customer support, handling inquiries, troubleshooting issues, and escalating complex cases to human agents when needed. She can access customer data, process returns, and maintain consistent brand voice across all interactions.',
    avatar: '🛟',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-teal-600',
    icon: <HeadphonesIcon className="w-6 h-6" />,
    actionButtonText: 'Test Support Chat',
    actionButtonVariant: 'accent'
  }
];

export default function AIEmployeeSlider() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, []);

  const scrollToAgent = (agentId: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const agentElement = container.querySelector(`[data-agent-id="${agentId}"]`);
    if (agentElement) {
      const containerRect = container.getBoundingClientRect();
      const agentRect = agentElement.getBoundingClientRect();
      const scrollLeft = agentRect.left - containerRect.left + container.scrollLeft - (containerRect.width - agentRect.width) / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleAgentClick = (agentId: string) => {
    if (selectedAgent === agentId) {
      setSelectedAgent(null);
    } else {
      setSelectedAgent(agentId);
      scrollToAgent(agentId);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getButtonStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25';
      case 'accent':
        return 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25';
      default:
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Meet Your AI Employee Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each AI agent is specialized for specific business functions and ready to work around the clock
          </p>
        </motion.div>

        <div className="relative">
          {/* Scroll Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full border border-gray-200 transition-all duration-300 ${
              canScrollLeft ? 'opacity-100 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full border border-gray-200 transition-all duration-300 ${
              canScrollRight ? 'opacity-100 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-[5] pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-[5] pointer-events-none"></div>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-16"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {aiEmployees.map((agent, index) => (
              <motion.div
                key={agent.id}
                data-agent-id={agent.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex-shrink-0 transition-all duration-500 cursor-pointer ${
                  selectedAgent === agent.id ? 'w-96' : 'w-80'
                }`}
                style={{ scrollSnapAlign: 'center' }}
                onClick={() => handleAgentClick(agent.id)}
              >
                <div className={`bg-gradient-to-br ${agent.gradientFrom} ${agent.gradientTo} rounded-2xl p-1 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <div className="bg-white rounded-xl p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{agent.avatar}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-600">{agent.role}</p>
                      </div>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {selectedAgent === agent.id ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {agent.fullDescription}
                          </p>
                          <button
                            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${getButtonStyles(agent.actionButtonVariant)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Action button functionality will be implemented later
                              console.log(`Action triggered for ${agent.name}`);
                            }}
                          >
                            {agent.icon}
                            <span className="ml-2">{agent.actionButtonText}</span>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-700 mb-4">
                            {agent.shortDescription}
                          </p>
                          <div className="flex items-center text-blue-600">
                            {agent.icon}
                            <span className="ml-2 text-sm font-medium">Click to explore</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}