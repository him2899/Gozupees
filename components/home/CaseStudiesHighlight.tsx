'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  metrics: string;
  image: string;
  color: string;
}

export default function CaseStudiesHighlight() {
  const caseStudies: CaseStudy[] = [
    {
      id: "financial-ai",
      title: "AI-Powered Wealth Management",
      industry: "Financial Services",
      metrics: "320% increase in client acquisition",
      image: "bg-gradient-to-br from-blue-500 to-indigo-700",
      color: "from-blue-500/20 to-indigo-700/20"
    },
    {
      id: "retail-analytics",
      title: "Predictive Retail Analytics",
      industry: "Retail",
      metrics: "47% reduction in inventory costs",
      image: "bg-gradient-to-br from-green-500 to-emerald-700",
      color: "from-green-500/20 to-emerald-700/20"
    },
    {
      id: "healthcare-ml",
      title: "ML-Driven Patient Outcomes",
      industry: "Healthcare",
      metrics: "85% improvement in diagnostic accuracy",
      image: "bg-gradient-to-br from-purple-500 to-violet-700",
      color: "from-purple-500/20 to-violet-700/20"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformational Results</h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto font-medium">
            See how leading organizations are leveraging our AI expertise to achieve breakthrough results
          </p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div key={study.id} variants={item}>
              <Link href={`/case-studies/${study.id}`}>
                <div className="group h-full overflow-hidden rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 bg-white">
                  <div className={`h-40 ${study.image} flex items-center justify-center`}>
                    <div className={`w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold`}>
                      {study.industry.substring(0, 1)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-700 font-medium mb-2">{study.industry}</div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors text-gray-900">{study.title}</h3>
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full text-sm font-medium text-gray-900 inline-block mb-4">
                      {study.metrics}
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      <span>Read case study</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link href="/case-studies" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
            View all case studies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}