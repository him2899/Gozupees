'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Scale, 
  TrendingUp, 
  ShoppingCart, 
  Stethoscope, 
  Home, 
  Users, 
  GraduationCap, 
  CreditCard, 
  Hotel, 
  Truck,
  ChevronLeft,
  ChevronRight,
  Laptop,
  ShoppingBag,
  HeartPulse,
  BookOpenCheck,
  ShieldCheck,
  Briefcase,
  Dumbbell,
  Car,
  Tag,
  Hammer,
  PhoneCall,
  Sparkles,
  CalendarClock,
  Repeat
} from 'lucide-react';

const useCases = [
  {
    id: 1,
    industry: 'Law Firms',
    title: 'Legal Client Reception',
    description: 'Handle client calls and consultations efficiently with AI-powered receptionists.',
    icon: Scale,
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 2,
    industry: 'Sales & Marketing',
    title: 'Lead Qualification',
    description: 'Automate lead qualification and follow-ups, ensuring no client is missed.',
    icon: TrendingUp,
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    id: 3,
    industry: 'E-commerce',
    title: 'Order Support',
    description: 'Offer instant order updates and resolve delivery questions 24/7.',
    icon: ShoppingCart,
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    id: 4,
    industry: 'Healthcare Clinics',
    title: 'Appointment Management',
    description: 'Book, confirm, or reschedule appointments without overloading staff.',
    icon: Stethoscope,
    gradient: 'from-red-600 to-pink-600'
  },
  {
    id: 5,
    industry: 'Real Estate',
    title: 'Property Inquiries',
    description: 'Answer listing queries and pre-qualify buyer intent instantly.',
    icon: Home,
    gradient: 'from-orange-600 to-yellow-600'
  },
  {
    id: 6,
    industry: 'Recruitment',
    title: 'Candidate Screening',
    description: 'Screen applicants and collect key data before forwarding to HR.',
    icon: Users,
    gradient: 'from-indigo-600 to-purple-600'
  },
  {
    id: 7,
    industry: 'Education',
    title: 'Student Services',
    description: 'Manage course sign-ups, FAQs, and counseling appointment bookings.',
    icon: GraduationCap,
    gradient: 'from-teal-600 to-green-600'
  },
  {
    id: 8,
    industry: 'Banking',
    title: 'Mortgage Concierge',
    description: 'Comprehensive mortgage support from pre-qualification to closing assistance.',
    icon: CreditCard,
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    id: 9,
    industry: 'Banking',
    title: 'Business Banking Butler',
    description: 'Dedicated support for business clients with account and transaction assistance.',
    icon: Briefcase,
    gradient: 'from-blue-600 to-green-600'
  },
  {
    id: 10,
    industry: 'Banking',
    title: 'Fraud Prevention Specialist',
    description: 'Proactive fraud detection and customer verification for account security.',
    icon: ShieldCheck,
    gradient: 'from-red-600 to-orange-600'
  },
  {
    id: 9,
    industry: 'Hospitality',
    title: 'Guest Services',
    description: 'Confirm bookings, respond to guest queries, and upsell services.',
    icon: Hotel,
    gradient: 'from-pink-600 to-rose-600'
  },
  {
    id: 10,
    industry: 'Logistics',
    title: 'Delivery Management',
    description: 'Proactively notify customers of delays and gather delivery instructions.',
    icon: Truck,
    gradient: 'from-slate-600 to-gray-600'
  }
];

export default function IndustryUseCaseCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToNext = () => {
    if (scrollRef.current) {
      const cardWidth = 320; // card width + gap
      const nextIndex = (currentIndex + 1) % useCases.length;
      setCurrentIndex(nextIndex);
      scrollRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPrev = () => {
    if (scrollRef.current) {
      const cardWidth = 320;
      const prevIndex = currentIndex === 0 ? useCases.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollRef.current.scrollTo({
        left: prevIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      scrollToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <section className="bg-gray-900 pt-8 pb-20 md:pt-12 md:pb-28 overflow-hidden flex items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
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
                Voice Agents
              </span>
              {" "}
              <span className="text-white">Across Industries</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              From healthcare to logistics, see how intelligent voice agents transform customer interactions across every sector
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
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Triple the array for seamless infinite scrolling */}
              {[...useCases, ...useCases, ...useCases].map((useCase, index) => {
                const Icon = useCase.icon;
                const isVisible = index >= currentIndex && index < currentIndex + 4;
                
                return (
                  <motion.div
                    key={`${useCase.id}-${index}`}
                    className="flex-none w-80 bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0.7, 
                      scale: isVisible ? 1 : 0.95,
                      y: isVisible ? 0 : 10
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -8,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.6, delay: (index % 10) * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icon with parallax effect */}
                      <motion.div 
                        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${useCase.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Industry Tag */}
                        <motion.div 
                          className="inline-block mb-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${useCase.gradient} text-white rounded-full shadow-md`}>
                            {useCase.industry}
                          </span>
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                          {useCase.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {useCase.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Fade edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-10"></div>
            
            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: index * 320,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex % useCases.length
                      ? 'bg-purple-400 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => {
                const event = new CustomEvent('openLeadForm', {
                  detail: { 
                    source: 'Industry Use Case Carousel',
                    industry: 'Multi-Industry'
                  }
                });
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Explore Voice Agents for Your Industry</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}