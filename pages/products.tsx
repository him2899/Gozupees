import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/layout/Layout';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Database,
  Users,
  Globe,
  Calendar,
  MessageSquare,
  TrendingUp,
  Lock,
  Settings,
  BarChart,
  Target,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function Products() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Product data for the hero section cards
  const products = [
    {
      id: 'callflow',
      name: 'CallFlow AgentIQ™',
      subtitle: 'AI Voice Agents for Service & Sales',
      description: 'Customer-facing AI that answers inbound calls directly. Handles Tier-1 queries, bookings, troubleshooting, and sales triage — reducing call volumes while running 24/7.',
      href: '/products/callflow-agentiq',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'callsensor',
      name: 'Call Sensor AgentIQ™',
      subtitle: 'Agent Co-Pilot',
      description: 'Agent-facing AI that listens to calls in real time, guiding staff with live answers, compliance prompts, and automating after-call work.',
      href: '/products/call-sensor-agentiq',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'knowledgesense',
      name: 'KnowledgeSense RAG™',
      subtitle: 'AI Knowledge Hub',
      description: 'Enterprise-grade RAG system that transforms PDFs, SOPs, CRM docs, and troubleshooting guides into a structured AI knowledge base — powering agents and copilots with instant, accurate answers.',
      href: '/products/knowledgesense-rag',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'knowledge-coe',
      name: 'AI Knowledge CoE™',
      subtitle: 'Enterprise AI Adoption Program',
      description: 'A structured enterprise program that defines your AI roadmap, governance, and adoption model — ensuring AI moves from scattered pilots to scaled impact.',
      href: '/products/ai-knowledge-coe',
      color: 'from-orange-600 to-red-600'
    }
  ];

  // Product spotlight data
  const spotlightProducts = [
    {
      name: 'CallFlow AgentIQ™',
      tagline: 'AI Voice Agents for Service & Sales — inbound, outbound, omni-channel.',
      description: 'Customers, employees, and partners expect answers instantly. CallFlow AgentIQ™ delivers enterprise-ready AI voice agents that handle inbound calls, outbound engagement, and omni-channel conversations. From telco support lines to healthcare reception desks, from insurance claims to student housing queries — our agents are trained to listen, respond, and resolve with accuracy and empathy.',
      capabilities: [
        'Handle high-volume inbound support (billing, claims, troubleshooting).',
        'Drive proactive outbound engagement (renewals, reminders, upsell calls).',
        'Deploy industry packs for telco, insurance, housing, healthcare, education, and SMEs.'
      ],
      color: 'from-blue-600 to-purple-600',
      href: '/products/callflow-agentiq'
    },
    {
      name: 'Call Sensor AgentIQ™',
      tagline: 'AI Co-Pilot for human agents.',
      description: 'AI doesn\'t just replace humans — it makes them better. Call Sensor AgentIQ™ sits alongside your agents, listening in real-time and providing whisper coaching, compliance nudges, and automatic summaries. Instead of bloated QA teams and long training ramps, your people get instant, AI-powered support — so they can perform like seasoned pros on day one.',
      capabilities: [
        'Real-time whisper coaching & compliance prompts.',
        'Automated call summaries, notes, and CRM updates.',
        'Boosts QA scores while reducing agent training cycles.'
      ],
      color: 'from-green-600 to-teal-600',
      href: '/products/call-sensor-agentiq'
    },
    {
      name: 'AI Knowledge Center of Excellence (K-CoE™)',
      tagline: 'Your AI adoption program — roadmap, governance, and scale.',
      description: 'AI adoption isn\'t about a tool, it\'s about a model. The GoZupees K-CoE™ is an enterprise program that helps you move from scattered pilots to a unified AI roadmap. We build governance frameworks, compliance guardrails, and change management plans so your organisation can deploy AI confidently — across HR, customer service, sales, and operations.',
      capabilities: [
        '90-day roadmap from pilots to scale.',
        'Governance & compliance frameworks.',
        'Change management & enterprise adoption programs.'
      ],
      color: 'from-orange-600 to-red-600',
      href: '/products/ai-knowledge-coe'
    },
    {
      name: 'KnowledgeSense RAG™',
      tagline: 'One enterprise knowledge brain. Everywhere.',
      description: 'Most enterprises have the same problem: knowledge is scattered across PDFs, SOPs, CRM records, and troubleshooting guides. KnowledgeSense RAG™ solves that with enterprise-grade Retrieval-Augmented Generation. It ingests your documents, structures them into a single knowledge base, and powers every chat agent, voice agent, and co-pilot with instant, accurate answers. No more silos. No more outdated information.',
      capabilities: [
        'Ingests and structures enterprise knowledge (PDFs, SOPs, CRM, guides).',
        'Enterprise-grade RAG engine for accuracy and speed.',
        'Powers chatbots, voice agents, and internal copilots.'
      ],
      color: 'from-purple-600 to-indigo-600',
      href: '/products/knowledgesense-rag'
    }
  ];

  // Enterprise proof points
  const enterpriseFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Compliance-first',
      description: 'GDPR, PII, and sensitive-topic guardrails.'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Seamless integrations',
      description: 'SAP, Salesforce, and CRM systems.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Scalability',
      description: 'Ready for 30,000 employees or 10 million customer calls.'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'ROI-driven',
      description: 'Analytics dashboards that prove business value.'
    }
  ];

  return (
    <React.Fragment>
      {/* Hero Section - Dark Background */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content */}
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-2 text-sm font-medium">
                Enterprise AI Operating System
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Four products.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  One enterprise AI operating system.
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Scattered AI pilots don't move the needle. GoZupees builds the missing AI backbone — a connected suite of products that integrate seamlessly into your enterprise, deliver measurable ROI, and ensure you're never left behind.
              </p>
            </div>

            {/* 4-Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  <Link href={product.href}>
                    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer h-full ${hoveredCard === index ? 'transform scale-105 shadow-2xl' : ''
                      }`}>
                      <div className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-blue-300 font-medium mb-3">
                        {product.subtitle}
                      </p>
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="flex items-center text-blue-300 text-sm font-medium group-hover:text-white transition-colors">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Framework Section - Light Background */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
                From scattered AI experiments to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  enterprise transformation
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Most enterprises are stuck in AI pilot purgatory. We've built the only complete system that connects voice agents, knowledge systems, and transformation strategy into one unified platform.
              </p>
            </div>

            {/* Before vs After Transformation */}
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              {/* Before State */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Before: Fragmented AI Chaos</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">15+ disconnected AI tools across departments</span>
                    </div>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Knowledge trapped in 100+ systems and PDFs</span>
                    </div>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Agents overwhelmed with repetitive queries</span>
                    </div>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">No clear ROI or transformation strategy</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* After State */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">After: Connected AI Operating System</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Unified AI platform across all touchpoints</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Centralized knowledge accessible to all AI agents</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Human agents empowered with real-time AI support</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Clear transformation roadmap with measurable ROI</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* The GoZupees Difference */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  The GoZupees Connected AI Operating System
                </h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Four flagship products that work together as one unified platform, delivering enterprise AI that scales from day one.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Voice Agents</h4>
                  <p className="text-sm text-gray-600">Handle 80% of inbound calls automatically</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Agent Co-Pilots</h4>
                  <p className="text-sm text-gray-600">Empower human agents with real-time AI</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Knowledge Hub</h4>
                  <p className="text-sm text-gray-600">Unify all enterprise knowledge instantly</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Transformation</h4>
                  <p className="text-sm text-gray-600">Scale AI across your entire enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Spotlight Section - Dark Background */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Product{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Spotlight
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Each product delivers exceptional value independently and works seamlessly together
              </p>
            </div>

            <div className="space-y-20">
              {spotlightProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10"
                >
                  <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                      <div className={`inline-block w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mb-6`}>
                        <Zap className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {product.name}
                      </h3>

                      <p className={`text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                        {product.tagline}
                      </p>

                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {product.description}
                      </p>

                      {/* Technical Specs */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/5 rounded-xl p-4">
                          <h5 className="text-white font-semibold mb-3">Performance</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Response Time</span>
                              <span className="text-white font-medium">&lt;200ms</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Concurrent Users</span>
                              <span className="text-white font-medium">10,000+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Uptime SLA</span>
                              <span className="text-white font-medium">99.9%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <h5 className="text-white font-semibold mb-3">Integration</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Setup Time</span>
                              <span className="text-white font-medium">2-4 weeks</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">API Endpoints</span>
                              <span className="text-white font-medium">REST/GraphQL</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Languages</span>
                              <span className="text-white font-medium">25+</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Learn More button */}
                        <Link href={product.href}>
                          <Button
                            className={`bg-gradient-to-r ${product.color} hover:opacity-90 text-white px-8 py-3 text-lg font-semibold`}
                          >
                            Learn More <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>

                        {/* Book Demo button — now links to /contact */}
                        <Link href="/contact">
                          <Button
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
                          >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Book Demo
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Key Capabilities:</h4>
                        <ul className="space-y-4">
                          {product.capabilities.map((capability, capIndex) => (
                            <li key={capIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Industry Applications */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Industry Applications:</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {index === 0 && ['Banking', 'Insurance', 'Healthcare', 'Education', 'Retail', 'Telecom'].map((industry) => (
                            <div key={industry} className="bg-white/5 rounded-lg p-3 text-center">
                              <span className="text-gray-300 text-sm">{industry}</span>
                            </div>
                          ))}
                          {index === 1 && ['Call Centers', 'Sales Teams', 'Support', 'Training', 'QA', 'Compliance'].map((use) => (
                            <div key={use} className="bg-white/5 rounded-lg p-3 text-center">
                              <span className="text-gray-300 text-sm">{use}</span>
                            </div>
                          ))}
                          {index === 2 && ['Strategy', 'Governance', 'Change Mgmt', 'Training', 'ROI', 'Compliance'].map((area) => (
                            <div key={area} className="bg-white/5 rounded-lg p-3 text-center">
                              <span className="text-gray-300 text-sm">{area}</span>
                            </div>
                          ))}
                          {index === 3 && ['Document AI', 'Knowledge Base', 'Search', 'Analytics', 'APIs', 'Security'].map((feature) => (
                            <div key={feature} className="bg-white/5 rounded-lg p-3 text-center">
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-semibold mb-4">Success Metrics</h5>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                              {index === 0 ? '95%' : index === 1 ? '60%' : index === 2 ? '90%' : '99%'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {index === 0 ? 'Resolution Rate' : index === 1 ? 'Training Reduction' : index === 2 ? 'Adoption Rate' : 'Accuracy'}
                            </div>
                          </div>
                          <div>
                            <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                              {index === 0 ? '85%' : index === 1 ? '40%' : index === 2 ? '6 mo' : '10x'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {index === 0 ? 'Cost Savings' : index === 1 ? 'Quality Boost' : index === 2 ? 'To Scale' : 'Speed Gain'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How They Work Together - Light Background */}
      <section className="min-h-screen bg-gray-50 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                connected AI stack.
              </span>
            </h2>

            <p className="text-xl text-gray-700 mb-16 leading-relaxed">
              Each GoZupees product is powerful on its own. Together, they form a connected AI operating system for your enterprise. KnowledgeSense RAG™ provides the foundation — a single source of truth for all your data. The K-CoE™ governs how AI is rolled out across your business. VoiceFlow AgentIQ™ delivers customer-facing voice agents, while Call Sensor AgentIQ™ augments your human workforce.
            </p>

            {/* Placeholder for Stack Diagram */}
            <div className="bg-white rounded-3xl p-16 shadow-xl border border-gray-200 mb-16">
              <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Stack Diagram Placeholder</h3>
                  <p className="text-gray-500">
                    Visual representation of the connected AI stack:<br />
                    RAG at base → K-CoE layer → VoiceFlow + Call Sensor on top
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Enterprise - Dark Background */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Enterprise-ready{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                from day one.
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Unlike consumer AI tools or experimental pilots, our products are designed for enterprise realities. That means:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {enterpriseFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & ROI Section - Light Background */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
                Proven{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  enterprise results
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Our connected AI operating system delivers measurable impact across industries and use cases
              </p>
            </div>

            {/* ROI Stats Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
                <div className="text-gray-600">Cost Reduction</div>
                <div className="text-sm text-gray-500 mt-1">in customer service operations</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Availability</div>
                <div className="text-sm text-gray-500 mt-1">with 99.9% uptime guarantee</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">50M+</div>
                <div className="text-gray-600">Interactions</div>
                <div className="text-sm text-gray-500 mt-1">processed across all platforms</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">3x</div>
                <div className="text-gray-600">ROI</div>
                <div className="text-sm text-gray-500 mt-1">average return within 6 months</div>
              </div>
            </div>

            {/* Industry Use Cases */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Services</h3>
                <p className="text-gray-600 mb-4">
                  Major bank deployed our AI agents across 50+ branches, handling 2M+ customer queries monthly with 95% resolution rate.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex justify-between mb-1">
                    <span>Query Resolution</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Wait Time Reduction</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Healthcare</h3>
                <p className="text-gray-600 mb-4">
                  Healthcare network automated appointment scheduling across 200+ clinics, reducing administrative burden by 60%.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex justify-between mb-1">
                    <span>Admin Reduction</span>
                    <span className="font-semibold">60%</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Appointment Accuracy</span>
                    <span className="font-semibold">99.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No-Show Reduction</span>
                    <span className="font-semibold">45%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise</h3>
                <p className="text-gray-600 mb-4">
                  Fortune 500 company integrated AI across HR, Sales, and Support, achieving 40% efficiency gains enterprise-wide.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex justify-between mb-1">
                    <span>Efficiency Gains</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Employee Satisfaction</span>
                    <span className="font-semibold">+35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Savings</span>
                    <span className="font-semibold">$2.4M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Compact */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to scale AI{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                across your enterprise?
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's design your roadmap together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Call
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// Define custom layout to prevent double Layout wrapping
Products.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="Products - Four Products, One Enterprise AI Operating System | GoZupees"
      description="Discover GoZupees' connected AI product suite: VoiceFlow AgentIQ™, Call Sensor AgentIQ™, KnowledgeSense RAG™, and AI Knowledge CoE™. Enterprise-ready AI solutions that work together."
      canonical="https://gozupees.com/products"
    >
      {page}
    </Layout>
  );
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};