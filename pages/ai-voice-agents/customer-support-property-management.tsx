import React, { useState, useEffect, useRef } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Calendar, 
  Clock, 
  Users, 
  Shield, 
  CheckCircle, 
  X, 
  Play,
  Headphones,
  Globe,
  Building,
  FileText,
  BarChart3,
  Zap,
  Lock,
  Award,
  PhoneCall,
  Server,
  Wifi,
  Database,
  AlertCircle,
  Home,
  Wrench,
  Thermometer,
  AlertTriangle,
  Heart,
  Accessibility
} from 'lucide-react';

function MayaPropertyManagementAgent() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [isVapiLoaded, setIsVapiLoaded] = useState(false);
  const [vapi, setVapi] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const [transcript, setTranscript] = useState<Array<{role: string, text: string, timestamp: Date}>>([]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [currentUserSpeech, setCurrentUserSpeech] = useState('');
  const [currentAssistantSpeech, setCurrentAssistantSpeech] = useState('');
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const speechBufferRef = useRef({ user: '', assistant: '', isSpeaking: false, role: '' });

  useEffect(() => {
    // Load VAPI SDK
    const loadVapi = async () => {
      try {
        const { default: Vapi } = await import('@vapi-ai/web');
        const vapiInstance = new Vapi('b38c975f-ed60-4944-9846-36fca37e5305');
        
        // Set up event listeners
        vapiInstance.on('call-start', () => {
          setCallStatus('Connected');
          setTranscript([{role: 'system', text: 'Call connected - start speaking!', timestamp: new Date()}]);
        });

        vapiInstance.on('call-end', () => {
          setIsCallActive(false);
          setCallStatus('Call ended');
          // Add final speech segments before ending
          if (currentUserSpeech.trim()) {
            setTranscript(prev => [...prev, {role: 'user', text: currentUserSpeech.trim(), timestamp: new Date()}]);
          }
          if (currentAssistantSpeech.trim()) {
            setTranscript(prev => [...prev, {role: 'assistant', text: currentAssistantSpeech.trim(), timestamp: new Date()}]);
          }
          setCurrentUserSpeech('');
          setCurrentAssistantSpeech('');
          setTimeout(() => setShowCallModal(false), 3000);
        });

        vapiInstance.on('speech-start', () => {
          setCallStatus('Listening...');
          speechBufferRef.current.isSpeaking = true;
          speechBufferRef.current.role = '';
        });

        vapiInstance.on('speech-end', () => {
          setCallStatus('Processing...');
          speechBufferRef.current.isSpeaking = false;
          
          // Finalize the current speech buffer
          const role = speechBufferRef.current.role;
          if (role === 'user' && speechBufferRef.current.user.trim()) {
            setTranscript(prev => [...prev, {
              role: 'user',
              text: speechBufferRef.current.user.trim(),
              timestamp: new Date()
            }]);
            speechBufferRef.current.user = '';
            setCurrentUserSpeech('');
          } else if (role === 'assistant' && speechBufferRef.current.assistant.trim()) {
            setTranscript(prev => [...prev, {
              role: 'assistant',
              text: speechBufferRef.current.assistant.trim(),
              timestamp: new Date()
            }]);
            speechBufferRef.current.assistant = '';
            setCurrentAssistantSpeech('');
          }
        });

        vapiInstance.on('message', (message: any) => {
          console.log('VAPI Message:', message);
          
          if (message.type === 'transcript') {
            const role = message.role === 'user' ? 'user' : 'assistant';
            const text = message.transcript || message.text || '';
            
            if (message.transcriptType === 'partial') {
              // Update current speech display
              if (role === 'user') {
                setCurrentUserSpeech(text);
                speechBufferRef.current.user = text;
              } else {
                setCurrentAssistantSpeech(text);
                speechBufferRef.current.assistant = text;
              }
            } else if (message.transcriptType === 'final') {
              // Finalize the transcript
              if (role === 'user') {
                setCurrentUserSpeech('');
                speechBufferRef.current.user = '';
                setTranscript(prev => [...prev, {role, text, timestamp: new Date()}]);
              } else {
                setCurrentAssistantSpeech('');
                speechBufferRef.current.assistant = '';
                setTranscript(prev => [...prev, {role, text, timestamp: new Date()}]);
              }
            }
          }
        });

        vapiInstance.on('error', (error: any) => {
          console.error('VAPI Error:', error);
          setCallStatus('Error: ' + (error.message || 'Connection failed'));
          setIsCallActive(false);
        });

        setVapi(vapiInstance);
        setIsVapiLoaded(true);
        console.log('VAPI SDK loaded successfully');
      } catch (error) {
        console.error('Failed to load VAPI:', error);
        setCallStatus('Failed to load voice system');
      }
    };

    loadVapi();
  }, []);

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript, currentUserSpeech, currentAssistantSpeech]);

  const startVapiCall = () => {
    if (vapi && isVapiLoaded) {
      setTranscript([]);
      setCurrentUserSpeech('');
      setCurrentAssistantSpeech('');
      speechBufferRef.current = { user: '', assistant: '', isSpeaking: false, role: '' };
      setCallStatus('Connecting...');
      setShowCallModal(true);
      setIsCallActive(true);
      
      try {
        console.log('Starting VAPI with agent ID:', 'b27be812-9739-414d-9307-6315ab7a9d9f');
        vapi.start('b27be812-9739-414d-9307-6315ab7a9d9f');
      } catch (error) {
        console.error('Error starting VAPI call:', error);
        setCallStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    } else {
      setCallStatus('Voice system not ready');
    }
  };

  const endVapiCall = () => {
    if (vapi && isCallActive) {
      vapi.stop();
      setIsCallActive(false);
      setShowCallModal(false);
      setCallStatus('Ready');
    }
  };

  const useCases = [
    {
      title: "Repairs & Maintenance",
      icon: <Wrench className="w-8 h-8" />,
      description: "Handles repair requests, emergency assessments, and maintenance scheduling",
      features: [
        "Emergency vs routine repair classification",
        "DIY guidance and troubleshooting tips",
        "Automatic repair ticket creation",
        "Damp/mould survey requests",
        "Contractor scheduling coordination"
      ]
    },
    {
      title: "Heating & Gas Issues",
      icon: <Thermometer className="w-8 h-8" />,
      description: "Manages heating systems, gas safety, and emergency escalation",
      features: [
        "Gas safety checks and protocols",
        "Boiler reset guidance",
        "Engineer appointment booking",
        "Emergency gas leak escalation",
        "Heating system diagnostics"
      ]
    },
    {
      title: "Anti-Social Behaviour",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Records incidents, assesses risk levels, and manages case prioritization",
      features: [
        "Incident recording and documentation",
        "Risk assessment and priority tagging",
        "Evidence collection guidance",
        "Case management integration",
        "Escalation to appropriate teams"
      ]
    },
    {
      title: "Complaints & Tenancy",
      icon: <FileText className="w-8 h-8" />,
      description: "Handles formal complaints, tenancy queries, and policy explanations",
      features: [
        "Stage 1 complaint processing",
        "Tenancy agreement explanations",
        "Policy clarifications",
        "Documentation requests",
        "Appeals process guidance"
      ]
    },
    {
      title: "Welfare & Safeguarding",
      icon: <Heart className="w-8 h-8" />,
      description: "Provides welfare support, emergency signposting, and safeguarding alerts",
      features: [
        "Urgency assessment protocols",
        "Emergency service signposting",
        "Safeguarding team alerts",
        "Support referral coordination",
        "Crisis intervention guidance"
      ]
    },
    {
      title: "Accessibility Support",
      icon: <Accessibility className="w-8 h-8" />,
      description: "Arranges accessibility services and support accommodations",
      features: [
        "Interpreter service booking",
        "Large-print material requests",
        "Accessibility adjustment coordination",
        "Support service referrals",
        "Communication preference setup"
      ]
    }
  ];

  const integrations = [
    {
      category: "Property Management",
      tools: [
        { name: "Capita", domain: "capita.com" },
        { name: "Northgate", domain: "northgateps.com" },
        { name: "Orchard", domain: "orchard-systems.co.uk" },
        { name: "MIS Active Management", domain: "misam.co.uk" }
      ],
      description: "Direct integration with housing management systems"
    },
    {
      category: "Communication",
      tools: [
        { name: "Twilio", domain: "twilio.com" },
        { name: "SendGrid", domain: "sendgrid.com" },
        { name: "Microsoft Teams", domain: "microsoft.com" },
        { name: "Slack", domain: "slack.com" }
      ],
      description: "Multi-channel messaging and notifications"
    },
    {
      category: "Appointment Systems",
      tools: [
        { name: "Calendly", domain: "calendly.com" },
        { name: "Microsoft Bookings", domain: "microsoft.com" },
        { name: "Acuity", domain: "acuityscheduling.com" },
        { name: "Google Calendar", domain: "google.com" }
      ],
      description: "Real-time availability and scheduling"
    },
    {
      category: "Support Services",
      tools: [
        { name: "ServiceNow", domain: "servicenow.com" },
        { name: "Zendesk", domain: "zendesk.com" },
        { name: "Freshworks", domain: "freshworks.com" },
        { name: "Salesforce", domain: "salesforce.com" }
      ],
      description: "Ticket management and case tracking"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "£399",
      period: "/month",
      description: "Perfect for small housing associations",
      features: [
        { name: "Core Voice AI", included: true },
        { name: "Minutes Included", value: "2,000" },
        { name: "Inbound Call Handling", included: true },
        { name: "Outbound Calling", included: false },
        { name: "Real-time Conversation", included: true },
        { name: "Voice Quality", value: "Standard" },
        { name: "Natural Language Processing", value: "Basic" },
        { name: "Conversation Memory", value: "Session Only" },
        { name: "Multi-turn Conversations", included: true },
        { name: "Interruption Handling", included: false },
        { name: "GDPR Compliance", included: true },
        { name: "UK Data Residency", included: false }
      ]
    },
    {
      name: "Professional",
      price: "£799",
      period: "/month",
      description: "Ideal for growing housing providers",
      popular: true,
      features: [
        { name: "Core Voice AI", included: true },
        { name: "Minutes Included", value: "5,000" },
        { name: "Inbound Call Handling", included: true },
        { name: "Outbound Calling", included: true },
        { name: "Real-time Conversation", included: true },
        { name: "Voice Quality", value: "High Quality" },
        { name: "Natural Language Processing", value: "Advanced" },
        { name: "Conversation Memory", value: "28 days" },
        { name: "Multi-turn Conversations", included: true },
        { name: "Interruption Handling", included: true },
        { name: "GDPR Compliance", included: true },
        { name: "UK Data Residency", included: true }
      ]
    },
    {
      name: "Enterprise",
      price: "£1,599",
      period: "/month",
      description: "For large housing operations",
      features: [
        { name: "Core Voice AI", included: true },
        { name: "Minutes Included", value: "12,000" },
        { name: "Inbound Call Handling", included: true },
        { name: "Outbound Calling", included: true },
        { name: "Real-time Conversation", included: true },
        { name: "Voice Quality", value: "Premium" },
        { name: "Natural Language Processing", value: "Custom Trained" },
        { name: "Conversation Memory", value: "Unlimited" },
        { name: "Multi-turn Conversations", included: true },
        { name: "Interruption Handling", included: true },
        { name: "GDPR Compliance", included: true },
        { name: "UK Data Residency", included: true }
      ]
    }
  ];

  const otherAgents = [
    {
      name: "Rent Collection Agent",
      description: "Handles payment reminders, arrears management, and payment plan negotiations with empathy.",
      capabilities: ["Payment reminders", "Arrears discussions", "Payment plan setup", "Financial support referrals"]
    },
    {
      name: "Tenancy Management Agent",
      description: "Manages tenancy changes, transfers, and succession applications with comprehensive support.",
      capabilities: ["Transfer applications", "Succession queries", "Tenancy variations", "Documentation guidance"]
    },
    {
      name: "Community Liaison Agent",
      description: "Facilitates community events, neighbor mediation, and resident engagement initiatives.",
      capabilities: ["Event coordination", "Mediation support", "Community feedback", "Engagement surveys"]
    },
    {
      name: "Maintenance Coordinator Agent",
      description: "Manages planned maintenance schedules, contractor coordination, and resident notifications.",
      capabilities: ["Maintenance scheduling", "Contractor liaison", "Resident notifications", "Progress updates"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:min-h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
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
                      <Home className="w-4 h-4 mr-2" />
                      AI Resident Support Agent
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                  >
                    Meet{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Maya
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light"
                  >
                    MTVH's 24/7 Resident Support Assistant
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed"
                  >
                    Maya handles repairs, heating issues, complaints, and welfare support around the clock. Your residents' friendly first point of contact for everything they need.
                  </motion.p>

                  {/* Multi-channel badges */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-wrap gap-3 mb-8"
                  >
                    {[
                      { icon: Phone, label: "Voice" },
                      { icon: MessageSquare, label: "Chat" },
                      { icon: Mail, label: "Email" },
                      { icon: Smartphone, label: "SMS" }
                    ].map((channel, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                        <channel.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{channel.label}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={startVapiCall}
                      disabled={!isVapiLoaded || isCallActive}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Phone className="w-5 h-5" />
                        <span>Talk to Maya</span>
                      </div>
                    </button>
                    
                    <div className="flex items-center gap-3 text-gray-300">
                      <PhoneCall className="w-5 h-5" />
                      <span className="text-lg">Call: 020 4572 8609</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right column - Demo panel */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col justify-center"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Home className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Maya</h3>
                      <p className="text-gray-300 mb-4">MTVH Resident Support Assistant</p>
                      <div className="flex justify-center gap-4 mb-6">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">● Online</span>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">24/7 Available</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <h4 className="font-semibold mb-2 text-blue-300">What Maya Can Help With:</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Repairs & maintenance requests</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Heating & gas emergencies</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Anti-social behaviour reporting</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Complaints & tenancy queries</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Welfare & safeguarding support</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={startVapiCall}
                        disabled={!isVapiLoaded || isCallActive}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-5 h-5" />
                          <span>Start Voice Demo</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What Maya Handles for MTVH
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Maya manages the full spectrum of resident support needs, from emergency repairs to welfare concerns - ensuring every resident gets the right help at the right time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                        {useCase.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{useCase.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{useCase.description}</p>
                    
                    <ul className="space-y-3">
                      {useCase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Seamless Integrations
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Maya connects with your existing property management systems and tools, ensuring smooth operations and data consistency.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{integration.category}</h3>
                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                    
                    <div className="space-y-3">
                      {integration.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Database className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{tool.name}</div>
                            <div className="text-xs text-gray-500">{tool.domain}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Transparent Pricing
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose the plan that fits your housing provider's needs. All plans include setup, training, and ongoing support.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative bg-white rounded-2xl border-2 p-8 ${
                      tier.popular 
                        ? 'border-blue-500 shadow-xl' 
                        : 'border-gray-200 hover:border-gray-300'
                    } transition-all duration-300`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-gray-600 mb-4">{tier.description}</p>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                        <span className="text-gray-600 ml-1">{tier.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-between">
                          <span className="text-gray-700">{feature.name}</span>
                          {feature.included !== undefined ? (
                            feature.included ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-gray-400" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{feature.value}</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}>
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Agents Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Complete Property Management Suite
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Maya is part of our comprehensive AI agent ecosystem designed specifically for housing providers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {otherAgents.map((agent, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{agent.name}</h3>
                    <p className="text-gray-600 mb-4">{agent.description}</p>
                    
                    <ul className="space-y-2">
                      {agent.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform MTVH's Resident Support?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                See how Maya can revolutionize your resident experience while reducing staff workload and improving response times.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startVapiCall}
                  disabled={!isVapiLoaded || isCallActive}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>Talk to Maya Now</span>
                  </div>
                </button>
                
                <a
                  href="mailto:contact@gozupes.com"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>Contact Our Team</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
      </section>

      {/* Voice Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Maya - MTVH Support</h3>
              <p className="text-sm text-gray-300 mb-4">Status: {callStatus}</p>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 bg-gray-800 rounded-lg p-4 min-h-[200px]">
              <div className="space-y-4">
                {transcript.map((entry, index) => (
                  <div key={index} className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      entry.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : entry.role === 'system'
                        ? 'bg-gray-700 text-gray-300 text-center'
                        : 'bg-gray-600 text-white'
                    }`}>
                      <p className="text-sm">{entry.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {entry.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {currentUserSpeech && (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] p-3 rounded-lg bg-blue-600/70 text-white">
                      <p className="text-sm">{currentUserSpeech}</p>
                      <p className="text-xs opacity-70 mt-1">Speaking...</p>
                    </div>
                  </div>
                )}
                {currentAssistantSpeech && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-600/70 text-white">
                      <p className="text-sm">{currentAssistantSpeech}</p>
                      <p className="text-xs opacity-70 mt-1">Maya is responding...</p>
                    </div>
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={endVapiCall}
                className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors text-white"
              >
                End Call
              </button>
              <button
                onClick={() => setShowCallModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors text-white"
              >
                Minimize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MayaPropertyManagementAgent.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Maya - MTVH's 24/7 Resident Support Assistant | Property Management AI"
      description="Meet Maya, MTVH's AI resident support assistant. Handles repairs, heating, anti-social behaviour, complaints, and welfare support 24/7. Try our live demo."
      canonical="https://gozupees.com/ai-voice-agents/customer-support-property-management"
      ogImage="https://gozupees.com/images/maya-property-management.jpg"
    >
      {page}
    </Layout>
  );
};

export default MayaPropertyManagementAgent;