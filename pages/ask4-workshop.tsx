import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Play, Phone, Settings, MessageSquare, FileText, 
  Users, Target, Shield, Brain, CheckCircle, TrendingUp, 
  BarChart, CircuitBoard, Globe, Lock, Cpu, Award,
  ArrowRight, Menu, X, DollarSign, Clock, Zap
} from 'lucide-react';

export default function ASK4Workshop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 0]);

  // Workshop agenda sections from PDF
  const workshopSections = [
    { id: 'kickoff', title: 'A. Who We Are & Success Criteria', time: '09:00-09:30' },
    { id: 'agentic-scope', title: 'B. Agentic vs Agent Matrix', time: '09:30-10:15' },
    { id: 'live-demos', title: 'C. Live Proof & Field Interview', time: '10:15-11:25' },
    { id: 'language-voice', title: 'D. Language & Voice Orchestration', time: '11:40-12:20' },
    { id: 'knowledge-behavior', title: 'E. Knowledge & Behavior Controls', time: '12:20-13:00' },
    { id: 'integrations', title: 'F. Integrations & Real Diagnostics', time: '14:00-14:45' },
    { id: 'compliance', title: 'G. Legal/Compliance & InfoSec', time: '14:45-15:30' },
    { id: 'operations', title: 'H. Operations, HR & Change', time: '15:45-16:30' },
    { id: 'commercials', title: 'I. Commercials & Risk', time: '16:30-17:00' },
    { id: 'pilot-plan', title: 'J. Pilot Plan & Calendar', time: '17:00-17:15' }
  ];

  // North Star Outcomes
  const northStarOutcomes = [
    'Signed Pilot Plan (30/60/90) with KPIs & owners',
    'Agentic Scope Matrix (intent ownership & handoff rules)',
    'Language & Pricing Policy (coverage, variants, switching costs)',
    'Diagnostics & Integration Capability Statement',
    'Compliance Pack v0 (DPIA outline, consent flows)',
    'Security & BCP Summary (RPO/RTO, attestations)',
    'Commercial Term Sheet v0 (rate card, ROI warranty)'
  ];

  // Demo carousel data with full details from PDF
  const demoCarousel = [
    {
      id: 'l1-zendesk',
      title: 'L1 + Zendesk Demo',
      duration: '20 min',
      scenario: 'Full ticket lifecycle with DPA checks',
      description: 'Create/update ticket, macros/tags, SLA clocks, audit trail; DPA check; mid-call language switch; human transfer with bot summary',
      watchFor: ['Ticket creation in real-time', 'DPA tier enforcement', 'Language switching costs', 'Warm transfer with context'],
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'outbound-preemptive',
      title: 'Outbound/Pre-emptive',
      duration: '15 min',
      scenario: 'Anomaly detection to resolution verification',
      description: 'Anomaly → multilingual message → verify fix → CRM note',
      watchFor: ['Anomaly detection triggers', 'Multilingual message delivery', 'Fix verification loop', 'CRM integration'],
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'field-engineer',
      title: 'Field Engineer',
      duration: '15 min',
      scenario: 'Complete job lifecycle management',
      description: 'Job intake → part lookup → ETA → onsite script → closeout',
      watchFor: ['Parts inventory lookup', 'ETA calculation', 'Onsite script generation', 'Job closeout workflow'],
      icon: <Settings className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'field-agent-interview',
      title: 'Field Agent Interview',
      duration: '20 min',
      scenario: 'Live interview with field engineers',
      description: 'Blockers, data needed onsite, ideal ticket format discovery',
      watchFor: ['Real blockers identified', 'Data requirements captured', 'Workflow optimization opportunities'],
      icon: <Users className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Company stats
  const companyStats = [
    { label: 'Enterprise Customers', value: '50+', icon: <Shield className="w-5 h-5" /> },
    { label: 'Agent Deployments', value: '2000+', icon: <Users className="w-5 h-5" /> },
    { label: 'Average CSAT Lift', value: '27%', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Tier-1 Cost Reduction', value: '62%', icon: <BarChart className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Header */}
      <motion.nav 
        style={{ opacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                GoZupees
              </div>
              <span className="text-gray-400">×</span>
              <div className="text-xl font-semibold text-gray-300">ASK4</div>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-sm border-b border-gray-700/50 max-h-96 overflow-y-auto">
            <div className="container mx-auto px-6 py-4">
              <div className="grid grid-cols-1 gap-2">
                {workshopSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const element = document.getElementById(section.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setIsMenuOpen(false);
                      }
                    }}
                    className="text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-gray-500">{section.time}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-6 py-2 mb-8">
                <Calendar className="w-4 h-4 mr-2" />
                Single-Day War-Room Edition
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ASK4 × GoZupees
                </span>
                <br />
                <span className="text-white">Workshop</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Single-Day Workshop (War-Room Edition) • 09:00–17:30 • Europe/London
              </p>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-white mb-4">North-Star Outcomes by 17:30</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {northStarOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  onClick={() => {
                    const element = document.getElementById('kickoff');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Enter Workshop
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
                  onClick={() => {
                    const element = document.getElementById('live-demos');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Live Demos
                  <Play className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section A: Kick-off & Who We Are */}
      <section id="kickoff" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 mb-6">
                <Target className="w-4 h-4 mr-2" />
                Section A • 09:00–09:30
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Kick-off & "Who We Are"
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Align on success & constraints. Frame success criteria and surface non-negotiables.
              </p>
              
              <div className="bg-gray-700/30 rounded-2xl p-6 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-white mb-4">Objective: Align on success & constraints</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Inputs:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Last 90-day KPIs</li>
                      <li>• Seasonality patterns</li>
                      <li>• Top-100 intents</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-3">Activities:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Frame success (AHT, FCR, CSAT/NPS)</li>
                      <li>• Surface non-negotiables</li>
                      <li>• Define vulnerable customer policy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Success Criteria Framework */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 text-center hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Decision Gate A */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                Decision Gate A: Target KPIs for the pilot
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Output:</h4>
                  <p className="text-gray-300">Success Criteria Sheet v1</p>
                  <p className="text-sm text-gray-400">Owner: CX Lead</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Key Metrics:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• AHT reduction targets</li>
                    <li>• FCR improvement goals</li>
                    <li>• CSAT/NPS benchmarks</li>
                    <li>• Transfer rate limits</li>
                    <li>• Compliance miss tolerance</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section B: Agentic vs Agent Matrix */}
      <section id="agentic-scope" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 mb-6">
                <Brain className="w-4 h-4 mr-2" />
                Section B • 09:30–10:15
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Agentic vs. Agent Matrix
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Decide what AI owns vs. human. Build Intent → Ownership matrix and define handoff policies.
              </p>
              
              <div className="bg-gray-700/30 rounded-2xl p-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-white mb-4">Objective: Decide what AI owns vs. human</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Inputs:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Escalation rules</li>
                      <li>• DPA tiers</li>
                      <li>• Vulnerable-customer policy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-3">Activities:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Build Intent → Ownership matrix</li>
                      <li>• Set confidence thresholds</li>
                      <li>• Define sentiment/keyword triggers</li>
                      <li>• DPA tiering (generic vs account-bound)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Decision Gate B:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Ownership & handoff policy signed</li>
                      <li>• Agentic Scope Matrix v1</li>
                      <li>• Owner: Ops</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Agentic vs Agent Comparison */}
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Traditional Agent</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-200">Follows Scripts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-200">Single-Turn Responses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-200">No Context Memory</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-200">Escalates on Failure</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Agentic AI</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-200">Recursive Decision-Making</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-200">Persistent Memory</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-200">Multi-task Orchestration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-200">Re-plans on Failure</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Live Proof & Field Interview */}
      <section id="live-demos" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 mb-6">
                <CircuitBoard className="w-4 h-4 mr-2" />
                Section C • 10:15–11:25
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                  Live Proof & Field Interview
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                See real agents handle complex workflows. Interview field staff about current blockers.
              </p>
              
              <div className="bg-gray-700/30 rounded-2xl p-6 max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-white mb-4">Objective: See real agents handle complex workflows</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Inputs:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Agentic Matrix (from B)</li>
                      <li>• SNMP access</li>
                      <li>• Field staff availability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-3">Activities:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• L1 + Zendesk Demo (20 min)</li>
                      <li>• Outbound/Pre-emptive (15 min)</li>
                      <li>• Field Engineer (15 min)</li>
                      <li>• Field Agent Interview (20 min)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Decision Gate C:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Live Demo Technical Spec</li>
                      <li>• Field Requirements Summary</li>
                      <li>• Owner: Tech Lead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Demo Carousel */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-center text-white mb-8">Live Demo Carousel</h3>
              
              {/* Demo Navigation */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {demoCarousel.map((demo, index) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemo(index)}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeDemo === index
                        ? `bg-gradient-to-r ${demo.color} text-white shadow-lg`
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <div className="mr-3">
                      {demo.icon}
                    </div>
                    <div className="text-left">
                      <div>{demo.title}</div>
                      <div className="text-xs opacity-75">{demo.duration}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Demo Display */}
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-r ${demoCarousel[activeDemo].color}/10 rounded-2xl p-8 border border-gray-600/30`}
              >
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4">{demoCarousel[activeDemo].title}</h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">{demoCarousel[activeDemo].scenario}</p>
                    <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                      <h5 className="font-semibold text-white mb-3">Process Flow:</h5>
                      <p className="text-gray-300 text-sm leading-relaxed">{demoCarousel[activeDemo].description}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-white mb-4">Watch For:</h5>
                    <div className="space-y-3">
                      {demoCarousel[activeDemo].watchFor.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 bg-gray-800/50 rounded-lg p-6">
                      <div className="flex items-center justify-center space-x-4">
                        <Play className="w-8 h-8 text-green-400" />
                        <span className="text-white font-semibold">Live Demo Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: Language & Voice Orchestration */}
      <section id="language-voice" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2 mb-6">
                <Globe className="w-4 h-4 mr-2" />
                Section D • 11:40–12:20
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Language & Voice Orchestration
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Set language coverage policy and voice style guide. Compare costs of switching vs pre-determination.
              </p>
              
              <div className="bg-gray-700/30 rounded-2xl p-6 max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-white mb-4">Objective: Set language coverage policy and voice style guide</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Inputs:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Customer language distribution</li>
                      <li>• Brand voice guidelines</li>
                      <li>• Regional accent preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-3">Activities:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Language priority matrix</li>
                      <li>• Voice cloning vs synthesis costs</li>
                      <li>• Mid-call language switching demo</li>
                      <li>• Regional accent mapping</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Decision Gate D:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Language & Voice Policy v1</li>
                      <li>• Language switching cost model</li>
                      <li>• Owner: Product</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Language Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Language Coverage Policy</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-4">Tier 1 Languages</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• English (UK)</li>
                    <li>• Spanish</li>
                    <li>• French</li>
                    <li>• German</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-4">Switching Costs</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Mid-call: £0.02/min</li>
                    <li>• Pre-determined: £0.00</li>
                    <li>• Voice cloning: +£0.01</li>
                    <li>• Regional accent: +£0.005</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-4">Voice Policies</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Professional tone only</li>
                    <li>• Regional accent matching</li>
                    <li>• Brand voice compliance</li>
                    <li>• Emotional state detection</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Remaining sections E through J */}
      {/* Section E: Knowledge & Behavior Controls */}
      <section id="knowledge-behavior" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 mb-6">
                <Brain className="w-4 h-4 mr-2" />
                Section E • 12:20–13:00
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Knowledge & Behavior Controls
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Build knowledge ingestion pipeline and define behavior boundaries with escalation triggers.
              </p>
              
              <div className="bg-gray-700/30 rounded-2xl p-6 max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-white mb-4">Objective: Build knowledge ingestion pipeline</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Activities:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Knowledge source mapping</li>
                      <li>• Auto-update pipelines</li>
                      <li>• Behavior boundary setting</li>
                      <li>• Escalation trigger config</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-3">Controls:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Hallucination prevention</li>
                      <li>• Citation requirements</li>
                      <li>• Confidence thresholds</li>
                      <li>• Fact-checking protocols</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Decision Gate E:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Knowledge Management Policy</li>
                      <li>• Behavior Control Matrix</li>
                      <li>• Owner: Knowledge Team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section F: Integrations & Real Diagnostics */}
      <section id="integrations" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 mb-6">
                <Cpu className="w-4 h-4 mr-2" />
                Section F • 14:00–14:45
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Integrations & Real Diagnostics
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Map real diagnostic capabilities and integration touch-points for seamless workflow automation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section G: Legal/Compliance & InfoSec */}
      <section id="compliance" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 mb-6">
                <Lock className="w-4 h-4 mr-2" />
                Section G • 14:45–15:30
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 bg-clip-text text-transparent">
                  Legal/Compliance & InfoSec
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Address GDPR, consent flows, data residency, and security requirements for enterprise deployment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section H: Operations, HR & Change */}
      <section id="operations" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-4 py-2 mb-6">
                <Users className="w-4 h-4 mr-2" />
                Section H • 15:45–16:30
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Operations, HR & Change
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Plan workforce transition, retraining programs, and change management for successful AI adoption.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section I: Commercials & Risk */}
      <section id="commercials" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2 mb-6">
                <DollarSign className="w-4 h-4 mr-2" />
                Section I • 16:30–17:00
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Commercials & Risk
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Finalize commercial terms, ROI warranty, and risk mitigation strategies with clear success metrics.
              </p>
            </motion.div>

            {/* ROI Framework */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6">ROI Warranty & KPI Commitments</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">≥ 65%</div>
                  <div className="text-gray-300 text-sm">FCR Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">↓ 20%</div>
                  <div className="text-gray-300 text-sm">AHT Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">+0.3</div>
                  <div className="text-gray-300 text-sm">CSAT Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-gray-300 text-sm">Uptime SLA</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section J: Pilot Plan & Calendar */}
      <section id="pilot-plan" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                Section J • 17:00–17:15
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Pilot Plan & Calendar
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Lock in 30/60/90 day pilot timeline with weekly steering calls and clear success milestones.
              </p>
            </motion.div>

            {/* 30-Day Pilot Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gray-700/30 to-gray-600/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 mb-16"
            >
              <h3 className="text-3xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  30-Day Pilot Charter
                </span>
              </h3>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Scope</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• 1 residence location</li>
                    <li>• 2 languages (EN + 1 EU)</li>
                    <li>• L1 fault intents only</li>
                    <li>• Zendesk + basic diagnostics</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Success Metrics</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• FCR ≥ 80%</li>
                    <li>• AHT ↓ ≥ 25%</li>
                    <li>• Transfers ≤ 15%</li>
                    <li>• CSAT +15 points</li>
                    <li>• 0 critical compliance misses</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Timeline</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Week 1: Setup & Integration</li>
                    <li>• Week 2-3: Live Testing</li>
                    <li>• Week 4: Optimization</li>
                    <li>• Weekly steering calls</li>
                    <li>• Rollback plan ready</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Workshop Deliverables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Workshop Deliverables by 17:30</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {northStarOutcomes.map((deliverable, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm leading-relaxed">{deliverable}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Ready for Your War-Room Session?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Book your single-day workshop and walk away with a signed pilot plan, 
                complete technical roadmap, and clear path to enterprise AI deployment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  Book War-Room Session
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
                >
                  Download Workshop Guide
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}