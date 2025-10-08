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
  Home,
  TrendingUp,
  DollarSign,
  CreditCard,
  Calculator,
  UserCheck,
} from "lucide-react";

export default function CooperMortgageAgent() {
  const [activeUseCase, setActiveUseCase] = useState(0);
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
  const speechBufferRef = useRef({
    user: "",
    assistant: "",
    isSpeaking: false,
    role: "",
  });

  useEffect(() => {
    // Load VAPI SDK
    const loadVapi = async () => {
      try {
        const { default: Vapi } = await import("@vapi-ai/web");
        const vapiInstance = new Vapi("66034320-83fe-4da0-acb9-9df12b5a6636");

        // Set up event listeners
        vapiInstance.on("call-start", () => {
          setCallStatus("Connected");
          setTranscript([
            {
              role: "system",
              text: "Call connected - start speaking!",
              timestamp: new Date(),
            },
          ]);
        });

        vapiInstance.on("call-end", () => {
          setIsCallActive(false);
          setCallStatus("Call ended");
          // Add final speech segments before ending
          if (currentUserSpeech.trim()) {
            setTranscript((prev) => [
              ...prev,
              {
                role: "user",
                text: currentUserSpeech.trim(),
                timestamp: new Date(),
              },
            ]);
          }
          if (currentAssistantSpeech.trim()) {
            setTranscript((prev) => [
              ...prev,
              {
                role: "assistant",
                text: currentAssistantSpeech.trim(),
                timestamp: new Date(),
              },
            ]);
          }
          setCurrentUserSpeech("");
          setCurrentAssistantSpeech("");
          setTimeout(() => setShowCallModal(false), 3000);
        });

        vapiInstance.on("speech-start", () => {
          setCallStatus("Listening...");
          speechBufferRef.current.isSpeaking = true;
          speechBufferRef.current.role = "user";
        });

        vapiInstance.on("speech-end", () => {
          setCallStatus("Processing...");
          speechBufferRef.current.isSpeaking = false;

          // Finalize the current speech buffer
          const role = speechBufferRef.current.role;
          if (role === "user" && speechBufferRef.current.user.trim()) {
            setTranscript((prev) => [
              ...prev,
              {
                role: "user",
                text: speechBufferRef.current.user.trim(),
                timestamp: new Date(),
              },
            ]);
            speechBufferRef.current.user = "";
            setCurrentUserSpeech("");
          } else if (
            role === "assistant" &&
            speechBufferRef.current.assistant.trim()
          ) {
            setTranscript((prev) => [
              ...prev,
              {
                role: "assistant",
                text: speechBufferRef.current.assistant.trim(),
                timestamp: new Date(),
              },
            ]);
            speechBufferRef.current.assistant = "";
            setCurrentAssistantSpeech("");
          }
        });

        vapiInstance.on("message", (message: any) => {
          console.log("VAPI Message:", message);

          if (message.type === "transcript") {
            const role = message.role === "user" ? "user" : "assistant";
            const text = message.transcript || message.text || "";

            if (message.transcriptType === "partial") {
              // Update current speech display
              if (role === "user") {
                setCurrentUserSpeech(text);
                speechBufferRef.current.user = text;
              } else {
                setCurrentAssistantSpeech(text);
                speechBufferRef.current.assistant = text;
              }
            } else if (message.transcriptType === "final") {
              // Finalize the transcript
              if (role === "user") {
                setCurrentUserSpeech("");
                speechBufferRef.current.user = "";
                setTranscript((prev) => [
                  ...prev,
                  { role, text, timestamp: new Date() },
                ]);
              } else {
                setCurrentAssistantSpeech("");
                speechBufferRef.current.assistant = "";
                setTranscript((prev) => [
                  ...prev,
                  { role, text, timestamp: new Date() },
                ]);
              }
            }
          }
        });

        vapiInstance.on("error", (error: any) => {
          console.error("VAPI Error:", error);
          setCallStatus("Error: " + (error.message || "Connection failed"));
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

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript, currentUserSpeech, currentAssistantSpeech]);

  const startVapiCall = () => {
    if (vapi && isVapiLoaded) {
      setTranscript([]);
      setCurrentUserSpeech("");
      setCurrentAssistantSpeech("");
      speechBufferRef.current = {
        user: "",
        assistant: "",
        isSpeaking: false,
        role: "",
      };
      setCallStatus("Connecting...");
      setShowCallModal(true);
      setIsCallActive(true);

      try {
        console.log("Starting VAPI with Cooper agent ID");
        vapi.start("b929ac7e-c824-4597-aa5d-8c33b9464c6e");
      } catch (error) {
        console.error("Error starting VAPI call:", error);
        setCallStatus(
          "Error: " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    } else {
      setCallStatus("Voice system not ready");
    }
  };

  const endVapiCall = () => {
    if (vapi && isCallActive) {
      vapi.stop();
      setIsCallActive(false);
      setShowCallModal(false);
      setCallStatus("Ready");
    }
  };

  const useCases = [
    {
      title: "I need a mortgage for my first home",
      userMessage:
        "Hi, I'm looking to buy my first home and need advice on mortgages. I've saved £25,000 as a deposit and earn £45,000 per year. What are my options?",
      agentResponse:
        "Congratulations on taking this big step! With your £25,000 deposit and £45,000 salary, you're in a good position. Can you tell me roughly what price range you're looking at for your first home? Are you looking to buy within the next 3-6 months? I'll also need to ask about your credit history - have you had any missed payments or CCJs in the past few years? Based on your answers, I'll book you with our first-time buyer specialist who can discuss Help to Buy schemes and the best rates available.",
      outcome:
        "Qualified first-time buyer lead routed to specialist, appointment booked",
    },
    {
      title: "I want to remortgage to release equity",
      userMessage:
        "I own my home outright and want to remortgage to release some equity for home improvements. The house is worth about £400,000. What can you offer?",
      agentResponse:
        "Perfect! Remortgaging to release equity is very common for home improvements. With a £400,000 property value, you'll have good borrowing options. Can you tell me how much equity you'd like to release and what your current employment situation is? Are you looking to proceed in the next few months? I'll connect you with our remortgage specialist who can explain the different equity release options and current rates - they'll have a clear picture of what's available before your consultation.",
      outcome:
        "Equity release consultation scheduled, requirements pre-qualified",
    },
    {
      title: "I need to reschedule my mortgage appointment",
      userMessage:
        "I have an appointment tomorrow at 2pm but something came up. Can we move it to next week?",
      agentResponse:
        "No problem at all! Let me check our availability for next week. I can offer Tuesday at 10:30 AM, Wednesday at 2:00 PM, or Thursday at 4:00 PM. Which works best for you? I'll send you a new confirmation with all the details, including the documents to bring for your consultation.",
      outcome:
        "Seamless rescheduling with instant confirmation and document reminder",
    },
    {
      title: "What mortgage do I need for a buy-to-let property?",
      userMessage:
        "I want to buy a rental property as an investment. I already have a residential mortgage. What do I need to know?",
      agentResponse:
        "Buy-to-let mortgages work differently from residential ones. The rental income potential is crucial for affordability calculations. Can you tell me the expected rental income for the property you're considering and your current employment status? Do you have experience as a landlord? I'll arrange a consultation with our buy-to-let specialist who can explain the deposit requirements, tax implications, and rental yield calculations specific to your situation.",
      outcome:
        "Buy-to-let specialist consultation booked, investment strategy discussed",
    },
  ];

  const capabilitySections = [
    {
      title: "Lead Qualification (I-A-C-P-E)",
      icon: <UserCheck className="w-8 h-8" />,
      description:
        "Systematically qualifies mortgage leads using Intent, Ability, Credit, Property, and Engagement scoring",
      features: [
        "Intent & timing assessment for transaction",
        "Financial ability screening (deposit & income)",
        "Credit history and CCJ screening",
        "Property type and tenure clarification",
        "Engagement level for adviser consultation",
      ],
    },
    {
      title: "Market Insight & Education",
      icon: <TrendingUp className="w-8 h-8" />,
      description:
        "Provides current market data and explains mortgage options to build trust and demonstrate value",
      features: [
        "Live rate updates and market trends",
        "Government scheme explanations (Help to Buy, First Homes)",
        "Whole-of-market vs high street comparison",
        "Green mortgage and incentive programs",
        "FCA compliance and advice boundaries",
      ],
    },
    {
      title: "Appointment Booking & Scheduling",
      icon: <Calendar className="w-8 h-8" />,
      description:
        "Efficiently books qualified prospects with human mortgage advisers and manages consultation logistics",
      features: [
        "Real-time adviser availability checking",
        "Video, phone, or face-to-face options",
        "Document preparation guidance",
        "SMS/email confirmations with iCal links",
        "Prep checklist and 'what to bring' guidance",
      ],
    },
    {
      title: "Lead Nurturing & Follow-up",
      icon: <Mail className="w-8 h-8" />,
      description:
        "Manages warm prospects not ready to proceed with educational content and scheduled follow-ups",
      features: [
        "Market guide PDF delivery",
        "First-time buyer webinar invitations",
        "Automated content drip campaigns",
        "Rate alert subscriptions",
        "Scheduled follow-up call booking",
      ],
    },
    {
      title: "Compliance & Documentation",
      icon: <Shield className="w-8 h-8" />,
      description:
        "Maintains FCA compliance and GDPR adherence while ensuring proper lead documentation",
      features: [
        "FCA registration and fee structure disclosure",
        "GDPR consent confirmation",
        "Treating Customers Fairly protocols",
        "Real-time CRM logging and hygiene",
        "Audit trail and interaction recording",
      ],
    },
    {
      title: "Outcome Management",
      icon: <BarChart3 className="w-8 h-8" />,
      description:
        "Handles all lead outcomes professionally, from hot bookings to polite declines with next steps",
      features: [
        "Hot lead immediate booking workflow",
        "Warm lead nurture sequence initiation",
        "Cold lead constructive decline with guidance",
        "Savings plan and credit repair direction",
        "Future check-in scheduling where appropriate",
      ],
    },
  ];

  const integrations = [
    {
      category: "CRM Systems",
      tools: [
        { name: "Salesforce", domain: "salesforce.com" },
        { name: "HubSpot", domain: "hubspot.com" },
        { name: "Pipedrive", domain: "pipedrive.com" },
        { name: "Zoho CRM", domain: "zoho.com" },
      ],
      description: "Real-time lead logging and qualification scoring",
    },
    {
      category: "Communication",
      tools: [
        { name: "Twilio", domain: "twilio.com" },
        { name: "SendGrid", domain: "sendgrid.com" },
        { name: "Microsoft Teams", domain: "microsoft.com" },
        { name: "Calendly", domain: "calendly.com" },
      ],
      description: "Multi-channel messaging and appointment scheduling",
    },
    {
      category: "Mortgage Systems",
      tools: [
        { name: "Mortgage Brain", domain: "mortgagebrain.co.uk" },
        { name: "Twenty7Tec", domain: "twenty7tec.com" },
        { name: "Trigold", domain: "trigold.co.uk" },
        { name: "The Key", domain: "thekeysystem.co.uk" },
      ],
      description: "Live rate data and lender criteria access",
    },
    {
      category: "Compliance Tools",
      tools: [
        { name: "ComplianceAid", domain: "complianceaid.co.uk" },
        { name: "IRESS", domain: "iress.com" },
        { name: "Webline", domain: "webline.co.uk" },
        { name: "Paradigm", domain: "paradigmmortgages.co.uk" },
      ],
      description: "FCA compliance and audit trail management",
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "£399",
      period: "/month",
      description: "Perfect for independent mortgage brokers",
      features: [
        { name: "Core Voice AI", included: true },
        { name: "Minutes Included", value: "2,000" },
        { name: "Outbound Lead Qualification", included: true },
        { name: "Inbound Call Handling", included: false },
        { name: "Real-time Conversation", included: true },
        { name: "Voice Quality", value: "Standard" },
        { name: "Natural Language Processing", value: "Basic" },
        { name: "Conversation Memory", value: "Session Only" },
        { name: "Multi-turn Conversations", included: true },
        { name: "Interruption Handling", included: false },
        { name: "FCA Compliance", included: true },
        { name: "UK Data Residency", included: false },
      ],
    },
    {
      name: "Professional",
      price: "£699",
      period: "/month",
      description: "Ideal for growing mortgage businesses",
      popular: true,
      features: [
        { name: "Core Voice AI", included: true },
        { name: "Minutes Included", value: "4,500" },
        { name: "Outbound Lead Qualification", included: true },
        { name: "Inbound Call Handling", included: true },
        { name: "Real-time Conversation", included: true },
        { name: "Voice Quality", value: "High Quality" },
        { name: "Natural Language Processing", value: "Advanced" },
        { name: "Conversation Memory", value: "28 days" },
        { name: "Multi-turn Conversations", included: true },
        { name: "Interruption Handling", included: true },
        { name: "FCA Compliance", included: true },
        { name: "UK Data Residency", included: true },
      ],
    },
    {
      name: "Enterprise",
      price: "£1,399",
      period: "/month",
      description: "For large mortgage networks",
      features: [
        { name: "Core Voice AI", included: true },
        { name: "Minutes Included", value: "10,000" },
        { name: "Outbound Lead Qualification", included: true },
        { name: "Inbound Call Handling", included: true },
        { name: "Real-time Conversation", included: true },
        { name: "Voice Quality", value: "Premium" },
        { name: "Natural Language Processing", value: "Custom Trained" },
        { name: "Conversation Memory", value: "Unlimited" },
        { name: "Multi-turn Conversations", included: true },
        { name: "Interruption Handling", included: true },
        { name: "FCA Compliance", included: true },
        { name: "UK Data Residency", included: true },
      ],
    },
  ];

  const otherAgents = [
    {
      name: "Mortgage Advisory Agent",
      description:
        "Handles pre-consultation preparation, document collection, and initial application setup.",
      capabilities: [
        "Document collection",
        "Application prep",
        "Initial affordability checks",
        "Lender matching",
      ],
    },
    {
      name: "Remortgage Specialist Agent",
      description:
        "Focuses on existing homeowners looking to switch deals or release equity.",
      capabilities: [
        "Rate comparisons",
        "Equity calculations",
        "Early repayment assessments",
        "Switch timing advice",
      ],
    },
    {
      name: "Buy-to-Let Agent",
      description:
        "Specializes in investment property financing and landlord mortgage requirements.",
      capabilities: [
        "Rental yield calculations",
        "Portfolio lending",
        "Commercial rates",
        "Tax implications guidance",
      ],
    },
    {
      name: "First-Time Buyer Agent",
      description:
        "Dedicated support for first-time buyers navigating government schemes and processes.",
      capabilities: [
        "Scheme eligibility",
        "Shared ownership",
        "Help to Buy guidance",
        "Deposit assistance programs",
      ],
    },
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
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                      <PhoneCall className="w-4 h-4 mr-2" />
                      AI Lead Qualification Agent
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
                      Cooper
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light"
                  >
                    24/7 Mortgage Lead Qualification & Consultation Booking
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed"
                  >
                    Cooper handles outbound calling to mortgage enquiry leads,
                    building rapport, gathering key facts, and booking
                    consultations with your human advisers. Never miss a
                    qualified prospect again.
                  </motion.p>

                  {/* Multi-channel badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-wrap gap-3 mb-8"
                  >
                    {[
                      { icon: Phone, label: "Outbound Calling" },
                      { icon: MessageSquare, label: "Live Chat" },
                      { icon: Mail, label: "Email Follow-up" },
                      { icon: Calendar, label: "Appointment Booking" },
                    ].map((channel, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm"
                      >
                        <channel.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {channel.label}
                        </span>
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
                    <a
                      href="#talk-to-cooper"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base lg:text-lg"
                    >
                      <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6" />
                      <span>Talk Live to Cooper</span>
                    </a>

                    <button className="border-2 border-white/20 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 text-base lg:text-lg backdrop-blur-sm">
                      <span>Read More Below</span>
                    </button>
                  </motion.div>
                </div>

                {/* Right column - Cooper Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="relative h-full flex items-end justify-center"
                >
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    src="/cooper-portrait.png"
                    alt="Cooper - AI Mortgage Lead Qualification Agent"
                    className="w-full max-w-md h-auto block"
                    style={{
                      display: "block",
                      verticalAlign: "bottom",
                      lineHeight: 0,
                      marginBottom: 0,
                      paddingBottom: 0,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Talk to Cooper Demo Section */}
        <section id="talk-to-cooper" className="py-8 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Talk Live to Cooper
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience Cooper in action. Call our test numbers or start a
                live mortgage qualification call in your browser.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 lg:items-stretch">
              {/* Phone Options */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 lg:p-6 flex flex-col justify-between h-auto"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Phone className="w-8 h-8 text-blue-600" />
                    Call Cooper Now
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Test Cooper's mortgage qualification capabilities by calling
                    our demo lines. Experience I-A-C-P-E methodology in action.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What Cooper Can Do:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Qualify mortgage leads systematically</li>
                      <li>• Provide market insights and rates</li>
                      <li>• Book adviser consultations</li>
                      <li>• Handle FCA compliance requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🇬🇧</span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Call Cooper Now
                          </p>
                          <p className="text-blue-600 font-mono text-sm">
                            +44 204 572 XXXX
                          </p>
                        </div>
                      </div>
                      <a
                        href="tel:+44204572XXXX"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  <div className="bg-white/70 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Available 24/7
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      No wait times • Average call duration: 3-5 minutes • Free
                      demo calls
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Demo Visual */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center justify-center py-8 lg:py-0 order-first lg:order-none"
              >
                <img
                  src="/cooper-mobile-demo-v2.png"
                  alt="Mobile demo showing Cooper mortgage qualification interface"
                  className="h-[400px] lg:h-[700px] w-auto object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Browser Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 lg:p-6 flex flex-col justify-between h-auto"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Headphones className="w-8 h-8 text-green-600" />
                    Try in Browser
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start a live mortgage qualification call with Cooper
                    directly in your browser. Test voice, chat, and I-A-C-P-E
                    methodology.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Demo Features:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Real-time voice conversation</li>
                      <li>• Mortgage-specific qualification</li>
                      <li>• FCA compliant interactions</li>
                      <li>• Adviser booking simulation</li>
                    </ul>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="space-y-4">
                    <button
                      onClick={startVapiCall}
                      disabled={!isVapiLoaded}
                      className="w-full bg-green-600 text-white px-4 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 lg:gap-3 text-base lg:text-lg"
                    >
                      <Play className="w-5 h-5 lg:w-6 lg:h-6" />
                      {isVapiLoaded
                        ? "Start Live Voice Call"
                        : "Loading Voice..."}
                    </button>

                    <button className="w-full border-2 border-green-600 text-green-600 px-4 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2 lg:gap-3 text-base lg:text-lg">
                      <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" />
                      Start Text Chat
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-white/70 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Try asking Cooper:</strong> "I need a mortgage for
                      a £300k house" or "Can you book me a consultation with an
                      adviser?"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-8 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Turn Every Lead Into a Qualified Opportunity
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cooper converts mortgage enquiries into booked consultations by
                using the I-A-C-P-E qualification framework
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Use Case Tabs */}
              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveUseCase(index)}
                    className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                      activeUseCase === index
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {useCase.userMessage.substring(0, 80)}...
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Use Case Details */}
              <motion.div
                key={activeUseCase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {useCases[activeUseCase].title}
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm flex-1">
                        <p className="text-gray-800">
                          {useCases[activeUseCase].userMessage}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Headphones className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1">
                        <p className="text-gray-800">
                          {useCases[activeUseCase].agentResponse}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Outcome:</span>
                    </div>
                    <p className="text-gray-700 mt-1">
                      {useCases[activeUseCase].outcome}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Cooper Handles Section */}
        <section className="h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Never Miss Another Mortgage Lead While You Sleep
              </h2>
              <p className="text-xl text-gray-600">
                Cooper works 24/7 so your mortgage business never stops
                capturing and qualifying prospects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilitySections.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    {capability.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Capabilities Section */}
        <section className="py-8 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Plug Into Your Existing Systems in Minutes
              </h2>
              <p className="text-xl text-gray-600">
                Cooper integrates with mortgage tools you already use - no
                expensive system overhauls required
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {integrations.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {category.tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div className="font-medium text-gray-900">
                          {tool.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {tool.domain}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
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
                  Choose the plan that fits your mortgage business needs. All
                  plans include setup, training, and FCA compliance support.
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
                        ? "border-blue-500 shadow-xl"
                        : "border-gray-200 hover:border-gray-300"
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {tier.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{tier.description}</p>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-4xl font-bold text-gray-900">
                          {tier.price}
                        </span>
                        <span className="text-gray-600 ml-1">
                          {tier.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{feature.name}</span>
                          {feature.included !== undefined ? (
                            feature.included ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-gray-400" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              {feature.value}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        tier.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
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
                  Complete Mortgage AI Suite
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Cooper is part of our comprehensive AI agent ecosystem
                  designed specifically for mortgage brokers and advisers.
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
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {agent.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{agent.description}</p>

                    <ul className="space-y-2">
                      {agent.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {capability}
                          </span>
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
                Ready to Transform Your Lead Qualification?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                See how Cooper can increase your conversion rates while reducing
                manual follow-up work and ensuring FCA compliance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startVapiCall}
                  disabled={!isVapiLoaded || isCallActive}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>Talk to Cooper Now</span>
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
                <PhoneCall className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Cooper - Lead Qualification
              </h3>
              <p className="text-sm text-gray-300 mb-4">Status: {callStatus}</p>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 bg-gray-800 rounded-lg p-4 min-h-[200px]">
              <div className="space-y-4">
                {transcript.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        entry.role === "user"
                          ? "bg-blue-600 text-white"
                          : entry.role === "system"
                            ? "bg-gray-700 text-gray-300 text-center"
                            : "bg-gray-600 text-white"
                      }`}
                    >
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
                      <p className="text-xs opacity-70 mt-1">
                        Cooper is responding...
                      </p>
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
}

CooperMortgageAgent.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Cooper - AI Mortgage Lead Qualification Agent | Outbound Calling Specialist"
      description="Meet Cooper, the AI agent that qualifies mortgage leads through intelligent outbound calling. Builds rapport, gathers key facts, and books consultations with human advisers."
      canonical="https://gozupees.com/ai-voice-agents/lead-qualification-mortgage"
      ogImage="https://gozupees.com/images/cooper-mortgage-agent.jpg"
    >
      {page}
    </Layout>
  );
};
