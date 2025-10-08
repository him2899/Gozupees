import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { motion } from 'framer-motion';
import { ArrowUp, TrendingUp, Clock, Shield, Users, DollarSign, Target, CheckCircle2, Quote, TrendingDown, Cpu, Settings } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { CaseStudy } from '../../shared/schema';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  // Alternative investing case study content (existing dynamic logic)
  const features = Array.isArray(caseStudy.features) ? caseStudy.features : [];
  const capabilities = Array.isArray(caseStudy.capabilities) ? caseStudy.capabilities : [];
  const conversationExamples = Array.isArray(caseStudy.conversationExamples) ? caseStudy.conversationExamples : [];
  const metrics = (typeof caseStudy.metrics === 'object' && caseStudy.metrics !== null) ? caseStudy.metrics : {};

  return (
    <>
      <Head>
        <title>{caseStudy.metaTitle || `${caseStudy.title} | GoZupes`}</title>
        <meta name="description" content={caseStudy.metaDescription || caseStudy.description} />
        <meta property="og:title" content={caseStudy.metaTitle || caseStudy.title} />
        <meta property="og:description" content={caseStudy.metaDescription || caseStudy.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://gozupes.com/case-studies/${caseStudy.slug}`} />
        {caseStudy.imageUrl && <meta property="og:image" content={caseStudy.imageUrl} />}
        <link rel="canonical" href={`https://gozupes.com/case-studies/${caseStudy.slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-24 pb-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`,
          }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-8 shadow-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  {caseStudy.industry || 'Case Study'}
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                  {caseStudy.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {caseStudy.description}
                </p>
                
                {/* Key Metrics */}
                {metrics && Object.keys(metrics).length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {Object.entries(metrics).map(([key, value], index) => (
                      <div key={key} className="text-center">
                        <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                          index === 0 ? 'text-emerald-400' :
                          index === 1 ? 'text-blue-400' :
                          index === 2 ? 'text-purple-400' :
                          'text-orange-400'
                        }`}>
                          {typeof value === 'object' && value !== null ? 
                            ((value as any).improvement || (value as any).after || JSON.stringify(value)) : 
                            value}
                        </div>
                        <div className="text-gray-300 text-sm md:text-base capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Challenge Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="py-16 px-4 bg-slate-800/20"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border border-red-400/30 rounded-full text-red-300 text-sm font-semibold mb-6">
                <TrendingDown className="w-4 h-4 mr-2" />
                Challenge
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {caseStudy.challenge || 'The Challenge'}
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {(caseStudy as any).challengeDescription || caseStudy.challenge}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Solution Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="py-16 px-4 relative"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
                <Cpu className="w-4 h-4 mr-2" />
                Solution
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {caseStudy.solution || 'Our Solution'}
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {(caseStudy as any).solutionDescription || caseStudy.solution}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Results Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="py-16 px-4 relative"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Results
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {caseStudy.results || 'The Results'}
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {(caseStudy as any).resultsDescription || caseStudy.results}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="py-16 px-4 relative"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready for Similar Results?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform your business with AI-powered solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Start Your Transformation
                </a>
                <a
                  href="/demo"
                  className="inline-flex items-center px-8 py-4 bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 hover:bg-slate-600 transition-all duration-300"
                >
                  Book a Live Demo
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return empty paths to avoid build-time data fetching issues
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/case-studies/${slug}`);
    
    if (!response.ok) {
      return {
        notFound: true
      };
    }

    const caseStudy = await response.json();

    return {
      props: {
        caseStudy
      },
      revalidate: 3600 // 1 hour
    };
  } catch (error) {
    console.error('Error fetching case study:', error);
    return {
      notFound: true
    };
  }
};