import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVapiCall, formatCallDuration } from '@/lib/hooks/use-vapi-call';
import { 
  Calendar, 
  Brain, 
  Users, 
  TrendingUp, 
  Zap, 
  Target, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Mic, 
  MessageSquare, 
  Eye, 
  Lightbulb, 
  Headphones, 
  Database, 
  Network, 
  Settings,
  Building2,
  DollarSign,
  Star,
  AlertTriangle,
  ChevronDown,
  Phone,
  Activity,
  Gauge,
  Play,
  Pause,
  Volume2,
  PhoneCall,
  PhoneOff,
  Loader2,
  MicOff,
  Globe,
  Lock,
  Workflow,
  FileText,
  BarChart,
  GitBranch,
  Layers,
  Cloud,
  Monitor,
  Laptop
} from 'lucide-react';

export default function CallFlowAgentIQ() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{[key: string]: number}>({});
  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({});
  
  // VAPI Integration
  const { callState, startCall, endCall, requestMicrophonePermission } = useVapiCall();
  const [selectedAgent] = useState('Chloe'); // Default to Chloe for demos
  
  // Q&A Section State
  const [activeCategory, setActiveCategory] = useState('integration');
  const [selectedQuestion, setSelectedQuestion] = useState('integration-compatibility');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isClient]);

  const handleStartVoiceDemo = async () => {
    try {
      if (callState.isConnected) {
        endCall();
      } else {
        await startCall(selectedAgent);
      }
    } catch (error) {
      console.error('Failed to start voice demo:', error);
    }
  };

  const handleBookDemo = () => {
    // For executives - direct to scheduling
    window.open('/contact?demo=enterprise', '_blank');
  };

  const getCallButtonContent = () => {
    if (callState.isConnecting) {
      return (
        <>
          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
          Connecting...
        </>
      );
    }
    
    if (callState.isConnected) {
      return (
        <>
          <PhoneOff className="w-5 h-5 mr-3" />
          End Call ({formatCallDuration(callState.callDuration)})
        </>
      );
    }
    
    return (
      <>
        <PhoneCall className="w-5 h-5 mr-3" />
        Talk to AI Agent Now
      </>
    );
  };

  const getCallButtonStyle = () => {
    if (callState.isConnected) {
      return "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800";
    }
    return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700";
  };

  const handleAudioPlay = (audioId: string) => {
    const audio = audioRefs.current[audioId];
    if (!audio) return;

    if (playingAudio && playingAudio !== audioId) {
      // Stop any currently playing audio
      const currentAudio = audioRefs.current[playingAudio];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    if (playingAudio === audioId) {
      // Pause current audio
      audio.pause();
      setPlayingAudio(null);
    } else {
      // Play new audio
      audio.play();
      setPlayingAudio(audioId);
    }
  };

  const updateProgress = (audioId: string) => {
    const audio = audioRefs.current[audioId];
    if (audio && audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress(prev => ({ ...prev, [audioId]: progress }));
    }
  };

  const handleAudioEnd = (audioId: string) => {
    setPlayingAudio(null);
    setAudioProgress(prev => ({ ...prev, [audioId]: 0 }));
  };

  const audioExamples = [
    {
      id: 'customer-service',
      title: 'Customer Service - Billing Inquiry',
      description: 'AI agent handles complex billing question with account lookup and resolution',
      audioUrl: '/audio/carlos_ordersupport.mp3',
      duration: '2:34',
      scenario: 'Inbound Support',
      features: 'Account verification, problem diagnosis, resolution with follow-up'
    },
    {
      id: 'appointment-booking',
      title: 'Appointment Booking - Medical Practice',
      description: 'Seamless scheduling with availability checking and confirmation',
      audioUrl: '/audio/raj_dental.mp3',
      duration: '1:47',
      scenario: 'Inbound Booking',
      features: 'Calendar integration, availability checking, confirmation emails'
    },
    {
      id: 'sales-followup',
      title: 'Sales Follow-up - Insurance Renewal',
      description: 'Proactive outbound call for policy renewal with personalized offers',
      audioUrl: '/audio/zara_outbound.mp3',
      duration: '3:12',
      scenario: 'Outbound Sales',
      features: 'Personalized offers, objection handling, payment processing'
    },
    {
      id: 'tech-support',
      title: 'Technical Support - Internet Troubleshooting',
      description: 'Step-by-step diagnostic with real-time problem resolution',
      audioUrl: '/audio/Jake.mp3',
      duration: '2:56',
      scenario: 'Inbound Support',
      features: 'Technical diagnosis, step-by-step guidance, escalation protocols'
    }
  ];

  // Q&A Data Structure
  const qaCategories = {
    integration: {
      title: 'Integration & Security',
      icon: Network,
      questions: [
        {
          id: 'integration-compatibility',
          title: 'Integration & Compatibility',
          question: 'How easily will this agent integrate with our existing systems — CRM (Salesforce, Dynamics), billing (Netcracker, Amdocs), ticketing (JIRA, ServiceNow), contact centre platforms (Genesys, Avaya, Twilio)?',
          answer: 'Plug directly into the systems you already use — CRM, billing, ticketing, and telephony. Our pre-built connectors and APIs make deployment fast, without complex migrations or replatforming.',
          image: '/integration-ecosystem.png'
        },
        {
          id: 'security-compliance',
          title: 'Security & Compliance',
          question: 'Can this agent handle sensitive data safely, meeting GDPR, FCA, ISO27001, or industry-specific regulations (telecom, finance, healthcare)? How is data stored, logged, or redacted?',
          answer: 'Enterprise-grade security built in from day one. Every interaction is GDPR, ISO27001, and FCA aligned, with full audit trails and configurable data-retention policies.',
          image: '/images/features/24-7-service.jpg'
        },
        {
          id: 'scalability-performance',
          title: 'Scalability & Performance',
          question: 'Can this scale to thousands of concurrent calls without latency or downtime? What\'s the SLA for uptime and response times?',
          answer: 'Scale effortlessly from pilot to thousands of concurrent calls. High-availability architecture and SLA-backed uptime ensure consistent performance under real-world enterprise load.',
          image: '/stats-performance.png'
        },
        {
          id: 'language-localisation',
          title: 'Language & Localisation',
          question: 'Does the agent handle multiple languages, dialects, and accents with natural accuracy? Can it adapt for regional compliance and customer expectations?',
          answer: 'Handle conversations in multiple languages, accents, and dialects with natural fluency. Built-in localisation features adapt to regional compliance and cultural expectations.',
          image: '/images/features/multilingual.svg'
        }
      ]
    },
    business: {
      title: 'Business Impact & ROI',
      icon: BarChart,
      questions: [
        {
          id: 'customer-experience',
          title: 'Customer Experience Impact',
          question: 'Will customers feel like they\'re speaking with a real, competent service rep — or will this damage our brand if it sounds robotic or unhelpful?',
          answer: 'Deliver human-like conversations that build trust and strengthen your brand. Agents resolve issues on the first call, escalate gracefully when needed, and keep tone aligned with your organisation.',
          image: '/images/features/human-voice.jpg'
        },
        {
          id: 'operational-roi',
          title: 'Operational ROI',
          question: 'What measurable savings or revenue uplift will we see? Fewer live-agent hours? Faster resolution? Higher conversion rates? Better NPS or CSAT?',
          answer: 'Reduce live-agent workload, cut average handle times, and deflect repetitive calls. Clients see measurable savings within months, alongside new revenue opportunities from outbound and upsell use cases.',
          image: '/images/features/cost-savings.jpg'
        },
        {
          id: 'analytics-oversight',
          title: 'Analytics & Oversight',
          question: 'How do we measure performance? Do we get dashboards with resolution rates, cost savings, customer sentiment, missed intents, and escalation trends?',
          answer: 'Get full visibility with dashboards tracking resolution rates, CSAT/NPS, cost savings, and missed intents. Use data-driven insights to continuously improve journeys and prove ROI.',
          image: '/images/features/team-productivity.jpg'
        }
      ]
    },
    operations: {
      title: 'Operations & Control',
      icon: Settings,
      questions: [
        {
          id: 'agent-escalation',
          title: 'Agent Escalation & Coverage',
          question: 'What happens when the AI can\'t resolve an issue? Does it gracefully escalate with context, or create dead ends? What % of issues can it realistically resolve end-to-end?',
          answer: 'Resolve the majority of cases autonomously, with clear rules for when to escalate. Human hand-offs include full context, so customers never repeat themselves.',
          image: '/images/features/call-transfer.svg'
        },
        {
          id: 'training-customisation',
          title: 'Training & Customisation',
          question: 'How quickly can the agent be trained on our knowledge base, SOPs, policies, and tone of voice? Do we need AI engineers to maintain it, or can our own ops teams update it?',
          answer: 'Update workflows, tone, and policies in days, not months. No-code tools empower your teams to refine scripts, FAQs, and SOPs directly — keeping agents aligned without heavy IT overhead.',
          image: '/images/features/easy-setup.jpg'
        },
        {
          id: 'vendor-lockin',
          title: 'Vendor Lock-In & Roadmap',
          question: 'If we commit, are we tied to GoZupees forever? Can this sit in our own cloud? What\'s your roadmap for future capabilities (multi-agent orchestration, voice+chat blending, proactive outbound)?',
          answer: 'Deploy in your cloud, our cloud, or hybrid — no forced lock-in. The roadmap includes multi-agent orchestration, proactive outbound, and deeper integrations, so your investment scales with your strategy.',
          image: '/images/features/all-in-one.jpg'
        }
      ]
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>CallFlow AgentIQ™ - AI Voice Agents for Service & Sales | GoZupees</title>
        <meta name="description" content="Enterprise AI voice platform for customer service automation. Handles inbound support, outbound sales, and appointment scheduling with standardized service protocols and operational efficiency." />
        <meta property="og:title" content="CallFlow AgentIQ™ - AI Voice Agents for Service & Sales" />
        <meta property="og:description" content="Enterprise AI voice platform that automates customer service operations with standardized protocols for inbound support, outbound sales, and appointment scheduling." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CallFlow AgentIQ™ - AI Voice Agents for Service & Sales" />
        <meta name="twitter:description" content="Enterprise AI voice platform for automated customer service operations and standardized service protocols." />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-4 text-blue-300 text-sm font-medium uppercase tracking-wider">
              AI Voice Agents for Service & Sales
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                CallFlow AgentIQ™
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Get faster service resolutions, higher first-call resolution rates, and reduce truck rolls
            </p>
            
            <div className="mt-8">
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleBookDemo}
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                data-testid="button-book-demo"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Book Live Demo
              </Button>
            </div>
            
            {/* Call Status Display */}
            {(callState.isConnecting || callState.isConnected || callState.isError) && (
              <div className="mt-8 max-w-md mx-auto">
                {callState.isError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-red-200">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span className="text-sm">{callState.errorMessage}</span>
                    </div>
                  </div>
                )}
                
                {callState.isConnecting && (
                  <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                    <div className="flex items-center text-blue-200">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <span className="text-sm">Connecting to AI agent...</span>
                    </div>
                  </div>
                )}
                
                {callState.isConnected && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                    <div className="flex items-center justify-between text-green-200">
                      <div className="flex items-center">
                        <Mic className="w-5 h-5 mr-2" />
                        <span className="text-sm">Connected to {selectedAgent}</span>
                      </div>
                      <div className="text-sm font-mono">
                        {formatCallDuration(callState.callDuration)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Try AI Agent Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Experience natural conversations with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    human-sounding AI agents
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Modernize customer service operations with enterprise AI voice technology that 
                  automates inbound support, outbound sales, and appointment scheduling while 
                  maintaining service quality and optimizing operational efficiency.
                </p>
              </div>

              {/* Right Side - Try Agent Box */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Start Live Conversation
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Talk to our AI agent right now and experience the technology firsthand.
                  </p>
                  
                  <Button 
                    size="lg" 
                    onClick={handleStartVoiceDemo}
                    disabled={callState.isConnecting}
                    className={`w-full ${getCallButtonStyle()} text-white font-semibold px-6 py-4 text-lg shadow-xl disabled:opacity-70`}
                    data-testid="button-try-agent"
                  >
                    {getCallButtonContent()}
                  </Button>

                  {/* Call Status Display */}
                  {(callState.isConnecting || callState.isConnected || callState.isError) && (
                    <div className="mt-6">
                      {callState.isError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center text-red-700">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            <span className="text-sm">{callState.errorMessage}</span>
                          </div>
                        </div>
                      )}
                      
                      {callState.isConnecting && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center text-blue-700">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            <span className="text-sm">Connecting to AI agent...</span>
                          </div>
                        </div>
                      )}
                      
                      {callState.isConnected && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between text-green-700">
                            <div className="flex items-center">
                              <Mic className="w-5 h-5 mr-2" />
                              <span className="text-sm">Connected to {selectedAgent}</span>
                            </div>
                            <div className="text-sm font-mono">
                              {formatCallDuration(callState.callDuration)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Why AI Voice Agents - Benefits Grid */}
            <div className="mt-24 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-16">
                Why AI Voice Agents Deliver Better Business Outcomes
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Row 1 */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Scale Without Hiring
                  </h4>
                  <p className="text-gray-600">
                    Handle 10x call volume with consistent service quality while maintaining operational costs.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Reduce Average Handle Time
                  </h4>
                  <p className="text-gray-600">
                    Resolve customer issues 40% faster with instant access to knowledge bases and automated workflows.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Eliminate Training Overhead
                  </h4>
                  <p className="text-gray-600">
                    Deploy new service protocols instantly across all agents without retraining or human error.
                  </p>
                </div>

                {/* Row 2 */}
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Ensure Compliance Standards
                  </h4>
                  <p className="text-gray-600">
                    Maintain consistent regulatory compliance across all interactions with built-in monitoring and reporting.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Increase First-Call Resolution
                  </h4>
                  <p className="text-gray-600">
                    Achieve 85%+ first-call resolution rates with comprehensive knowledge access and decision trees.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Lower Operational Costs
                  </h4>
                  <p className="text-gray-600">
                    Reduce contact center costs by 60% while improving service quality and customer satisfaction metrics.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proven Business Impact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Business Impact
            </h2>
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
              Real performance metrics from enterprise deployments across various industries
            </p>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Row 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent">
                  85%
                </div>
                <p className="text-gray-200 font-medium text-lg mb-2">Reduction in Wait Times</p>
                <p className="text-sm text-gray-400">Queue optimization</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                  60%
                </div>
                <p className="text-gray-200 font-medium text-lg mb-2">Lower Operational Costs</p>
                <p className="text-sm text-gray-400">Within 6 months</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <p className="text-gray-200 font-medium text-lg mb-2">Service Availability</p>
                <p className="text-sm text-gray-400">99.9% uptime SLA</p>
              </div>

              {/* Row 2 - Additional Contact Center KPIs */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
                  +35%
                </div>
                <p className="text-gray-200 font-medium text-lg mb-2">CSAT Improvement</p>
                <p className="text-sm text-gray-400">Customer satisfaction increase</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                  -40%
                </div>
                <p className="text-gray-200 font-medium text-lg mb-2">AHT Reduction</p>
                <p className="text-sm text-gray-400">Average handle time</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent">
                  -85%
                </div>
                <p className="text-gray-200 font-medium text-lg mb-2">ACW Reduction</p>
                <p className="text-sm text-gray-400">After call work eliminated</p>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-gray-300 text-sm">
                * Metrics based on deployments across 50+ enterprise clients in Q3-Q4 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Q&A Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Executive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Decision Framework
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Address the critical questions that matter for enterprise AI voice implementation — 
                integration timelines, security compliance, and measurable business outcomes.
              </p>
            </div>

            {/* Category Navigation */}
            <div className="flex justify-center mb-12 border-b border-gray-200">
              {Object.entries(qaCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setSelectedQuestion(category.questions[0].id);
                    }}
                    className={`flex items-center gap-3 px-8 py-4 font-semibold transition-all duration-300 relative ${
                      activeCategory === key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    data-testid={`button-category-${key}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {category.title}
                  </button>
                );
              })}
            </div>

            {/* Q&A Content */}
            <div className="grid grid-cols-12 gap-12">
              {/* Left Content - 30% width */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {qaCategories[activeCategory as keyof typeof qaCategories].questions.map((question: any, index: number) => (
                  <div 
                    key={question.id}
                    onClick={() => setSelectedQuestion(question.id)}
                    className="cursor-pointer"
                  >
                    <h3 className={`text-xl mb-4 tracking-wide transition-all duration-200 ${
                      selectedQuestion === question.id 
                        ? 'font-bold text-gray-900' 
                        : 'font-normal text-gray-600'
                    }`}>
                      {question.title}
                    </h3>
                    
                    <p className={`text-base leading-relaxed transition-all duration-200 ${
                      selectedQuestion === question.id 
                        ? 'text-gray-700' 
                        : 'text-gray-500'
                    }`}>
                      {question.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Laptop Monitor with Image - 70% width */}
              <div className="col-span-12 lg:col-span-8">
                {qaCategories[activeCategory as keyof typeof qaCategories].questions
                  .filter((q: any) => q.id === selectedQuestion)
                  .map((question: any) => (
                    <div key={question.id} className="flex justify-center">
                      {/* Laptop Monitor Container */}
                      <div className="relative max-w-4xl w-full">
                        {/* Monitor Screen */}
                        <div className="relative bg-gray-900 rounded-t-2xl p-6 shadow-2xl border-4 border-gray-800">
                          {/* Monitor Bezel */}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
                          
                          {/* Screen Content */}
                          <div className="bg-white rounded-lg overflow-hidden aspect-video shadow-inner">
                            {question.image ? (
                              <img
                                src={question.image}
                                alt={`${question.title} Diagram`}
                                className="w-full h-full object-cover"
                                data-testid={`img-monitor-${question.id}`}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Monitor className="w-8 h-8 text-white" />
                                  </div>
                                  <p className="text-gray-600 font-medium">{question.title}</p>
                                  <p className="text-gray-500 text-sm mt-2">Visual demonstration</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Laptop Base */}
                        <div className="relative">
                          {/* Keyboard Area */}
                          <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-3xl px-8 py-6 shadow-lg">
                            {/* Trackpad */}
                            <div className="w-24 h-16 bg-gray-200 rounded-lg mx-auto border border-gray-300 shadow-inner"></div>
                          </div>
                          
                          {/* Base Shadow */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gray-400/30 rounded-full blur-sm"></div>
                        </div>
                        
                        {/* Question Title Below Laptop */}
                        <div className="text-center mt-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{question.title}</h4>
                          <p className="text-gray-600 max-w-2xl mx-auto">{question.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Live Call Examples Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Customer Interaction{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Recordings
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Audio examples of AI agents handling standard customer service scenarios 
                with consistent service protocols and established operational procedures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {audioExamples.map((example, index) => (
                <div key={example.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-white/80">
                          {example.scenario}
                        </Badge>
                        <span className="text-sm text-gray-600">{example.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{example.title}</h3>
                      <div className="text-gray-700 text-sm">{example.description}</div>
                    </div>
                  </div>

                  {/* Hidden audio element */}
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[example.id] = el;
                    }}
                    src={example.audioUrl}
                    onTimeUpdate={() => updateProgress(example.id)}
                    onEnded={() => handleAudioEnd(example.id)}
                    preload="metadata"
                  />

                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAudioPlay(example.id)}
                        className="flex-shrink-0"
                        data-testid={`button-play-audio-${example.id}`}
                      >
                        {playingAudio === example.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </Button>
                      
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${audioProgress[example.id] || 0}%` }}
                        ></div>
                      </div>
                      
                      <Volume2 className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-600/10 rounded-lg">
                    <div className="text-blue-800 text-sm font-medium">
                      <strong>Key Features Demonstrated:</strong> {example.features}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Live Demo Available
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Test the AI voice platform directly through a live conversation. 
                  Evaluate functionality, response accuracy, and integration capabilities.
                </p>
                <Button 
                  size="lg" 
                  onClick={handleStartVoiceDemo}
                  disabled={callState.isConnecting}
                  className={`${getCallButtonStyle()} text-white font-semibold px-8 py-4 disabled:opacity-70`}
                  data-testid="button-experience-demo"
                >
                  {callState.isConnected ? (
                    <>
                      <PhoneOff className="w-5 h-5 mr-3" />
                      End Conversation
                    </>
                  ) : callState.isConnecting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-3" />
                      Start Live Conversation
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Call Center{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  Efficiency Analysis
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Problem Side */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Operational Challenges</h3>
                </div>

                <div className="space-y-4">
                  {[
                    "Majority of calls involve routine inquiries requiring agent resources",
                    "Extended hold times impact customer satisfaction metrics",
                    "After-hours calls require alternative handling procedures",
                    "Service quality varies based on individual agent performance",
                    "Agent turnover requires ongoing recruitment and training investment",
                    "Manual processes introduce operational risk factors"
                  ].map((problem, index) => (
                    <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-gray-800">{problem}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Side */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Service Platform Benefits</h3>
                </div>

                <div className="space-y-4">
                  {[
                    "Automated agents handle majority of routine inquiries without queue delays",
                    "24/7 availability maintains service coverage during all business hours",
                    "Standardized service protocols ensure consistent quality delivery",
                    "Escalation protocols direct complex issues to appropriate human agents",
                    "Optimized staffing allocation while maintaining service level agreements",
                    "Built-in compliance protocols ensure regulatory requirement adherence"
                  ].map((solution, index) => (
                    <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-gray-800">{solution}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Inbound & Outbound{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  AI Agents
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive platform supporting both inbound service operations and 
                outbound business communications for optimized customer management.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Inbound Use Cases */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white rotate-180" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Inbound Service Operations</h3>
                  <p className="text-gray-700">Automated agents for standardized call handling</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Customer Support",
                      description: "Handle billing inquiries, account changes, technical support, and complaint resolution",
                      metrics: "Resolve 78% of tickets on first call"
                    },
                    {
                      title: "Appointment Booking",
                      description: "Schedule appointments, check availability, send confirmations, and manage cancellations",
                      metrics: "Reduce no-shows by 34%"
                    },
                    {
                      title: "Order Processing",
                      description: "Take orders, process payments, check inventory, and provide shipping updates",
                      metrics: "Increase order accuracy to 99.2%"
                    },
                    {
                      title: "Information Requests",
                      description: "Product information, pricing, store hours, directions, and general inquiries",
                      metrics: "Answer 95% of questions instantly"
                    }
                  ].map((useCase, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-2">{useCase.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{useCase.description}</p>
                      <div className="bg-blue-100 px-3 py-1 rounded-full">
                        <span className="text-blue-800 text-xs font-medium">{useCase.metrics}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outbound Use Cases */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Outbound Business Communications</h3>
                  <p className="text-gray-700">Automated outreach for business development</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Sales Follow-ups",
                      description: "Follow up on leads, qualify prospects, schedule demos, and nurture opportunities",
                      metrics: "Increase conversion rates by 45%"
                    },
                    {
                      title: "Renewal Reminders",
                      description: "Proactive subscription renewals, contract extensions, and upgrade opportunities",
                      metrics: "Boost retention by 28%"
                    },
                    {
                      title: "Payment Collection",
                      description: "Professional, empathetic collection calls with payment plan options",
                      metrics: "Improve collection rates by 52%"
                    },
                    {
                      title: "Survey & Feedback",
                      description: "Customer satisfaction surveys, market research, and feedback collection",
                      metrics: "Achieve 67% response rates"
                    }
                  ].map((useCase, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-2">{useCase.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{useCase.description}</p>
                      <div className="bg-purple-100 px-3 py-1 rounded-full">
                        <span className="text-purple-800 text-xs font-medium">{useCase.metrics}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Built for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  enterprise scale
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Advanced AI technology that integrates seamlessly with your existing systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Advanced NLP & Understanding",
                  description: "Natural language processing that understands context, intent, and sentiment in real-time"
                },
                {
                  icon: Database,
                  title: "CRM & System Integration",
                  description: "Seamless integration with Salesforce, HubSpot, ServiceNow, and custom systems"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security & Compliance",
                  description: "SOC2, HIPAA, PCI DSS compliant with end-to-end encryption"
                },
                {
                  icon: Network,
                  title: "Omnichannel Deployment",
                  description: "Voice, chat, SMS, and social media channels from one platform"
                },
                {
                  icon: BarChart3,
                  title: "Real-time Analytics & Insights",
                  description: "Comprehensive dashboards with conversation analysis and performance metrics"
                },
                {
                  icon: Settings,
                  title: "Custom Training & Personalization",
                  description: "Industry-specific training with your data, tone, and business rules"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Evaluate CallFlow AgentIQ™ for Your Organization
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience CallFlow AgentIQ™ in action. Talk to our AI agent or book a personalized demo today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleStartVoiceDemo}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                data-testid="button-cta-voice-demo"
              >
                <PhoneCall className="w-5 h-5 mr-3" />
                Try AI Agent Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleBookDemo}
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                data-testid="button-cta-book-demo"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Book Enterprise Demo
              </Button>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold mb-2">2-4 weeks</div>
                <p className="opacity-80">Implementation time</p>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">99.9%</div>
                <p className="opacity-80">Uptime guarantee</p>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">24/7</div>
                <p className="opacity-80">Expert support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}