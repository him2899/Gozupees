'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, PhoneCall, Building2, Heart, DollarSign, Shield, Scale, Calculator, Users, GraduationCap, Car, Home, Smartphone, ShoppingCart, Clock, ArrowRight, Phone, Wifi, Server } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/queryClient';
// import type { Demo } from '../../shared/schema';
import LeadFormModal from '../ui/LeadFormModal';
import Vapi from '@vapi-ai/web';

interface VoiceDemoGalleryIndustryFirstProps {
  onTryAgentClick?: (demo: any) => void;
}

// Industry categories with icons and color themes
const industries = [
  { name: 'Healthcare', icon: Heart, color: 'blue', gradient: 'from-blue-50 to-cyan-50', buttonColor: 'blue' },
  { name: 'Financial Services', icon: DollarSign, color: 'blue', gradient: 'from-blue-50 to-indigo-50', buttonColor: 'blue' },
  { name: 'Banking', icon: Building2, color: 'green', gradient: 'from-green-50 to-emerald-50', buttonColor: 'green' },
  { name: 'Mortgage Brokers', icon: Home, color: 'orange', gradient: 'from-orange-50 to-amber-50', buttonColor: 'orange' },
  { name: 'Insurance Brokers', icon: Shield, color: 'purple', gradient: 'from-purple-50 to-violet-50', buttonColor: 'purple' },
  { name: 'Law Firms', icon: Scale, color: 'slate', gradient: 'from-slate-100 to-gray-100', buttonColor: 'gray' },
  { name: 'Accounting Firms', icon: Calculator, color: 'green', gradient: 'from-green-50 to-emerald-50', buttonColor: 'green' },
  { name: 'Recruitment Agencies', icon: Users, color: 'pink', gradient: 'from-pink-50 to-rose-50', buttonColor: 'pink' },
  { name: 'Education Providers', icon: GraduationCap, color: 'yellow', gradient: 'from-yellow-100 to-amber-100', buttonColor: 'amber' },
  { name: 'Automobile Industry', icon: Car, color: 'red', gradient: 'from-red-50 to-orange-50', buttonColor: 'red' },
  { name: 'Real Estate Agencies', icon: Building2, color: 'cyan', gradient: 'from-cyan-100 to-teal-100', buttonColor: 'teal' },
  { name: 'Telecommunications', icon: Smartphone, color: 'indigo', gradient: 'from-indigo-50 to-blue-50', buttonColor: 'indigo' },
  { name: 'ISPs & MSPs', icon: Server, color: 'blue', gradient: 'from-blue-50 to-sky-50', buttonColor: 'blue' },
  { name: 'eCommerce', icon: ShoppingCart, color: 'purple', gradient: 'from-purple-50 to-violet-50', buttonColor: 'purple' }
];

// Map industries to use cases with demo data
const industryUseCases = {
  'Healthcare': [
    { title: 'Dental Receptionist', description: 'Handle dental office calls and appointments', demoName: 'Chloe' },
    { title: 'GP Triage', description: 'Medical triage and patient assessment', demoName: 'Robin' },
    { title: 'Vet Booking (Speciality)', description: 'Veterinary specialist appointments', demoName: 'Dean' },
    { title: 'Appointment Reminder (Outbound)', description: 'Automated patient reminders and follow-ups', demoName: 'Hope' }
  ],
  'Financial Services': [
    { title: 'Data Collection', description: 'Collect client data and financial information', demoName: 'Josh' },
    { title: 'Investment Fund Triage & Reception', description: 'Initial fund inquiry assessment and routing', demoName: 'Cooper' },
    { title: 'Appointment Reminder (Outbound)', description: 'Automated meeting and consultation reminders', demoName: 'Archer' },
    { title: 'Lead Qualification (Outbound)', description: 'Proactive lead outreach and qualification', demoName: 'Willow' }
  ],
  'Banking': [
    { title: 'Mortgage Concierge', description: 'Comprehensive mortgage support from pre-qualification to closing assistance', demoName: 'Cooper' },
    { title: 'Business Banking Butler', description: 'Dedicated support for business clients with account and transaction assistance', demoName: 'Marcus' },
    { title: 'Fraud Fighter', description: 'Proactive fraud detection and customer verification for account security', demoName: 'Alex' }
  ],
  'Mortgage Brokers': [
    { title: 'Application Support', description: 'Mortgage application assistance and documentation guidance', demoName: 'Joshua' },
    { title: 'Pre-Sale Information Provider', description: 'Mortgage product information and initial qualification', demoName: 'Emily' },
    { title: 'Loan Inquiry Assistants', description: 'Loan options analysis and interest rate comparisons', demoName: 'Lima' },
    { title: 'EMI Reminder (Outbound)', description: 'Payment reminders and EMI scheduling assistance', demoName: 'Jenny' },
    { title: 'Lead Qualification (Outbound)', description: 'Mortgage inquiry follow-up and borrower qualification', demoName: 'Cooper' }
  ],
  'Insurance Brokers': [
    { title: 'Application Support', description: 'Insurance application assistance and documentation guidance', demoName: 'Noah' },
    { title: 'Pre-Sale Information Provider', description: 'Insurance product information and coverage details', demoName: 'Ivy' },
    { title: 'Policy Inquiry Assistants', description: 'Policy details, coverage questions and benefit explanations', demoName: 'Lily' },
    { title: 'Premium Payment Reminder (Outbound)', description: 'Payment reminders and policy renewal notifications', demoName: 'Luke' },
    { title: 'Lead Qualification (Outbound)', description: 'Insurance inquiry follow-up and coverage needs assessment', demoName: 'Josie' }
  ],
  'Law Firms': [
    { title: 'Receptionist', description: 'Professional front desk support and call handling for law practices', demoName: 'Freya' },
    { title: 'Client Onboarding', description: 'New client intake and legal documentation assistance', demoName: 'Jack' },
    { title: 'Court Date Reminder (Outbound)', description: 'Court appearance and deadline notifications for clients', demoName: 'Isla' }
  ],
  'Accounting Firms': [
    { title: 'Receptionist', description: 'Professional call handling and appointment scheduling for accounting practices', demoName: 'Anna' },
    { title: 'Client Onboarding', description: 'New client setup and documentation for accounting services', demoName: 'Mia' },
    { title: 'Tax Date Notifications Reminder (Outbound)', description: 'Tax deadline reminders and filing notifications', demoName: 'Ava' }
  ],
  'Recruitment Agencies': [
    { title: 'Employer Assistant', description: 'Support for companies posting jobs and managing recruitment', demoName: 'Theo' },
    { title: 'Jobseeker Assistant', description: 'Career guidance and job matching for candidates', demoName: 'Archie' },
    { title: 'New Job Alert (Outbound)', description: 'Personalized job opportunity notifications for candidates', demoName: 'Leo' },
    { title: 'New Job Setup (Incoming)', description: 'New position intake and requirement gathering from employers', demoName: 'Fred' }
  ],
  'Education Providers': [
    { title: 'Receptionist', description: 'Educational institution front desk and inquiry management', demoName: 'Sienna' },
    { title: 'Admissions Support Assistant', description: 'Application guidance and enrollment process support', demoName: 'Oscar' },
    { title: 'Student Support Hotline', description: 'Academic support and student services assistance', demoName: 'Isabella' }
  ],
  'Automobile Industry': [
    { title: 'Sales Agent', description: 'Find your dream car with expert advice on features, pricing, and trade-in value', demoName: 'Max' },
    { title: 'Auto Finance Inquiry', description: 'Skip the paperwork hassle - get pre-approved and compare loan rates in minutes', demoName: 'Oliver' }
  ],
  'Real Estate Agencies': [
    { title: 'Inquiry Assistance', description: 'Property information and initial buyer/seller support', demoName: 'Sofia' },
    { title: 'Lead Qualification', description: 'Buyer and seller qualification and needs assessment', demoName: 'Alfie' },
    { title: 'New Property Alert', description: 'Automated notifications for matching property listings', demoName: 'Harper' },
    { title: 'Viewing Booking & Rescheduling', description: 'Property showing coordination and schedule management', demoName: 'James' }
  ],
  'Telecommunications': [
    { title: 'Retail B2C Internet Support', description: 'Internet setup and connectivity troubleshooting for residential customers', demoName: 'Anna' },
    { title: 'Engineer Appointments', description: 'Fiber installation and site visit scheduling for ISPs', demoName: 'George' },
    { title: 'Wholesale Order Support', description: 'Leased line and service order tracking for channel partners', demoName: 'Mark' },
    { title: 'Complaint & Triage (Traffic Lights)', description: 'Traffic light fault reporting and emergency network issues', demoName: 'Jane' },
    { title: 'Technical Testing (On call)', description: 'Live line testing and fault diagnosis for engineers and customers', demoName: 'Eliza' },
    { title: 'Internet Complaint Triage to ISP Support', description: 'Route support calls between Openreach and ISP helpdesks', demoName: 'Andrew' },
    { title: 'Appointment Reminder (Outbound)', description: 'Engineer visit confirmations and scheduling updates', demoName: 'Hailee' },
    { title: 'Lead Qualification Outbound', description: 'New broadband connection inquiry follow-up and qualification', demoName: 'Adam' }
  ],
  'ISPs & MSPs': [
    { title: 'Business Development', description: 'Technology solutions consultation for multi-tenant buildings and property performance enhancement', demoName: 'David' },
    { title: 'Monitoring Services', description: 'Proactive system monitoring and incident response coordination for critical situations', demoName: 'Maggie' },
    { title: 'Onboarding Specialist', description: 'Smooth move-in experience and resident setup assistance for new tenants', demoName: 'Soniya' },
    { title: 'Property Operations', description: 'Operational coordination, maintenance issues, and resident service management', demoName: 'Jake' },
    { title: 'Technical Support', description: 'Connectivity and technical issue resolution for residents and properties', demoName: 'Mary' }
  ],
  'eCommerce': [
    { title: 'Generator Sales Specialist - B2B', description: 'Find the perfect generator for your power needs - from portable backup to industrial-grade systems', demoName: 'Zeno' },
    { title: 'Baby Clothing Specialist - DTC', description: 'Discover adorable, organic baby clothing from Coco Moon Hawaii for your little one', demoName: 'Coco' },
    { title: 'Order & Product Support', description: 'Get instant order updates and expert guidance on home health devices', demoName: 'Holly' }
  ]
};

export default function VoiceDemoGalleryIndustryFirst({ onTryAgentClick }: VoiceDemoGalleryIndustryFirstProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industries[0].name);
  const [selectedDemo, setSelectedDemo] = useState<any | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedTranscript, setDisplayedTranscript] = useState('');
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [activeCallAgent, setActiveCallAgent] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch demos from the database
  const { data: demos = [], isLoading } = useQuery({
    queryKey: ['/api/demos'],
    queryFn: () => apiRequest('/api/demos'),
  });

  const handlePlayPause = () => {
    if (!audioRef.current || !selectedDemo) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleIndustrySelect = (industryName: string) => {
    setSelectedIndustry(industryName);
    setSelectedDemo(null);
    setSelectedUseCase(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDisplayedTranscript('');
  };

  // Agent-to-account mapping for multi-account VAPI support
  const agentAccountMapping: { [key: string]: 'default' | 'gzp' } = {
    // GoZupees main agents
    'Hannah': 'gzp',
    'Ollie': 'gzp',
    'Nova': 'gzp',
    'Zeno': 'gzp',
    'Cooper': 'gzp',
    'Sera': 'gzp',
    'Maya': 'gzp',
    'Kaylee': 'gzp',
    // Legacy agents
    'Marcus': 'gzp',
    'Alex': 'gzp', 
    // ISP/MSP agents use GZP account
    'David': 'gzp',
    'Maggie': 'gzp',
    'Soniya': 'gzp',
    'Jake': 'gzp',
    'Mary': 'gzp',
    // All other agents use default account
  };

  const getAssistantId = (agentName: string, config: any) => {
    const assistantIds: { [key: string]: string } = {
      // GoZupees main agents
      'Hannah': config.hannahAssistantId,
      'Ollie': config.ollieAssistantId,
      'Nova': config.novaAssistantId,
      'Zeno': config.zenoAssistantId,
      'Cooper': config.cooperAssistantId,
      'Sera': config.seraAssistantId,
      'Maya': config.mayaAssistantId,
      'Kaylee': config.kayleeAssistantId,
      // Legacy agents
      'Chloe': config.chloeAssistantId,
      'Tyche': config.tycheAssistantId,
      'Marcus': config.marcusAssistantId,
      'Alex': config.alexAssistantId,
      // Ask4 ISP/MSP assistants
      'David': config.davidAssistantId,
      'Maggie': config.maggieAssistantId,
      'Soniya': config.soniyaAssistantId,
      'Jake': config.jakeAssistantId,
      'Mary': config.maryAssistantId,
    };
    return assistantIds[agentName];
  };

  const handleVapiCall = async (agentName: string) => {
    try {
      // Prevent duplicate requests
      if (isConnecting === agentName) {
        console.log('Call already connecting for', agentName);
        return;
      }

      // If there's already an active call for this agent, end it
      if (activeCallAgent === agentName && vapi) {
        console.log(`Ending VAPI call with ${agentName}`);
        vapi.stop();
        setActiveCallAgent(null);
        setVapi(null);
        setIsConnecting(null);
        return;
      }

      // If there's a different agent's call active, end it first
      if (activeCallAgent && vapi) {
        vapi.stop();
        setVapi(null);
        setActiveCallAgent(null);
      }

      setIsConnecting(agentName);
      setActiveCallAgent(agentName);

      // Fetch VAPI configuration from API
      const configResponse = await fetch('/api/vapi-config');
      if (!configResponse.ok) {
        throw new Error('Failed to fetch VAPI configuration');
      }

      const config = await configResponse.json();

      if (config.error) {
        console.error('VAPI configuration error:', config.error);
        setActiveCallAgent(null);
        setIsConnecting(null);
        return;
      }

      // Determine which public key to use based on agent account
      const accountType = agentAccountMapping[agentName] || 'default';
      const publicKey = accountType === 'gzp' ? config.publicKeyGzp : config.publicKey;

      if (!publicKey) {
        console.error(`Public key not found for ${accountType} account`);
        setActiveCallAgent(null);
        setIsConnecting(null);
        return;
      }

      // Initialize VAPI instance with appropriate public key
      const vapiInstance = new Vapi(publicKey);
      setVapi(vapiInstance);

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('VAPI call started successfully');
        setIsConnecting(null);
        setActiveCallAgent(agentName);
      });

      vapiInstance.on('call-end', () => {
        console.log('VAPI call ended');
        setActiveCallAgent(null);
        setVapi(null);
        setIsConnecting(null);
      });

      vapiInstance.on('error', (error) => {
        console.error('VAPI error:', error);
        setActiveCallAgent(null);
        setVapi(null);
        setIsConnecting(null);
      });

      // Get the assistant ID based on agent name
      const assistantId = getAssistantId(agentName, config);

      if (!assistantId) {
        console.error('Assistant ID not found for', agentName);
        setActiveCallAgent(null);
        setIsConnecting(null);
        return;
      }

      console.log(`Starting VAPI call with ${agentName} using ${accountType} account`);
      await vapiInstance.start(assistantId);
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setActiveCallAgent(null);
      setVapi(null);
      setIsConnecting(null);
    }
  };

  const handleUseCaseSelect = (useCase: any) => {
    // Find demo by name
    const demo = demos.find((d: any) => d.name === useCase.demoName);
    if (demo) {
      setSelectedDemo(demo);
      setSelectedUseCase(useCase);
      setCurrentTime(0);
      setDisplayedTranscript('');
      if (isPlaying) {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    }
  };

  // Typewriter effect for transcript
  React.useEffect(() => {
    if (!selectedDemo?.transcript || !isPlaying) return;

    const transcript = selectedDemo.transcript;
    const totalDuration = selectedDemo.duration * 1000;
    const charDelay = totalDuration / transcript.length;

    let charIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (charIndex < transcript.length) {
        setDisplayedTranscript(transcript.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, charDelay);

    return () => clearInterval(typewriterInterval);
  }, [selectedDemo, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAvatarEmoji = (name: string) => {
    const avatars: { [key: string]: string } = {
      'Nina': '👩🏼‍💼',
      'Raj': '👨🏽‍💼', 
      'Jake': '👨🏻‍💼',
      'Carlos': '👨🏽‍💼',
      'Zara': '👩🏿‍💼',
      'Priya': '👩🏽‍💼',
      'Ella': '👩🏼‍💼',
      'Chloe': '👩🏻‍⚕️',
      'Robin': '👨🏼‍⚕️',
      'Dean': '👨🏽‍⚕️',
      'Hope': '👩🏽‍⚕️',
      'Josh': '👨🏽‍💼',
      'Cooper': '👨🏻‍💼',
      'Sera': '👩🏼‍💼',
      'Archer': '👨🏻‍💼',
      'Willow': '👩🏽‍💼',
      'Zeno': '👨🏻‍💻',
      'Coco': '👩🏽‍💻',
      'Holly': '👩🏼‍💻',
      'Max': '👨🏼‍💼',
      'Oliver': '👨🏽‍💼',
      'Anna': '👩🏼‍💻',
      'George': '👨🏽‍🔧',
      'Mark': '👨🏻‍💼',
      'Jane': '👩🏽‍💻',
      'Eliza': '👩🏻‍🔬',
      'Andrew': '👨🏼‍💻',
      'Hailee': '👩🏾‍💼',
      'Adam': '👨🏽‍💼',
      'Joshua': '👨🏽‍💼',
      'Emily': '👩🏻‍💼',
      'Lima': '👩🏼‍💼',
      'Jenny': '👩🏽‍💼',

      'Noah': '👨🏽‍💼',
      'Ivy': '👩🏻‍💼',
      'Lily': '👩🏼‍💼',
      'Luke': '👨🏼‍💼',
      'Josie': '👩🏾‍💼',
      'Freya': '👩🏼‍💼',
      'Jack': '👨🏻‍💼',
      'Isla': '👩🏻‍💼',
      'Mia': '👩🏼‍💼',
      'Ava': '👩🏻‍💼',
      'Theo': '👨🏽‍💼',
      'Archie': '👨🏼‍💼',
      'Leo': '👨🏻‍💼',
      'Fred': '👨🏽‍💼',
      'Sienna': '👩🏼‍🎓',
      'Oscar': '👨🏽‍🎓',
      'Isabella': '👩🏽‍🎓',
      'Sofia': '👩🏻‍💼',
      'Alfie': '👨🏼‍💼',
      'Harper': '👩🏾‍💼',
      'James': '👨🏽‍💼',
      'Marcus': '👨🏽‍💼',
      'Alex': '👨🏻‍💼',
      // Ask4 ISP/MSP team
      'David': '👨🏼‍💼',
      'Maggie': '👩🏽‍💻',
      'Soniya': '👩🏽‍💼',
      'Mary': '👩🏼‍💻'
    };
    return avatars[name] || '👤';
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading industry demos...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentUseCases = industryUseCases[selectedIndustry as keyof typeof industryUseCases] || [];
  const selectedIndustryData = industries.find(ind => ind.name === selectedIndustry);
  const industryTheme = selectedIndustryData?.color || 'blue';
  const industryGradient = selectedIndustryData?.gradient || 'from-blue-50 to-indigo-50';
  const buttonColor = selectedIndustryData?.buttonColor || 'blue';

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top CTA */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg mb-4">
              Don't see your business or use case listed here? We love custom builds.{' '}
              <a 
                href="/contact" 
                className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
              >
                Talk to our team
              </a>
            </p>
          </motion.div>

          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI Agents Across Industries
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Select your industry to see relevant AI agent use cases and test them live
            </motion.p>
          </div>

          {/* Main Layout: Industries on Left, Demo on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* Left Panel - Industry Selection */}
            <div className="flex flex-col">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-4 md:p-6 h-full shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Select Your Industry</h3>
                </div>
                
                {/* Enhanced Industry Grid */}
                <div className="space-y-2">
                  {industries.map((industryItem, index) => {
                    const useCaseCount = industryUseCases[industryItem.name as keyof typeof industryUseCases]?.length || 0;
                    const IconComponent = industryItem.icon;
                    const isSelected = selectedIndustry === industryItem.name;
                    
                    return (
                      <motion.button
                        key={`industry-${industryItem.name}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 group ${
                          isSelected
                            ? `bg-gradient-to-r ${industryItem.gradient} border border-${industryItem.color}-200 shadow-md` 
                            : 'hover:bg-white hover:shadow-sm text-gray-700 hover:text-gray-900 border border-transparent'
                        }`}
                        onClick={() => handleIndustrySelect(industryItem.name)}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-white/70 text-gray-700 shadow-sm' 
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-600'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className={`font-medium text-sm md:text-base transition-colors ${
                            isSelected ? 'text-gray-900' : ''
                          }`}>
                            {industryItem.name}
                          </div>
                        </div>
                        
                        <div className={`text-xs px-2 py-1 rounded-full transition-colors ${
                          isSelected 
                            ? 'bg-white/70 text-gray-700' 
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {useCaseCount > 0 ? `${useCaseCount} cases` : 'Soon'}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel - Use Cases & Demo */}
            <div className="flex flex-col">
              <div className={`bg-gradient-to-br ${industryGradient} border border-gray-200 rounded-2xl p-4 md:p-6 h-full shadow-lg backdrop-blur-sm`}>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  {selectedIndustryData && (
                    <div className={`w-6 h-6 bg-${industryTheme}-500 rounded-lg flex items-center justify-center`}>
                      <selectedIndustryData.icon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {selectedIndustry} Use Cases
                  </h3>
                </div>

                {currentUseCases.length > 0 ? (
                  <div className="space-y-4">
                    {/* Use Cases List */}
                    <div className="space-y-4">
                      {currentUseCases.map((useCase, index) => {
                        const agentDemo = demos.find((d: any) => d.name === useCase.demoName);
                        return (
                          <motion.div
                            key={`${selectedIndustry}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                              selectedUseCase?.title === useCase.title
                                ? `ring-2 ring-${industryTheme}-300 border-${industryTheme}-300 bg-white`
                                : 'hover:border-white/70 hover:bg-white/90'
                            }`}
                          >
                            {/* Agent Header */}
                            <div className="flex items-start gap-4 mb-3">
                              <div className="relative">
                                <div className={`w-20 h-20 bg-gradient-to-br from-${industryTheme}-100 to-${industryTheme}-200 rounded-full flex items-center justify-center text-2xl border-3 border-white shadow-lg`}>
                                  {agentDemo?.avatarUrl ? (
                                    <img 
                                      src={agentDemo.avatarUrl} 
                                      alt={useCase.demoName}
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  ) : (
                                    <span>{getAvatarEmoji(useCase.demoName)}</span>
                                  )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white animate-pulse"></div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-xl mb-1">
                                  {useCase.demoName}
                                </h4>
                                <p className="text-sm text-gray-600 mb-3">
                                  {useCase.title} Specialist
                                </p>
                                
                                {/* Language Flag Tag */}
                                <div className="flex gap-2">
                                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                    <span className="text-xs">🇺🇸</span>
                                    {agentDemo?.language?.split(' ')[0] || 'English'}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {useCase.description}
                              </p>
                            </div>

                            {/* VAPI Call Button */}
                            <div className="space-y-2">
                              {/* Talk to Agent Button */}
                              {['Marcus', 'Alex', 'Cooper', 'Chloe', 'Zeno', 'Sera', 'David', 'Maggie', 'Soniya', 'Jake', 'Mary'].includes(useCase.demoName) ? (
                                <button
                                  onClick={() => handleVapiCall(useCase.demoName)}
                                  disabled={isConnecting === useCase.demoName}
                                  className={`w-full ${
                                    selectedIndustry === 'Healthcare' 
                                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                                      : selectedIndustry === 'Banking'
                                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                                      : selectedIndustry === 'eCommerce'
                                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700'
                                      : `bg-gradient-to-r from-${buttonColor}-600 to-${buttonColor}-700 hover:from-${buttonColor}-700 hover:to-${buttonColor}-800`
                                  } text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  <Phone className="w-4 h-4" />
                                  <span>
                                    {isConnecting === useCase.demoName 
                                      ? 'Connecting...' 
                                      : activeCallAgent === useCase.demoName 
                                        ? 'Call Active - Click to End' 
                                        : `Talk to ${useCase.demoName} Now`
                                    }
                                  </span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    // Industry pages removed - showing generic coming soon message for all agents
                                    alert(`Coming soon: ${useCase.demoName}'s dedicated agent page`);
                                  }}
                                  className={`w-full ${
                                    selectedIndustry === 'Healthcare' 
                                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                                      : selectedIndustry === 'Mortgage Brokers'
                                      ? 'bg-gradient-to-r from-orange-700 to-orange-900 hover:from-orange-800 hover:to-orange-950'
                                      : selectedIndustry === 'Banking'
                                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                                      : `bg-gradient-to-r from-${buttonColor}-600 to-${buttonColor}-700 hover:from-${buttonColor}-700 hover:to-${buttonColor}-800`
                                  } text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group`}
                            >
                                  <PhoneCall className="w-4 h-4" />
                                  Talk to {useCase.demoName} Live
                                  <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                  >
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </motion.div>
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>


                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Use cases for {selectedIndustry} coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-6 border border-purple-500/30 max-w-2xl mx-auto">
              <p className="text-gray-700 text-lg mb-4">
                Don't see your business or use case listed here? We love custom builds.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Talk to our team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        useCase={selectedUseCase ? `${selectedUseCase.title} - ${selectedIndustry}` : ''}
      />
    </section>
  );
}