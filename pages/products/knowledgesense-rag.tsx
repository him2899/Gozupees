import React, { useState, useRef, useEffect, ReactElement } from "react";
import Layout from "../../components/layout/Layout";
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Clock,
  Shield,
  Settings,
  Target,
  Star,
  TrendingUp,
  Bot,
  Lock,
  Database,
  Search,
  Brain,
  Network,
  ChevronDown,
  Calendar,
  BarChart as BarChartIcon,
  UserCheck,
  Lightbulb,
  FileText,
  Globe,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const KnowledgeSenseRAGPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("competitive");

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
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
    }> = [];

    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = node.x - nodes[j].x;
        const dy = node.y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150 && Math.random() < 0.1) {
          node.connections.push(j);
        }
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const connectedNode = nodes[connectionIndex];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient]);

  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-medium">
              Enterprise-grade knowledge unification
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                KnowledgeSense RAG™
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              Your single source of truth, everywhere
            </p>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your scattered knowledge chaos into unified, intelligent, 
              always-current enterprise memory that powers every AI initiative.
            </p>

            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl">
                <Calendar className="w-5 h-5 mr-3" />
                Book Knowledge Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Crisis Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  $2.4 trillion knowledge crisis
                </span>{" "}
                killing your enterprise
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                Right now, your best customer service agent just spent 47 minutes on a call that should have taken 8 minutes.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-3xl p-12 mb-12">
              <h3 className="text-2xl font-bold text-red-900 mb-8 text-center">
                Your enterprise knowledge isn't missing. It's imprisoned across:
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-900">247 SharePoint sites</div>
                    <div className="text-red-800 text-sm">Overlapping, outdated information</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-900">18 Confluence spaces</div>
                    <div className="text-red-800 text-sm">Teams stopped updating</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Database className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-900">Thousands of PDFs</div>
                    <div className="text-red-800 text-sm">Scattered across Google Drive</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-900">CRM records</div>
                    <div className="text-red-800 text-sm">Tribal knowledge in comments</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-900">ServiceNow tickets</div>
                    <div className="text-red-800 text-sm">Solutions to identical problems</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-900">Expert knowledge</div>
                    <div className="text-red-800 text-sm">Walking out the door</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-700 mb-8">
                Meanwhile, your competitors are turning their institutional knowledge into competitive advantage.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                The difference? They solved the knowledge problem first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What If Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                What if every answer in your enterprise{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  was instantly accessible?
                </span>
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Imagine this scenario:</h3>
              
              <div className="prose prose-lg text-gray-300 max-w-none">
                <p className="text-xl leading-relaxed">
                  A customer calls about a billing discrepancy. Your agent doesn't dig through 12 systems. 
                  Instead, they instantly access the complete context: the customer's account history, 
                  relevant billing policies, similar cases and their resolutions, escalation procedures, 
                  and even the exact language to use based on the customer's profile.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-2">6 minutes</div>
                  <div className="text-gray-300">Total call time</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">9/10</div>
                  <div className="text-gray-300">Customer satisfaction</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">Minimal</div>
                  <div className="text-gray-300">Agent stress</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-300 mb-8">
                Meanwhile, your AI voice agent handling the overflow queue has access to the exact same knowledge. 
                Your sales team's AI co-pilot knows every product detail. Your HR chatbot answers complex policy questions with confidence.
              </p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                That's the power of unified enterprise knowledge. That's KnowledgeSense RAG™.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is KnowledgeSense RAG Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                What is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  KnowledgeSense RAG™?
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                The enterprise-grade Retrieval-Augmented Generation system that transforms your scattered 
                knowledge chaos into a unified, intelligent, always-current single source of truth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">It's NOT:</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Another document management system</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">A fancy search engine</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">It IS:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">The knowledge foundation that makes every other AI initiative actually work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">The Brain</h3>
                <p className="text-gray-700 text-sm">Every AI agent, co-pilot, and chatbot uses to give accurate answers</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">The Memory</h3>
                <p className="text-gray-700 text-sm">Never forgets, never gets outdated, never leaves the company</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">The Connector</h3>
                <p className="text-gray-700 text-sm">Understands relationships between your people, processes, and information</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">The Guardian</h3>
                <p className="text-gray-700 text-sm">Ensures knowledge is compliant, secure, and auditable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graph RAG Secret Weapon */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our secret weapon:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Graph RAG architecture
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                Here's what makes KnowledgeSense RAG™ different from every other knowledge system:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-red-900 mb-6">❌ Traditional RAG Systems:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-800 text-sm">Treat documents as isolated chunks of text</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-800 text-sm">Search for keyword matches</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-800 text-sm">Miss connections between related concepts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-800 text-sm">Struggle with context and nuance</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-800 text-sm">Often return irrelevant or outdated information</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-green-900 mb-6">✅ KnowledgeSense Graph RAG™:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800 text-sm">Maps knowledge relationships — understands that "billing dispute" connects to "payment processing," "customer account status," "refund policies," and "escalation procedures"</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800 text-sm">Builds semantic networks — knows that "server downtime" and "service outage" are related concepts even if they use different terminology</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800 text-sm">Tracks entity relationships — understands connections between people, products, processes, and policies</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800 text-sm">Contextual understanding — provides different answers for the same question depending on who's asking and why</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800 text-sm">Continuous learning — gets smarter as more people use it and provide feedback</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Result: Your AI agents don't just find information — they understand it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How KnowledgeSense Transforms Enterprise */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                How{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  KnowledgeSense RAG™
                </span>{" "}
                transforms your enterprise
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">For Customer Service Teams</h3>
                <div className="mb-6">
                  <h4 className="text-red-400 font-semibold mb-2">Before:</h4>
                  <p className="text-gray-300 text-sm">Agents juggling multiple screens, putting customers on hold, escalating issues they should be able to resolve</p>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-3">After:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Instant access to customer history, product details, troubleshooting steps</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Context-aware suggestions based on customer profile and issue type</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Consistent answers across all agents, regardless of experience level</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="font-semibold text-yellow-400">First-call resolution increases 40-60%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">For Sales Teams</h3>
                <div className="mb-6">
                  <h4 className="text-red-400 font-semibold mb-2">Before:</h4>
                  <p className="text-gray-300 text-sm">Reps scrambling through competitive battle cards, pricing sheets, and product specs during calls</p>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-3">After:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Real-time competitive intelligence surfaced during prospect conversations</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Instant access to case studies, ROI calculators, and objection-handling strategies</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Personalized content based on prospect industry and use case</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="font-semibold text-yellow-400">Sales cycle acceleration of 25-35%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">For HR and Employee Support</h3>
                <div className="mb-6">
                  <h4 className="text-red-400 font-semibold mb-2">Before:</h4>
                  <p className="text-gray-300 text-sm">Employees frustrated with policy confusion, process delays, and inconsistent answers</p>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-3">After:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Self-service knowledge base that actually answers complex questions</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Consistent policy interpretation across all HR interactions</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Instant onboarding resources for new hires</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="font-semibold text-yellow-400">HR ticket reduction of 50-70%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">For Technical Support</h3>
                <div className="mb-6">
                  <h4 className="text-red-400 font-semibold mb-2">Before:</h4>
                  <p className="text-gray-300 text-sm">Engineers reinventing solutions to problems that were solved last month</p>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-3">After:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Searchable repository of troubleshooting solutions and technical procedures</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Cross-team knowledge sharing without endless documentation meetings</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Faster problem resolution with access to similar cases and solutions</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="font-semibold text-yellow-400">Reduced escalation rates and improved customer satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs RAG Comparison */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why traditional knowledge management{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  failed
                </span>{" "}
                (and why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  RAG™ succeeds
                </span>
                )
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
                <h3 className="text-xl font-bold mb-6 text-red-400">❌ Traditional Approach: Digital Filing Cabinets</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Store documents in folders and hope people find them</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Search returns 10,000 irrelevant results</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Information gets stale the moment it's published</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">No connection between related concepts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Knowledge walks out the door when experts leave</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
                <h3 className="text-xl font-bold mb-6 text-green-400">✅ KnowledgeSense RAG™: Intelligent Knowledge Network</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Understands relationships between concepts, not just keywords</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Connects the dots across departments, systems, and contexts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Stays current through real-time synchronization</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Learns continuously from how people actually use information</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Preserves institutional memory in searchable, reusable format</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Technical{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  architecture
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                Enterprise-grade infrastructure designed for scale, security, and performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Knowledge Ingestion & Processing</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Universal connectors: SharePoint, Confluence, Google Drive, Salesforce, ServiceNow</div>
                  <div>• Intelligent parsing: PDF extraction, OCR, table understanding</div>
                  <div>• Content normalization: Deduplication, version control</div>
                  <div>• Semantic processing: Entity extraction, relationship mapping</div>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Graph RAG Engine</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Vector embeddings: High-dimensional content representation</div>
                  <div>• Knowledge graphs: Relationship mapping between entities</div>
                  <div>• Hybrid search: Keyword + semantic understanding</div>
                  <div>• Context awareness: Personalized results by role and intent</div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quality & Governance</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Source attribution: Every answer traces to original documents</div>
                  <div>• Confidence scoring: Reliability indicators for responses</div>
                  <div>• Hallucination prevention: Retrieval-only answers</div>
                  <div>• Content freshness: Automated stale content detection</div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Security & Compliance</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Role-based access: Information authorization controls</div>
                  <div>• Data encryption: At rest and in transit protection</div>
                  <div>• Audit logging: Complete query and access trails</div>
                  <div>• Privacy controls: PII detection and redaction</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Integration Ecosystem</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Content Sources</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Document Systems: SharePoint, Google Drive, OneDrive, Box, Confluence</div>
                    <div>• Business Applications: Salesforce, HubSpot, ServiceNow, Zendesk, JIRA</div>
                    <div>• Enterprise Systems: Workday, SAP SuccessFactors, Oracle HCM</div>
                    <div>• Custom Sources: Database connections, API integrations, file uploads</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">AI Applications</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Voice Agents: Powers VoiceFlow AgentIQ™ with accurate information</div>
                    <div>• Co-pilots: Feeds Call Sensor AgentIQ™ with real-time knowledge</div>
                    <div>• Chatbots: Enables intelligent conversational interfaces</div>
                    <div>• Custom AI: API access for any AI application requiring knowledge</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Enterprise Tools</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Communication: Microsoft Teams, Slack, email integration</div>
                    <div>• Analytics: Power BI, Tableau integration for usage reporting</div>
                    <div>• Security: Active Directory, SAML, OIDC authentication</div>
                    <div>• Monitoring: Enterprise monitoring and alerting systems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Outcomes Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The enterprise{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  outcomes
                </span>{" "}
                that matter
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Measurable business impact from unified knowledge systems
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Operational Efficiency Revolution</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">2.5 hours daily</div>
                      <p className="text-gray-300 text-sm">average time employees spend searching for information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">47% productivity increase</div>
                      <p className="text-gray-300 text-sm">when information access is instant and accurate</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">$1.2M annual savings</div>
                      <p className="text-gray-300 text-sm">per 1,000 employees from reduced information search time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Customer Experience Transformation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">40-60% improvement</div>
                      <p className="text-gray-300 text-sm">in first-call resolution when agents have complete context</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">25-30% increase</div>
                      <p className="text-gray-300 text-sm">in customer satisfaction scores with consistent, accurate responses</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">30-40% reduction</div>
                      <p className="text-gray-300 text-sm">in call handling time with instant knowledge access</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Risk and Compliance Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Audit readiness</div>
                      <p className="text-gray-300 text-sm">with complete traceability of all information access</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Compliance consistency</div>
                      <p className="text-gray-300 text-sm">with single-source policy interpretation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Reduced liability</div>
                      <p className="text-gray-300 text-sm">from incorrect or outdated information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Knowledge retention</div>
                      <p className="text-gray-300 text-sm">when subject matter experts leave the organization</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">AI Enablement Foundation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Powers accurate AI agents</div>
                      <p className="text-gray-300 text-sm">with reliable, current information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Enables confident co-pilot recommendations</div>
                      <p className="text-gray-300 text-sm">backed by verified knowledge</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Reduces AI hallucinations</div>
                      <p className="text-gray-300 text-sm">through retrieval-only responses with source citations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-1">Accelerates AI adoption</div>
                      <p className="text-gray-300 text-sm">with proven knowledge infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Knowledge Chaos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                The cost of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  knowledge chaos
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                What happens if you wait
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 rounded-3xl p-8">
              {/* Left Side Tabs */}
              <div className="lg:w-1/3 space-y-2">
                <button
                  onClick={() => setActiveTab("competitive")}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "competitive"
                      ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-red-50 border border-red-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">Competitive Disadvantage</span>
                  </div>
                  <p className={`text-sm mt-1 ${activeTab === "competitive" ? "text-red-100" : "text-gray-500"}`}>
                    Falling behind competitors
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab("operational")}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "operational"
                      ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-red-50 border border-red-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Operational Inefficiency</span>
                  </div>
                  <p className={`text-sm mt-1 ${activeTab === "operational" ? "text-red-100" : "text-gray-500"}`}>
                    Daily productivity drain
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab("ai-failure")}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "ai-failure"
                      ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-red-50 border border-red-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Bot className="w-5 h-5" />
                    <span className="font-semibold">AI Initiative Failure</span>
                  </div>
                  <p className={`text-sm mt-1 ${activeTab === "ai-failure" ? "text-red-100" : "text-gray-500"}`}>
                    Broken AI foundations
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab("risk")}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "risk"
                      ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-red-50 border border-red-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Risk Accumulation</span>
                  </div>
                  <p className={`text-sm mt-1 ${activeTab === "risk" ? "text-red-100" : "text-gray-500"}`}>
                    Compliance and security gaps
                  </p>
                </button>
              </div>

              {/* Right Side Content */}
              <div className="lg:w-2/3 bg-white rounded-2xl p-8 border border-gray-200">
                {activeTab === "competitive" && (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Competitive Disadvantage</h3>
                        <p className="text-gray-600">Your competition is moving ahead</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Your competitors with unified knowledge systems are:</p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Resolving customer issues faster</h4>
                          <p className="text-sm text-gray-600">While you search across systems, they have instant answers</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Onboarding employees more effectively</h4>
                          <p className="text-sm text-gray-600">New hires become productive in weeks, not months</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Making better decisions with complete information</h4>
                          <p className="text-sm text-gray-600">They see the full picture while you work with fragments</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Scaling AI initiatives successfully</h4>
                          <p className="text-sm text-gray-600">Their AI actually works because knowledge is unified</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "operational" && (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Operational Inefficiency</h3>
                        <p className="text-gray-600">Every day costs you more</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Every day without unified knowledge costs you:</p>
                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <div className="text-3xl font-bold text-red-600 mb-1">$8,900 in wasted search time</div>
                        <p className="text-sm text-red-700">for every 1,000 employees, every single day</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Customer satisfaction decline</h4>
                          <p className="text-sm text-gray-600">Inconsistent service erodes trust and loyalty</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Employee frustration and reduced productivity</h4>
                          <p className="text-sm text-gray-600">Teams spend more time searching than solving</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Knowledge loss as experts leave</h4>
                          <p className="text-sm text-gray-600">Institutional memory walks out the door forever</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "ai-failure" && (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">AI Initiative Failure</h3>
                        <p className="text-gray-600">Broken foundations, broken AI</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Without unified knowledge, your AI investments fail:</p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">AI agents provide wrong answers</h4>
                          <p className="text-sm text-gray-600">Damaging customer relationships and brand trust</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Co-pilots make unreliable recommendations</h4>
                          <p className="text-sm text-gray-600">Teams stop trusting and using AI tools</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Chatbots become expensive frustration generators</h4>
                          <p className="text-sm text-gray-600">Customers and employees avoid them entirely</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">AI ROI remains elusive</h4>
                          <p className="text-sm text-gray-600">Because the knowledge foundation is fundamentally broken</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "risk" && (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Risk Accumulation</h3>
                        <p className="text-gray-600">Knowledge silos create vulnerabilities</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Knowledge silos create growing organizational risks:</p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Compliance violations</h4>
                          <p className="text-sm text-gray-600">Inconsistent policy interpretation leads to regulatory issues</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Audit failures</h4>
                          <p className="text-sm text-gray-600">Critical information can't be located or verified when needed</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Security gaps</h4>
                          <p className="text-sm text-gray-600">Important procedures aren't accessible when security incidents occur</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Business continuity risk</h4>
                          <p className="text-sm text-gray-600">Critical knowledge isn't preserved or accessible during crises</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Frequently asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  questions
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How is this different from SharePoint or Confluence?",
                  answer: "SharePoint and Confluence are storage systems — digital filing cabinets. KnowledgeSense RAG™ is an intelligence layer that understands, connects, and contextualizes information across all your systems, including SharePoint and Confluence."
                },
                {
                  question: "What about data security and privacy?",
                  answer: "All data processing follows enterprise security standards with encryption, access controls, and audit logging. We can deploy in your cloud environment with your security policies. No data is shared across tenants or used for training general models."
                },
                {
                  question: "How do you prevent AI hallucinations?",
                  answer: "KnowledgeSense RAG™ uses retrieval-only responses — every answer comes from your actual documents with source citations. We don't generate creative content, only retrieve and synthesize your verified information."
                },
                {
                  question: "Can it handle complex technical documentation?",
                  answer: "Yes. Our system understands technical diagrams, code snippets, procedural steps, and complex relationships between technical concepts. It maintains technical accuracy while making information accessible."
                },
                {
                  question: "What if our knowledge is constantly changing?",
                  answer: "Real-time synchronization ensures information stays current. When source documents are updated, the knowledge base reflects changes immediately. Version control tracks what changed and when."
                },
                {
                  question: "How long does implementation take?",
                  answer: "Basic deployment with priority knowledge sources: 4-6 weeks. Full enterprise deployment with all systems and advanced features: 8-12 weeks. Value typically realized within the first 2 weeks of pilot deployment."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-white">"{faq.question}"</h3>
                    <ChevronDown className={`w-6 h-6 text-gray-300 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              See{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                KnowledgeSense RAG™
              </span>{" "}
              in action
            </h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Book a Knowledge Assessment & Demo</h3>
              <p className="text-lg text-gray-700 mb-8">In 45 minutes, we'll:</p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Audit your current knowledge landscape and identify immediate opportunities</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Demonstrate Graph RAG technology with your actual use cases</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Show integration possibilities with your existing systems</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Provide ROI projections based on your organization size</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Answer technical questions about security and compliance</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Give you a clear implementation roadmap</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-6 text-xl shadow-2xl">
                <Calendar className="w-6 h-6 mr-3" />
                Book Your Knowledge Assessment
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              No generic demo. No sales pressure. Just a clear picture of how unified knowledge transforms your enterprise.
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Your enterprise knowledge is your competitive advantage — if you can access it.
              </p>
              <p className="text-gray-700">
                The question isn't whether you need unified enterprise knowledge. 
                The question is whether you'll implement it before or after your competitors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

KnowledgeSenseRAGPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KnowledgeSenseRAGPage;