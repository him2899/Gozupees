'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, User } from 'lucide-react';

export default function InsightsSection() {
  const insights = [
    {
      id: "ai-transformation",
      title: "The Executive's Guide to AI Transformation",
      excerpt: "How C-suite leaders can effectively drive organizational change through strategic AI implementation.",
      author: "Dr. Emily Chen",
      readTime: "8 min read",
      category: "Strategy",
      color: "bg-blue-500"
    },
    {
      id: "predictive-analytics",
      title: "Predictive Analytics: Beyond the Hype",
      excerpt: "Practical applications of predictive modeling that deliver measurable business value.",
      author: "Mark Williams",
      readTime: "6 min read",
      category: "Technology",
      color: "bg-purple-500"
    },
    {
      id: "ai-ethics",
      title: "Ethical AI Implementation Framework",
      excerpt: "Building responsible AI systems that balance innovation with ethical considerations.",
      author: "Sarah Johnson",
      readTime: "7 min read",
      category: "Ethics",
      color: "bg-green-500"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-gradient-to-b from-indigo-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Latest AI Insights & Thought Leadership
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Expert analysis and forward-thinking perspectives on the rapidly evolving AI landscape
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {insights.map((insight, index) => (
            <motion.div 
              key={insight.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group"
            >
              <Link href={`/blog/${insight.id}`} className="block h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <span className={`${insight.color} text-white text-xs font-semibold py-1 px-2 rounded`}>
                        {insight.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-gray-900">
                      {insight.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6">
                      {insight.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-700 mb-4">
                      <div className="flex items-center mr-4">
                        <User className="w-4 h-4 mr-1" />
                        <span>{insight.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{insight.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 mt-auto">
                    <div className="flex items-center text-primary font-medium">
                      <span>Read article</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/blog" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
            View all insights
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}