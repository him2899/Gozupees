import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, TrendingUp, Building, Clock, PieChart, ArrowUpRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  companyName: string;
  companyType: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  readTime?: string;
  primaryMetric?: string;
  primaryMetricLabel?: string;
  secondaryMetric?: string;
  secondaryMetricLabel?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  const industries = [
    'All Industries',
    'Financial Services',
    'Healthcare',
    'Technology',
    'E-commerce',
    'Retail',
    'B2B SaaS'
  ];

  const filteredCaseStudies = caseStudies?.filter(study => {
    const searchMatch = searchQuery === '' || 
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const industryMatch = selectedIndustry === 'All Industries' || 
      study.industry === selectedIndustry || 
      study.category === selectedIndustry;
    
    return searchMatch && industryMatch;
  }) || [];

  const featuredCaseStudy = caseStudies?.find(study => study.featured) || caseStudies?.[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>AI Voice Agent Case Studies | Real-World Results | GoZupees</title>
        <meta name="description" content="Explore real-world case studies of enterprise companies achieving exceptional results with GoZupees AI voice agents and communication automation." />
      </Head>
      
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Explore how leading companies are transforming their operations with GoZupes AI agents.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-grow flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="search"
                  placeholder="Search case studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Search
              </button>
            </form>

            <div className="flex gap-2 items-center">
              <Filter className="text-gray-400 h-5 w-5" />
              <div className="overflow-x-auto py-2">
                <div className="flex space-x-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        selectedIndustry === industry
                          ? 'bg-cyan-500 text-gray-900'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                      onClick={() => setSelectedIndustry(industry)}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Case Study */}
          {featuredCaseStudy && (
            <div className="mt-16 mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Case Study</h2>
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-xl overflow-hidden border border-white/10">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto md:aspect-auto">
                    <Image
                      src={featuredCaseStudy.imageUrl || "https://images.unsplash.com/photo-1661956602868-6ae368943878?w=800&h=600&fit=crop&auto=format"}
                      alt={featuredCaseStudy.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <div className="inline-block px-3 py-1 bg-cyan-500 text-gray-900 rounded-full text-sm font-medium mb-4">
                      {featuredCaseStudy.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{featuredCaseStudy.title}</h3>
                    <p className="text-gray-300 mb-6">
                      {featuredCaseStudy.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {featuredCaseStudy.primaryMetric && (
                        <div className="bg-white/10 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <TrendingUp className="h-5 w-5 text-cyan-400 mr-2" />
                            <span className="font-semibold">Results</span>
                          </div>
                          <div className="text-xl font-bold">{featuredCaseStudy.primaryMetric}</div>
                          <div className="text-sm text-gray-400">{featuredCaseStudy.primaryMetricLabel}</div>
                        </div>
                      )}
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Building className="h-5 w-5 text-cyan-400 mr-2" />
                          <span className="font-semibold">Company</span>
                        </div>
                        <div className="text-xl font-bold">{featuredCaseStudy.companyType}</div>
                        <div className="text-sm text-gray-400">{featuredCaseStudy.industry}</div>
                      </div>
                    </div>
                    
                    <Link href={`/case-studies/${featuredCaseStudy.slug}`}>
                      <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
                        Read Full Case Study
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCaseStudies.map((study) => (
              <div key={study.id} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg overflow-hidden text-white">
                <div className="relative h-48 mb-4">
                  <Image
                    src={study.thumbnailUrl || study.imageUrl || "https://images.unsplash.com/photo-1661956602868-6ae368943878?w=400&h=300&fit=crop&auto=format"}
                    alt={study.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="px-3 py-1 bg-cyan-500 text-gray-900 rounded-full text-sm font-medium">
                      {study.category}
                    </div>
                  </div>
                  {study.readTime && (
                    <div className="absolute top-3 right-3">
                      <div className="px-3 py-1 bg-black/50 text-white rounded-full text-sm font-medium flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {study.readTime}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{study.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{study.companyType}</span>
                    <span>{study.industry}</span>
                  </div>
                  
                  {(study.primaryMetric || study.secondaryMetric) && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {study.primaryMetric && (
                        <div className="bg-white/10 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-cyan-400">{study.primaryMetric}</div>
                          <div className="text-xs text-gray-400">{study.primaryMetricLabel}</div>
                        </div>
                      )}
                      {study.secondaryMetric && (
                        <div className="bg-white/10 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-cyan-400">{study.secondaryMetric}</div>
                          <div className="text-xs text-gray-400">{study.secondaryMetricLabel}</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Link href={`/case-studies/${study.slug}`}>
                    <button className="w-full px-4 py-2 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-lg font-medium transition-colors flex items-center justify-center">
                      Read Case Study
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12">
              <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No case studies found</h3>
              <p className="text-gray-400">
                Try adjusting your search query or filters to find more case studies.
              </p>
            </div>
          )}
          
          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg font-medium transition-colors">
              Load More Case Studies
            </button>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
                CUSTOM SOLUTIONS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Create Your Own Success Story?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our team of marketing data scientists and AI experts can help you achieve similar results.
                Schedule a consultation to discuss your specific challenges.
              </p>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // For now, return mock data - replace with actual database call later
    const mockCaseStudies = [
      {
        id: 1,
        slug: 'alternative-investing-ai-customer-service',
        title: 'Alternative Investing Company - AI Customer Service Platform',
        description: 'Transforming customer service for complex alternative investment products through intelligent voice agents that handle inquiries, account management, and regulatory compliance',
        industry: 'Financial Services',
        category: 'Customer Service',
        companyName: 'Alternative Investing Company',
        companyType: 'Private Investment Firm',
        readTime: '5 min read',
        primaryMetric: '385%',
        primaryMetricLabel: 'ROI',
        secondaryMetric: '42%',
        secondaryMetricLabel: 'Response Rate Increase',
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        slug: 'us-pension-fund-ai-lead-recovery',
        title: 'US Pension Fund Provider - AI-Powered Lead Recovery & Personalization Platform',
        description: 'Transforming 50,000 unengaged prospects into qualified opportunities through intelligent social data analysis and personalized multi-channel outreach',
        industry: 'Financial Services',
        category: 'Lead Recovery',
        companyName: 'Major US Pension Fund Provider',
        companyType: 'Pension Fund Management',
        readTime: '6 min read',
        primaryMetric: '385%',
        primaryMetricLabel: 'ROI',
        secondaryMetric: '42%',
        secondaryMetricLabel: 'Response Rate Increase',
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        slug: 'b2b-generator-ai-trade-show',
        title: 'B2B Generator Company - AI Trade Show Follow-Up Platform',
        description: 'Comprehensive AI automation platform transforming trade show lead management and follow-up processes for maximum conversion rates',
        industry: 'B2B SaaS',
        category: 'Lead Management',
        companyName: 'PowerGen Solutions',
        companyType: 'B2B Generator Company',
        readTime: '7 min read',
        primaryMetric: '340%',
        primaryMetricLabel: 'Lead Conversion',
        secondaryMetric: '89%',
        secondaryMetricLabel: 'Follow-up Rate',
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return {
      props: {
        caseStudies: mockCaseStudies,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return {
      props: {
        caseStudies: [],
      },
      revalidate: 60,
    };
  }
};