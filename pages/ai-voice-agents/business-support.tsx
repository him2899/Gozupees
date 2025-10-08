import React, { useState, useEffect, useRef } from "react";
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from "framer-motion";
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
  CreditCard,
  Settings,
  UserCheck,
  Router,
  ArrowRight,
  Star,
  Sparkles,
  Brain,
} from "lucide-react";

export default function DemoAllInOneAgent() {
  const [isVapiLoaded, setIsVapiLoaded] = useState(false);
  const [vapi, setVapi] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string; timestamp: Date }>
  >([]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [currentUserSpeech, setCurrentUserSpeech] = useState("");
  const [currentAssistantSpeech, setCurrentAssistantSpeech] = useState("");
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load VAPI SDK
    const loadVapi = async () => {
      try {
        const { default: Vapi } = await import("@vapi-ai/web");
        const vapiInstance = new Vapi("66034320-83fe-4da0-acb9-9df12b5a6636");

        // Set up event listeners
        vapiInstance.on("call-start", () => {
          setCallStatus("Connected");
          setIsCallActive(true);
        });

        vapiInstance.on("call-end", () => {
          setCallStatus("Call ended");
          setIsCallActive(false);
        });

        setVapi(vapiInstance);
        setIsVapiLoaded(true);
        console.log("VAPI SDK loaded successfully");
      } catch (error) {
        console.error("Failed to load VAPI:", error);
        setCallStatus("Failed to load voice system");
      }
    };

    loadVapi();
  }, []);

  const startVapiCall = () => {
    if (vapi && isVapiLoaded) {
      setTranscript([]);
      setCallStatus("Connecting...");
      setShowCallModal(true);
      setIsCallActive(true);

      try {
        vapi.start("b0f6d2b2-61e2-4b66-99f2-03524c35e9ea");
      } catch (error) {
        console.error("Error starting VAPI call:", error);
        setCallStatus("Error: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    } else {
      setCallStatus("VAPI not ready");
    }
  };

  const endCall = () => {
    if (vapi && isCallActive) {
      vapi.stop();
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 lg:min-h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        
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
                    <Building className="w-4 h-4 mr-2" />
                    Prodapt X Vodafone UK
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  Meet{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Sera
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 font-light"
                >
                  Your All-in-One Vodafone UK Business Voice Agent
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={startVapiCall}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base lg:text-lg"
                  >
                    <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span>Talk Live to Sera</span>
                  </button>
                </motion.div>
              </div>

              <div className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold mb-6 text-center">
                      Try Sera Now
                    </h3>
                    <div className="space-y-4">
                      <button
                        onClick={startVapiCall}
                        className="w-full bg-white text-gray-900 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <PhoneCall className="w-5 h-5" />
                        <span>Start Voice Demo</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Section */}
      <section id="talk-to-sera" className="py-8 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Experience Sera in Action
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Test Sera's capabilities with a live voice demonstration
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <PhoneCall className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Live Voice Call</h3>
                  <p className="text-gray-600">
                    Speak directly with Sera using your device's microphone
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Real Conversations</h3>
                  <p className="text-gray-600">
                    Experience natural dialogue with context awareness
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Multi-Service Support</h3>
                  <p className="text-gray-600">
                    Ask about billing, technical issues, or account changes
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What You Can Ask Sera
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Billing & Accounts</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• "What's my current bill amount?"</li>
                      <li>• "Can you explain this charge?"</li>
                      <li>• "I need to update my payment method"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Support</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• "My internet is running slowly"</li>
                      <li>• "Help me set up my router"</li>
                      <li>• "I'm having connection issues"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Sera Transforms Customer Service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built specifically for Vodafone UK's business customers with advanced AI that understands context, remembers conversations, and handles complex multi-service requests.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Emotional Intelligence",
                  description: "Sera recognizes frustration, urgency, and satisfaction in your voice, adapting her responses and escalation decisions accordingly.",
                  features: ["Voice tone analysis", "Emotional context awareness", "Adaptive communication style", "Stress detection"]
                },
                {
                  icon: Database,
                  title: "Conversation Memory",
                  description: "Every interaction builds context. Sera remembers previous calls, ongoing issues, and your preferences across all touchpoints.",
                  features: ["Cross-session memory", "Issue tracking", "Preference learning", "History integration"]
                },
                {
                  icon: Zap,
                  title: "Multi-Service Expertise",
                  description: "From billing queries to technical support, contract changes to new services - Sera handles it all in one conversation.",
                  features: ["Account management", "Technical diagnostics", "Service provisioning", "Billing resolution"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Deep Dive */}
      <section id="capabilities" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Complete Business Support Capabilities
              </h2>
              <p className="text-xl text-gray-600">
                Sera handles the full spectrum of Vodafone business customer needs
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  {
                    icon: CreditCard,
                    title: "Account & Billing Management",
                    description: "Complete billing support, payment processing, invoice explanations, and account modifications."
                  },
                  {
                    icon: Router,
                    title: "Technical Support & Diagnostics",
                    description: "Network troubleshooting, connectivity issues, equipment setup, and performance optimization."
                  },
                  {
                    icon: FileText,
                    title: "Contract & Service Changes",
                    description: "Plan modifications, service additions, contract renewals, and upgrade consultations."
                  },
                  {
                    icon: UserCheck,
                    title: "Business Solutions Advisory",
                    description: "Customized recommendations for business growth, efficiency improvements, and new technologies."
                  }
                ].map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex space-x-4"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <capability.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-gray-600">
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Real Business Impact
                  </h3>
                  <div className="space-y-4">
                    {[
                      { metric: "94%", label: "First-call resolution rate" },
                      { metric: "< 30s", label: "Average response time" },
                      { metric: "24/7", label: "Always available support" },
                      { metric: "100%", label: "Consistent service quality" }
                    ].map((stat, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-700">{stat.label}</span>
                        <span className="text-2xl font-bold text-blue-600">{stat.metric}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Transform CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to Experience Sera?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join the businesses already benefiting from comprehensive
                AI-powered support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#talk-to-sera"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <PhoneCall className="w-6 h-6" />
                  Try Demo Now
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Mail className="w-6 h-6" />
                  Get Started
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Live Call with Sera
              </h3>
              <button
                onClick={() => setShowCallModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div
                  className={`w-4 h-4 rounded-full ${isCallActive ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
                ></div>
                <span className="text-lg font-medium text-gray-700">
                  {callStatus}
                </span>
              </div>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={startVapiCall}
                  disabled={isCallActive}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Start Call</span>
                </button>
                <button
                  onClick={endCall}
                  disabled={!isCallActive}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  End Call
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {transcript.map((entry, index) => (
                <div
                  key={index}
                  className={`${entry.role === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg text-sm ${
                      entry.role === "user"
                        ? "bg-blue-500 text-white"
                        : entry.role === "assistant"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {entry.text}
                  </div>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

DemoAllInOneAgent.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Sera - All-in-One Vodafone UK Business Voice Agent | Live Demo"
      description="Meet Sera, the emotionally intelligent AI voice agent for Vodafone UK business customers. Handles billing, technical support, contracts, and more - all in one conversation. Try the live demo now."
      canonical="https://gozupees.com/ai-voice-agents/business-support"
      ogImage="https://gozupees.com/images/sera-business-agent.jpg"
    >
      {page}
    </Layout>
  );
};