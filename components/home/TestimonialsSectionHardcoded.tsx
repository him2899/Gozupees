'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  clientName: string;
  company: string;
  position: string;
  testimonial: string;
  rating: number;
  industry: string;
  useCase: string;
  avatarUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

// Hardcoded testimonials for performance
const hardcodedTestimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Sarah Mitchell",
    company: "TechFlow Solutions",
    position: "VP of Sales",
    testimonial: "Our GoZupees sales agent increased our lead qualification rate by 300%. It handles initial prospect calls flawlessly and books qualified meetings automatically. Game-changer for our sales team.",
    rating: 5,
    industry: "B2B SaaS",
    useCase: "Inbound Sales Qualification",
    featured: true,
    order: 1,
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: 2,
    clientName: "Marcus Rodriguez",
    company: "Premier Real Estate Group",
    position: "Managing Broker",
    testimonial: "The AI agent handles property inquiries 24/7, scheduling showings and capturing lead details. Our response time went from hours to seconds, and we're closing 40% more deals.",
    rating: 5,
    industry: "Real Estate",
    useCase: "Lead Qualification",
    featured: true,
    order: 2,
    createdAt: '2025-01-20T14:15:00Z'
  },
  {
    id: 3,
    clientName: "Dr. Jennifer Chen",
    company: "Wellness First Clinic",
    position: "Practice Manager",
    testimonial: "GoZupees appointment booking agent eliminated phone tag completely. Patients love the instant scheduling, and we reduced no-shows by 60% with automated reminders.",
    rating: 5,
    industry: "Healthcare",
    useCase: "Appointment Scheduling",
    featured: true,
    order: 3,
    createdAt: '2025-01-22T09:45:00Z'
  },
  {
    id: 4,
    clientName: "David Kumar",
    company: "Elite Fitness Centers",
    position: "Operations Director",
    testimonial: "The AI handles membership inquiries, class bookings, and trial scheduling perfectly. Our front desk staff can focus on member experience while the agent manages all incoming calls efficiently.",
    rating: 5,
    industry: "Fitness",
    useCase: "Membership Sales",
    featured: true,
    order: 4,
    createdAt: '2025-01-25T16:20:00Z'
  }
];

export default function TestimonialsSectionHardcoded() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? 300 : 400; // Mobile vs desktop card width
      const scrollAmount = cardWidth * 1; // Scroll one card at a time
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      
      return () => scrollElement.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 tracking-wider uppercase">
              Testimonials
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say About GoZupees AI Agents
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real results from businesses that transformed their operations with our AI agents
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                canScrollLeft 
                  ? 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                canScrollRight 
                  ? 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonials Container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 sm:space-x-6 px-4 sm:px-12 py-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollSnapType: 'x mandatory'
              }}
            >
              {hardcodedTestimonials.slice(0, 6).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="flex-shrink-0 w-[280px] sm:w-96 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                  style={{ scrollSnapAlign: 'start' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Stars */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.testimonial}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.clientName.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.clientName}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.position}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {/* Use Case Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {testimonial.useCase}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}