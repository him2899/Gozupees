import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car } from 'lucide-react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import Layout from '../../components/layout/Layout';


export default function SalesQualification() {
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
    queryKey: ['solution-videos', 'sales-qualification'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=sales-qualification');
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
      description: "Qualify patient inquiries, insurance verification, and treatment consultations",
      valueStatement: "Improve patient acquisition with professional sales qualification processes",
      href: "/ai-agents-by-industry/healthcare"
    },
    { 
      name: "Financial Services", 
      icon: <Banknote className="w-8 h-8" />, 
      description: "Qualify investment prospects, loan applications, and financial service inquiries",
      valueStatement: "Build trust through professional financial service qualification that converts",
      href: "/ai-agents-by-industry/financial-services"
    },
    { 
      name: "Real Estate", 
      icon: <Home className="w-8 h-8" />, 
      description: "Qualify property buyers, investment inquiries, and financing capabilities",
      valueStatement: "Never miss a qualified buyer with smart sales qualification strategies",
      href: "/ai-agents-by-industry/real-estate"
    },
    { 
      name: "Legal Services", 
      icon: <Scale className="w-8 h-8" />, 
      description: "Qualify legal consultation needs, case complexity, and client requirements",
      valueStatement: "Professional legal qualification with complete confidentiality and expertise",
      href: "/ai-agents-by-industry/law-firms"
    },
    { 
      name: "Insurance", 
      icon: <Shield className="w-8 h-8" />, 
      description: "Qualify insurance needs, risk assessment, and coverage requirements",
      valueStatement: "Qualify insurance prospects professionally while building customer confidence",
      href: "/ai-agents-by-industry/insurance"
    },
    { 
      name: "E-Commerce", 
      icon: <ShoppingCart className="w-8 h-8" />, 
      description: "Qualify customer needs, purchase intent, and product requirements",
      valueStatement: "Deliver exceptional e-commerce qualification that drives sales conversions",
      href: "/ai-agents-by-industry/ecommerce"
    },
    { 
      name: "Accounting", 
      icon: <Calculator className="w-8 h-8" />, 
      description: "Qualify accounting service needs, business complexity, and service requirements",
      valueStatement: "Professional accounting qualification that maintains client trust and converts",
      href: "/ai-agents-by-industry/accounting"
    },
    { 
      name: "Mortgage Brokers", 
      icon: <Building className="w-8 h-8" />, 
      description: "Qualify borrower eligibility, income verification, and loan requirements",
      valueStatement: "Guide qualified prospects through mortgage processes with expert qualification",
      href: "/ai-agents-by-industry/mortgage-brokers"
    },
    { 
      name: "Education", 
      icon: <GraduationCap className="w-8 h-8" />, 
      description: "Qualify student enrollment needs, program fit, and financial capabilities",
      valueStatement: "Support educational institutions with professional prospect qualification",
      href: "/ai-agents-by-industry/education"
    },
    { 
      name: "Recruitment", 
      icon: <UserCheck className="w-8 h-8" />, 
      description: "Qualify candidate fit, skill requirements, and employment preferences",
      valueStatement: "Professional recruitment qualification that creates positive candidate experiences",
      href: "/ai-agents-by-industry/recruitment"
    },
    { 
      name: "Telecommunications", 
      icon: <Wifi className="w-8 h-8" />, 
      description: "Qualify service needs, usage requirements, and technology preferences",
      valueStatement: "Deliver superior telecom qualification with intelligent needs assessment",
      href: "/ai-agents-by-industry/telecommunications"
    },
    { 
      name: "Automotive", 
      icon: <Car className="w-8 h-8" />, 
      description: "Qualify vehicle needs, financing options, and purchase readiness",
      valueStatement: "Professional automotive qualification that drives sales excellence",
      href: "/ai-agents-by-industry/automobile"
    }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "24/7 Lead Qualification",
      description: "Our AI qualifies prospects professionally, ensuring only high-quality leads reach your sales team",
      color: "from-blue-500 to-cyan-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f9ff'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%233b82f6' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%233b82f6' font-family='Arial' font-size='16'%3E24/7 Qualify%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Scoring",
      description: "Intelligently scores leads based on qualifying criteria, budget, timeline, and decision-making authority",
      color: "from-purple-500 to-pink-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fdf4ff'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23a855f7' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='16'%3ESmart Score%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Intelligent Questions",
      description: "Asks the right qualifying questions based on industry best practices and your specific criteria",
      color: "from-green-500 to-emerald-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0fdf4'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%2310b981' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='16'%3EQualifying%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "CRM Integration",
      description: "Logs all qualification data and updates lead scores in real-time across your systems",
      color: "from-orange-500 to-red-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fff7ed'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23f97316' opacity='0.2'/%3E%3Ctext x='150' y='105' text-anchor='middle' fill='%23f97316' font-family='Arial' font-size='16'%3ECRM Updates%3C/text%3E%3C/svg%3E"
    }
  ];

  const stats = [
    { number: "85%", label: "Qualification Accuracy", icon: <Target className="w-6 h-6" /> },
    { number: "60%", label: "Sales Cycle Reduction", icon: <Clock className="w-6 h-6" /> },
    { number: "94%", label: "Lead Quality Score", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Availability", icon: <Shield className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      quote: "Our sales team now only works with pre-qualified leads. The conversion rate has increased dramatically.",
      author: "Mark Stevens",
      role: "Sales Manager",
      company: "Enterprise Solutions Co",
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%233b82f6'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3EMS%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "The AI asks exactly the right questions to qualify prospects. Our sales cycle has shortened by 60%.",
      author: "Lisa Chen",
      role: "Business Development Director",
      company: "Growth Partners Inc",
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%2310b981'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3ELC%3C/text%3E%3C/svg%3E"
    }
  ];

  const workflowSteps = [
    {
      step: "1",
      title: "Initial Contact",
      description: "AI engages with prospects professionally, establishing rapport and gathering basic information to begin the qualification process.",
      quote: "Hi there! I'd love to learn more about your business needs. Could you tell me a bit about what challenges you're currently facing?",
      icon: <Phone className="w-6 h-6" />,
      color: "bg-blue-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%233b82f6' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%233b82f6' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%233b82f6' font-family='Arial' font-size='14'%3EInitial Contact%3C/text%3E%3C/svg%3E"
    },
    {
      step: "2", 
      title: "Needs Assessment",
      description: "Systematically uncovers prospect needs, pain points, and requirements using proven qualification frameworks like BANT or MEDDIC.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fdf4ff'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%23a855f7' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%23a855f7' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='14'%3ENeeds Assessment%3C/text%3E%3C/svg%3E"
    },
    {
      step: "3",
      title: "Budget & Authority Verification", 
      description: "Tactfully determines budget parameters, decision-making process, and timeline to ensure prospects are sales-ready.",
      quote: "To ensure I connect you with the right specialist, could you share your budget range and timeline for this project?",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-green-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f0fdf4'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%2310b981' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%2310b981' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='14'%3EBudget Check%3C/text%3E%3C/svg%3E"
    },
    {
      step: "4",
      title: "Lead Scoring & Routing",
      description: "Every qualification interaction is scored and logged in your CRM system, ensuring qualified leads are immediately routed to the right sales representative.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-orange-500",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fff7ed'/%3E%3Crect x='50' y='50' width='300' height='150' rx='10' fill='%23f97316' opacity='0.1'/%3E%3Ccircle cx='200' cy='125' r='40' fill='%23f97316' opacity='0.2'/%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-size='14'%3ELead Scoring%3C/text%3E%3C/svg%3E"
    }
  ];

  const keyDifferentiators = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Easy Setup",
      description: "Get your AI sales qualification system up and running in minutes with our simple configuration wizard.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Efficient",
      description: "Save 75% on sales qualification costs while improving lead quality with automated intelligent screening.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Never let a prospect go unqualified again with round-the-clock qualification that scales with your business.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure + Scalable",
      description: "Enterprise-grade security with GDPR compliance and unlimited scaling as your sales qualification needs grow.",
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
      features: ["500 qualifications/month", "Basic scoring", "CRM integration", "Email support"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "For growing businesses",
      features: ["2,000 qualifications/month", "Advanced scoring", "Multiple integrations", "Priority support", "Custom criteria"],
      cta: "Start Free",
      popular: true
    },
    {
      name: "Growth",
      price: "$599",
      period: "/month",
      description: "For established companies",
      features: ["5,000 qualifications/month", "Advanced analytics", "White-label options", "Dedicated support", "Custom workflows"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: ["Unlimited qualifications", "Custom integrations", "24/7 phone support", "SLA guarantees", "Dedicated account manager"],
      cta: "Talk to Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How quickly can I set up my AI sales qualification system?",
      answer: "Most businesses are up and running within 24 hours. Our setup wizard guides you through the configuration process, and our team can help you customize qualification criteria and scoring models."
    },
    {
      question: "Can it integrate with my existing CRM?",
      answer: "Yes! We integrate with all major CRM systems including Salesforce, HubSpot, Microsoft Dynamics, and many others. We can also connect to custom systems via API for seamless lead management."
    },
    {
      question: "What qualification frameworks does it support?",
      answer: "Our AI supports popular frameworks like BANT, MEDDIC, CHAMP, and ANUM. You can also create custom qualification criteria specific to your industry and sales process."
    },
    {
      question: "How does lead scoring work?",
      answer: "You define scoring criteria based on budget, authority, need, and timeline. The AI automatically scores leads based on their responses and routes qualified prospects to your sales team."
    },
    {
      question: "Is my prospect data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, maintain SOC 2 compliance, and are fully GDPR compliant. All prospect data is encrypted in transit and at rest, with comprehensive audit logging."
    },
    {
      question: "What happens with unqualified leads?",
      answer: "Unqualified leads are tagged appropriately in your CRM and can be enrolled in nurturing campaigns or scheduled for future follow-up based on your preferences."
    },
    {
      question: "Can I customize the qualification questions?",
      answer: "Yes! You can customize questions, qualification criteria, and even the AI's conversation style to match your brand and sales methodology."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! All plans come with a 14-day free trial with no setup fees. You can test all sales qualification features and see how the AI works with your prospects before committing."
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
                      <Target className="w-4 h-4 mr-2" />
                      AI-Powered Sales Qualification
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Qualify{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Smart
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    Sell To The Right Prospects
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Transform your sales process with AI that qualifies prospects intelligently. Smart lead scoring, automated qualification, and seamless integration with your existing systems.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <a 
                      href="#sales-qualification-demo"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
                    >
                      <Play className="w-6 h-6" />
                      <span>See Sales Qualification in Action</span>
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
                  {/* Sales Qualification Hero Visual */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    src="/chloe-portrait.png"
                    alt="AI Sales Qualification Agent"
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
                  AI SALES QUALIFICATION IS HERE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  AI is <span className="text-blue-600">Revolutionizing</span><br />
                  Sales Qualification
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover how forward-thinking businesses are using AI to qualify prospects intelligently, never waste time on unqualified leads, and build efficient sales operations.
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
                          Manual qualification processes
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Inconsistent lead scoring
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Time wasted on poor leads
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          High sales cycle costs
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Poor qualification data
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Lost revenue opportunities
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Frustrated sales teams
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-red-200">
                      <p className="text-sm text-red-600 mb-3">
                        Traditional sales qualification wastes time on unqualified prospects while missing opportunities with real buyers.
                      </p>
                      <p className="text-sm text-red-600 mb-3">
                        Sales teams struggle with inconsistent qualification criteria, leading to longer sales cycles and lower conversion rates.
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
                        AI-First Sales Qualification
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">24/7 Smart Qualification</h4>
                            <p className="text-blue-700 text-sm">Always-on AI providing consistent, intelligent prospect qualification</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">Intelligent Lead Scoring</h4>
                            <p className="text-blue-700 text-sm">Smart qualification and scoring based on proven frameworks and your custom criteria</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-base mb-2">Seamless Integration</h4>
                            <p className="text-blue-700 text-sm">Real-time updates to your CRM and business systems for complete sales qualification visibility</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-blue-200 text-center">
                      <div className="text-blue-600 font-bold text-base">
                        EXCEPTIONAL RESULTS →
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
                          <div className="text-green-700 text-sm">Qualification accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
                          <div className="text-green-700 text-sm">Sales cycle reduction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
                          <div className="text-green-700 text-sm">Lead quality score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                          <div className="text-green-700 text-sm">Qualification availability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                          <div className="text-green-700 text-sm">Unqualified meetings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">1 week</div>
                          <div className="text-green-700 text-sm">Setup time</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-green-200 text-center">
                      <p className="text-sm text-green-600 mb-3">
                        Businesses see immediate improvements in lead quality and significant sales efficiency gains from day one.
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
        <section id="sales-qualification-demo" className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - QualificationBot Pro */}
                <div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900">QualificationBot Pro</h3>
                        <p className="text-gray-600">AI Sales Qualification Agent</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">Professional AI that qualifies prospects intelligently, scores leads automatically, and routes qualified opportunities to your sales team with 24/7 intelligent assessment.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-gray-500">Qualification Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Availability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">60%</div>
                        <div className="text-sm text-gray-500">Cycle Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">94%</div>
                        <div className="text-sm text-gray-500">Lead Quality</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Businesses Choose QualificationBot Pro:</h4>
                      <p className="text-gray-600 mb-4">
                        Available 24/7 to qualify prospects, score leads intelligently, and provide professional sales qualification services that never miss an opportunity.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-100 rounded mr-3 mt-1">
                            <Target className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Qualification Expert</h5>
                            <p className="text-sm text-gray-600">Intelligently qualifies prospects using proven frameworks like BANT, MEDDIC, and custom criteria.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-100 rounded mr-3 mt-1">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Smart Questioning</h5>
                            <p className="text-sm text-gray-600">Asks the right qualifying questions to uncover budget, authority, need, and timeline.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-100 rounded mr-3 mt-1">
                            <Building className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Business Integration</h5>
                            <p className="text-sm text-gray-600">Seamlessly integrates with your CRM and business systems for complete qualification tracking.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">BANT Qualification</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">CRM Integration</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Lead Scoring</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Custom Criteria</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">Smart Routing</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="truncate">GDPR Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Sales Qualification Agent Widget */}
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
                        Sales Qualification Agent Live
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
                          alt="Quinn"
                          className="w-20 h-20 rounded-full object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Quinn</h3>
                        <p className="text-gray-600 text-sm">Sales Qualification Specialist</p>
                        <p className="text-gray-500 text-xs">GoZupees Sales</p>
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
                            <Target className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Specialty</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Sales Qualification</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Accuracy</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">85%</span>
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

                    {/* Qualification simulation */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Active Qualification</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-sm text-gray-600 italic mb-2">
                        "To ensure I connect you with the right specialist, could you share your budget range and timeline for this project?"
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>BANT Qualification</span>
                        <span>Score: 75/100</span>
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
                  Why Choose AI for Sales Qualification?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transform your sales process with AI that delivers consistent, intelligent prospect qualification around the clock.
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
                  Proven Results in Sales Qualification
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See the measurable impact on your business when you implement AI-powered sales qualification.
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
                  Your prospect data and sales qualification processes are protected with industry-leading security measures and compliance standards.
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
                  Sales Qualification Built for Your Industry
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI understands the unique needs of different industries and adapts sales qualification criteria accordingly.
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
                  See how our AI qualifies prospects with intelligent questioning and proven qualification frameworks.
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
                Create Your AI Sales Qualification Agent in Minutes
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl text-gray-300 mb-12"
              >
                Our intuitive agent builder makes setup effortless. Configure qualification criteria, scoring models, and integrations with just a few clicks.
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
                  See how businesses are transforming their sales qualification with AI.
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
                  Seamlessly integrate with your existing tools and workflows for maximum sales qualification efficiency.
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
                Want to Discuss Your Sales Qualification Use Case?
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl text-gray-300 mb-12"
              >
                Every business is unique. Let's discuss how our AI can be tailored to your specific sales qualification needs.
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
                  Common questions about implementing and using your AI sales qualification system.
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

SalesQualification.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Sales Qualification - Intelligent Lead Scoring"
      description="Transform your sales process with AI that qualifies prospects intelligently. Smart lead scoring, automated qualification, and seamless CRM integration for higher conversion rates."
      canonical="https://gozupees.com/ai-voice-agents/sales-qualification"
      ogImage="https://gozupees.com/images/ai-sales-qualification.jpg"
    >
      {page}
    </Layout>
  );
};