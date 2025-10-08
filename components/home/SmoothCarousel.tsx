'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronLeft,
  ChevronRight,
  Laptop,
  ShoppingBag,
  HeartPulse,
  BookOpenCheck,
  Home,
  Hotel,
  ShieldCheck,
  CreditCard,
  Briefcase,
  Dumbbell,
  Scale,
  Car,
  Tag,
  Hammer,
  PhoneCall,
  Truck,
  Sparkles,
  CalendarClock,
  Users,
  Repeat
} from 'lucide-react';

// Icon mapping for the lucide icons
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Laptop,
  ShoppingBag,
  HeartPulse,
  BookOpenCheck,
  Home,
  Hotel,
  ShieldCheck,
  CreditCard,
  Briefcase,
  Dumbbell,
  Scale,
  Car,
  Tag,
  Hammer,
  PhoneCall,
  Truck,
  Sparkles,
  CalendarClock,
  Users,
  Repeat
};

// Tab colors
const tabColors: { [key: string]: string } = {
  Sales: 'from-blue-600 to-cyan-600',
  Marketing: 'from-purple-600 to-pink-600',
  CX: 'from-green-600 to-emerald-600'
};

// Mini-tag colors
const miniTagColors: { [key: string]: string } = {
  Chatbot: 'bg-blue-100 text-blue-800',
  Voice: 'bg-green-100 text-green-800',
  Tool: 'bg-purple-100 text-purple-800',
  Dashboard: 'bg-orange-100 text-orange-800'
};

export default function SmoothCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Fetch AI agent use cases from database
  const { data: useCases = [], isLoading } = useQuery({
    queryKey: ['ai-agent-use-cases'],
    queryFn: () => fetch('/api/ai-agent-use-cases').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || useCases.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % useCases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, useCases.length]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  if (isLoading) {
    return (
      <section className="bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading AI Agent Use Cases...</div>
        </div>
      </section>
    );
  }

  if (useCases.length === 0) return null;

  return (
    <section className="bg-gray-900 py-8 md:py-12" style={{ minHeight: '400px' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top CTA */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 mb-8 border border-blue-500/30">
              <p className="text-gray-300 text-lg mb-4">
                Don't see your business or use case listed here? We love custom builds.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Talk to our team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Section Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">AI Agents </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Across Industries
              </span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              From healthcare to logistics, see how intelligent AI agents transform customer interactions across every sector
            </p>
          </motion.div>

          {/* Smooth Carousel */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div className="flex">
              {/* Show 1 card on mobile, 2 on tablet, 4 on desktop */}
              {Array.from({ length: 4 }).map((_, displayIndex) => {
                const actualIndex = (currentIndex + displayIndex) % useCases.length;
                const useCase = useCases[actualIndex];
                
                // Safety check to prevent undefined access
                if (!useCase) return null;
                
                const IconComponent = iconMap[useCase.icon] || Briefcase;
                const gradient = tabColors[useCase.tab] || 'from-gray-600 to-gray-800';

                return (
                  <motion.div
                    key={`${useCase.id}-${displayIndex}`}
                    className={`px-3 flex-shrink-0 w-full md:w-1/2 lg:w-1/4 ${
                      displayIndex >= 1 ? 'hidden md:block' : ''
                    } ${
                      displayIndex >= 2 ? 'hidden lg:block' : ''
                    }`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 h-full">
                      {/* Icon and Tab */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white`}>
                          {useCase.tab}
                        </span>
                      </div>

                      {/* Industry Title */}
                      <h3 className="font-bold text-lg text-gray-900 mb-3">
                        {useCase.industry}
                      </h3>

                      {/* Use Case Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {useCase.useCase}
                      </p>

                      {/* Mini Tags */}
                      <div className="flex flex-wrap gap-2">
                        {useCase.miniTags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-1 text-xs font-medium rounded-md ${miniTagColors[tag] || 'bg-gray-100 text-gray-800'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {useCases.slice(0, Math.min(8, useCases.length)).map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex % Math.min(8, useCases.length)
                      ? 'bg-white'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-6 border border-purple-500/30">
              <p className="text-gray-300 text-lg mb-4">
                Don't see your business or use case listed here? We love custom builds.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Talk to our team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}