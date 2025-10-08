import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car } from 'lucide-react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';


export default function InboundCalls() {
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
    queryKey: ['solution-videos', 'inbound-calls'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=inbound-calls');
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
      name: "Healthcare", 
      icon: <Heart className="w-8 h-8" />, 
      description: "Handle patient inquiries, appointment requests, and emergency routing efficiently",
      valueStatement: "Transform patient communication with professional inbound call management",
      href: "/ai-agents-by-industry/healthcare"
    },
    { 
      name: "Financial Services", 
      icon: <Banknote className="w-8 h-8" />, 
      description: "Manage client inquiries, account questions, and financial service requests",
      valueStatement: "Provide exceptional financial service with intelligent inbound call handling",
      href: "/ai-agents-by-industry/financial-services"
    },
    { 
      name: "Real Estate", 
      icon: <Home className="w-8 h-8" />, 
      description: "Capture property inquiries, schedule viewings, and qualify potential buyers",
      valueStatement: "Never miss a potential property buyer with professional inbound call management",
      href: "/ai-agents-by-industry/real-estate"
    },
    { 
      name: "Legal Services", 
      icon: <Scale className="w-8 h-8" />, 
      description: "Handle legal consultations, case inquiries, and client communication professionally",
      valueStatement: "Manage legal inquiries with complete confidentiality and professional service",
      href: "/ai-agents-by-industry/law-firms"
    },
    { 
      name: "Insurance", 
      icon: <Shield className="w-8 h-8" />, 
      description: "Process policy inquiries, claims requests, and insurance consultations",
      valueStatement: "Handle insurance inquiries professionally while building customer trust",
      href: "/ai-agents-by-industry/insurance"
    },
    { 
      name: "E-Commerce", 
      icon: <ShoppingCart className="w-8 h-8" />, 
      description: "Manage customer support calls, order inquiries, and product questions",
      valueStatement: "Deliver exceptional e-commerce support that drives customer satisfaction",
      href: "/ai-agents-by-industry/ecommerce"
    },
    { 
      name: "Accounting", 
      icon: <Calculator className="w-8 h-8" />, 
      description: "Handle tax inquiries, bookkeeping questions, and financial planning calls",
      valueStatement: "Professional accounting support that maintains client trust and satisfaction",
      href: "/ai-agents-by-industry/accounting"
    },
    { 
      name: "Mortgage Brokers", 
      icon: <Building className="w-8 h-8" />, 
      description: "Process mortgage inquiries, rate questions, and loan application support",
      valueStatement: "Guide clients through mortgage processes with expert inbound call support",
      href: "/ai-agents-by-industry/mortgage-brokers"
    },
    { 
      name: "Education", 
      icon: <GraduationCap className="w-8 h-8" />, 
      description: "Handle student inquiries, enrollment questions, and academic support requests",
      valueStatement: "Support educational institutions with professional student and parent communication",
      href: "/ai-agents-by-industry/education"
    },
    { 
      name: "Recruitment", 
      icon: <UserCheck className="w-8 h-8" />, 
      description: "Manage candidate inquiries, job application support, and interview scheduling",
      valueStatement: "Professional recruitment support that creates positive candidate experiences",
      href: "/ai-agents-by-industry/recruitment"
    },
    { 
      name: "Telecommunications", 
      icon: <Wifi className="w-8 h-8" />, 
      description: "Handle service inquiries, technical support requests, and billing questions",
      valueStatement: "Deliver superior telecom customer service with intelligent inbound call management",
      href: "/ai-agents-by-industry/telecommunications"
    },
    { 
      name: "Automotive", 
      icon: <Car className="w-8 h-8" />, 
      description: "Manage service inquiries, parts requests, and sales consultation calls",
      valueStatement: "Professional automotive support that drives sales and service excellence",
      href: "/ai-agents-by-industry/automobile"
    }
  ];

  const features = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "24/7 Call Handling",
      description: "Our AI handles every inbound call professionally, ensuring no customer inquiry goes unanswered",
      color: "from-blue-500 to-cyan-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f9ff'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%233b82f6' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%233b82f6' font-family='Arial' font-size='16'%3E24/7 Available%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Identification",
      description: "Instantly identifies callers and routes them to the appropriate department or specialist",
      color: "from-purple-500 to-pink-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fdf4ff'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23a855f7' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='16'%3ECall Routing%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Intelligent Responses",
      description: "Handles inquiries intelligently, provides information, and escalates complex issues appropriately",
      color: "from-green-500 to-emerald-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0fdf4'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%2310b981' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='16'%3ESmart Responses%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "CRM Integration",
      description: "Logs all inbound interactions and updates customer records in real-time across your systems",
      color: "from-orange-500 to-red-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fff7ed'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23f97316' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%23f97316' font-family='Arial' font-size='16'%3ECRM Updates%3C/text%3E%3C/svg%3E"
    }
  ];

  const stats = [
    { number: "98%", label: "Call Answer Rate", icon: <Target className="w-6 h-6" /> },
    { number: "65%", label: "Cost Reduction", icon: <Clock className="w-6 h-6" /> },
    { number: "99%", label: "Customer Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Availability", icon: <Shield className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      quote: "Our inbound call handling has never been better. Every customer gets immediate, professional assistance.",
      author: "Sarah Thompson",
      role: "Customer Service Manager",
      company: "TechFlow Solutions",
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%233b82f6'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3EST%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "We never miss important customer inquiries anymore. The AI handles calls perfectly and routes urgent issues immediately.",
      author: "Michael Rodriguez",
      role: "Operations Director",
      company: "Global Services Inc",
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%2310b981'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3EMR%3C/text%3E%3C/svg%3E"
    }
  ];

  const workflowSteps = [
    {
      step: "1",
      title: "Call Reception",
      description: "AI answers incoming calls with a professional greeting tailored to your business, creating an excellent first impression for every inbound caller.",
      quote: "Good morning, thank you for calling Premier Services. This is Alex, how may I assist you today?",
      icon: <Phone className="w-6 h-6" />,
      color: "bg-blue-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%233b82f6' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%233b82f6' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%233b82f6' font-family='Arial' font-size='14'%3ECall Answer%3C/text%3E%3C/svg%3E"
    },
    {
      step: "2", 
      title: "Caller Identification",
      description: "Identifies who's calling and understands their inquiry, routing them to the right person or department based on your business rules.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fdf4ff'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%23a855f7' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%23a855f7' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='14'%3EIdentify Caller%3C/text%3E%3C/svg%3E"
    },
    {
      step: "3",
      title: "Intelligent Response & Routing", 
      description: "Handles common inquiries directly or routes complex requests to the appropriate team member, ensuring efficient inbound call management.",
      quote: "I can help you with that right now, or would you prefer to speak with our specialist? Let me connect you immediately.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-green-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f0fdf4'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%2310b981' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%2310b981' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='14'%3ERespond %26 Route%3C/text%3E%3C/svg%3E"
    },
    {
      step: "4",
      title: "Real-time Documentation",
      description: "Every inbound call interaction is logged and customer information is updated in your CRM system, ensuring your team has complete visibility into all customer touchpoints.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-orange-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fff7ed'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%23f97316' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%23f97316' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-size='14'%3EUpdate Records%3C/text%3E%3C/svg%3E"
    }
  ];

  const keyDifferentiators = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Easy Setup",
      description: "Get your AI inbound call handler up and running in minutes with our simple configuration wizard.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Efficient",
      description: "Save 65% on call handling costs while providing 24/7 inbound call coverage without hiring additional staff.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Never miss an inbound call again with round-the-clock professional service that scales with your business.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure + Scalable",
      description: "Enterprise-grade security with GDPR compliance and unlimited scaling as your inbound call volume grows.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "GDPR Compliant", description: "Full compliance with data protection regulations" },
    { icon: <Lock className="w-6 h-6" />, title: "Data Encryption", description: "End-to-end encryption for all conversations" },
    { icon: <FileText className="w-6 h-6" />, title: "Audit Logs", description: "Complete audit trail of all interactions" },
    { icon: <Settings className="w-6 h-6" />, title: "Role-based Access", description: "Granular permissions and access control" }
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

  const pricingTiers = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small businesses",
      features: ["500 minutes included", "Basic call routing", "CRM integration", "Email support"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "For growing businesses",
      features: ["2,000 minutes included", "Advanced routing", "Multiple integrations", "Priority support", "Custom greetings"],
      cta: "Start Free",
      popular: true
    },
    {
      name: "Growth",
      price: "$599",
      period: "/month",
      description: "For established companies",
      features: ["5,000 minutes included", "Advanced analytics", "White-label options", "Dedicated support", "Custom workflows"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: ["Unlimited minutes", "Custom integrations", "24/7 phone support", "SLA guarantees", "Dedicated account manager"],
      cta: "Talk to Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How quickly can I set up my AI inbound call handler?",
      answer: "Most businesses are up and running within 24 hours. Our setup wizard guides you through the configuration process, and our team can help you customize greetings and call routing rules for inbound calls."
    },
    {
      question: "Can it integrate with my existing CRM?",
      answer: "Yes! We integrate with all major CRM systems including Salesforce, HubSpot, Microsoft Dynamics, and many others. We can also connect to custom systems via API for seamless inbound call logging."
    },
    {
      question: "What languages are supported?",
      answer: "Our AI supports over 40 languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, and many more. It can automatically detect the caller's language for inbound calls."
    },
    {
      question: "How does inbound call routing work?",
      answer: "You set up routing rules based on caller needs, time of day, department, or any custom criteria. The AI can transfer calls, take messages, or handle inquiries directly based on your inbound call configuration."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, maintain SOC 2 compliance, and are fully GDPR compliant. All inbound call data is encrypted in transit and at rest, with comprehensive audit logging."
    },
    {
      question: "What happens if the AI can't handle an inbound call?",
      answer: "The AI is designed to gracefully escalate calls it can't handle to your team. It'll collect relevant information and transfer the caller to the appropriate person with full context."
    },
    {
      question: "Can I customize the AI's responses for inbound calls?",
      answer: "Yes! You can customize greetings, responses, and even the AI's personality to match your brand. Our professional tier includes advanced customization options for inbound call handling."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! All plans come with a 14-day free trial with no setup fees. You can test all inbound call features and see how the AI works with your business before committing."
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
                      <Phone className="w-4 h-4 mr-2" />
                      AI-Powered Inbound Calls
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Perfect{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Inbound Calls
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    Every Call Handled Professionally
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Transform your inbound call experience with AI that handles customer inquiries 24/7. Professional service, intelligent routing, and seamless integration with your existing systems.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <a 
                      href="#inbound-calls-demo"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
                    >
                      <Play className="w-6 h-6" />
                      <span>See Inbound Calls in Action</span>
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
                  {/* Inbound Calls Hero Visual */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    src="/chloe-portrait.png"
                    alt="AI Inbound Call Handler"
                    className="w-full max-w-md h-auto block"
                    style={{ 
                      display: 'block',
                      verticalAlign: 'bottom',
                      lineHeight: 0,
                      marginBottom: 0,
                      paddingBottom: 0
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities - Compact Section */}
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
                  AI INBOUND CALLS ARE HERE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  AI is <span className="text-blue-600">Revolutionizing</span><br />
                  Inbound Call Management
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover how forward-thinking businesses are using AI to create exceptional inbound call experiences, never miss customer inquiries, and build efficient call handling operations.
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
                          Missed inbound calls during busy periods
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Limited call handling hours
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Inconsistent inbound call service
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          High staffing costs
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Manual call logging
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Lost business opportunities
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Poor customer experience
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-red-200">
                      <p className="text-sm text-red-600 mb-3">
                        Traditional inbound call handling leads to missed opportunities and frustrated customers who can't reach your business when they need you most.
                      </p>
                      <p className="text-sm text-red-600 mb-3">
                        Staff are overwhelmed with call volume during peak times, while quiet periods waste expensive human resources.
                      </p>
                      <div className="text-sm text-red-500 font-medium">
                        LOST REVENUE →
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
                        AI-First Inbound Call Experience
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">24/7 Professional Service</h4>
                            <p className="text-blue-700 text-sm">Always-on AI providing consistent, professional inbound call service</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">Intelligent Call Routing</h4>
                            <p className="text-blue-700 text-sm">Smart identification and routing of inbound calls based on customer needs and business rules</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">Seamless Integration</h4>
                            <p className="text-blue-700 text-sm">Real-time updates to your CRM and business systems for complete inbound call visibility</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-blue-200 text-center">
                      <div className="text-blue-600 font-bold text-base">
                        EXCEPTIONAL SERVICE →
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
                          <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                          <div className="text-green-700 text-sm">Inbound call answer rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">65%</div>
                          <div className="text-green-700 text-sm">Reduction in staffing costs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
                          <div className="text-green-700 text-sm">Customer satisfaction rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                          <div className="text-green-700 text-sm">Service availability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                          <div className="text-green-700 text-sm">Missed opportunities</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">1 week</div>
                          <div className="text-green-700 text-sm">Setup time</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-green-200 text-center">
                      <p className="text-sm text-green-600 mb-3">
                        Businesses see immediate improvements in inbound call handling and significant cost savings from day one.
                      </p>
                      <div className="text-sm text-green-600 font-medium">
                        PROVEN ACROSS 200+ BUSINESSES
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="inbound-calls-demo" className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - InboundBot Pro */}
                <div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900">InboundBot Pro</h3>
                        <p className="text-gray-600">AI Inbound Call Agent</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">Professional AI that handles inbound calls, manages customer inquiries, and routes calls intelligently with 24/7 availability and human-like conversation skills.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">98%</div>
                        <div className="text-sm text-gray-500">Call Answer Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Availability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">65%</div>
                        <div className="text-sm text-gray-500">Cost Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">99%</div>
                        <div className="text-sm text-gray-500">Satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Businesses Choose InboundBot Pro:</h4>
                      <p className="text-gray-600 mb-4">
                        Available 24/7 to handle inbound customer calls, route inquiries intelligently, and provide professional call management services that never sleep.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-100 rounded mr-3 mt-1">
                            <Phone className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Inbound Call Expert</h5>
                            <p className="text-sm text-gray-600">Intelligently handles inbound calls and routes to the right department or person based on caller needs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-100 rounded mr-3 mt-1">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Professional Communication</h5>
                            <p className="text-sm text-gray-600">Handles inbound inquiries with professional courtesy and appropriate business tone.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-100 rounded mr-3 mt-1">
                            <Building className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Business Integration</h5>
                            <p className="text-sm text-gray-600">Seamlessly integrates with your CRM and business systems for complete inbound call logging.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Multi-language Support</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">CRM Integration</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Call Recording</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Custom Greetings</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Appointment Booking</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">GDPR Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Inbound Calls Agent Widget */}
                <div className="flex justify-center lg:justify-end">
                  <motion.div
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative max-w-md w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
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
                        Inbound Calls Agent Live
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="p-6">
                    {/* Agent Profile */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                          alt="Alex"
                          className="w-20 h-20 rounded-full object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Alex</h3>
                        <p className="text-gray-600 text-sm">Inbound Call Specialist</p>
                        <p className="text-gray-500 text-xs">GoZupees Support</p>
                      </div>
                    </div>

                    {/* Profile Data Tabs */}
                    <div className="space-y-3 mb-6">
                      <motion.div
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Specialty</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Inbound Calls</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
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
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Response Time</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Instant</span>
                      </motion.div>
                    </div>

                    {/* Call simulation */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Live Inbound Call</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-sm text-gray-600 italic mb-2">
                        "Good morning! Thank you for calling TechFlow Solutions. This is Alex, your AI assistant. How may I help you today?"
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Customer Service</span>
                        <span>Call Duration: 00:15</span>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
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
                  Why Choose AI for Inbound Calls?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transform your inbound call handling with AI that delivers consistent, professional service around the clock.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {keyDifferentiators.map((differentiator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${differentiator.color} rounded-xl flex items-center justify-center mx-auto mb-6 text-white`}>
                      {differentiator.icon}
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-4">{differentiator.title}</h3>
                    <p className="text-gray-600">{differentiator.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Proven Results in Inbound Call Management
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See the measurable impact on your business when you implement AI-powered inbound call handling.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
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
                  Enterprise-Grade Security
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Your inbound call data and customer interactions are protected with industry-leading security measures and compliance standards.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-dark mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
                  Inbound Call Solutions Built for Your Industry
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI understands the unique needs of different industries and adapts inbound call responses accordingly.
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
                  How It Works
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how our AI handles every inbound call with professional precision and intelligent decision-making.
                </p>
              </motion.div>

              <div className="space-y-16">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl mr-4`}>
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-dark">{step.title}</h3>
                      </div>
                      <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                      {step.quote && (
                        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <p className="text-blue-800 italic">"{step.quote}"</p>
                        </blockquote>
                      )}
                    </div>
                    
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instant Setup CTA Section */}
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
                Create Your AI Inbound Call Agent in Minutes
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl text-gray-300 mb-12"
              >
                Our intuitive agent builder makes setup effortless. Configure greetings, routing rules, and integrations with just a few clicks.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-12"
              >
                <Link 
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-xl inline-flex"
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
                className="text-gray-400 text-lg"
              >
                Deploy in minutes, not months. No technical expertise required.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
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
                  Hear From Our Customers
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how businesses are transforming their inbound call management with AI.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-gray-200"
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-dark">{testimonial.author}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        <p className="text-blue-600 text-sm font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 text-lg italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
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
                  Connect to Your Tech Stack
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Seamlessly integrate with your existing tools and workflows for maximum inbound call efficiency.
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

        {/* Custom CTA Section */}
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
                Want to Discuss Your Inbound Call Use Case?
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl text-gray-300 mb-12"
              >
                Every business is unique. Let's discuss how our AI can be tailored to your specific inbound call management needs.
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Everything You Need to Know
                </h2>
                <p className="text-xl text-gray-600">
                  Common questions about implementing and using your AI inbound call handler.
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-dark">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
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

InboundCalls.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Inbound Calls - 24/7 Professional Call Handling | GoZupees"
      description="Transform your inbound call management with AI that never sleeps. Handle customer calls 24/7 with professional service, intelligent routing, and seamless CRM integration."
      canonical="https://gozupees.com/ai-voice-agents/inbound-calls"
      ogImage="https://gozupees.com/images/inbound-calls-ai.jpg"
    >
      {page}
    </Layout>
  );
};