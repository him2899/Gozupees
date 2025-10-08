'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, BarChart2 } from 'lucide-react';
import Image from 'next/image';

export default function HermesResults() {
  const caseStudies = [
    {
      company: "Pipeline Pro",
      industry: "SaaS",
      challenge: "Low conversion rate from trial to paid customers",
      solution: "Implemented Hermes' lead scoring and engagement tracking",
      results: [
        "42% increase in trial-to-paid conversion",
        "25% reduction in sales cycle length",
        "68% improvement in lead qualification accuracy"
      ],
      testimonial: "Hermes helped us identify high-intent users early in the trial period, allowing our sales team to focus their efforts more effectively.",
      logo: "/images/pipeline-pro-logo.svg",
      delay: 0.1
    },
    {
      company: "TechGrowth Inc",
      industry: "IT Services",
      challenge: "Difficulty scaling outbound sales efforts effectively",
      solution: "Deployed Hermes' sales analytics and performance tracking tools",
      results: [
        "3.2x increase in outbound meeting bookings",
        "47% higher sales rep productivity",
        "31% growth in average deal size"
      ],
      testimonial: "The insights from Hermes transformed how we approach our sales strategy. We're now able to identify exactly what works and scale those tactics across the team.",
      logo: "/images/techgrowth-logo.svg",
      delay: 0.3
    },
    {
      company: "MarketMasters",
      industry: "Marketing Agency",
      challenge: "Inconsistent sales performance across team members",
      solution: "Used Hermes' coaching tools and performance analytics",
      results: [
        "36% increase in team-wide conversion rates",
        "52% improvement in underperforming reps",
        "28% higher customer retention rates"
      ],
      testimonial: "Hermes has been instrumental in helping us identify coaching opportunities and standardize our best practices. The difference in our sales performance has been remarkable.",
      logo: "/images/marketmasters-logo.svg",
      delay: 0.5
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-4 px-4 py-1 border-blue-200 bg-blue-50 text-blue-600 text-sm rounded-full">
          RESULTS WE'VE DELIVERED
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
          See How We Revived Pipeline Performance
        </h2>
        <p className="text-xl text-gray-600">
          Real case studies from companies that transformed their sales results with Hermes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: study.delay }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="h-12 mb-4 flex items-center">
                {/* This would normally be an actual logo but we're using placeholder text */}
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-800 font-bold text-xs mr-3">
                  {study.company.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{study.company}</h3>
                  <p className="text-sm text-gray-500">{study.industry}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">CHALLENGE</div>
                <p className="text-gray-800">{study.challenge}</p>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">SOLUTION</div>
                <p className="text-gray-800">{study.solution}</p>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">RESULTS</div>
                <ul className="space-y-2">
                  {study.results.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <blockquote className="italic text-gray-600 text-sm">
                  "{study.testimonial}"
                </blockquote>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
              >
                View Full Case Study 
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="/case-studies" 
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md px-6 py-3 shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          Browse All Case Studies
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
}