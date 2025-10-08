'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}

export default function TestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      quote: "The AI strategy framework they developed enabled us to increase customer engagement by 45% while reducing operational costs by 30%.",
      author: "Sarah Johnson",
      title: "Chief Marketing Officer",
      company: "Global Retail Solutions"
    },
    {
      quote: "Their predictive analytics solution transformed our approach to market forecasting, giving us a significant competitive advantage.",
      author: "Michael Chen",
      title: "VP of Digital Transformation",
      company: "Finance International"
    },
    {
      quote: "The ROI on our AI investments has exceeded expectations, delivering 3x the value we projected in half the time.",
      author: "Elizabeth Warren",
      title: "Chief Innovation Officer",
      company: "Healthcare Partners"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-16">
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary/5 rounded-full filter blur-3xl"></div>
      
      <div className="relative z-10">
        <Quote className="w-16 h-16 text-primary/20 mx-auto mb-8" />
        
        <div className="h-64 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <blockquote className="text-xl md:text-2xl font-light text-gray-800 italic max-w-4xl mx-auto mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold text-lg text-gray-900">{testimonials[currentIndex].author}</p>
                <p className="text-gray-700">{testimonials[currentIndex].title}</p>
                <p className="text-primary font-medium">{testimonials[currentIndex].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button 
            onClick={handlePrevious}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
          <button 
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}