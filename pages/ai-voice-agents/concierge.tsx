import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Phone, Calendar, ArrowRight, Pause, Clock, Star, Shield, Zap, Target, TrendingUp, MessageSquare, User, Building, X, Lock, Eye, FileText, Settings, ChevronDown, ChevronUp, DollarSign, Headphones, Globe, Smartphone, ChevronLeft, ChevronRight, Heart, Banknote, Home, Scale, ShoppingCart, Calculator, GraduationCap, UserCheck, Wifi, Car, MapPin, Bell, Coffee } from 'lucide-react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';


export default function Concierge() {
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
    queryKey: ['solution-videos', 'concierge'],
    queryFn: async () => {
      const response = await fetch('/api/solution-videos?solutionSlug=concierge');
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
      name: "Hospitality", 
      icon: <Coffee className="w-8 h-8" />, 
      description: "Guest services, reservations, concierge requests, and premium hospitality experiences",
      valueStatement: "Elevate guest satisfaction with 24/7 luxury concierge services that never sleep",
      href: "/ai-agents-by-industry/hospitality"
    },
    { 
      name: "Real Estate", 
      icon: <Home className="w-8 h-8" />, 
      description: "Property concierge, tenant services, maintenance coordination, and luxury amenities",
      valueStatement: "Provide premium resident services with intelligent concierge support",
      href: "/ai-agents-by-industry/real-estate"
    },
    { 
      name: "Corporate Services", 
      icon: <Building className="w-8 h-8" />, 
      description: "Executive assistance, office management, event coordination, and business concierge",
      valueStatement: "Streamline corporate operations with intelligent executive support services",
      href: "/ai-agents-by-industry/corporate"
    },
    { 
      name: "Healthcare", 
      icon: <Heart className="w-8 h-8" />, 
      description: "Patient concierge, appointment coordination, medical tourism, and wellness services",
      valueStatement: "Enhance patient experience with personalized healthcare concierge support",
      href: "/ai-agents-by-industry/healthcare"
    },
    { 
      name: "Financial Services", 
      icon: <Banknote className="w-8 h-8" />, 
      description: "Private banking concierge, wealth management support, and VIP client services",
      valueStatement: "Deliver white-glove financial services with intelligent client concierge",
      href: "/ai-agents-by-industry/financial-services"
    },
    { 
      name: "Retail & Luxury", 
      icon: <ShoppingCart className="w-8 h-8" />, 
      description: "Personal shopping, luxury services, product curation, and premium customer support",
      valueStatement: "Create exceptional retail experiences with personalized luxury concierge",
      href: "/ai-agents-by-industry/retail"
    }
  ];

  const capabilities = [
    { 
      icon: <Bell className="w-8 h-8" />, 
      title: "24/7 Availability", 
      description: "Always-on concierge services that never sleep, ensuring your clients receive premium support around the clock.",
      stats: { value: "24/7", label: "Availability" }
    },
    { 
      icon: <MapPin className="w-8 h-8" />, 
      title: "Local Expertise", 
      description: "Deep knowledge of local services, restaurants, events, and recommendations tailored to your client's needs.",
      stats: { value: "1000+", label: "Local Partners" }
    },
    { 
      icon: <Calendar className="w-8 h-8" />, 
      title: "Event Coordination", 
      description: "Seamless planning and coordination of events, reservations, and special occasions with meticulous attention to detail.",
      stats: { value: "95%", label: "Success Rate" }
    },
    { 
      icon: <Phone className="w-8 h-8" />, 
      title: "Instant Response", 
      description: "Immediate response to client requests with intelligent routing and priority handling for urgent needs.",
      stats: { value: "<30s", label: "Response Time" }
    }
  ];

  const keyDifferentiators = [
    { icon: <Zap className="w-6 h-6" />, title: "Instant Service", description: "Immediate response to all concierge requests with smart prioritization" },
    { icon: <Users className="w-6 h-6" />, title: "Personal Touch", description: "Remembers preferences and personalizes every interaction" },
    { icon: <Globe className="w-6 h-6" />, title: "Global Network", description: "Access to worldwide services and local expertise anywhere" },
    { icon: <Shield className="w-6 h-6" />, title: "Trusted & Secure", description: "Enterprise-grade security for all client information and requests" },
    { icon: <Target className="w-6 h-6" />, title: "Tailored Solutions", description: "Customized concierge services for your specific industry needs" },
    { icon: <Clock className="w-6 h-6" />, title: "Proactive Support", description: "Anticipates needs and provides proactive assistance" }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "End-to-End Encryption", description: "All client data and requests encrypted in transit and at rest" },
    { icon: <Lock className="w-6 h-6" />, title: "SOC 2 Type II Certified", description: "Highest security standards for handling sensitive client information" },
    { icon: <Eye className="w-6 h-6" />, title: "Privacy Compliance", description: "Full GDPR and privacy regulation compliance for global operations" },
    { icon: <FileText className="w-6 h-6" />, title: "Audit Logs", description: "Complete audit trail of all concierge interactions and requests" },
    { icon: <Settings className="w-6 h-6" />, title: "Access Control", description: "Granular permissions and role-based access management" }
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
      name: "Sarah Mitchell",
      role: "General Manager",
      company: "The Luxury Resort Group",
      content: "Our AI concierge has transformed guest experiences. Requests are handled instantly, and our satisfaction scores have never been higher.",
      rating: 5,
      avatar: "/testimonials/sarah-mitchell.jpg"
    },
    {
      name: "David Chen",
      role: "Property Manager",
      company: "Prime Residences",
      content: "The level of service our residents receive is now consistently exceptional. The AI understands preferences and delivers personalized experiences.",
      rating: 5,
      avatar: "/testimonials/david-chen.jpg"
    },
    {
      name: "Maria Rodriguez",
      role: "Client Services Director",
      company: "Elite Banking Group",
      content: "Our VIP clients expect the highest level of service. The AI concierge delivers that premium experience 24/7 without compromise.",
      rating: 5,
      avatar: "/testimonials/maria-rodriguez.jpg"
    }
  ];

  const faqs = [
    {
      question: "How does AI concierge differ from traditional concierge services?",
      answer: "Our AI concierge provides instant, 24/7 availability with consistent service quality. It learns from every interaction, maintains detailed preference profiles, and can handle multiple requests simultaneously while seamlessly escalating complex needs to human specialists."
    },
    {
      question: "Can the AI handle complex, personalized requests?",
      answer: "Yes, our AI concierge specializes in personalized service. It maintains detailed profiles of preferences, past requests, and special requirements. For complex arrangements requiring human touch, it seamlessly coordinates with our network of specialists while maintaining full context."
    },
    {
      question: "What types of concierge services can it provide?",
      answer: "The AI concierge handles restaurant reservations, event planning, travel arrangements, local recommendations, appointment scheduling, service provider coordination, emergency assistance, and much more. It's trained specifically for your industry's unique concierge needs."
    },
    {
      question: "How does it maintain the luxury service standards?",
      answer: "Our AI is trained on luxury service protocols and understands the nuances of premium hospitality. It uses sophisticated language models to communicate with the appropriate tone, maintains confidentiality, and ensures every interaction reflects your brand's service standards."
    },
    {
      question: "Can it integrate with existing systems?",
      answer: "Absolutely. The AI concierge integrates with your existing CRM, property management systems, booking platforms, and communication tools. This ensures seamless operations and maintains a unified view of all client interactions and preferences."
    },
    {
      question: "How quickly can it be implemented?",
      answer: "Implementation typically takes 48-72 hours. This includes system integration, service customization, staff training, and testing. We work closely with your team to ensure a smooth transition that enhances rather than disrupts your current operations."
    },
    {
      question: "What languages does it support?",
      answer: "The AI concierge supports over 40 languages and can automatically detect language preferences. It's particularly adept at handling multilingual clients and can switch languages seamlessly within conversations to provide truly personalized service."
    },
    {
      question: "How does it handle confidential client information?",
      answer: "Privacy and confidentiality are paramount. All client data is encrypted and stored securely with enterprise-grade protection. The AI follows strict confidentiality protocols and only accesses information necessary to fulfill specific requests, maintaining the highest standards of discretion."
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
                      <Bell className="w-4 h-4 mr-2" />
                      Premium AI Concierge
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    Luxury{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Concierge
                    </span>{' '}
                    Service
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                  >
                    That Never Sleeps
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                  >
                    Meet your AI concierge that delivers premium, personalized service 24/7. From restaurant reservations to complex event planning, experience luxury service that scales with your business.
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
                  {/* Concierge Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Bell className="w-32 h-32 text-blue-400" />
                    </div>
                    
                    {/* Floating service indicators */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-8 -right-8 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>24/7 Service</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-8 -left-8 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <Coffee className="w-4 h-4" />
                      <span>Luxury Ready</span>
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

        {/* Chloe's Capabilities - Compact Section */}
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
                PREMIUM CONCIERGE CAPABILITIES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                Meet Your AI <span className="text-blue-600">Concierge</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our intelligent concierge transforms client experiences with personalized, luxury-level service that's available 24/7.
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
        <section id="concierge-demo" className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - ConciergeBot Pro */}
                <div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bell className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900">ConciergeBot Pro</h3>
                        <p className="text-gray-600">AI Luxury Concierge</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">Premium AI concierge that handles luxury service requests, coordinates reservations, and manages client experiences with 24/7 availability and sophisticated service protocols.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Luxury Service</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">100%</div>
                        <div className="text-sm text-gray-500">Personalized</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">98%</div>
                        <div className="text-sm text-gray-500">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">5⭐</div>
                        <div className="text-sm text-gray-500">Service Level</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose ConciergeBot Pro:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Instant luxury service requests</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Global network of premium partners</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Personalized preference management</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>Seamless event coordination</span>
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
                          <Bell className="h-16 w-16 mx-auto mb-4" />
                          <p className="text-lg font-semibold">ConciergeBot Demo</p>
                          <p className="text-sm opacity-90">See luxury AI in action</p>
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
                        <span className="text-gray-900 font-medium">2:30</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Featured Services</span>
                        <span className="text-gray-900 font-medium">Reservations & Events</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Response Time</span>
                        <span className="text-green-600 font-medium">Instant</span>
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
                  Why Choose Our <span className="text-blue-600">AI Concierge</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Advanced AI technology meets luxury service standards to deliver exceptional experiences that exceed client expectations.
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
                  Your clients' privacy and confidentiality are protected with the highest security standards and compliance protocols.
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
                  Our AI concierge understands the unique requirements of different industries and adapts its service approach accordingly.
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
                  Simple integration, powerful results. Get your AI concierge running in just a few steps.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    step: "1", 
                    title: "Setup & Integration", 
                    description: "Connect your existing systems and customize service protocols to match your brand standards." 
                  },
                  { 
                    step: "2", 
                    title: "Training & Personalization", 
                    description: "Train the AI on your specific services, preferences, and luxury standards for personalized experiences." 
                  },
                  { 
                    step: "3", 
                    title: "Launch & Scale", 
                    description: "Go live with 24/7 concierge services and scale effortlessly as your client base grows." 
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
                Launch Your AI <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Concierge</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Join luxury brands delivering exceptional experiences. Start transforming your client service today.
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
                Setup in 48 hours • Premium support • Enterprise security
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
                  Trusted by <span className="text-blue-600">Luxury Brands</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how our AI concierge has elevated service standards for premium brands worldwide.
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
                Experience the future of luxury service. See how our AI concierge can work for your specific needs.
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
                  Everything you need to know about your AI concierge service.
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

Concierge.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Concierge - Premium Digital Concierge Services | Gozupees"
      description="Elevate client experiences with our AI concierge service. 24/7 luxury support, personalized assistance, and seamless service delivery for hospitality, real estate, and premium brands."
      canonical="https://gozupees.com/ai-voice-agents/concierge"
      ogImage="https://gozupees.com/images/ai-concierge-service.jpg"
    >
      {page}
    </Layout>
  );
};