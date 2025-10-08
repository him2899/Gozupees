import React, { useState, useRef } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';


export default function SmartScheduling() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const { data: videos = [] } = useQuery({
    queryKey: ['solution-videos', 'smart-scheduling'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=smart-scheduling');
      if (!response.ok) return [];
      return response.json();
    },
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      leftVideoRef.current?.pause();
      rightVideoRef.current?.pause();
    } else {
      leftVideoRef.current?.play();
      rightVideoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const industries = [
    { name: "Healthcare", icon: "🏥", description: "Patient appointment coordination" },
    { name: "Broadband & Fibre", icon: "📡", description: "Installation scheduling" },
    { name: "Utilities", icon: "⚡", description: "Service call management" },
    { name: "Property Inspections", icon: "🏠", description: "Inspection coordination" },
    { name: "Home Services", icon: "🔧", description: "Repair & maintenance" }
  ];

  const features = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Automated Outbound Calls",
      description: "Chloe calls customers automatically at the optimal time before their appointment",
      color: "from-blue-500 to-cyan-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f9ff'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%233b82f6' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%233b82f6' font-family='Arial' font-size='16'%3EAuto Calling%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Identity Verification",
      description: "Gently verifies caller identity and reschedules if needed",
      color: "from-purple-500 to-pink-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fdf4ff'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23a855f7' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='16'%3EVerification%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Coordination",
      description: "Collects parking, pets, access codes, and job-specific preparation details",
      color: "from-green-500 to-emerald-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0fdf4'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%2310b981' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='16'%3ECoordination%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Pushes structured data directly to your CRM or field service platform via API",
      color: "from-orange-500 to-red-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fff7ed'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23f97316' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%23f97316' font-family='Arial' font-size='16'%3EReal-time%3C/text%3E%3C/svg%3E"
    }
  ];

  const stats = [
    { number: "85%", label: "Reduction in No-Shows", icon: <Target className="w-6 h-6" /> },
    { number: "3hrs", label: "Daily Time Saved", icon: <Clock className="w-6 h-6" /> },
    { number: "95%", label: "Customer Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Service Availability", icon: <Shield className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      quote: "Chloe has transformed our appointment management. We've seen an 85% reduction in no-shows.",
      author: "Sarah Johnson",
      role: "Operations Manager",
      company: "MedCare Plus",
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%233b82f6'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3ESJ%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "Our technicians arrive prepared every time. No more surprise pets or parking issues.",
      author: "Mike Chen",
      role: "Field Service Director",
      company: "TechFix Solutions",
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%2310b981'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3EMC%3C/text%3E%3C/svg%3E"
    }
  ];

  const workflowSteps = [
    {
      step: "1",
      title: "Chloe Dials Out Automatically",
      description: "Chloe calls the customer using a recorded line at the right time — a day or two before the visit, or same-day if you prefer.",
      quote: "Hi, this is Chloe calling from your service team — just a quick confirmation call for tomorrow's appointment…",
      icon: <Phone className="w-6 h-6" />,
      color: "bg-blue-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%233b82f6' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%233b82f6' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%233b82f6' font-family='Arial' font-size='14'%3EAuto Dial%3C/text%3E%3C/svg%3E"
    },
    {
      step: "2", 
      title: "Verifies Identity Gently",
      description: "She confirms who she's speaking with by asking for basic verification (name, postcode, DOB, etc.). If the person can't talk, she reschedules the call herself.",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-purple-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fdf4ff'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%23a855f7' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%23a855f7' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='14'%3EVerify ID%3C/text%3E%3C/svg%3E"
    },
    {
      step: "3",
      title: "Confirms the Visit and Coordinates Details", 
      description: "Once she's got the right person, Chloe runs through your custom checklist: confirms appointment time, service address, asks about pets, parking, access instructions, and any other critical info.",
      quote: "Cool — just a few quick things so our team shows up ready… Any parking notes? Or pets we should know about?",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-green-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f0fdf4'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%2310b981' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%2310b981' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='14'%3ECoordinate%3C/text%3E%3C/svg%3E"
    },
    {
      step: "4",
      title: "Updates Your System Instantly",
      description: "As Chloe collects info, she pushes it straight to your CRM, field service platform, or scheduling dashboard via API — structured, tagged, and ready for dispatch. No manual notes. No missed flags. Just clean data, every time.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-orange-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fff7ed'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%23f97316' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%23f97316' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%23f97316' font-family='Arial' font-size='14'%3EUpdate CRM%3C/text%3E%3C/svg%3E"
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-b from-dark to-dark/95 text-white overflow-hidden">
        {/* Hero Section with Enhanced Visuals */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                <div className="flex flex-col justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                      <Zap className="w-4 h-4 mr-2" />
                      AI-Powered Scheduling
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Meet{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Chloe
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    Your 24/7 Scheduling Coordinator
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Automate appointment confirmations, collect critical visit details, and reduce no-shows with AI-powered voice coordination that fits seamlessly into your workflow.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link 
                      href="/book-demo"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
                    >
                      <Play className="w-6 h-6" />
                      <span>See Chloe in Action</span>
                    </Link>
                    
                    <Link 
                      href="/contact"
                      className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 text-lg backdrop-blur-sm"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Book a Demo</span>
                    </Link>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="relative h-full flex items-end justify-center"
                >
                  {/* Chloe Hero Visual */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    src="/chloe-portrait.png"
                    alt="Meet Chloe - Your AI Scheduling Assistant"
                    className="w-full max-w-md h-auto block"
                    style={{ 
                      display: 'block',
                      verticalAlign: 'bottom',
                      lineHeight: 0,
                      marginBottom: 0,
                      paddingBottom: 0
                    }}
                  />

                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Chloe's Capabilities - Compact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  SMART SCHEDULING IS HERE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  AI is <span className="text-blue-600">Revolutionizing</span><br />
                  Appointment Management
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover how forward-thinking businesses are using Chloe to create extraordinary customer experiences, reduce no-shows, and build efficient scheduling operations.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8 items-stretch h-full">
                {/* Left Column - Problems */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex h-full"
                >
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col justify-between w-full">
                    <div>
                      <h4 className="font-semibold text-red-800 mb-4 text-base">THE OLD WAY</h4>
                      <div className="space-y-4">
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Manual confirmation calls
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Time-consuming processes
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          High no-show rates
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Limited availability
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Reactive scheduling approach
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Inconsistent customer experience
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Resource-intensive operations
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-red-200">
                      <p className="text-sm text-red-600 mb-3">
                        As costs rise and efficiency demands increase, traditional scheduling methods keep draining resources at premium prices.
                      </p>
                      <p className="text-sm text-red-600 mb-3">
                        Staff spend hours on repetitive confirmation tasks instead of focusing on high-value customer service and business growth.
                      </p>
                      <div className="text-sm text-red-500 font-medium">
                        DIMINISHING RETURNS →
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Center Column - Solution */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex h-full"
                >
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col justify-between w-full">
                    <div>
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-base font-medium mb-4 text-center">
                        OUR APPROACH
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
                        Our Three-Stage Approach
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">AI Agent Ecosystem</h4>
                            <p className="text-blue-700 text-sm">Autonomous agents with human-in-the-loop supervision for process efficiency</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">Hyper-Personalized Experience</h4>
                            <p className="text-blue-700 text-sm">Creating exceptional customer experiences using zero & first-party data</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">Smart Operations</h4>
                            <p className="text-blue-700 text-sm">Building communities of efficient scheduling operations with authentic service quality</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-blue-200 text-center">
                      <div className="text-blue-600 font-bold text-base">
                        SUSTAINABLE GROWTH →
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Results */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex h-full"
                >
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col justify-between w-full">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-6 text-base">THE RESULTS</h4>
                      <div className="space-y-5">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                          <div className="text-green-700 text-sm">Reduction in no-shows</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">3.5x</div>
                          <div className="text-green-700 text-sm">Increase in scheduling efficiency</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                          <div className="text-green-700 text-sm">Customer satisfaction rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                          <div className="text-green-700 text-sm">Service availability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
                          <div className="text-green-700 text-sm">Reduction in admin costs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">2 weeks</div>
                          <div className="text-green-700 text-sm">Average deployment time</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-green-200 text-center">
                      <p className="text-sm text-green-600 mb-3">
                        Businesses see immediate ROI with measurable improvements in customer satisfaction and operational efficiency.
                      </p>
                      <div className="text-sm text-green-600 font-medium">
                        PROVEN ACROSS 150+ BUSINESSES
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-8"
              >
                Deploy Chloe in Weeks — Not Months
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl text-gray-300 mb-12"
              >
                No massive transformation project. Just one agent, solving one painful problem, on day one.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link 
                  href="/book-demo"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-xl"
                >
                  <Play className="w-6 h-6" />
                  <span>Book a Demo</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                
                <Link 
                  href="/contact"
                  className="border-2 border-white/20 text-white px-10 py-5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-3 text-xl backdrop-blur-sm"
                >
                  <User className="w-6 h-6" />
                  <span>See Chloe in Action</span>
                </Link>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-gray-400 mt-8 text-lg"
              >
                If you schedule field appointments and your team is still confirming manually — Chloe can help.
              </motion.p>
            </div>
          </div>
        </section>
      </div>
  );
}

SmartScheduling.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Smart Scheduling - AI Appointment Coordination | GoZupees"
      description="Meet Chloe, your 24/7 AI scheduling coordinator. Automate appointment confirmations, collect visit details, and reduce no-shows with voice-based coordination."
      canonical="https://gozupees.com/ai-voice-agents/smart-scheduling"
      ogImage="https://gozupees.com/images/smart-scheduling-ai.jpg"
    >
      {page}
    </Layout>
  );
};