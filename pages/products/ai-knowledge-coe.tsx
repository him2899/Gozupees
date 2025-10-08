import React, { useRef, useEffect, useState } from "react";
import { ReactElement } from "react";
import Layout from "../../components/layout/Layout";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Calendar,
  Users,
  Zap,
  Shield,
  BarChart as BarChartIcon,
  Globe,
  Clock,
  Star,
  CheckCircle,
  TrendingUp,
  Lock,
  Eye,
  Headphones,
  Bot,
  Target,
  Award,
  Briefcase,
  UserCheck,
  Settings,
  Play,
  ChevronDown,
  ChevronRight,
  Mail,
  FileText,
  Activity,
  Brain,
  Database,
  Network,
  Cpu,
  AlertTriangle,
  Building,
  Lightbulb,
  Rocket,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AIKnowledgeCoEPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Neural network animation
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.6})`;
        ctx.fill();

        // Draw connections
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient]);

  const phases = [
    {
      title: "Strategic Foundation",
      duration: "Days 1-30",
      icon: <Target className="w-6 h-6" />,
      items: [
        "AI Maturity Assessment — audit your current AI landscape, identify gaps, benchmark against industry leaders",
        "Enterprise AI Roadmap — 12-18 month strategic plan with sequenced initiatives, budget allocation, and success metrics",
        "Governance Charter — decision rights, risk frameworks, vendor policies, and compliance protocols",
        "Knowledge Architecture — map your content ecosystem, identify single sources of truth, design information flow",
        "Executive alignment on AI strategy and priorities",
        "Clear business case with projected ROI",
        "Risk mitigation strategy for compliance, security, and operational concerns",
        "Organizational readiness plan"
      ],
      result: "Complete strategic foundation with executive buy-in and clear roadmap",
    },
    {
      title: "Infrastructure & Governance",
      duration: "Days 31-60", 
      icon: <Shield className="w-6 h-6" />,
      items: [
        "ComplianceCore™ Framework — GDPR/PII policies, data retention rules, audit trails, incident response procedures",
        "KnowledgeSense RAG™ Implementation — enterprise-grade knowledge base that ingests your PDFs, SOPs, CRM data into one structured, searchable, AI-powered system",
        "Integration Layer — connectors to your existing systems (SharePoint, Confluence, Salesforce, ServiceNow, Workday) without disrupting your source of truth systems",
        "Quality & Security Controls — evaluation frameworks, hallucination guards, access controls, monitoring dashboards",
        "Unified knowledge base accessible across all AI applications",
        "Bulletproof compliance and security posture",
        "Integration with existing enterprise systems",
        "Real-time monitoring and quality assurance"
      ],
      result: "Production-ready AI infrastructure with enterprise-grade governance",
    },
    {
      title: "Launch & Scale",
      duration: "Days 61-90",
      icon: <Rocket className="w-6 h-6" />,
      items: [
        "Production AI Agents — deploy 2-3 high-impact use cases (typically customer service voice agents and internal co-pilots)",
        "Change Management Program — training modules, manager toolkits, adoption dashboards, feedback loops",
        "Continuous Improvement System — performance monitoring, model updates, knowledge freshness, expansion roadmap",
        "Scalable Foundation — framework for enterprise-wide AI deployment across any department or geography",
        "Live AI agents handling real business processes",
        "Organization trained and confident with AI tools",
        "Measurable business impact and ROI",
        "Scalable foundation for enterprise-wide AI deployment"
      ],
      result: "Live AI agents delivering measurable business value with organization-wide adoption capability",
    },
  ];

  const differentiators = [
    {
      icon: <Network className="w-8 h-8" />,
      title: "Integration-First Philosophy",
      description: "We orchestrate your existing systems, we don't replace them. Your SAP, Salesforce, and ServiceNow remain your source of truth — we make them accessible to AI.",
      details: [
        "Pre-built connectors for 50+ enterprise systems",
        "Real-time and batch synchronization options", 
        "No data migration or system replacement required",
        "Maintains existing security and access controls",
        "Works alongside your current IT architecture"
      ],
      color: "from-blue-600 to-purple-600",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Governance by Design",
      description: "Compliance, security, and audit capabilities aren't 'added later' — they're built into every component from day one.",
      details: [
        "Built-in GDPR, CCPA, and industry-specific compliance",
        "Complete audit trails for every AI interaction",
        "Role-based access controls and PII redaction",
        "Incident response and risk management protocols",
        "Regular compliance assessments and reporting"
      ],
      color: "from-green-600 to-teal-600",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Enterprise-Grade Architecture",
      description: "Built for 50,000+ employees, multi-region deployment, complex organizational hierarchies, and regulated industries.",
      details: [
        "Horizontal scaling across global deployments",
        "99.9% uptime SLA with disaster recovery",
        "Multi-tenant architecture with data isolation",
        "Support for complex org structures and permissions",
        "Enterprise security and encryption standards"
      ],
      color: "from-orange-600 to-red-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Reusable Framework",
      description: "Once we solve AI for one department, we can rapidly replicate the success across your entire organization.",
      details: [
        "Templated deployment patterns for common use cases",
        "Cross-departmental knowledge sharing and reuse",
        "Standardized governance applied organization-wide",
        "70% faster deployment for subsequent departments",
        "Consistent user experience across all AI applications"
      ],
      color: "from-purple-600 to-indigo-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Partner-Agnostic Approach",
      description: "We work alongside your existing system integrators, consulting partners, and IT teams — we're the AI layer, not the everything layer.",
      details: [
        "Collaborate with your existing technology partners",
        "Complement rather than compete with current vendors",
        "White-label options for consulting firm partnerships",
        "Flexible engagement models (direct, partner-led, hybrid)",
        "Knowledge transfer to internal teams included"
      ],
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Proven Methodology",
      description: "Unlike experimental AI approaches, K-CoE™ is based on successful deployments across Fortune 500 enterprises in regulated industries.",
      details: [
        "Tested across 20+ industries and use cases",
        "Battle-tested in highly regulated environments",
        "Refined through real enterprise feedback",
        "McKinsey-style strategy + Deloitte-level implementation",
        "Measurable ROI achieved in 85% of deployments"
      ],
      color: "from-pink-600 to-purple-600",
    },
  ];

  return (
    <React.Fragment>
      {/* Hero Section - Matching Homepage Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dark background with blue gradient matching homepage */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900"></div>

        {/* Neural network animation canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        />

        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">
                  Your enterprise AI operating system
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                AI Knowledge Center of Excellence
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              From scattered experiments to strategic advantage. The comprehensive program that transforms enterprise AI chaos into competitive advantage in 90 days.
            </motion.p>


            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-6 text-xl shadow-2xl">
                <Calendar className="w-6 h-6 mr-3" />
                Book Strategy Session
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Brutal Truth Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The brutal truth about{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                enterprise AI adoption
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Your competitors aren't failing at AI because they lack technology. They're failing because they lack strategy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Current Reality */}
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Right now, across every major enterprise:</h3>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">12 different AI pilots running in silos across departments</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Zero governance on what gets deployed, how, or why</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Knowledge trapped in 847 different applications, PDFs, and SharePoint folders</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Leadership asking "Where's our AI ROI?" while teams scramble with proof-of-concepts</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Compliance teams panicking about data privacy, audit trails, and liability</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">IT drowning in integration requests for tools that don't talk to each other</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Employee frustration from scattered, inconsistent AI experiences across departments</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Budget burnout from endless pilot programs that never scale to production</p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Competitive disadvantage as AI-native companies pull ahead with systematic approaches</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">The Result</h4>
                    <p className="text-red-800">Millions spent. Minimal impact. And your enterprise falling further behind while competitors figure out the AI advantage.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Better Way */}
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">What if there was a different way?</h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 flex-grow">
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                  "Our AI adoption is ahead of schedule. We have 15 voice agents handling customer calls, 8 co-pilots supporting our sales team, and our knowledge base is finally unified across all 23,000 employees. Our compliance framework passed audit. Our teams are trained. Our ROI is measurable. And we're ready to scale to any department, any geography, any use case."
                </p>
                
                <div className="text-center mb-6">
                  <div className="text-sm font-semibold text-blue-900">What the GoZupees K-CoE™ delivers</div>
                  <div className="text-xs text-blue-700">Not another AI tool. Not another pilot program.</div>
                </div>

                <h4 className="font-bold text-blue-900 mb-4">An enterprise AI operating system that turns chaos into competitive advantage</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-blue-800">Scattered experiments → Unified AI strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-blue-800">Compliance panic → Built-in governance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-blue-800">Siloed knowledge → Single source of truth</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-blue-800">Pilot purgatory → Production-ready solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* K-CoE Framework Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The K-CoE™{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  framework
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                How we transform your enterprise from AI confusion to AI mastery in 90 days
              </p>
            </div>

            {/* Phase Timeline */}
            <div className="mb-16">
              <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                {phases.map((phase, index) => (
                  <div
                    key={index}
                    className={`flex items-center cursor-pointer transition-all duration-300 ${
                      activePhase === index ? "scale-110" : ""
                    }`}
                    onClick={() => setActivePhase(index)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                      activePhase === index
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gray-700"
                    }`}>
                      {phase.icon}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${
                        activePhase === index ? "text-white" : "text-gray-400"
                      }`}>
                        Phase {index + 1}
                      </div>
                      <div className={`text-sm ${
                        activePhase === index ? "text-blue-300" : "text-gray-500"
                      }`}>
                        {phase.duration}
                      </div>
                    </div>
                    {index < phases.length - 1 && (
                      <ChevronRight className="w-6 h-6 text-gray-500 ml-8 hidden lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Active Phase Details */}
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{phases[activePhase].title}</h3>
                  <p className="text-blue-300 text-lg mb-8">{phases[activePhase].duration}</p>
                  
                  <h4 className="text-xl font-semibold mb-6">What we build:</h4>
                  <div className="space-y-4">
                    {phases[activePhase].items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-400/30">
                    <h4 className="text-xl font-semibold mb-4 text-blue-300">What you get:</h4>
                    <p className="text-gray-300 text-lg leading-relaxed">{phases[activePhase].result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes K-CoE Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                What makes{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  K-CoE™ different
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                From every other AI solution on the market
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                  
                  <div className="space-y-3">
                    {item.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose K-CoE Over Building Internally */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Why enterprises choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  K-CoE™ over building internally
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                The clear advantages of our proven approach vs. internal development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Speed to Value</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-red-900 mb-1">Internal build:</div>
                    <div className="text-sm text-red-800">18-24 months to production-ready AI</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-900 mb-1">K-CoE™:</div>
                    <div className="text-sm text-green-800">90 days to live agents with governance</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Mitigation</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-red-900 mb-1">Internal build:</div>
                    <div className="text-sm text-red-800">Learn compliance, security challenges the hard way</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-900 mb-1">K-CoE™:</div>
                    <div className="text-sm text-green-800">Pre-built frameworks tested across enterprises</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Total Cost of Ownership</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-red-900 mb-1">Internal build:</div>
                    <div className="text-sm text-red-800">$2-5M+ in team costs, licenses, experiments</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-900 mb-1">K-CoE™:</div>
                    <div className="text-sm text-green-800">Fixed program cost with predictable ROI</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Organizational Change</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-red-900 mb-1">Internal build:</div>
                    <div className="text-sm text-red-800">IT project that business units resist</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-900 mb-1">K-CoE™:</div>
                    <div className="text-sm text-green-800">Enterprise transformation with built-in adoption</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Deliverables */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The comprehensive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  K-CoE™ deliverables
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Everything you receive as part of your enterprise AI transformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Strategic Assets</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Enterprise AI Roadmap (12-18 months)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Business case templates with ROI calculations</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Vendor selection criteria and procurement guidelines</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Change management playbooks</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Executive dashboards and reporting frameworks</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Governance Package</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Data privacy impact assessments (DPIA)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">AI ethics and bias mitigation protocols</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Incident response procedures</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Audit trail specifications</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Risk management frameworks</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Technical Implementation</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">KnowledgeSense RAG™ deployment and configuration</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Integration connectors to existing systems</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Quality assurance and evaluation frameworks</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Security controls and access management</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Performance monitoring and alerting</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Organizational Enablement</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Role-specific training programs</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Manager coaching materials</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">End-user adoption resources</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Champions network establishment</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Communication templates and change narratives</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 md:col-span-2">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Production AI Applications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">2-3 live AI agents (voice, chat, or co-pilot)</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Production monitoring and maintenance procedures</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Escalation pathways and human handoff protocols</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Performance optimization and tuning</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Expansion roadmap for additional use cases</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & ROI Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Investment &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  ROI
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                The cost of inaction vs. the value of strategic AI transformation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 mb-16">
              {/* Cost of Doing Nothing */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">What it costs to do nothing</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-red-500/20 pb-3">
                    <span className="text-gray-300">Failed AI pilot programs</span>
                    <span className="text-red-400 font-bold">$2.4M average loss</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-red-500/20 pb-3">
                    <span className="text-gray-300">Competitive delays</span>
                    <span className="text-red-400 font-bold">18-24 months</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-red-500/20 pb-3">
                    <span className="text-gray-300">Monthly opportunity cost</span>
                    <span className="text-red-400 font-bold">$180K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Regulatory exposure</span>
                    <span className="text-red-400 font-bold">High Risk</span>
                  </div>
                </div>
              </div>

              {/* K-CoE Investment */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">K-CoE™ Investment & Returns</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-3">
                    <span className="text-gray-300">Program investment</span>
                    <span className="text-green-400 font-bold">Fixed Cost</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-3">
                    <span className="text-gray-300">Time to production</span>
                    <span className="text-green-400 font-bold">90 Days</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-3">
                    <span className="text-gray-300">ROI timeline</span>
                    <span className="text-green-400 font-bold">6 Months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Enterprise scalability</span>
                    <span className="text-green-400 font-bold">Unlimited</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Categories */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-center mb-12">Typical ROI Categories</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChartIcon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Operational Efficiency</h4>
                  <div className="text-2xl font-bold text-blue-400 mb-2">30-50%</div>
                  <div className="text-sm text-gray-400">Reduction in routine inquiries</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Employee Productivity</h4>
                  <div className="text-2xl font-bold text-green-400 mb-2">25-40%</div>
                  <div className="text-sm text-gray-400">Improvement in knowledge access</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Customer Experience</h4>
                  <div className="text-2xl font-bold text-purple-400 mb-2">15-30%</div>
                  <div className="text-sm text-gray-400">Improvement in resolution times</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Compliance</h4>
                  <div className="text-2xl font-bold text-orange-400 mb-2">$500K+</div>
                  <div className="text-sm text-gray-400">Cost avoidance in audit prep</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  questions
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Do you replace our existing systems?",
                  answer: "No. Your CRM, HRIS, and ERP systems remain your source of truth. We create an AI orchestration layer that makes your existing systems more intelligent and accessible."
                },
                {
                  question: "How do you handle data security and privacy?",
                  answer: "Every K-CoE™ deployment includes ComplianceCore™ — comprehensive data protection, audit trails, and privacy controls built for enterprise standards. We can deploy in your cloud environment with your security controls."
                },
                {
                  question: "What if our compliance team has concerns?",
                  answer: "We provide complete DPIAs, security architecture documentation, and audit frameworks designed for regulated industries. Many clients involve their compliance teams throughout the program."
                },
                {
                  question: "How quickly can we see results?",
                  answer: "Production AI agents typically go live within 90 days. ROI measurement begins immediately with baseline metrics captured during the assessment phase."
                },
                {
                  question: "Can you work with our existing technology partners?",
                  answer: "Absolutely. We frequently collaborate with system integrators, consulting firms, and IT partners. You maintain your existing relationships while we provide the AI expertise layer."
                },
                {
                  question: "What happens after the initial 90 days?",
                  answer: "You have multiple options: full handover to your team, ongoing managed services, or hybrid support. The K-CoE™ creates a permanent capability that your organization can operate independently."
                },
                {
                  question: "How do you prevent AI hallucinations and errors?",
                  answer: "Our KnowledgeSense RAG™ system uses retrieval-only responses with source citations, confidence scoring, and human fallback protocols. Every answer is traceable to its source material."
                },
                {
                  question: "What if we already have some AI pilots running?",
                  answer: "Perfect. We assess your existing initiatives, identify what's working, and integrate successful elements into the comprehensive K-CoE™ framework. Nothing gets wasted."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-gray-900">"{faq.question}"</h3>
                    <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Enterprises Are Moving Now */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why the best enterprises{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  are moving now
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">The AI Advantage Window is Closing</h3>
                <p className="text-gray-300">Early movers are already seeing compound benefits from AI adoption. The longer you wait, the harder it becomes to catch up.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Regulatory Environment is Stabilizing</h3>
                <p className="text-gray-300">AI governance requirements are becoming clear. Organizations with proactive compliance frameworks will have significant advantages over reactive approaches.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Talent Market Reality</h3>
                <p className="text-gray-300">AI expertise is expensive and scarce. The K-CoE™ gives you enterprise-grade AI capabilities without building an entire AI team from scratch.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Technology Maturation</h3>
                <p className="text-gray-300">The foundational AI technologies have stabilized. This is the moment to build for scale, not experiment with prototypes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Ready to transform your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                enterprise AI strategy?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12">
              The K-CoE™ isn't just about deploying AI — it's about establishing AI as a core competency that drives competitive advantage across every function of your business.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 mb-12">
              <h3 className="text-2xl font-bold mb-8">In 90 days, you could have:</h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">A unified AI strategy with executive alignment</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Production AI agents handling real customer interactions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Compliance-ready governance across all AI initiatives</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">A knowledge base that actually serves your entire organization</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Teams trained and confident with AI tools</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Measurable ROI and a roadmap for enterprise-wide scaling</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-400 mb-12 italic">
              Or you could spend the next 18 months building this internally while your competitors pull ahead.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 mb-12">
              <h3 className="text-2xl font-bold mb-6">Get started today</h3>
              <h4 className="text-xl font-semibold mb-6 text-blue-300">Book a K-CoE™ Strategy Session</h4>
              <p className="text-gray-300 mb-8">In 60 minutes, we'll:</p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Assess your current AI maturity and identify immediate opportunities</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Design a custom roadmap for your industry and organizational structure</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Provide specific ROI projections based on your business metrics</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Answer any technical, compliance, or implementation questions</span>
                </div>
                <div className="flex items-start md:col-span-2">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Give you a clear path forward — whether that's with GoZupees or not</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-6 text-xl shadow-2xl">
                <Calendar className="w-6 h-6 mr-3" />
                Book Your Strategy Session
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              No sales pitch. No generic demo. Just strategic clarity on your AI future.
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg font-semibold text-white mb-2">The AI revolution isn't coming — it's here.</p>
              <p className="text-gray-300">The only question is whether your enterprise will lead it or follow it.</p>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>
  );
};

AIKnowledgeCoEPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AIKnowledgeCoEPage;