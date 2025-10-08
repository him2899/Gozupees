import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car, MapPin, Bell, Coffee, Briefcase, UserPlus, Monitor, HelpCircle, Smile, Database, BarChart3 } from 'lucide-react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';


export default function DataCollection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    duration: 25, // Faster transition
    containScroll: 'trimSnaps'
  });

  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll functionality with better performance
  useEffect(() => {
    if (!emblaApi || !autoScrollEnabled) return;

    const autoScrollInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    // Pause auto-scroll on user interaction
    const handlePointerDown = () => {
      setAutoScrollEnabled(false);
      clearInterval(autoScrollInterval);
      
      setTimeout(() => {
        setAutoScrollEnabled(true);
      }, 8000); // Resume after 8 seconds
    };

    emblaApi.on('pointerDown', handlePointerDown);

    return () => {
      clearInterval(autoScrollInterval);
      emblaApi.off('pointerDown', handlePointerDown);
    };
  }, [emblaApi, autoScrollEnabled]);

  const { data: videos = [] } = useQuery({
    queryKey: ['solution-videos', 'data-collection'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=data-collection');
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
    { 
      name: "Market Research", 
      icon: <BarChart3 className="w-8 h-8" />, 
      description: "Survey automation, participant recruitment, data validation, and research coordination",
      valueStatement: "Accelerate market research with intelligent data collection and participant management",
      href: "/ai-agents-by-industry/market-research"
    },
    { 
      name: "Healthcare Research", 
      icon: <Heart className="w-8 h-8" />, 
      description: "Patient data collection, clinical surveys, appointment coordination, and compliance tracking",
      valueStatement: "Streamline healthcare research with HIPAA-compliant data collection processes",
      href: "/ai-agents-by-industry/healthcare"
    },
    { 
      name: "Academic Research", 
      icon: <GraduationCap className="w-8 h-8" />, 
      description: "Student surveys, research participation, data gathering, and academic study coordination",
      valueStatement: "Enhance academic research efficiency with automated data collection workflows",
      href: "/ai-agents-by-industry/education"
    },
    { 
      name: "Customer Insights", 
      icon: <Users className="w-8 h-8" />, 
      description: "Customer feedback, satisfaction surveys, product research, and user experience data",
      valueStatement: "Gather valuable customer insights with intelligent feedback collection systems",
      href: "/ai-agents-by-industry/customer-research"
    },
    { 
      name: "Financial Services", 
      icon: <Banknote className="w-8 h-8" />, 
      description: "Risk assessment data, compliance surveys, client onboarding, and financial research",
      valueStatement: "Secure financial data collection with enterprise-grade compliance and validation",
      href: "/ai-agents-by-industry/financial-services"
    },
    { 
      name: "Technology", 
      icon: <Monitor className="w-8 h-8" />, 
      description: "User analytics, product feedback, beta testing data, and development insights",
      valueStatement: "Optimize product development with comprehensive user data collection",
      href: "/ai-agents-by-industry/technology"
    }
  ];

  const capabilities = [
    { 
      icon: <Database className="w-8 h-8" />, 
      title: "Intelligent Collection", 
      description: "Smart data gathering with automated validation, quality checks, and real-time processing for accurate insights.",
      stats: { value: "99.9%", label: "Data Accuracy" }
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Participant Management", 
      description: "Automated recruitment, scheduling, reminders, and engagement tracking for optimal response rates.",
      stats: { value: "85%", label: "Response Rate" }
    },
    { 
      icon: <BarChart3 className="w-8 h-8" />, 
      title: "Real-Time Analytics", 
      description: "Live data visualization, trend analysis, and instant insights with automated reporting capabilities.",
      stats: { value: "24/7", label: "Live Monitoring" }
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Secure & Compliant", 
      description: "Enterprise-grade security with GDPR, HIPAA, and industry-specific compliance for sensitive data.",
      stats: { value: "100%", label: "Compliance" }
    }
  ];

  const keyDifferentiators = [
    { icon: <Zap className="w-6 h-6" />, title: "Automated Collection", description: "Intelligent automation that reduces manual data entry by 90%" },
    { icon: <Users className="w-6 h-6" />, title: "Smart Validation", description: "AI-powered validation ensures data quality and completeness" },
    { icon: <Globe className="w-6 h-6" />, title: "Multi-Channel", description: "Collect data across phone, web, mobile, and social platforms" },
    { icon: <Shield className="w-6 h-6" />, title: "Privacy First", description: "Built-in privacy controls and consent management" },
    { icon: <Target className="w-6 h-6" />, title: "Custom Workflows", description: "Tailored data collection flows for your specific needs" },
    { icon: <Clock className="w-6 h-6" />, title: "Real-Time Processing", description: "Instant data processing and analysis as it's collected" }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "End-to-End Encryption", description: "Military-grade encryption for all collected data in transit and at rest" },
    { icon: <Lock className="w-6 h-6" />, title: "GDPR & HIPAA Compliant", description: "Full compliance with global privacy regulations and healthcare standards" },
    { icon: <Eye className="w-6 h-6" />, title: "Consent Management", description: "Automated consent tracking and privacy preference management" },
    { icon: <FileText className="w-6 h-6" />, title: "Audit Trails", description: "Complete audit logs of all data collection and access activities" },
    { icon: <Settings className="w-6 h-6" />, title: "Access Controls", description: "Granular role-based permissions and data access management" },
    { icon: <Bell className="w-6 h-6" />, title: "Data Security Alerts", description: "Continuous monitoring with instant alerts for any data security anomalies" }
  ];

  const integrations = [
    { name: "OpenAI", logo: "https://logo.clearbit.com/openai.com" },
    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
    { name: "Google", logo: "https://logo.clearbit.com/google.com" },
    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
    { name: "Twilio", logo: "https://logo.clearbit.com/twilio.com" },
    { name: "Zapier", logo: "https://logo.clearbit.com/zapier.com" },
    { name: "Slack", logo: "https://logo.clearbit.com/slack.com" },
    { name: "HubSpot", logo: "https://logo.clearbit.com/hubspot.com" },
    { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
    { name: "Zoho", logo: "https://logo.clearbit.com/zoho.com" },
    { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com" },
    { name: "Notion", logo: "https://logo.clearbit.com/notion.so" }
  ];

  const testimonials = [
    {
      name: "Dr. Jennifer Adams",
      role: "Research Director",
      company: "Global Health Institute",
      content: "Our data collection efficiency increased by 300%. The AI handles complex survey logic and ensures we get high-quality, complete responses every time.",
      rating: 5,
      avatar: "/testimonials/jennifer-adams.jpg"
    },
    {
      name: "Mark Stevens",
      role: "Market Research Manager",
      company: "Insight Analytics Corp",
      content: "We've reduced our data collection time from weeks to days. The automated validation and real-time analytics give us insights faster than ever before.",
      rating: 5,
      avatar: "/testimonials/mark-stevens.jpg"
    },
    {
      name: "Rachel Chen",
      role: "Customer Experience Lead",
      company: "TechForward Solutions",
      content: "The participant engagement features are incredible. Our response rates doubled, and the data quality is consistently excellent across all our studies.",
      rating: 5,
      avatar: "/testimonials/rachel-chen.jpg"
    }
  ];

  const faqs = [
    {
      question: "How does AI improve data collection quality?",
      answer: "Our AI validates responses in real-time, detects inconsistencies, guides participants through complex questions, and ensures complete data capture. It can identify patterns that indicate low-quality responses and prompt for clarification, resulting in 99.9% data accuracy."
    },
    {
      question: "Can it handle complex survey logic and branching?",
      answer: "Yes, our AI can manage sophisticated survey flows with conditional logic, skip patterns, and dynamic questioning based on previous responses. It adapts the collection process in real-time to gather the most relevant data for each participant."
    },
    {
      question: "What types of data can it collect?",
      answer: "The system collects structured surveys, unstructured feedback, voice responses, behavioral data, biometric information (where permitted), file uploads, and multimedia content. It's designed to handle any type of research or business data collection need."
    },
    {
      question: "How does it ensure participant privacy and compliance?",
      answer: "We implement privacy-by-design with automated consent management, data anonymization, GDPR/HIPAA compliance checks, and granular privacy controls. Participants have full control over their data, and all collection follows strict regulatory guidelines."
    },
    {
      question: "Can it integrate with existing research platforms?",
      answer: "Absolutely. Our data collection AI integrates seamlessly with popular research platforms, CRM systems, analytics tools, and databases. It can also work with custom APIs and existing data infrastructure to fit your current workflow."
    },
    {
      question: "How quickly can data collection projects be deployed?",
      answer: "Simple projects can be deployed in hours, while complex multi-phase studies typically take 24-48 hours. This includes setup, testing, participant recruitment configuration, and integration with your existing systems."
    },
    {
      question: "What kind of analytics and reporting does it provide?",
      answer: "The platform provides real-time dashboards, automated quality reports, response rate analytics, participant engagement metrics, data completeness tracking, and custom reporting. You can monitor collection progress and data quality continuously."
    },
    {
      question: "How does it handle participant recruitment and engagement?",
      answer: "The AI automates participant outreach, sends personalized invitations, manages scheduling, sends smart reminders, tracks engagement, and optimizes communication timing. It can increase response rates by up to 85% through intelligent engagement strategies."
    }
  ];

  return (
      <div className="min-h-screen bg-dark text-white">
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
                      <Database className="w-4 h-4 mr-2" />
                      AI Data Collection
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Smart{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Data
                    </span>{' '}
                    Collection
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    That Never Stops Learning
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Meet Josh, your AI data collection assistant that automates surveys, validates responses, and delivers high-quality insights. Transform research efficiency with intelligent automation.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <a 
                      href="#data-collection-demo"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
                    >
                      <Play className="w-6 h-6" />
                      <span>See Josh in Action</span>
                    </a>
                    
                    <Link 
                      href="/contact"
                      className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 text-lg backdrop-blur-sm"
                    >
                      <Phone className="w-6 h-6" />
                      <span>Talk to Sales</span>
                    </Link>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="relative h-full flex items-end justify-center"
                >
                  {/* Josh Hero Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="w-full max-w-md h-auto overflow-hidden"
                    style={{ 
                      display: 'block',
                      verticalAlign: 'bottom',
                      lineHeight: 0,
                      marginBottom: 0,
                      paddingBottom: 0
                    }}
                  >
                    <img
                      src="/josh-portrait.png"
                      alt="Meet Josh - Your AI Data Collection Assistant"
                      className="w-full h-auto block"
                      style={{ 
                        transform: 'scale(1.04)',
                        margin: '-8px',
                        display: 'block'
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Collection Capabilities - Compact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                INTELLIGENT DATA COLLECTION
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                Meet Your AI <span className="text-blue-600">Data Collector</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our intelligent data collection transforms research with automated validation, smart workflows, and real-time quality assurance.
              </p>
            </motion.div>

            {/* Capabilities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 text-white">
                    {capability.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{capability.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{capability.description}</p>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-2xl font-bold text-blue-600">{capability.stats.value}</div>
                    <div className="text-xs text-gray-500">{capability.stats.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="data-collection-demo" className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Talk to <span className="text-blue-600">Josh</span> in Real Time
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience intelligent data collection firsthand. Josh is ready to demonstrate automated surveys, validation, and participant management.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - DataBot Pro */}
                <div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Database className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900">Josh Pro</h3>
                        <p className="text-gray-600">AI Data Collection Assistant</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">Intelligent data collection assistant that automates surveys, validates responses, manages participants, and delivers high-quality research data with advanced analytics and compliance.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-gray-500">Response Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                        <div className="text-sm text-gray-500">Data Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">10x</div>
                        <div className="text-sm text-gray-500">Faster Collection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Automation</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Josh Pro:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Automated survey deployment</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Real-time data validation</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Smart participant engagement</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Compliance-ready analytics</span>
                        </li>
                      </ul>
                    </div>
                    

                  </div>
                </div>

                {/* Josh Widget - Phone Interface matching Clara */}
                <motion.div
                  className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-sm mx-auto"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  style={{
                    boxShadow: "0 0 40px rgba(0, 0, 0, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                {/* Phone Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm font-medium">
                      JOSH (DATA COLLECTION AGENT) LIVE
                    </div>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="p-6">
                  {/* Agent Profile */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80" 
                        alt="Josh"
                        className="w-20 h-20 rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Josh</h3>
                      <p className="text-gray-600 text-sm">Data Collection Specialist</p>
                      <p className="text-gray-500 text-xs">GoZupees Research</p>
                    </div>
                  </div>

                  {/* Profile Data Tabs */}
                  <div className="space-y-3 mb-6">
                    <motion.div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Database className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">Specialty</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Data Collection</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">Rating</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">4.9/5</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">Experience</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">5+ Years</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">Success Rate</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">99.9%</span>
                    </motion.div>
                  </div>

                  {/* Chat Message */}
                  <div className="bg-blue-50 rounded-2xl p-4 mb-6 relative">
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-50 transform rotate-45"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Hi! I'm Josh, your AI data collection assistant. I help with survey automation, participant recruitment, data validation, and research coordination with advanced analytics and compliance.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      Just now
                    </div>
                  </div>

                  {/* Call Button */}
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Talk to Josh Now</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differentiators Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Why Choose Our <span className="text-blue-600">Data Collection AI</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Advanced AI technology meets research expertise to deliver superior data quality, efficiency, and insights that drive better decisions.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyDifferentiators.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-dark">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Enterprise-Grade <span className="text-blue-600">Security</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Your research data and participant privacy are protected with the highest security standards and regulatory compliance.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-dark">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Data Collection Built for Your Industry
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI data collection understands the unique research requirements of different industries and adapts its approach accordingly.
                </p>
              </motion.div>

              {/* Carousel Container */}
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex backface-visibility-hidden">
                    {industries.map((industry, index) => (
                      <div
                        key={index}
                        className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 first:pl-0 min-w-0"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 h-full flex flex-col will-change-transform"
                        >
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 text-white">
                            {industry.icon}
                          </div>
                          <h3 className="text-xl font-bold text-dark mb-3">{industry.name}</h3>
                          <p className="text-gray-600 mb-4 flex-grow">{industry.description}</p>
                          <p className="text-blue-700 font-medium text-sm mb-4 italic">{industry.valueStatement}</p>
                          <Link 
                            href={industry.href}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 text-sm group"
                          >
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </Link>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200 z-10"
                  aria-label="Previous industries"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200 z-10"
                  aria-label="Next industries"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(industries.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors duration-200"
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  How It <span className="text-blue-600">Works</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Simple setup, powerful results. Get your AI data collection running in just a few steps.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    step: "1", 
                    title: "Design & Configure", 
                    description: "Create your research design, set collection parameters, and configure validation rules for your specific data needs." 
                  },
                  { 
                    step: "2", 
                    title: "Deploy & Collect", 
                    description: "Launch automated collection across multiple channels with smart participant management and real-time quality monitoring." 
                  },
                  { 
                    step: "3", 
                    title: "Analyze & Insights", 
                    description: "Access real-time analytics, validated data, and actionable insights with automated reporting and visualization." 
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-dark">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instant Setup CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                Launch Your AI <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Data Collection</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Join leading researchers transforming data collection. Start gathering high-quality insights today.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-12"
              >
                <Link 
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-xl inline-flex"
                >
                  <Phone className="w-6 h-6" />
                  <span>Talk to Sales</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-gray-400 text-sm"
              >
                Setup in hours • GDPR & HIPAA compliant • Research-grade quality
              </motion.p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Trusted by <span className="text-blue-600">Research Leaders</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how our AI data collection has transformed research efficiency and data quality for organizations worldwide.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-dark">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                        <div className="text-blue-600 text-sm">{testimonial.company}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Powered by <span className="text-blue-600">Leading Technology</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Seamlessly integrate with your existing tools and workflows for maximum efficiency.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="flex items-center justify-center hover:scale-110 transition-all duration-300"
                  >
                    <img 
                      src={integration.logo} 
                      alt={integration.name}
                      className="h-10 w-auto opacity-80 hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Transform CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                Ready to Transform <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Your Research?</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Experience the future of data collection. See how our AI can work for your specific research needs.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Link 
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-xl inline-flex"
                >
                  <Calendar className="w-6 h-6" />
                  <span>Schedule Demo</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Frequently Asked <span className="text-blue-600">Questions</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to know about our AI data collection platform.
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-dark pr-4">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

DataCollection.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Data Collection - Intelligent Research & Survey Automation | Gozupees"
      description="Transform data collection with our AI-powered platform. Automated surveys, smart validation, real-time analytics, and participant management for superior research outcomes."
      canonical="https://gozupees.com/ai-voice-agents/data-collection"
      ogImage="https://gozupees.com/images/ai-data-collection.jpg"
    >
      {page}
    </Layout>
  );
};