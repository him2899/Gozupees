import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Gauge
} from 'lucide-react';

export default function CallSensorAgentIQ() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  return (
    <React.Fragment>
      <Head>
        <title>Call Sensor AgentIQ™ - AI Co-Pilot for Customer Service Excellence | GoZupees</title>
        <meta name="description" content="Transform every agent into your best performer with Call Sensor AgentIQ™. Real-time AI co-pilot providing instant intelligence, predictive insights, and guided conversations for exceptional customer service." />
        <meta property="og:title" content="Call Sensor AgentIQ™ - AI Co-Pilot for Customer Service Excellence" />
        <meta property="og:description" content="Real-time intelligence platform that turns ordinary agents into customer experience experts with predictive insights and guided conversations." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Call Sensor AgentIQ™ - AI Co-Pilot for Customer Service Excellence" />
        <meta name="twitter:description" content="Transform every agent into your best performer with real-time AI intelligence and predictive insights." />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-medium">
              Real-time intelligence platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Call Sensor AgentIQ™
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              AI Co-Pilot that turns every agent into your best performer
            </p>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Meet the real-time intelligence platform that's redefining customer service. 
              Transform ordinary interactions into extraordinary experiences with AI that analyzes 
              every word, predicts every outcome, and provides instant intelligence.
            </p>

            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl">
                <Calendar className="w-5 h-5 mr-3" />
                Book Intelligence Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Focus Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                While your agent focuses on the customer,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  the AI focuses on everything else
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Complete Customer Intelligence",
                  description: "Surfaced instantly from all your systems"
                },
                {
                  icon: Activity,
                  title: "Real-time Conversation Analysis",
                  description: "With sentiment tracking and intent recognition"
                },
                {
                  icon: Brain,
                  title: "Predictive Insights",
                  description: "Identifying upsell opportunities and escalation risks before they happen"
                },
                {
                  icon: Network,
                  title: "Smart Workflow Guidance",
                  description: "Navigating complex processes with step-by-step coaching"
                },
                {
                  icon: Database,
                  title: "Intelligent Knowledge Delivery",
                  description: "Providing perfect answers from your entire knowledge base"
                },
                {
                  icon: TrendingUp,
                  title: "Live Performance Optimization",
                  description: "With suggestions that improve outcomes in real-time"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md bg-white">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
                <p className="text-xl font-bold text-gray-900 mb-4">
                  The result? Every conversation becomes predictive instead of reactive.
                </p>
                <p className="text-lg text-gray-700">
                  Every agent performs like your best team member. Every interaction drives revenue instead of just resolving issues.
                </p>
                <div className="mt-6">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
                    This isn't just customer service software. It's customer intelligence that creates competitive advantage.
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  $3.7 million problem
                </span>{" "}
                hiding in your call center
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Your call center agents handle hundreds of conversations daily, making split-second decisions that determine success or failure.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">In each interaction, they determine:</h3>
                <div className="space-y-4">
                  {[
                    "Whether a frustrated customer stays or leaves",
                    "Whether a $2,400 upsell opportunity gets identified or missed",
                    "Whether a complex issue gets resolved in one call or creates three more",
                    "Whether compliance requirements are met or violated",
                    "Whether your brand promise gets delivered or broken"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">60%</div>
                  <p className="text-gray-900 font-semibold">of critical moments missed</p>
                  <p className="text-gray-600 text-sm">by even your best agents</p>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-4">While solving problems, agents are simultaneously:</h4>
                <div className="space-y-3">
                  {[
                    "Remembering details across 12 different systems",
                    "Analyzing customer sentiment in real-time",
                    "Identifying churn risk and expansion opportunities",
                    "Navigating complex workflows seamlessly",
                    "Complying with regulations and standards",
                    "Documenting everything accurately"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 font-medium text-center">
                    Result: Inconsistent experiences. Missed revenue. Frustrated customers. Overwhelmed agents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                What if every agent had an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  AI genius
                </span>{" "}
                listening to every conversation?
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <h3 className="text-lg font-semibold text-gray-900">Agent Sarah - Service Inquiry</h3>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl mb-4">
                    <p className="text-gray-700 italic leading-relaxed">
                      "I can see you're calling about your recent order, Mr. Patterson. I have your 
                      account details right here, and I notice there's also an open support ticket 
                      from last week. Let me check the latest updates... I can see this is urgent 
                      since you need this resolved quickly. Based on similar cases, I can connect 
                      you directly to our specialist who can provide a specific timeline for resolution."
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-green-600" />
                      <span className="text-green-600 font-medium">One call resolution</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span className="text-gray-600">9/10 satisfaction</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                      <span className="text-blue-600 font-medium">Maximum confidence</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Behind the scenes - AI Co-Pilot:</h4>
                  <div className="space-y-4">
                    {[
                      { icon: Eye, text: "Instantly surfaced complete customer history", color: "text-blue-600" },
                      { icon: AlertTriangle, text: "Flagged urgency indicators from conversation tone", color: "text-orange-600" },
                      { icon: Target, text: "Identified fastest resolution path from similar cases", color: "text-green-600" },
                      { icon: MessageSquare, text: "Suggested empathetic language for this customer profile", color: "text-purple-600" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <item.icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium text-center">
                      That's Call Sensor AgentIQ™ in action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                How Call Sensor AgentIQ™{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  transforms every interaction
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Real-time AI co-pilot that augments human intelligence with machine precision. 
                It's not about replacing human judgment—it's about amplifying it.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8 mb-16">
              {[
                { icon: Brain, label: "Predictive", desc: "instead of reactive", color: "from-blue-600 to-blue-700" },
                { icon: Lightbulb, label: "Informed", desc: "instead of guessing", color: "from-purple-600 to-purple-700" },
                { icon: Shield, label: "Confident", desc: "instead of uncertain", color: "from-green-600 to-green-700" },
                { icon: CheckCircle, label: "Consistent", desc: "instead of variable", color: "from-orange-600 to-orange-700" },
                { icon: DollarSign, label: "Revenue-generating", desc: "instead of cost-focused", color: "from-red-600 to-red-700" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The intelligence layer your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  agents never had
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Instant Customer 360° */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Instant Customer 360°</h3>
                </div>
                <p className="text-gray-300 mb-6">The moment a call connects, your agent sees:</p>
                <div className="space-y-4">
                  {[
                    "Complete customer profile with authentication status, account health, and risk indicators",
                    "Real-time account snapshot from all integrated systems — CRM, billing, support tickets, order history",
                    "Interaction history with context, not just chronology",
                    "Predictive health signals — satisfaction scores, churn probability, expansion potential"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-600/20 rounded-lg">
                  <p className="text-blue-200 font-medium">
                    <strong>Impact:</strong> Agents start every conversation with complete context instead of asking "Can you verify your account details?"
                  </p>
                </div>
              </div>

              {/* Live Conversation Intelligence */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Live Conversation Intelligence</h3>
                </div>
                <p className="text-gray-300 mb-6">As the conversation unfolds, the AI continuously analyzes:</p>
                <div className="space-y-4">
                  {[
                    "Sentiment tracking — detects frustration, satisfaction, confusion in real-time",
                    "Intent recognition — understands what the customer really wants beyond their initial request",
                    "Escalation indicators — flags risk moments before they become problems",
                    "Opportunity signals — identifies upsell and cross-sell moments with confidence scores"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-purple-600/20 rounded-lg">
                  <p className="text-purple-200 font-medium">
                    <strong>Impact:</strong> Agents respond to what customers mean, not just what they say.
                  </p>
                </div>
              </div>

              {/* Predictive Coaching */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Predictive Coaching</h3>
                </div>
                <p className="text-gray-300 mb-6">The AI provides real-time guidance:</p>
                <div className="space-y-4">
                  {[
                    "Suggested responses tailored to customer profile and conversation context",
                    "Workflow navigation — step-by-step guidance through complex processes",
                    "Compliance alerts — ensures regulatory requirements are met automatically",
                    "Performance optimization — live coaching based on conversation quality metrics"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-600/20 rounded-lg">
                  <p className="text-green-200 font-medium">
                    <strong>Impact:</strong> Every agent performs like your most experienced team member.
                  </p>
                </div>
              </div>

              {/* Intelligent Knowledge Assistance */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Intelligent Knowledge Assistance</h3>
                </div>
                <p className="text-gray-300 mb-6">Instead of searching through systems, agents get:</p>
                <div className="space-y-4">
                  {[
                    "Contextual knowledge delivery — relevant policies, procedures, and answers surface automatically",
                    "Case history analysis — solutions from similar situations with success probabilities",
                    "Expert system access — specialist knowledge available instantly",
                    "Dynamic FAQ responses — answers to complex questions generated in real-time"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-orange-600/20 rounded-lg">
                  <p className="text-orange-200 font-medium">
                    <strong>Impact:</strong> "Let me check and call you back" becomes extinct.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Real enterprise{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  transformations
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Global Technology Services Company */}
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <div className="flex items-center">
                    <Building2 className="w-8 h-8 mr-3" />
                    <CardTitle className="text-lg font-bold">Global Technology Services Company</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Challenge:
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• New agents taking 8 months to reach productivity</li>
                      <li>• Customer satisfaction inconsistent across 200+ agents</li>
                      <li>• 40% of complex issues requiring multiple transfers</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Implementation:
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Real-time customer intelligence integration</li>
                      <li>• Live coaching for complex service scenarios</li>
                      <li>• Predictive escalation management</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Results:
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">3 weeks</div>
                        <p className="text-xs text-gray-600">New agent productivity</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">89%</div>
                        <p className="text-xs text-gray-600">First-call resolution</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">8.5/10</div>
                        <p className="text-xs text-gray-600">Customer satisfaction</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">$4.2M</div>
                        <p className="text-xs text-gray-600">Annual revenue increase</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Software Provider */}
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                  <div className="flex items-center">
                    <Settings className="w-8 h-8 mr-3" />
                    <CardTitle className="text-lg font-bold">Enterprise Software Provider</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Challenge:
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Support calls averaging 47 minutes</li>
                      <li>• Agents struggling with product complexity</li>
                      <li>• Customer frustration driving churn</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Implementation:
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Knowledge base integration</li>
                      <li>• Real-time troubleshooting guidance</li>
                      <li>• Automatic specialist escalation</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Results:
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">18 min</div>
                        <p className="text-xs text-gray-600">Average handle time</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">94%</div>
                        <p className="text-xs text-gray-600">First-time fix rate</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">↑</div>
                        <p className="text-xs text-gray-600">Agent confidence</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">23%</div>
                        <p className="text-xs text-gray-600">Churn reduction</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Services Firm */}
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                  <div className="flex items-center">
                    <DollarSign className="w-8 h-8 mr-3" />
                    <CardTitle className="text-lg font-bold">Professional Services Firm</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Challenge:
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Compliance violations from missed disclosures</li>
                      <li>• Missed cross-selling opportunities worth millions</li>
                      <li>• Inconsistent service quality across regions</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Implementation:
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Compliance monitoring with prompts</li>
                      <li>• Real-time recommendation engine</li>
                      <li>• Performance standardization</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Results:
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">Zero</div>
                        <p className="text-xs text-gray-600">Compliance violations</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">31%</div>
                        <p className="text-xs text-gray-600">Revenue increase</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">✓</div>
                        <p className="text-xs text-gray-600">Standardized quality</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">67%</div>
                        <p className="text-xs text-gray-600">Agent confidence</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The comprehensive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  intelligence platform
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Real-Time Analytics Dashboard */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Real-Time Analytics Dashboard</h3>
                </div>
                <p className="text-gray-300 mb-6">Your agents see live performance metrics:</p>
                <div className="space-y-3">
                  {[
                    "Talk ratio optimization — balanced conversation flow guidance",
                    "Question rate coaching — prompts for better discovery",
                    "Engagement scoring — customer involvement indicators",
                    "Outcome prediction — satisfaction and resolution probability"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predictive Insight Engine */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Predictive Insight Engine</h3>
                </div>
                <p className="text-gray-300 mb-6">Machine learning models analyze patterns to surface:</p>
                <div className="space-y-3">
                  {[
                    "High-value upsell opportunities with confidence scores and suggested approaches",
                    "Escalation risk assessment with recommended intervention strategies",
                    "Customer lifetime value indicators with retention strategies",
                    "Process optimization opportunities with efficiency improvements"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Workflow Guidance */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mr-4">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Smart Workflow Guidance</h3>
                </div>
                <p className="text-gray-300 mb-6">Complex procedures become simple:</p>
                <div className="space-y-3">
                  {[
                    "Step-by-step process navigation with progress tracking",
                    "Decision tree optimization based on customer profile and context",
                    "Automatic form population from conversation data",
                    "Quality assurance scoring with real-time improvement suggestions"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge Integration Layer */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Knowledge Integration Layer</h3>
                </div>
                <p className="text-gray-300 mb-6">Connects to your entire ecosystem:</p>
                <div className="space-y-3">
                  {[
                    "CRM synchronization — Salesforce, HubSpot, Microsoft Dynamics",
                    "Support system integration — ServiceNow, Zendesk, Freshdesk",
                    "Enterprise applications — SAP, Workday, custom databases",
                    "Communication platforms — telephony systems, chat, email, social"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Measurable{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  business impact
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Revenue Enhancement */}
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                    <CardTitle className="text-xl text-green-600">Revenue Enhancement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {[
                      "Opportunity identification: AI spots upsell moments human agents miss",
                      "Conversion optimization: Guided conversations with higher success rates",
                      "Customer lifetime value: Proactive retention through satisfaction improvement",
                      "Average order value: Intelligent product recommendations increase transaction size"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Optimization */}
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center">
                    <Target className="w-8 h-8 text-blue-600 mr-3" />
                    <CardTitle className="text-xl text-blue-600">Cost Optimization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {[
                      "Training reduction: New agent productivity achieved in weeks instead of months",
                      "Call efficiency: Shorter handle times without sacrificing quality",
                      "Escalation prevention: Issues resolved at first level of contact",
                      "Compliance automation: Reduced risk and audit preparation costs"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Excellence */}
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-purple-600 mr-3" />
                    <CardTitle className="text-xl text-purple-600">Experience Excellence</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {[
                      "Consistency delivery: Same high standard across all interactions",
                      "First-call resolution: Complex issues solved without transfers",
                      "Satisfaction improvement: Personalized service with complete context",
                      "Agent empowerment: Confidence and capability enhancement"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Operational Intelligence */}
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center">
                    <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
                    <CardTitle className="text-xl text-orange-600">Operational Intelligence</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {[
                      "Performance visibility: Real-time insights into team and individual metrics",
                      "Process optimization: Data-driven improvements to workflows and procedures",
                      "Quality assurance: Automated monitoring with coaching recommendations",
                      "Strategic planning: Customer intelligence for business decision-making"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Gauge className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
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
                  question: "Will agents feel like they're being monitored or micromanaged?",
                  answer: "Call Sensor AgentIQ™ is positioned as an assistant, not a supervisor. Agents receive helpful guidance and information rather than criticism. Most agents report feeling more confident and empowered with AI support."
                },
                {
                  question: "How accurate is the real-time conversation analysis?",
                  answer: "Speech-to-text accuracy exceeds 95% in typical call center environments. Sentiment analysis and intent recognition improve continuously through machine learning. The system provides confidence scores so agents understand reliability levels."
                },
                {
                  question: "Can it integrate with our existing phone system and software?",
                  answer: "Yes. Call Sensor AgentIQ™ uses API-first architecture and connects to major telephony platforms, CRMs, and business applications. Integration typically requires minimal technical resources and no disruption to current operations."
                },
                {
                  question: "What about customer privacy and data security?",
                  answer: "All data processing follows enterprise security standards with encryption, access controls, and audit logging. Customer data remains within your security perimeter. Compliance frameworks include GDPR, CCPA, and industry-specific regulations."
                },
                {
                  question: "How do we measure return on investment?",
                  answer: "ROI tracking includes revenue increases from opportunity capture, cost reductions from efficiency improvements, and risk mitigation from compliance automation. Most enterprises see positive ROI within 60 days of deployment."
                },
                {
                  question: "What if our business has specific requirements?",
                  answer: "Call Sensor AgentIQ™ includes customizable models and workflows. The AI learns your terminology, processes, and compliance requirements. Configuration ensures optimal performance for your business context."
                },
                {
                  question: "How does this compare to other AI solutions?",
                  answer: "Call Sensor AgentIQ™ provides real-time intelligence during live conversations, not just post-call analysis. The focus is on augmenting human agents rather than replacing them, with predictive capabilities that prevent problems rather than just reporting them."
                },
                {
                  question: "Can agents override or ignore AI recommendations?",
                  answer: "Absolutely. Agents maintain full control over conversations. AI provides suggestions and information, but human judgment prevails. The system learns from agent decisions to improve future recommendations."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-gray-700 pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Transform your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                call center today
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Call Sensor AgentIQ™ isn't just about better customer service. 
              It's about turning every customer interaction into a strategic advantage.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
              <h3 className="text-2xl font-bold mb-6">In 3 weeks, you could have:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Every agent performing like your best team member",
                  "Real-time intelligence flowing through every conversation",
                  "Predictive insights preventing problems before they occur",
                  "Revenue opportunities identified and captured automatically",
                  "Compliance assurance built into every interaction",
                  "Customer satisfaction consistency across your entire organization"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-left">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">See the transformation in action</h3>
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-400/20">
                <h4 className="text-xl font-bold mb-4">Book a Live Call Center Intelligence Demo</h4>
                <p className="text-gray-300 mb-6">In 30 minutes, we'll show you:</p>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {[
                    "Real conversation analysis with your actual customer scenarios",
                    "Live predictive insights demonstrating opportunity identification",
                    "Integration possibilities with your existing systems and workflows",
                    "ROI projections based on your call volumes and business metrics"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl">
              <Calendar className="w-5 h-5 mr-3" />
              Schedule Your Intelligence Demo
            </Button>

            <p className="text-gray-400 mt-8 max-w-3xl mx-auto">
              The call center intelligence revolution is here. The only question is whether your customers 
              will experience it first from you or your competitors.
            </p>
            
            <div className="mt-6">
              <p className="text-blue-300 font-medium">
                Every conversation is an opportunity. Every opportunity is revenue. Every revenue moment is competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}