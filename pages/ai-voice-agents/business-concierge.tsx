import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car, MapPin, Bell, Coffee, Briefcase, UserPlus, Monitor } from 'lucide-react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';


export default function BusinessConcierge() {
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
    queryKey: ['solution-videos', 'business-concierge'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=business-concierge');
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
      name: "Corporate Services", 
      icon: <Building className="w-8 h-8" />, 
      description: "Executive assistance, office management, vendor coordination, and business operations support",
      valueStatement: "Streamline corporate operations with intelligent business concierge services",
      href: "/ai-agents-by-industry/corporate"
    },
    { 
      name: "Technology Companies", 
      icon: <Monitor className="w-8 h-8" />, 
      description: "Employee services, office coordination, vendor management, and workplace efficiency",
      valueStatement: "Enhance workplace productivity with automated business support services",
      href: "/ai-agents-by-industry/technology"
    },
    { 
      name: "Professional Services", 
      icon: <Briefcase className="w-8 h-8" />, 
      description: "Client coordination, appointment management, resource allocation, and administrative support",
      valueStatement: "Deliver exceptional client service with professional business concierge support",
      href: "/ai-agents-by-industry/professional-services"
    },
    { 
      name: "Financial Services", 
      icon: <Banknote className="w-8 h-8" />, 
      description: "Client services, meeting coordination, compliance support, and operational efficiency",
      valueStatement: "Maintain professional standards with intelligent financial services concierge",
      href: "/ai-agents-by-industry/financial-services"
    },
    { 
      name: "Healthcare", 
      icon: <Heart className="w-8 h-8" />, 
      description: "Administrative support, appointment coordination, vendor management, and operational assistance",
      valueStatement: "Streamline healthcare operations with compliant business concierge services",
      href: "/ai-agents-by-industry/healthcare"
    },
    { 
      name: "Manufacturing", 
      icon: <Settings className="w-8 h-8" />, 
      description: "Supply chain coordination, vendor management, logistics support, and operational efficiency",
      valueStatement: "Optimize manufacturing operations with intelligent business support services",
      href: "/ai-agents-by-industry/manufacturing"
    }
  ];

  const capabilities = [
    { 
      icon: <Briefcase className="w-8 h-8" />, 
      title: "Executive Support", 
      description: "Comprehensive administrative assistance for executives and management teams with intelligent task prioritization.",
      stats: { value: "24/7", label: "Executive Support" }
    },
    { 
      icon: <UserPlus className="w-8 h-8" />, 
      title: "Vendor Coordination", 
      description: "Streamlined vendor management, contract coordination, and supplier relationship management.",
      stats: { value: "500+", label: "Vendor Partners" }
    },
    { 
      icon: <Calendar className="w-8 h-8" />, 
      title: "Meeting Management", 
      description: "Intelligent scheduling, resource booking, and meeting coordination across teams and departments.",
      stats: { value: "95%", label: "Schedule Efficiency" }
    },
    { 
      icon: <Phone className="w-8 h-8" />, 
      title: "Business Communications", 
      description: "Professional call handling, message routing, and internal/external communication management.",
      stats: { value: "<15s", label: "Response Time" }
    }
  ];

  const keyDifferentiators = [
    { icon: <Zap className="w-6 h-6" />, title: "Workflow Automation", description: "Automates routine business tasks and administrative workflows" },
    { icon: <Users className="w-6 h-6" />, title: "Team Coordination", description: "Seamlessly coordinates between departments and team members" },
    { icon: <Globe className="w-6 h-6" />, title: "Multi-location Support", description: "Manages operations across multiple offices and time zones" },
    { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", description: "Business-grade security and compliance for corporate environments" },
    { icon: <Target className="w-6 h-6" />, title: "Process Optimization", description: "Continuously improves business processes and operational efficiency" },
    { icon: <Clock className="w-6 h-6" />, title: "Always Available", description: "Round-the-clock business support that never takes a break" }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "Enterprise Encryption", description: "Military-grade encryption for all business communications and data" },
    { icon: <Lock className="w-6 h-6" />, title: "SOC 2 Compliance", description: "Full compliance with enterprise security and audit requirements" },
    { icon: <Eye className="w-6 h-6" />, title: "Access Management", description: "Granular role-based access control for different business functions" },
    { icon: <FileText className="w-6 h-6" />, title: "Audit Trails", description: "Comprehensive logging and audit trails for all business interactions" },
    { icon: <Settings className="w-6 h-6" />, title: "Integration Security", description: "Secure integration with existing business systems and workflows" }
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
      name: "Michael Thompson",
      role: "Chief Operations Officer",
      company: "TechForward Inc",
      content: "Our business concierge has revolutionized how we handle administrative tasks. Our team can now focus on strategic work while operations run smoothly.",
      rating: 5,
      avatar: "/testimonials/michael-thompson.jpg"
    },
    {
      name: "Lisa Chang",
      role: "Executive Director",
      company: "Global Consulting Partners",
      content: "The efficiency gains are remarkable. From vendor coordination to meeting management, everything is handled professionally and promptly.",
      rating: 5,
      avatar: "/testimonials/lisa-chang.jpg"
    },
    {
      name: "Robert Martinez",
      role: "VP of Operations",
      company: "Enterprise Solutions Group",
      content: "Having 24/7 business support has been a game-changer. Our global operations now run seamlessly across all time zones.",
      rating: 5,
      avatar: "/testimonials/robert-martinez.jpg"
    }
  ];

  const faqs = [
    {
      question: "How does business concierge differ from traditional admin support?",
      answer: "Our business concierge uses AI to provide 24/7 intelligent administrative support that learns from your business processes. Unlike traditional admin support, it can handle multiple tasks simultaneously, integrate with your existing systems, and continuously optimize workflows for maximum efficiency."
    },
    {
      question: "Can it handle complex business operations?",
      answer: "Yes, our business concierge is designed to manage sophisticated business operations including multi-step workflows, vendor coordination, budget management, and cross-departmental projects. It intelligently escalates complex decisions to appropriate team members while handling routine operations autonomously."
    },
    {
      question: "What types of business tasks can it manage?",
      answer: "The business concierge handles executive scheduling, vendor management, expense processing, travel coordination, meeting preparation, document management, compliance tracking, and internal communications. It's customizable to your specific business processes and industry requirements."
    },
    {
      question: "How does it integrate with existing business systems?",
      answer: "Our business concierge seamlessly integrates with popular business tools including CRM systems, ERP platforms, accounting software, communication tools, and project management systems. This ensures it works within your existing technology stack without disruption."
    },
    {
      question: "Is it suitable for small to medium businesses?",
      answer: "Absolutely. Our business concierge scales with your organization, from small teams to enterprise-level operations. It provides enterprise-grade capabilities at an affordable cost, making professional business support accessible to organizations of all sizes."
    },
    {
      question: "How quickly can it be implemented?",
      answer: "Implementation typically takes 24-48 hours, including system integration, workflow customization, and team training. We work closely with your IT team to ensure smooth deployment and minimal disruption to ongoing operations."
    },
    {
      question: "Can it handle confidential business information?",
      answer: "Yes, our business concierge maintains the highest standards of confidentiality and security. All business data is encrypted, access is role-based, and we maintain complete audit trails. It's designed to handle sensitive corporate information with enterprise-grade security protocols."
    },
    {
      question: "What kind of reporting and analytics does it provide?",
      answer: "The business concierge provides comprehensive analytics including task completion rates, workflow efficiency metrics, cost savings reports, and operational insights. You can track productivity gains, identify bottlenecks, and make data-driven decisions to optimize your business operations."
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
                      <Briefcase className="w-4 h-4 mr-2" />
                      AI Business Operations
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Business{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Concierge
                    </span>{' '}
                    Support
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    That Never Stops Working
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Meet your AI business concierge that streamlines operations, coordinates teams, and handles administrative tasks 24/7. Focus on growth while we manage the details.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link 
                      href="/contact"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
                    >
                      <Play className="w-6 h-6" />
                      <span>See Demo</span>
                    </Link>
                    
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
                  {/* Business Concierge Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Briefcase className="w-32 h-32 text-blue-400" />
                    </div>
                    
                    {/* Floating business indicators */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-8 -right-8 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Always Working</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-8 -left-8 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <Building className="w-4 h-4" />
                      <span>Enterprise Ready</span>
                    </motion.div>
                  </motion.div>

                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Capabilities - Compact Section */}
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
                BUSINESS OPERATIONS CAPABILITIES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                Meet Your Business <span className="text-blue-600">Concierge</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our intelligent business concierge transforms operations with automated administrative support and seamless workflow management.
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
        <section id="business-concierge-demo" className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - BusinessBot Pro */}
                <div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900">BusinessBot Pro</h3>
                        <p className="text-gray-600">AI Business Concierge</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">Intelligent business concierge that handles administrative tasks, coordinates operations, and manages workflows with 24/7 availability and enterprise-grade efficiency.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">40%</div>
                        <div className="text-sm text-gray-500">Time Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Operations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">99%</div>
                        <div className="text-sm text-gray-500">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">50%</div>
                        <div className="text-sm text-gray-500">Cost Reduction</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose BusinessBot Pro:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Automated workflow management</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Intelligent vendor coordination</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Executive scheduling & support</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Enterprise system integration</span>
                        </li>
                      </ul>
                    </div>
                    
                    <button 
                      onClick={handlePlayPause}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      <span>{isPlaying ? 'Pause Demo' : 'Watch Demo'}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column - Video Demo */}
                <div className="relative">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                      {/* Placeholder for actual video */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                        <div className="text-center text-white">
                          <Briefcase className="h-16 w-16 mx-auto mb-4" />
                          <p className="text-lg font-semibold">BusinessBot Demo</p>
                          <p className="text-sm opacity-90">See intelligent operations in action</p>
                        </div>
                      </div>
                      
                      {/* Play/Pause overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={handlePlayPause}
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                        >
                          {isPlaying ? 
                            <Pause className="h-8 w-8 text-white" /> : 
                            <Play className="h-8 w-8 text-white ml-1" />
                          }
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Demo Duration</span>
                        <span className="text-gray-900 font-medium">3:15</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Featured Functions</span>
                        <span className="text-gray-900 font-medium">Operations & Coordination</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Efficiency Gain</span>
                        <span className="text-green-600 font-medium">40% Time Saved</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                  Why Choose Our <span className="text-blue-600">Business Concierge</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Advanced AI technology meets business expertise to deliver operational excellence and productivity gains.
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
                  Your business data and operations are protected with the highest security standards and compliance frameworks.
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
                  Concierge Built for Your Industry
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our business concierge understands the unique operational requirements of different industries and adapts its approach accordingly.
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
                  Simple integration, powerful results. Get your business concierge running in just a few steps.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    step: "1", 
                    title: "System Integration", 
                    description: "Connect your existing business systems and customize workflows to match your operational requirements." 
                  },
                  { 
                    step: "2", 
                    title: "Process Training", 
                    description: "Train the AI on your specific business processes, policies, and operational standards for optimal performance." 
                  },
                  { 
                    step: "3", 
                    title: "Deploy & Optimize", 
                    description: "Go live with automated business operations and continuously optimize workflows for maximum efficiency." 
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
                Launch Your Business <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Concierge</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Join modern businesses automating operations. Start transforming your business efficiency today.
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
                Setup in 24 hours • Enterprise security • Scalable solution
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
                  Trusted by <span className="text-blue-600">Leading Businesses</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how our business concierge has streamlined operations and enhanced productivity for modern enterprises.
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
                Ready to Transform <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Your Business?</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Experience the future of business operations. See how our business concierge can work for your specific needs.
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
                  Everything you need to know about your business concierge service.
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

BusinessConcierge.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Business Concierge - AI-Powered Business Operations Support | Gozupees"
      description="Streamline business operations with our AI business concierge. Executive support, vendor management, and administrative automation for modern enterprises."
      canonical="https://gozupees.com/ai-voice-agents/business-concierge"
      ogImage="https://gozupees.com/images/business-concierge-ai.jpg"
    >
      {page}
    </Layout>
  );
};