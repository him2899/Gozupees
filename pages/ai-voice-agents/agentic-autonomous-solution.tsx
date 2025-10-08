import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Brain, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Database, 
  Network, 
  Settings, 
  Shield, 
  TrendingUp,
  Users,
  MessageSquare,
  Globe,
  Calendar,
  FileText,
  Layers,
  RefreshCw,
  BarChart3,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AgenticAutonomousSolution() {
  const [activeStep, setActiveStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural network animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; vx: number; vy: number }[] = [];
    let connections: { from: number; to: number; age: number; maxAge: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const draw = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 149, 237, 0.3)';
        ctx.fill();
      });
      
      if (Math.random() > 0.97 && connections.length < 40) {
        const from = Math.floor(Math.random() * particles.length);
        let to = Math.floor(Math.random() * particles.length);
        while (to === from) to = Math.floor(Math.random() * particles.length);
        
        connections.push({
          from,
          to,
          age: 0,
          maxAge: Math.random() * 120 + 60
        });
      }
      
      connections = connections.filter(conn => {
        conn.age++;
        if (conn.age > conn.maxAge) return false;
        
        const alpha = 1 - (conn.age / conn.maxAge);
        const fromP = particles[conn.from];
        const toP = particles[conn.to];
        
        if (fromP && toP) {
          ctx.beginPath();
          ctx.moveTo(fromP.x, fromP.y);
          ctx.lineTo(toP.x, toP.y);
          ctx.strokeStyle = `rgba(100, 149, 237, ${alpha * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        return true;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const processSteps = [
    {
      step: "1",
      title: "Receive & Identify",
      description: "Greets customer, captures minimal context (issue + account ID)",
      systems: ["Chat/Voice Interface"],
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      step: "2", 
      title: "Pull Live Data",
      description: "Calls getCustomerData → loads line profile, plan, tickets, vulnerability flag",
      systems: ["CRM", "OSS", "Billing DB"],
      icon: <Database className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Analyse & Map Scenario", 
      description: "Matches issue to one of 9 playbook scenarios; selects correct resolution path",
      systems: ["Embedded Knowledge Base"],
      icon: <Brain className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Run Automated Diagnostics",
      description: "Executes runLineTest, outage lookup, speed checks; parses results for pass/fail thresholds",
      systems: ["Network Test API", "Outage API"],
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "5", 
      title: "Guided Troubleshooting",
      description: "Walks customer through step-by-step fixes, confirms outcome after each step",
      systems: ["Conversational Engine"],
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "6",
      title: "Cross-System Actions",
      description: "Create/update Jira ticket, modify plan, book engineer, trigger router dispatch",
      systems: ["Jira", "Provisioning", "Logistics"],
      icon: <Network className="w-6 h-6" />
    },
    {
      step: "7",
      title: "Close & Log", 
      description: "Summarises resolution or ticket ID, stores full chat + diagnostics snapshot",
      systems: ["Ticketing DB", "Audit Log"],
      icon: <FileText className="w-6 h-6" />
    }
  ];

  const coreAdvantages = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "60%+ First-Contact Resolution",
      description: "Fewer calls reach L2 agents, dramatically reducing escalation volume and improving customer satisfaction",
      metric: "60%+",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "4-Minute Average Handling Time",
      description: "Cuts L1 operational costs by up to 50% through efficient automated diagnostics and resolution",
      metric: "4 min",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Zero Wait Time, 24×7",
      description: "Happy customers, flatter demand peaks. Always-on availability without human limitations",
      metric: "24/7",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Perfect Tickets, Every Time",
      description: "Engineers start with complete context, diagnostics attached, and clear priority classification",
      metric: "100%",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const agenticFeatures = [
    {
      title: "Contextual Data Fusion™",
      description: "Federated retrieval layer pulling customer CRM, live line stats, knowledge articles, and product documentation in milliseconds",
      capabilities: [
        "Vector & keyword search with light-weight RAG",
        "Session vector cache for context retention", 
        "Source ranking favors real-time APIs",
        "Zero duplication across diagnostics and ticketing"
      ],
      icon: <Layers className="w-8 h-8" />,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Auto-Ticket Orchestrator™", 
      description: "Creates and updates Jira tickets without human intervention, including full diagnostics and priority classification",
      capabilities: [
        "Generates concise summary with attachments",
        "Detects and updates matching open tickets",
        "SLA countdown timers auto-apply",
        "PII masking enforced before payload hits Jira"
      ],
      icon: <FileText className="w-8 h-8" />,
      gradient: "from-green-600 to-teal-600"
    },
    {
      title: "Smart Engineer Scheduler™",
      description: "Autonomous field-visit booking with real-time calendar integration and proactive communications", 
      capabilities: [
        "Geo-filtered engineer availability in 15-min windows",
        "Atomic slot locking to avoid race conditions",
        "SMS + email confirmation with 24h reminders",
        "Parts optimizer reserves stock automatically"
      ],
      icon: <Calendar className="w-8 h-8" />,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const comparisonData = [
    {
      feature: "Mental Model",
      traditional: "Like a calculator: give input, get output",
      agentic: "Like a junior colleague: understands goals, figures out how to get there"
    },
    {
      feature: "Intelligence Type", 
      traditional: "Reactive",
      agentic: "Proactive + Strategic"
    },
    {
      feature: "Memory",
      traditional: "Stateless or session-limited", 
      agentic: "Persistent memory across calls, users, and tasks"
    },
    {
      feature: "Decision Making",
      traditional: "Linear, tree-based or prompt-triggered",
      agentic: "Dynamic, recursive, and multi-step"
    },
    {
      feature: "Task Handling",
      traditional: "Single-task (e.g., 'Check balance', 'Reset password')",
      agentic: "Multi-turn, multi-task orchestration across systems"
    },
    {
      feature: "Adaptability", 
      traditional: "Fails on unexpected input",
      agentic: "Self-corrects, seeks clarification, re-plans dynamically"
    }
  ];

  return (
    <>
      <Head>
        <title>Agentic Autonomous AI Solutions | GoZupees</title>
        <meta 
          name="description" 
          content="Discover how agentic AI transforms customer support with autonomous L1 fault resolution, contextual data fusion, and intelligent orchestration across enterprise systems." 
        />
        <meta property="og:title" content="Agentic Autonomous AI Solutions | GoZupees" />
        <meta 
          property="og:description" 
          content="Beyond voice bots. Deploy AI agents that think, plan, and execute complete customer service workflows with 60%+ first-contact resolution." 
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900"></div>
          
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          />
          
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-6xl mx-auto">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">Agentic AI Technology</span>
                </div>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Beyond a Voice Bot.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Autonomous AI Solutions
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Deploy AI agents that think, plan, diagnose, and execute complete L1 fault resolution workflows — from first "Hello" to perfectly logged Jira tickets, without human hand-offs.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
                  asChild
                >
                  <Link href="#process-flow">
                    Explore the Process
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href="#comparison">
                    See the Difference
                  </Link>
                </Button>
              </motion.div>

              {/* Key Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { metric: "60%+", label: "First-Contact Resolution" },
                  { metric: "4 min", label: "Average Handling Time" },
                  { metric: "24/7", label: "Zero Wait Time" },
                  { metric: "50%", label: "L1 Cost Reduction" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.metric}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Flow Section */}
        <section id="process-flow" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                End-to-End Process Flow
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Seven autonomous steps that transform customer support from reactive response to proactive resolution
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Process Steps */}
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className={`cursor-pointer transition-all duration-300 ${
                        activeStep === index 
                          ? 'bg-blue-500/10 border-blue-500/30' 
                          : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-600/30'
                      } border rounded-xl p-6`}
                      onClick={() => setActiveStep(index)}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          activeStep === index ? 'bg-blue-500' : 'bg-gray-600'
                        }`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-blue-400">
                              {step.step}
                            </span>
                            <h3 className="text-xl font-semibold text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-300 mb-3">
                            {step.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.systems.map((system, sysIndex) => (
                              <Badge key={sysIndex} variant="secondary" className="bg-blue-500/20 text-blue-300">
                                {system}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Process Visualization */}
                <div className="bg-gray-700/30 rounded-2xl p-8 h-fit sticky top-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Active Process Step
                  </h3>
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">
                        {processSteps[activeStep].step}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {processSteps[activeStep].title}
                    </h4>
                    <p className="text-gray-300">
                      {processSteps[activeStep].description}
                    </p>
                  </div>
                  
                  {/* Process Visualization Placeholder */}
                  <div className="bg-gray-600/30 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-500">
                    <div className="text-center">
                      <Settings className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Process Flow Diagram</p>
                      <p className="text-sm text-gray-500">Visual representation placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Advantages Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Deploy Agentic AI?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Measurable impact across every dimension of customer support operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {coreAdvantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 h-full hover:bg-gray-700/50 transition-all duration-300 group-hover:scale-105">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${advantage.gradient} flex items-center justify-center mb-4`}>
                        {advantage.icon}
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {advantage.metric}
                      </div>
                      <CardTitle className="text-white text-lg">
                        {advantage.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 text-center">
                        {advantage.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agentic Features Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Proprietary Agentic Technologies
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Three breakthrough innovations that enable true autonomous operation
              </p>
            </div>

            <div className="space-y-12 max-w-7xl mx-auto">
              {agenticFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="bg-gray-700/30 rounded-2xl p-8 h-80 flex items-center justify-center border-2 border-dashed border-gray-600">
                      <div className="text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                          {feature.icon}
                        </div>
                        <p className="text-gray-400 font-medium">{feature.title}</p>
                        <p className="text-sm text-gray-500 mt-2">Architecture Diagram Placeholder</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Evolution Story Section */}
        <section id="comparison" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Evolution of AI Support
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From script-following chatbots to autonomous digital teammates
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              {/* Evolution Timeline */}
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Traditional Chatbots */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-red-500/5 border-red-500/30 h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-8 h-8 text-red-400" />
                      </div>
                      <Badge variant="destructive" className="mx-auto mb-4">Traditional Chatbots</Badge>
                      <CardTitle className="text-red-300 text-xl">
                        Script Followers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center text-gray-400 text-sm mb-6">
                        "If customer says X, do Y"
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-2 border-red-400/30 pl-4">
                          <h5 className="text-red-300 font-medium text-sm mb-1">Mental Model</h5>
                          <p className="text-gray-400 text-xs">Like a calculator - give input, get output</p>
                        </div>
                        
                        <div className="border-l-2 border-red-400/30 pl-4">
                          <h5 className="text-red-300 font-medium text-sm mb-1">Intelligence</h5>
                          <p className="text-gray-400 text-xs">Reactive only</p>
                        </div>
                        
                        <div className="border-l-2 border-red-400/30 pl-4">
                          <h5 className="text-red-300 font-medium text-sm mb-1">Memory</h5>
                          <p className="text-gray-400 text-xs">Stateless or session-limited</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-600" />
                  </div>
                </motion.div>

                {/* Smart AI Agents */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="bg-yellow-500/5 border-yellow-500/30 h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                        <Bot className="w-8 h-8 text-yellow-400" />
                      </div>
                      <Badge className="mx-auto mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Smart AI Agents</Badge>
                      <CardTitle className="text-yellow-300 text-xl">
                        Conversational Helpers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center text-gray-400 text-sm mb-6">
                        "I can understand and respond naturally"
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-2 border-yellow-400/30 pl-4">
                          <h5 className="text-yellow-300 font-medium text-sm mb-1">Decision Making</h5>
                          <p className="text-gray-400 text-xs">Linear, tree-based or prompt-triggered</p>
                        </div>
                        
                        <div className="border-l-2 border-yellow-400/30 pl-4">
                          <h5 className="text-yellow-300 font-medium text-sm mb-1">Task Handling</h5>
                          <p className="text-gray-400 text-xs">Single-task (e.g., 'Check balance', 'Reset password')</p>
                        </div>
                        
                        <div className="border-l-2 border-yellow-400/30 pl-4">
                          <h5 className="text-yellow-300 font-medium text-sm mb-1">Adaptability</h5>
                          <p className="text-gray-400 text-xs">Fails on unexpected input</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-600" />
                  </div>
                </motion.div>

                {/* Agentic AI */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="bg-green-500/5 border-green-500/30 h-full ring-2 ring-green-500/20">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="mx-auto mb-4 bg-green-500/20 text-green-300 border-green-500/30">Agentic AI</Badge>
                      <CardTitle className="text-green-300 text-xl">
                        Autonomous Teammates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center text-gray-400 text-sm mb-6">
                        "I'll figure out how to solve this completely"
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-2 border-green-400/30 pl-4">
                          <h5 className="text-green-300 font-medium text-sm mb-1">Mental Model</h5>
                          <p className="text-gray-400 text-xs">Like a junior colleague - understands goals, figures out how to get there</p>
                        </div>
                        
                        <div className="border-l-2 border-green-400/30 pl-4">
                          <h5 className="text-green-300 font-medium text-sm mb-1">Intelligence</h5>
                          <p className="text-gray-400 text-xs">Proactive + Strategic</p>
                        </div>
                        
                        <div className="border-l-2 border-green-400/30 pl-4">
                          <h5 className="text-green-300 font-medium text-sm mb-1">Memory</h5>
                          <p className="text-gray-400 text-xs">Persistent memory across calls, users, and tasks</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Real-World Analogy */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 max-w-5xl mx-auto">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Think of it This Way
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-red-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-red-300 mb-2">Traditional Agent</h4>
                      <p className="text-gray-400 text-sm">
                        Like a script reader who can only follow the manual exactly as written
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-yellow-300 mb-2">Smart Agent</h4>
                      <p className="text-gray-400 text-sm">
                        Like a helpful customer service rep who knows the FAQ really well
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Agentic AI</h4>
                      <p className="text-gray-400 text-sm">
                        Like your best employee who thinks, plans, and gets things done autonomously
                      </p>
                    </div>
                  </div>

                  {/* Advanced Capabilities Extension */}
                  <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gray-800/30 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <Settings className="w-6 h-6 text-green-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Dynamic Decision Making</h4>
                      <p className="text-gray-400 text-sm">Recursive, multi-step planning vs linear tree-based responses</p>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <Network className="w-6 h-6 text-green-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Multi-Task Orchestration</h4>
                      <p className="text-gray-400 text-sm">Coordinates across systems vs single-task execution</p>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Self-Correcting</h4>
                      <p className="text-gray-400 text-sm">Adapts and re-plans dynamically vs failing on unexpected input</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                    <p className="text-xl text-white font-medium mb-4">
                      "This is no longer about chatbots that follow a flowchart."
                    </p>
                    <p className="text-lg text-gray-300">
                      This is about giving your business a digital teammate who knows your operations like your best employee — and never takes a break.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      asChild
                    >
                      <Link href="/book-demo">
                        See Agentic AI in Action
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                      asChild
                    >
                      <Link href="/ai-voice-agents">
                        Explore Our Agents
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Implementation Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built-in Peace of Mind
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Enterprise-grade security, compliance, and reliability at every layer
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "End-to-End Encryption",
                  description: "PII masking, field-level encryption at rest and in transit, GDPR-ready audit trail of every interaction",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Lock className="w-8 h-8" />,
                  title: "Configurable Guard-Rails", 
                  description: "Brand tone enforcement, escalation rules, and compliance policies applied identically 24/7",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Comprehensive Analytics",
                  description: "Structured intents, resolution codes, sentiment analysis for CX dashboards and continuous improvement",
                  gradient: "from-purple-500 to-pink-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="bg-gray-700/30 border-gray-600 h-full hover:bg-gray-600/30 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-white text-xl">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Deploy Autonomous AI?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Transform your customer support operations with agentic AI that thinks, plans, and executes like your best employees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href="/book-demo">
                    Schedule Strategy Session
                    <Calendar className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href="/ai-voice-agents">
                    Explore All Agents
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}