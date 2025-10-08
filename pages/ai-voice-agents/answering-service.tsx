import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';

export default function AnsweringService() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps'
  });

  const [emblaIndustryRef, emblaIndustryApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps'
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  
  const [canScrollIndustryPrev, setCanScrollIndustryPrev] = useState(false);
  const [canScrollIndustryNext, setCanScrollIndustryNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const scrollIndustryPrev = useCallback(() => emblaIndustryApi && emblaIndustryApi.scrollPrev(), [emblaIndustryApi]);
  const scrollIndustryNext = useCallback(() => emblaIndustryApi && emblaIndustryApi.scrollNext(), [emblaIndustryApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onIndustrySelect = useCallback(() => {
    if (!emblaIndustryApi) return;
    setCanScrollIndustryPrev(emblaIndustryApi.canScrollPrev());
    setCanScrollIndustryNext(emblaIndustryApi.canScrollNext());
  }, [emblaIndustryApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaIndustryApi) return;
    onIndustrySelect();
    emblaIndustryApi.on('reInit', onIndustrySelect);
    emblaIndustryApi.on('select', onIndustrySelect);
  }, [emblaIndustryApi, onIndustrySelect]);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const { data: videos } = useQuery({
    queryKey: ['/api/solution-videos', 'answering-service'],
    queryFn: () => fetch(`/api/solution-videos?solutionSlug=answering-service`).then(res => res.json()),
  });

  const handlePlayDemo = (videoId: string, audioSrc: string) => {
    if (activeDemo === videoId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
        audioRef.current.play();
        setIsPlaying(true);
        setActiveDemo(videoId);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveDemo(null);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const demoAgents = [
    {
      id: 'alex',
      name: 'Alex',
      role: 'Medical Answering Service',
      description: 'Handles patient calls, appointment scheduling, and urgent medical queries with HIPAA compliance.',
      audioSrc: '/audio/alex-medical.mp3',
      avatar: '/avatars/alex.jpg',
      industry: 'Healthcare',
      useCases: ['Appointment booking', 'Prescription refills', 'Emergency routing', 'Patient inquiries']
    },
    {
      id: 'sarah',
      name: 'Sarah',
      role: 'Legal Intake Specialist',
      description: 'Professionally handles client intake, case inquiries, and appointment scheduling for law firms.',
      audioSrc: '/audio/sarah-legal.mp3',
      avatar: '/avatars/sarah.jpg',
      industry: 'Legal Services',
      useCases: ['Client intake', 'Case consultations', 'Appointment scheduling', 'Document requests']
    },
    {
      id: 'marcus',
      name: 'Marcus',
      role: 'Property Management Assistant',
      description: 'Manages tenant calls, maintenance requests, and property inquiries 24/7.',
      audioSrc: '/audio/marcus-property.mp3',
      avatar: '/avatars/marcus.jpg',
      industry: 'Real Estate',
      useCases: ['Maintenance requests', 'Tenant inquiries', 'Property showings', 'Emergency calls']
    },
    {
      id: 'lisa',
      name: 'Lisa',
      role: 'Financial Services Representative',
      description: 'Handles client inquiries, appointment scheduling, and account questions for financial advisors.',
      audioSrc: '/audio/lisa-financial.mp3',
      avatar: '/avatars/lisa.jpg',
      industry: 'Financial Services',
      useCases: ['Account inquiries', 'Appointment booking', 'Investment questions', 'Document requests']
    }
  ];

  const keyDifferentiators = [
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Availability", description: "Never miss a call, even outside business hours" },
    { icon: <Users className="w-6 h-6" />, title: "Professional Service", description: "Trained to handle calls like your best employee" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Smart Call Routing", description: "Directs calls to the right person or department" },
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Compliant", description: "HIPAA, GDPR, and industry-specific compliance" },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Response", description: "Answer calls within seconds, every time" },
    { icon: <Target className="w-6 h-6" />, title: "Custom Scripts", description: "Tailored responses for your business needs" }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "End-to-End Encryption", description: "All calls and data encrypted in transit and at rest" },
    { icon: <Lock className="w-6 h-6" />, title: "SOC 2 Type II Certified", description: "Highest security standards for data protection" },
    { icon: <Eye className="w-6 h-6" />, title: "HIPAA Compliance", description: "Full compliance with healthcare privacy regulations" },
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
      price: "$299",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "Up to 500 calls/month",
        "Basic call routing",
        "Email notifications",
        "Standard business hours",
        "Basic reporting"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$599",
      period: "/month",
      description: "Ideal for growing companies",
      features: [
        "Up to 1,500 calls/month",
        "Advanced call routing",
        "SMS & email notifications",
        "24/7 availability",
        "Custom scripts",
        "CRM integration",
        "Advanced reporting"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$1,299",
      period: "/month",
      description: "For large organizations",
      features: [
        "Up to 5,000 calls/month",
        "Priority routing",
        "Multi-channel support",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "White-label option"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Custom",
      price: "Contact",
      period: "us",
      description: "Tailored to your needs",
      features: [
        "Unlimited calls",
        "Custom development",
        "Enterprise integrations",
        "24/7 priority support",
        "Custom SLAs",
        "On-premise option"
      ],
      cta: "Talk to Sales",
      popular: false
    }
  ];

  const industryBenefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Healthcare",
      slug: "healthcare",
      description: "HIPAA-compliant patient communication, appointment scheduling, and emergency call routing.",
      features: ["Patient privacy protection", "Appointment management", "Emergency protocols", "Medical terminology"]
    },
    {
      icon: <Banknote className="w-8 h-8" />,
      title: "Financial Services",
      slug: "financial-services", 
      description: "Secure client communication, appointment booking, and account inquiry handling.",
      features: ["Financial compliance", "Account security", "Investment inquiries", "Advisor scheduling"]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Real Estate",
      slug: "real-estate",
      description: "Property inquiries, showing scheduling, and tenant management with 24/7 availability.",
      features: ["Property information", "Showing coordination", "Tenant support", "Lead qualification"]
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "eCommerce",
      slug: "ecommerce",
      description: "Order support, return processing, and customer service with product knowledge integration.",
      features: ["Order tracking", "Return processing", "Product support", "Customer retention"]
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Law Firms",
      slug: "law-firms",
      description: "Professional client intake, case consultation scheduling, and confidential communication handling.",
      features: ["Client confidentiality", "Case intake forms", "Attorney routing", "Consultation scheduling"]
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Accounting",
      slug: "accounting",
      description: "Client communication, tax appointment scheduling, and document collection coordination.",
      features: ["Tax season support", "Document requests", "Client onboarding", "Appointment scheduling"]
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Education",
      slug: "education",
      description: "Student inquiries, enrollment support, and parent communication with educational expertise.",
      features: ["Enrollment assistance", "Student support", "Parent communication", "Academic scheduling"]
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Recruitment",
      slug: "recruitment",
      description: "Candidate screening, interview scheduling, and client communication management.",
      features: ["Candidate screening", "Interview coordination", "Client updates", "Position inquiries"]
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Telecommunications",
      slug: "telecommunications",
      description: "Technical support, service inquiries, and installation scheduling with technical knowledge.",
      features: ["Technical troubleshooting", "Service scheduling", "Billing inquiries", "Installation coordination"]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Automobile",
      slug: "automobile",
      description: "Service appointment scheduling, parts inquiries, and warranty claim processing.",
      features: ["Service scheduling", "Parts availability", "Warranty support", "Maintenance reminders"]
    }
  ];

  const faqs = [
    {
      question: "How does AI answering service differ from traditional answering services?",
      answer: "Our AI answering service provides consistent, professional responses 24/7 without the variability of human operators. It can handle multiple calls simultaneously, never gets tired, and follows your exact protocols every time. Plus, it integrates directly with your business systems for seamless workflow automation."
    },
    {
      question: "Can the AI handle complex customer inquiries?",
      answer: "Yes, our AI is trained on your specific business knowledge and can handle most customer inquiries. For complex situations that require human intervention, the AI smoothly transfers calls to the appropriate team member with full context of the conversation."
    },
    {
      question: "Is my customer data secure?",
      answer: "Absolutely. We maintain SOC 2 Type II certification, HIPAA compliance, and use end-to-end encryption for all communications. Your data is never shared with third parties and remains completely under your control."
    },
    {
      question: "How quickly can I set up the answering service?",
      answer: "Setup typically takes 24-48 hours. This includes configuring your call routing, customizing scripts, integrating with your existing systems, and testing the service. Our team handles the entire setup process for you."
    },
    {
      question: "What happens if the AI can't answer a question?",
      answer: "The AI is designed to recognize when it needs human assistance. It will either transfer the call to an appropriate team member or take a detailed message with callback information. The system learns from these interactions to improve over time."
    },
    {
      question: "Can I customize the AI's responses and personality?",
      answer: "Yes, the AI can be fully customized to match your brand voice, use your specific terminology, and follow your exact protocols. You can adjust the personality, formality level, and even accent to align with your business needs."
    },
    {
      question: "Do you offer multilingual support?",
      answer: "Yes, our AI answering service supports over 40 languages and can automatically detect the caller's language preference or switch languages during the call based on customer needs."
    },
    {
      question: "What kind of reporting and analytics do you provide?",
      answer: "We provide comprehensive analytics including call volume, response times, resolution rates, customer satisfaction scores, and detailed conversation logs. You can also track conversion rates, peak call times, and identify areas for improvement."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Medical Practice Owner",
      company: "Central Valley Medical",
      content: "Our AI answering service has revolutionized patient communication. We never miss calls anymore, and patients love the immediate response even after hours.",
      rating: 5,
      avatar: "/testimonials/sarah-chen.jpg"
    },
    {
      name: "Marcus Rodriguez",
      role: "Managing Partner",
      company: "Rodriguez & Associates Law",
      content: "The professional handling of client intake calls has significantly improved our conversion rate. The AI understands legal terminology perfectly.",
      rating: 5,
      avatar: "/testimonials/marcus-rodriguez.jpg"
    },
    {
      name: "Jennifer Walsh",
      role: "Property Manager",
      company: "Coastal Properties",
      content: "24/7 tenant support has reduced our emergency response time dramatically. The AI handles maintenance requests efficiently and routes urgent issues properly.",
      rating: 5,
      avatar: "/testimonials/jennifer-walsh.jpg"
    }
  ];

  return (
      <div className="min-h-screen bg-dark text-white">
        <audio 
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadedMetadata={handleTimeUpdate}
        />

        {/* Hero Section */}
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
                      <Headphones className="w-4 h-4 mr-2" />
                      AI-Powered Call Handling
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Never{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Miss
                    </span>{' '}
                    a Call
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    Professional AI Answering Service
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Our AI answering service handles every call professionally, routes inquiries intelligently, and ensures your customers always reach the right person at the right time.
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
                  {/* AI Agent Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Headphones className="w-32 h-32 text-blue-400" />
                    </div>
                    
                    {/* Floating call indicators */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-8 -right-8 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Active</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-8 -left-8 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>24/7 Ready</span>
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

        {/* AI Answering Service Capabilities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  PROFESSIONAL CALL HANDLING
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  AI is <span className="text-blue-600">Transforming</span><br />
                  Business Communication
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover how leading businesses use AI answering services to provide exceptional customer experiences, capture every opportunity, and maintain professional communication around the clock.
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
                          Missed calls = lost business
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Limited service hours
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Inconsistent call quality
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          High staffing costs
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Long hold times
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          Poor customer experience
                        </div>
                        <div className="flex items-center text-red-700 text-base">
                          <X className="w-5 h-5 mr-3 text-red-500" />
                          No call analytics
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-red-200">
                      <p className="text-sm text-red-600 mb-3">
                        Traditional answering services are expensive, inconsistent, and can't handle the complexity of modern business communication needs.
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
                      <div className="space-y-4">
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          Professional AI agents
                        </div>
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          24/7 availability
                        </div>
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          Intelligent call routing
                        </div>
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          Industry-specific training
                        </div>
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          Instant response times
                        </div>
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          CRM integration
                        </div>
                        <div className="flex items-center text-blue-700 text-base">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
                          Real-time analytics
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-blue-200">
                      <p className="text-sm text-blue-600 mb-3">
                        Our AI answering service combines advanced natural language processing with industry-specific knowledge to deliver professional, consistent communication.
                      </p>
                      <div className="text-sm text-blue-500 font-medium">
                        GROWTH ENABLED →
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
                      <h4 className="font-semibold text-green-800 mb-4 text-base">THE RESULTS</h4>
                      <div className="space-y-4">
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          100% call capture rate
                        </div>
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          85% faster response times
                        </div>
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          60% cost reduction
                        </div>
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          95% customer satisfaction
                        </div>
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          24/7 professional service
                        </div>
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          Complete call insights
                        </div>
                        <div className="flex items-center text-green-700 text-base">
                          <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                          Seamless integration
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-green-200">
                      <p className="text-sm text-green-600 mb-3">
                        Businesses using our AI answering service see immediate improvements in customer satisfaction, operational efficiency, and revenue growth.
                      </p>
                      <div className="text-sm text-green-500 font-medium">
                        SUCCESS ACHIEVED ✓
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Gallery */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  HEAR THE DIFFERENCE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                  Experience Our AI <span className="text-blue-600">Answering Service</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Listen to how our AI agents handle real customer calls across different industries with professionalism and expertise.
                </p>
              </motion.div>

              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {demoAgents.map((agent, index) => (
                      <div key={agent.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                                {agent.name[0]}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-dark">{agent.name}</h3>
                                <p className="text-blue-600 text-sm font-medium">{agent.role}</p>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{agent.description}</p>
                            
                            <div className="mb-4">
                              <div className="text-xs text-gray-500 mb-2">SPECIALIZES IN:</div>
                              <div className="flex flex-wrap gap-1">
                                {agent.useCases.slice(0, 2).map((useCase, i) => (
                                  <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                    {useCase}
                                  </span>
                                ))}
                                {agent.useCases.length > 2 && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    +{agent.useCases.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <button
                                onClick={() => handlePlayDemo(agent.id, agent.audioSrc)}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                              >
                                {activeDemo === agent.id && isPlaying ? (
                                  <Pause className="w-5 h-5" />
                                ) : (
                                  <Play className="w-5 h-5" />
                                )}
                                <span>
                                  {activeDemo === agent.id && isPlaying ? 'Pause Demo' : 'Play Demo'}
                                </span>
                              </button>

                              {activeDemo === agent.id && (
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                    !canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                    !canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differentiators */}
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
                  Why Choose Our <span className="text-blue-600">AI Answering Service</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Advanced AI technology combined with industry expertise delivers superior call handling that scales with your business.
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
                  Your business communications are protected with the highest security standards and industry compliance requirements.
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

        {/* Industry-Specific Benefits */}
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
                  Tailored for <span className="text-blue-600">Every Industry</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI answering service is specifically trained for different industries, ensuring professional and knowledgeable interactions every time.
                </p>
              </motion.div>

              <div className="relative">
                <div className="overflow-hidden" ref={emblaIndustryRef}>
                  <div className="flex">
                    {industryBenefits.map((industry, index) => (
                      <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                        <Link href={`/ai-agents-by-industry/${industry.slug}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 h-full cursor-pointer group"
                          >
                            <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                              {industry.icon}
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-dark group-hover:text-blue-600 transition-colors duration-300">{industry.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{industry.description}</p>
                            <div className="space-y-2">
                              {industry.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                              Learn more →
                            </div>
                          </motion.div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                    !canScrollIndustryPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                  onClick={scrollIndustryPrev}
                  disabled={!canScrollIndustryPrev}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                    !canScrollIndustryNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                  onClick={scrollIndustryNext}
                  disabled={!canScrollIndustryNext}
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
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
                Create Your AI <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Answering Service</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Join thousands of businesses that never miss a call. Professional, intelligent, and available 24/7.
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
                Setup in 24 hours • No contracts • Cancel anytime
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
                  See how our AI answering service has transformed communication for businesses across industries.
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

        {/* Technology Stack Section */}
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

        {/* Pricing Section - Hidden for now */}
        {false && (
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
                  Plans That Scale With You
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose the perfect plan for your call volume and business needs. All plans include our core features.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className={`rounded-xl p-8 border-2 relative ${
                      tier.popular 
                        ? 'border-blue-500 bg-blue-50 transform scale-105' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-dark mb-2">{tier.name}</h3>
                      <p className="text-gray-600 mb-4">{tier.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-dark">{tier.price}</span>
                        <span className="text-gray-600 ml-1">{tier.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href={tier.cta === "Talk to Sales" ? "/contact" : "/signup"}
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors block ${
                        tier.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        )}

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
                Experience the future of business communication. See how our AI answering service can work for your specific needs.
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
                  Everything you need to know about our AI answering service.
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-dark pr-4">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
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

AnsweringService.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Answering Service - Never Miss Another Call | Gozupees"
      description="Professional AI answering service that handles your calls 24/7. HIPAA compliant, industry-specific training, and seamless integration with your business systems."
      canonical="https://gozupees.com/ai-voice-agents/answering-service"
      ogImage="https://gozupees.com/images/answering-service-ai.jpg"
    >
      {page}
    </Layout>
  );
};