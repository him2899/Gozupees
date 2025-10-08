import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car, MapPin, Bell, Coffee, Briefcase, UserPlus, Monitor, HelpCircle, Smile, Stethoscope, Activity } from 'lucide-react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';


export default function GPTriage() {
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
    queryKey: ['solution-videos', 'gp-triage'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=gp-triage');
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
      name: "General Practice", 
      icon: <Stethoscope className="w-8 h-8" />, 
      description: "Patient triage, symptom assessment, appointment scheduling, and urgent care routing",
      valueStatement: "Enhance GP practices with intelligent patient triage that improves care outcomes",
      href: "/ai-agents-by-industry/general-practice"
    },
    { 
      name: "NHS Trusts", 
      icon: <Building className="w-8 h-8" />, 
      description: "Emergency triage, department routing, capacity management, and clinical prioritization",
      valueStatement: "Optimize NHS resources with AI-powered triage and patient flow management",
      href: "/ai-agents-by-industry/nhs"
    },
    { 
      name: "Private Healthcare", 
      icon: <Heart className="w-8 h-8" />, 
      description: "Priority assessment, specialist routing, insurance verification, and care coordination",
      valueStatement: "Deliver premium healthcare experiences with intelligent patient triage",
      href: "/ai-agents-by-industry/private-healthcare"
    },
    { 
      name: "Walk-in Clinics", 
      icon: <Clock className="w-8 h-8" />, 
      description: "Rapid assessment, queue management, urgent vs routine categorization, and wait time optimization",
      valueStatement: "Improve clinic efficiency with smart triage and patient flow optimization",
      href: "/ai-agents-by-industry/walk-in-clinics"
    },
    { 
      name: "Urgent Care", 
      icon: <Activity className="w-8 h-8" />, 
      description: "Emergency assessment, severity scoring, rapid triage protocols, and critical case identification",
      valueStatement: "Save lives with AI-powered urgent care triage and rapid response protocols",
      href: "/ai-agents-by-industry/urgent-care"
    },
    { 
      name: "Telemedicine", 
      icon: <Monitor className="w-8 h-8" />, 
      description: "Remote assessment, virtual triage, digital consultations, and care pathway guidance",
      valueStatement: "Scale telemedicine with intelligent remote triage and consultation routing",
      href: "/ai-agents-by-industry/telemedicine"
    }
  ];

  const capabilities = [
    { 
      icon: <Stethoscope className="w-8 h-8" />, 
      title: "Clinical Assessment", 
      description: "Advanced symptom evaluation with medical protocol compliance and clinical decision support for accurate patient triage.",
      stats: { value: "98%", label: "Accuracy" }
    },
    { 
      icon: <Activity className="w-8 h-8" />, 
      title: "Priority Scoring", 
      description: "Intelligent severity assessment using clinical guidelines to prioritize urgent cases and optimize patient flow.",
      stats: { value: "5min", label: "Avg Triage Time" }
    },
    { 
      icon: <Clock className="w-8 h-8" />, 
      title: "24/7 Availability", 
      description: "Round-the-clock triage support ensuring patients receive immediate assessment and appropriate care routing.",
      stats: { value: "24/7", label: "Available" }
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "HIPAA Compliant", 
      description: "Full medical data protection with healthcare compliance standards and secure patient information handling.",
      stats: { value: "100%", label: "Compliance" }
    }
  ];

  const keyDifferentiators = [
    { icon: <Stethoscope className="w-6 h-6" />, title: "Clinical Intelligence", description: "Advanced medical knowledge base with evidence-based triage protocols" },
    { icon: <Activity className="w-6 h-6" />, title: "Severity Assessment", description: "Intelligent urgency scoring based on clinical presentation and guidelines" },
    { icon: <Clock className="w-6 h-6" />, title: "Rapid Triage", description: "Sub-5 minute assessments without compromising clinical accuracy" },
    { icon: <Shield className="w-6 h-6" />, title: "Medical Compliance", description: "HIPAA, CQC, and NHS Digital standards with full audit trails" },
    { icon: <Target className="w-6 h-6" />, title: "Care Pathways", description: "Automated routing to appropriate care levels and specialist services" },
    { icon: <Users className="w-6 h-6" />, title: "Patient Experience", description: "Compassionate AI interaction with clear communication and guidance" }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "Medical Data Encryption", description: "End-to-end encryption for all patient data and clinical assessments" },
    { icon: <Lock className="w-6 h-6" />, title: "Healthcare Compliance", description: "HIPAA, GDPR, and NHS Digital compliant with medical audit trails" },
    { icon: <Eye className="w-6 h-6" />, title: "Patient Privacy", description: "Advanced privacy controls and confidential medical information protection" },
    { icon: <FileText className="w-6 h-6" />, title: "Clinical Records", description: "Secure storage and management of all triage assessments and decisions" },
    { icon: <Settings className="w-6 h-6" />, title: "Access Controls", description: "Role-based permissions for clinical staff and healthcare team collaboration" },
    { icon: <Bell className="w-6 h-6" />, title: "Medical Monitoring", description: "Real-time clinical oversight with patient safety and care quality alerts" }
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
      name: "Dr. Sarah Mitchell",
      role: "GP Practice Manager",
      company: "Westfield Medical Centre",
      content: "Robin has transformed our patient triage. We've reduced waiting times by 40% while improving clinical outcomes. Patients receive appropriate care faster than ever.",
      rating: 5,
      avatar: "/testimonials/sarah-mitchell.jpg"
    },
    {
      name: "James Thompson",
      role: "Clinical Director",
      company: "NHS Trust Northampton",
      content: "The AI triage system has been game-changing for our A&E department. Critical cases are identified immediately, and our clinicians can focus on complex care decisions.",
      rating: 5,
      avatar: "/testimonials/james-thompson.jpg"
    },
    {
      name: "Dr. Emily Roberts",
      role: "Urgent Care Lead",
      company: "Brighton Health Group",
      content: "Robin provides consistent, evidence-based triage 24/7. Our patient satisfaction scores have increased significantly, and staff report reduced burnout from routine assessments.",
      rating: 5,
      avatar: "/testimonials/emily-roberts.jpg"
    }
  ];

  const faqs = [
    {
      question: "How does AI triage compare to nurse-led triage?",
      answer: "Our AI triage provides consistent, evidence-based assessments 24/7 without fatigue or variation. It follows the same clinical protocols as trained nurses but can handle unlimited patients simultaneously. Critical cases are immediately escalated to clinical staff with full context and assessment details."
    },
    {
      question: "Is it safe for medical decision-making?",
      answer: "The AI follows established clinical guidelines and protocols, providing recommendations rather than final diagnoses. All high-risk cases are immediately escalated to qualified clinicians. The system has been validated against clinical outcomes and maintains detailed audit trails for quality assurance."
    },
    {
      question: "What medical conditions can it assess?",
      answer: "Robin can assess a wide range of symptoms and conditions using established triage protocols including chest pain, respiratory issues, abdominal pain, injuries, mental health concerns, and pediatric presentations. It's trained on clinical guidelines from NHS, NICE, and international medical standards."
    },
    {
      question: "How does it integrate with existing medical systems?",
      answer: "The AI triage system integrates seamlessly with major EPR systems (EMIS, SystmOne, Vision), NHS e-Referral Service, and hospital management systems. It can update patient records, create referrals, and communicate with existing clinical workflows."
    },
    {
      question: "What about patient data privacy and security?",
      answer: "All patient data is encrypted and stored according to NHS Digital standards. The system is HIPAA and GDPR compliant with comprehensive audit trails. Patient information never leaves secure healthcare environments and access is strictly controlled by clinical governance."
    },
    {
      question: "How quickly can it be deployed in a practice?",
      answer: "Deployment typically takes 48-72 hours including integration with existing systems, clinical protocol configuration, and staff training. We provide comprehensive training for clinical teams and gradual rollout to ensure smooth adoption."
    },
    {
      question: "Does it handle emergency situations appropriately?",
      answer: "Yes, the AI is specifically designed to identify emergency presentations immediately. It follows established emergency protocols, can trigger immediate clinical alerts, and ensures that life-threatening conditions receive immediate attention from qualified medical staff."
    },
    {
      question: "How do we measure clinical outcomes and effectiveness?",
      answer: "We provide detailed analytics including triage accuracy, clinical outcomes, patient satisfaction, waiting times, and resource utilization. The system tracks performance against clinical indicators and provides insights for continuous improvement of patient care."
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
                      <Stethoscope className="w-4 h-4 mr-2" />
                      AI Medical Triage
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
                      Robin
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    Your AI GP Triage Assistant
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Let Robin provide intelligent medical triage 24/7 with clinical accuracy. Rapid patient assessment, evidence-based protocols, and seamless integration with healthcare systems.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <a 
                      href="#gp-triage-demo"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
                    >
                      <Play className="w-6 h-6" />
                      <span>See Robin in Action</span>
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
                  {/* Robin Hero Visual */}
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
                      src="/robin-portrait.png"
                      alt="Meet Robin - Your AI GP Triage Assistant"
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

        {/* Robin's Capabilities - Compact Section */}
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
                  AI MEDICAL TRIAGE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Meet Your AI <span className="text-blue-600">GP Triage Assistant</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover how Robin transforms medical triage with intelligent assessment, clinical protocols, and rapid patient prioritization for improved healthcare outcomes.
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
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="gp-triage-demo" className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 relative">
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
                  Talk to <span className="text-blue-600">Robin</span> in Real Time
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience intelligent medical triage firsthand. Robin is ready to demonstrate clinical assessment, priority scoring, and patient care pathways.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Robin Pro */}
                <div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900">Robin Pro</h3>
                        <p className="text-gray-600">AI GP Triage Assistant</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">Intelligent medical triage assistant that provides clinical assessment, symptom evaluation, and patient prioritization with evidence-based protocols and seamless healthcare integration.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">98%</div>
                        <div className="text-sm text-gray-500">Clinical Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">5min</div>
                        <div className="text-sm text-gray-500">Avg Assessment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">100%</div>
                        <div className="text-sm text-gray-500">HIPAA Compliant</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Robin Pro:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Evidence-based clinical protocols</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Intelligent severity assessment</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Seamless EPR integration</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Full medical compliance</span>
                        </li>
                      </ul>
                    </div>
                    

                  </div>
                </div>

                {/* Robin Widget - Phone Interface matching Clara */}
                <motion.div
                  className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-sm mx-auto"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Mac-style top bar */}
                  <div className="bg-black px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm font-medium">ROBIN (GP TRIAGE AGENT LIVE)</div>
                    <div className="w-12"></div> {/* Spacer for centering */}
                  </div>

                  {/* Widget content */}
                  <div className="p-6">
                    {/* Agent Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src="/robin-portrait.png" 
                          alt="Robin - GP Triage Agent"
                          className="w-full h-full object-cover"
                          style={{ 
                            transform: 'scale(1.1)',
                            margin: '-4px'
                          }}
                        />
                      </div>
                      {/* Live status indicator */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Agent Info */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Robin</h3>
                      <p className="text-gray-600 text-sm mb-3">GP Triage Specialist</p>
                      
                      {/* Live indicator */}
                      <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">LIVE</span>
                      </div>
                    </div>

                    {/* Expertise tags */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-600 text-center mb-3">Specializes in:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Clinical Assessment</span>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">Priority Scoring</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Care Pathways</span>
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
                        <span>Talk to Robin Now</span>
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
                  Why Choose Our <span className="text-blue-600">Medical Triage AI</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Advanced clinical intelligence meets healthcare expertise to deliver safe, accurate, and efficient patient triage that improves care outcomes.
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
                  Healthcare-Grade <span className="text-blue-600">Security</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Your patient data and medical assessments are protected with the highest healthcare security standards and medical compliance.
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
                  Medical Triage Built for Your Practice
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI triage assistant understands the unique clinical needs of different healthcare settings and adapts its protocols accordingly.
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
                  Simple integration, clinical results. Get your AI medical triage running in your practice quickly.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    step: "1", 
                    title: "Clinical Setup", 
                    description: "Configure clinical protocols, integrate with your EPR system, and customize triage pathways for your practice needs." 
                  },
                  { 
                    step: "2", 
                    title: "Staff Training", 
                    description: "Train your clinical team on the AI system, establish workflows, and ensure smooth integration with existing processes." 
                  },
                  { 
                    step: "3", 
                    title: "Live Triage", 
                    description: "Deploy intelligent patient triage with real-time clinical oversight and continuous quality monitoring." 
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
                Deploy Your AI <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Medical Triage</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Join leading healthcare providers improving patient outcomes. Start your intelligent triage transformation today.
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
                Setup in 48 hours • HIPAA & GDPR compliant • Clinical evidence-based
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
                  Trusted by <span className="text-blue-600">Healthcare Professionals</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how our AI medical triage has transformed patient care and clinical efficiency for healthcare providers worldwide.
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
                  Seamlessly integrate with your existing healthcare systems and clinical workflows.
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
                Ready to Transform <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Patient Care?</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Experience the future of medical triage. See how Robin can work for your specific healthcare practice.
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
                  Everything you need to know about our AI medical triage platform.
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

GPTriage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI GP Triage Assistant - Intelligent Medical Triage & Patient Assessment | Gozupees"
      description="Meet Robin, your AI GP triage assistant. Intelligent medical assessment, clinical decision support, and patient triage that improves care outcomes and reduces waiting times."
      canonical="https://gozupees.com/ai-voice-agents/gp-triage"
      ogImage="https://gozupees.com/images/gp-triage-ai.jpg"
    >
      {page}
    </Layout>
  );
};