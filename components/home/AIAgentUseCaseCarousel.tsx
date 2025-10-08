'use client';

import React, { useEffect, useRef, useState } from 'react';
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

export default function AIAgentUseCaseCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  // Fetch AI agent use cases from database
  const { data: useCases = [], isLoading, error } = useQuery({
    queryKey: ['ai-agent-use-cases'],
    queryFn: () => fetch('/api/ai-agent-use-cases').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Auto-scroll functionality with smooth infinite loop
  useEffect(() => {
    if (!isAutoScrolling || useCases.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % useCases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, useCases.length]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const scrollToPrev = () => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Width of one card plus gap
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Width of one card plus gap
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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

  return (
    <section className="bg-gray-900 py-8 md:py-12"  style={{ minHeight: '400px' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Agents
              </span>
              {" "}
              <span className="text-white">Across Industries</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              From healthcare to logistics, see how intelligent AI agents transform customer interactions across every sector
            </p>
          </motion.div>



          {/* Enhanced Carousel with Navigation */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Navigation Arrows */}
            <button
              onClick={scrollToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={scrollToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrolling Container */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 px-4 sm:px-0 w-full sm:w-auto"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollSnapType: 'x mandatory',
                maxWidth: '100vw'
              }}
            >
              {/* Render use cases */}
              {useCases.map((useCase: any, index: number) => {
                const IconComponent = iconMap[useCase.icon] || Briefcase;
                const gradient = tabColors[useCase.tab] || 'from-gray-600 to-gray-800';
                
                return (
                  <motion.div
                    key={useCase.id}
                    className="min-w-[calc(100vw-2rem)] sm:min-w-[300px] w-[calc(100vw-2rem)] sm:w-[300px] bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
                    style={{ 
                      scrollSnapAlign: 'start',
                      flexShrink: 0
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Icon and Tab */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-xs font-semibold rounded-full`}>
                        {useCase.tab}
                      </div>
                    </div>

                    {/* Industry Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}