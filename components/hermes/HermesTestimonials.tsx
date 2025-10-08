'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import GradientHeading from '../ui/GradientHeading';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
  stars: number;
  delay: number;
}

const Testimonial = ({ quote, author, position, company, image, stars, delay }: TestimonialProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
          {/* We would use real avatar images in production */}
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600"></div>
        </div>
        <div>
          <GradientHeading 
            level={3} 
            highlightWords={author}
            fullGradient={true}
            className="font-medium text-base"
          >
            {author}
          </GradientHeading>
          <div className="text-sm text-gray-600">{position}, {company}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HermesTestimonials() {
  const testimonials = [
    {
      quote: "Hermes has transformed how our sales team operates. We've seen a 42% increase in qualified leads and much better conversion rates across the board.",
      author: "Sarah Johnson",
      position: "VP of Sales",
      company: "TechGrowth Inc.",
      image: "/avatars/sarah.jpg",
      stars: 5,
      delay: 0.1
    },
    {
      quote: "The insights provided by Hermes are incredible. Our sales cycle shortened by 3 weeks on average, and our team can focus on the right opportunities.",
      author: "Michael Chen",
      position: "Sales Director",
      company: "Innovate Solutions",
      image: "/avatars/michael.jpg",
      stars: 5,
      delay: 0.2
    },
    {
      quote: "As a sales manager, I now have complete visibility into my team's pipeline. The forecasting accuracy has improved dramatically.",
      author: "Jessica Reynolds",
      position: "Regional Sales Manager",
      company: "Global Systems",
      image: "/avatars/jessica.jpg",
      stars: 4,
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          quote={testimonial.quote}
          author={testimonial.author}
          position={testimonial.position}
          company={testimonial.company}
          image={testimonial.image}
          stars={testimonial.stars}
          delay={testimonial.delay}
        />
      ))}
    </div>
  );
}