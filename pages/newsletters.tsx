import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ChevronRight, Clock, Users, TrendingUp, Target, Briefcase, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function Newsletters() {

  return (
    <>
      <Head>
        <title>GoZupees Newsletters - Daily AI Insights & Revenue Intelligence | GoZupees</title>
        <meta 
          name="description" 
          content="Get daily AI RevOps tips, weekly revenue leadership insights, and monthly strategic intelligence. Join 10,000+ professionals optimizing revenue operations with AI." 
        />
        <meta name="keywords" content="AI RevOps, revenue operations, daily tips, weekly intelligence, monthly digest, GoZupees newsletters" />
        <meta property="og:title" content="GoZupees Newsletters - Daily AI Insights & Revenue Intelligence" />
        <meta property="og:description" content="Daily AI RevOps tips, weekly revenue leadership insights, and monthly strategic intelligence from GoZupees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozupees.com/newsletters" />
        <link rel="canonical" href="https://gozupees.com/newsletters" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-24 pb-20 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`,
          }}></div>
          
          <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-8 shadow-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                Premium Intelligence for Revenue Leaders
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                GoZupees
                <br className="hidden sm:block" />
                Newsletters
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Daily micro-playbooks, weekly executive intelligence, and monthly strategic foresight.
                <br className="hidden md:block" />
                <span className="text-blue-300 font-medium">Choose your cadence for revenue optimization insights.</span>
              </p>
              
              <div className="flex items-center justify-center text-gray-400 mb-12">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="font-medium">Trusted by 10,000+ revenue professionals</span>
                </div>
              </div>
              
              {/* Subscribe to All Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 border border-white/20"
              >
                <Mail className="w-6 h-6 mr-3" />
                Subscribe to All Newsletters
                <ChevronRight className="w-6 h-6 ml-3" />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Newsletter Sections - 3 Columns */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* AI RevOps Tip of the Day */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-3"></div>
                      <span className="text-orange-400 font-semibold text-xs uppercase tracking-wide">Daily</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">AI RevOps Tip of the Day</h2>
                    <p className="text-base text-gray-300 leading-relaxed">Drops in your inbox at 8 a.m. sharp—just in time for that first coffee. Here's why thousands of operators never miss an issue:</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">
                        <strong className="text-white">18,000+ RevOps pros already subscribe</strong>
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">One killer playbook, tested in live pipelines, every single morning</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">A single metric to watch—so you can see the lift for yourself</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Skimmable in under three minutes</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Zero fluff, zero sales pitch—just instant revenue-boosting action</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mt-auto">
                    <Link 
                      href="/newsletters/ai-revops"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-500 hover:via-red-500 hover:to-pink-500 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-orange-500/25 border border-white/10 group"
                    >
                      Subscribe Now 
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* GZP Edge Weekly */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                      <span className="text-blue-400 font-semibold text-xs uppercase tracking-wide">Weekly</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">GZP Edge Weekly</h2>
                    <p className="text-base text-gray-300 leading-relaxed">Lands every Monday before the stand-up. Sign up and stay one step ahead:</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">
                        <strong className="text-white">Trusted by 8,500+ C-suite and VP readers</strong>
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Board-level insight on the week's biggest AI move—in plain English</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Fast-track tour of our newest Voice-Agent feature (video included)</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">A real "win story" you can steal for your own pipeline</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">All of it in five minutes or less</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mt-auto">
                    <Link 
                      href="/newsletters/gzp-edge-weekly"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-blue-500/25 border border-white/10 group"
                    >
                      Subscribe Now 
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* GoZupees Monthly Digest */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3"></div>
                      <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wide">Monthly</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">GoZupees Monthly Digest</h2>
                    <p className="text-base text-gray-300 leading-relaxed">Hits your inbox the first Thursday of the month. Perfect for long-range planners:</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">
                        <strong className="text-white">5,200+ strategists and investors rely on it for foresight</strong>
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">1,200-word deep dive on the trend that will shape next quarter's budget</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Transparent roadmap reveal—know what's shipping next and why</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Fresh benchmark data from 250+ deployments—handy for board decks</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">Comes with a downloadable, share-ready PDF</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mt-auto">
                    <Link 
                      href="/newsletters/monthly-digest"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-emerald-500/25 border border-white/10 group"
                    >
                      Subscribe Now 
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}