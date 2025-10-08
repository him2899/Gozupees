import React, { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import { ReactElement } from "react";
import Layout from "../components/layout/Layout";
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
  ChevronUp,
  Mail,
  FileText,
  Activity,
  Brain,
  Database,
  Network,
  Cpu,
  HeadphonesIcon,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CallManagementModal from "../components/ui/CallManagementModal";

// Newsletter Form Component
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Submit to newsletter API (you can implement this later)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-700/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Welcome to the AI Workforce!
        </h3>
        <p className="text-gray-300 mb-6">
          You're now subscribed to our exclusive insights. Check your email for
          the free AI Employee Deployment Guide.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-700/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your business email"
            className="flex-1 px-6 py-4 rounded-2xl bg-gray-600/50 border border-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-lg"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting || !email}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Subscribing...
              </div>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                Get Free Guide
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Lead Capture Form Component
const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    demoType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, demoType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-gray-300 mb-6">
          Your demo request has been received. One of our AI specialists will
          contact you within 24 hours to schedule your personalized session.
        </p>
        <p className="text-sm text-gray-400">
          We'll send a calendar invite to{" "}
          <span className="text-blue-400">{formData.email}</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        Book Your Strategy Session
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-white mb-2 block">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="john@company.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company" className="text-white mb-2 block">
              Company *
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Company Name"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="+44 20 4572 XXXX"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="demoType" className="text-white mb-2 block">
            Demo Type *
          </Label>
          <Select onValueChange={handleSelectChange} required>
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500">
              <SelectValue placeholder="Choose your demo type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem
                value="express"
                className="text-white hover:bg-gray-700"
              >
                Express Demo (15 minutes) - Quick overview and Q&A
              </SelectItem>
              <SelectItem
                value="strategy"
                className="text-white hover:bg-gray-700"
              >
                Strategy Session (45 minutes) - Complete assessment with
                implementation plan
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message" className="text-white mb-2 block">
            Tell us about your needs
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 min-h-[100px]"
            placeholder="What specific challenges are you looking to solve with AI employees?"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold py-4 text-lg shadow-2xl disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              Booking Your Session...
            </div>
          ) : (
            <>
              <Calendar className="mr-2 w-5 h-5" />
              Book Strategy Session Now
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DummyHome() {
  // Fetch latest blog posts
  // const { data: blogPosts, error: blogError } = useSWR(
  //   "/api/blog/posts?limit=3",
  //   fetcher,
  // );
  const [activeAgent, setActiveAgent] = useState("hr");
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeCallAgent, setActiveCallAgent] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [vapi, setVapi] = useState<any>(null);

  // Call Management Modal state
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [currentModalAgent, setCurrentModalAgent] = useState<{
    name: string;
    agentId: string;
    publicKey: string;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Agent-to-account mapping for VAPI support
  const agentAccountMapping: {
    [key: string]: "default" | "gzp" | "multilingual" | "sb";
  } = {
    Hannah: "gzp",
    Ollie: "gzp",
    Nova: "gzp",
    Zeno: "gzp",
    Cooper: "gzp",
    Sera: "sb",
    Maya: "gzp",
    Mary: "sb",
    Kaylee: "gzp",
    Matthew: "sb",
    "Chloe English": "multilingual",
    "Chloe Dutch": "multilingual",
    "Chloe German": "multilingual",
    "Chloe Spanish": "multilingual",
  };

  const getAssistantId = (agentName: string, config: any) => {
    const assistantIds: { [key: string]: string } = {
      Hannah: config.hannahAssistantId,
      Ollie: config.ollieAssistantId,
      Nova: config.novaAssistantId,
      Zeno: config.zenoAssistantId,
      Cooper: config.cooperAssistantId,
      Sera: config.seraAssistantId,
      Maya: config.mayaAssistantId,
      Mary: config.maryAssistantId,
      Kaylee: config.kayleeAssistantId,
      Matthew: config.matthewAssistantId,
      // Hardcoded Chloe multilingual agent IDs since they're not in the main config
      "Chloe English": "3edd06ca-fb7f-4afa-9bc8-b7de05545931",
      "Chloe Dutch": "b170735c-5938-4b5f-9b4c-ce2e29b19429",
      "Chloe German": "062d7559-2493-4673-b27a-9a077cb19ef8",
      "Chloe Spanish": "3f0c9dfd-2612-4cee-9dcb-7a96a3c57616",
    };

    const result = assistantIds[agentName];
    console.log(`Getting assistant ID for ${agentName}:`, result);
    return result;
  };

  // Separate function to end calls for clarity
  const handleEndCall = async (agentName: string) => {
    console.log(`Attempting to end call with ${agentName}`);
    console.log("Current active agent:", activeCallAgent);
    console.log("VAPI instance exists:", !!vapi);

    if (vapi) {
      try {
        await vapi.stop();
        console.log("VAPI stop called successfully");
      } catch (error) {
        console.error("Error stopping VAPI:", error);
      }
    }

    setActiveCallAgent(null);
    setVapi(null);
    setIsConnecting(null);
    setIsCallActive(false);
    console.log("Call state reset completed");
  };

  // New function to open call management modal
  const openCallModal = async (agentName: string) => {
    try {
      // Fetch VAPI configuration from API
      const configResponse = await fetch("/api/vapi-config");
      if (!configResponse.ok) {
        throw new Error("Failed to fetch VAPI configuration");
      }

      const config = await configResponse.json();

      if (config.error) {
        console.error("VAPI configuration error:", config.error);
        return;
      }

      // Determine which public key to use based on agent account
      const accountType = agentAccountMapping[agentName] || "default";
      let publicKey;
      if (accountType === "gzp") {
        publicKey =
          config.publicKeyGzp || "969200c5-7907-492a-b1b3-f859dfca0029";
      } else if (accountType === "multilingual") {
        publicKey =
          config.publicKeyMultilingual ||
          "653b09b8-2fef-47df-b5ab-a1c101c682f1";
      } else if (accountType === "sb") {
        publicKey =
          config.publicKeySB || "66034320-83fe-4da0-acb9-9df12b5a6636";
      } else {
        publicKey = config.publicKey;
      }

      if (!publicKey) {
        console.error("Public key not found for", agentName);
        return;
      }

      // Get the assistant ID based on agent name
      const assistantId = getAssistantId(agentName, config);

      if (!assistantId) {
        console.error("Assistant ID not found for", agentName);
        return;
      }

      // Set up modal agent data and open modal
      console.log("Setting up modal agent data:", {
        name: agentName,
        agentId: assistantId,
        publicKey: publicKey?.substring(0, 8) + "...",
        accountType,
      });

      setCurrentModalAgent({
        name: agentName,
        agentId: assistantId,
        publicKey: publicKey,
      });
      setIsCallModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch VAPI config for modal:", error);
    }
  };

  // Legacy VAPI call function - keeping for compatibility but updating to use modal
  const handleVapiCall = async (agentName: string) => {
    openCallModal(agentName);
  };

  // Neural network animation effect (matching homepage)
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
    }[] = [];
    let connections: {
      from: number;
      to: number;
      age: number;
      maxAge: number;
    }[] = [];

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
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    window.addEventListener("resize", resize);
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
        ctx.fillStyle = "rgba(100, 149, 237, 0.3)";
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
          maxAge: Math.random() * 120 + 60,
        });
      }

      connections = connections.filter((conn) => {
        conn.age++;
        if (conn.age > conn.maxAge) return false;

        const from = particles[conn.from];
        const to = particles[conn.to];
        const opacity = Math.sin((conn.age / conn.maxAge) * Math.PI) * 0.4;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Agent categories with their respective agents
  const agentCategories = {
    hr: {
      title: "HR & People Operations",
      color: "from-blue-600 to-purple-600",
      icon: <Users className="w-6 h-6" />,
      agents: [
        {
          name: "Hannah",
          role: "HR Support Manager",
          description:
            "Hannah is your dedicated HR support specialist, providing warm, emotionally intelligent assistance for all employee-facing HR queries. She's expertly trained in UK employment law and company policies, with extensive experience in employee relations and workplace conflict resolution.",
          specialties: [
            "Employee Relations",
            "UK Employment Law",
            "Conflict Resolution",
            "Policy Implementation",
          ],
          availability:
            "Available 24/7 with priority support during business hours",

          phone: "+44 20 4572 XXXX",
          capabilities: [
            "Leave & Time-Off Handling",
            "Payslips & Payroll Support",
            "Policy & Handbook Guidance",
            "Grievance & Escalation",
            "HR Meeting Booking",
          ],
          image: "/hannah-profile.png",
        },
        {
          name: "Ollie",
          role: "Onboarding & Exit Coordinator",
          description:
            "Ollie is your dedicated onboarding and exit specialist, bringing energy and organization to every employee transition. He ensures new joiners feel welcomed and supported while making departures smooth and respectful for all parties involved.",
          specialties: [
            "Employee Onboarding",
            "Exit Management",
            "System Setup",
            "Process Coordination",
          ],
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "New Joiner Setup",
            "Equipment Management",
            "Exit Interviews",
            "Final Handover Support",
            "System Access Management",
          ],
          image: "/ollie-profile.png",
        },
        {
          name: "Nova",
          role: "Virtual Talent Screener",
          description:
            "Nova is your intelligent virtual interviewer, conducting comprehensive candidate assessments with professional expertise and human-like intuition. She combines advanced conversational AI with deep psychological insights to evaluate technical competencies, cultural fit, and career motivation in a natural, engaging interview format.",
          specialties: [
            "Technical Assessment",
            "Behavioral Analysis",
            "Cultural Fit Evaluation",
            "Psychology-Based Screening",
          ],
          availability:
            "Available 24/7 for flexible scheduling across all time zones",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "Candidate Role Mapping",
            "Skill & Reasoning Evaluation",
            "Soft Skills Assessment",
            "Career & Motivation Check",
            "Interview Summary Generation",
          ],
          image: "/nova-profile.png",
        },
      ],
    },
    sales: {
      title: "Sales & Lead Generation",
      color: "from-green-600 to-teal-600",
      icon: <Target className="w-6 h-6" />,
      agents: [
        {
          name: "Zeno",
          role: "Generator Systems Specialist",
          description:
            "Zeno is your conversational AI assistant specializing in generator systems, helping businesses and individuals find the perfect power solutions. He combines deep technical expertise with a friendly, advisory approach, speaking like a knowledgeable generator technician who makes complex decisions simple and straightforward.",
          specialties: [
            "Generator Sizing & Selection",
            "Fuel Systems Analysis",
            "Site Assessment",
            "Conversion Optimization",
          ],
          availability:
            "Available 24/7 for immediate consultation and quote generation",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "System Sizing Recommendations",
            "Fuel Option Analysis",
            "Installation Requirements",
            "Quote Generation",
            "Expert Callback Scheduling",
          ],
          image: "/zeno-profile.png",
        },
        {
          name: "Cooper",
          role: "Mortgage Lead Qualification Specialist",
          description:
            "Cooper is your outbound AI voice assistant for a UK whole-of-market mortgage brokerage. He calls leads who've filled out mortgage advice enquiries with one core mission: qualify and book appointments with serious mortgage seekers using his 5-Point Qualification Framework.",
          specialties: [
            "Intent Assessment",
            "Ability Verification",
            "Credit Evaluation",
            "Property Analysis",
          ],
          availability:
            "Available 24/7 for outbound lead qualification and appointment booking",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "5-Point Qualification Framework",
            "Appointment Booking with Advisers",
            "Lead Nurturing & Follow-ups",
            "FCA Compliance Management",
            "Resource Sharing & Guidance",
          ],
          image: "/cooper-profile.png",
        },
      ],
    },
    support: {
      title: "Customer Support",
      color: "from-orange-600 to-red-600",
      icon: <Headphones className="w-6 h-6" />,
      agents: [
        {
          name: "Sera",
          role: "Vodafone Business Support Specialist",
          description:
            "Sera is your AI-powered voice-based customer service agent built for Vodafone UK Business Support. She fully resolves business customer issues on the spot — no transfers, no delays, no scripts. With warm confidence and emotional intelligence, she handles everything from billing queries to technical troubleshooting.",
          specialties: [
            "Business Account Support",
            "Billing & Plan Management",
            "Fault Troubleshooting",
            "Contract & Plan Eligibility",
          ],
          availability: "Available 24/7 for Vodafone business customer support",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "Account Access & Lookup",
            "Issue Resolution & Support",
            "JIRA Ticket Management",
            "Multi-Topic Conversational Intelligence",
            "Technical Interpretation",
          ],
          image: "/sera-profile.png",
        },
        {
          name: "Maya",
          role: "Housing Support Specialist",
          description:
            "Maya is your 24/7 voice assistant designed to be your always-available, emotionally intelligent housing support agent. She helps residents handle housing-related issues through natural, conversational voice interactions with warm, human empathy and professional expertise.",
          specialties: [
            "Repairs & Maintenance",
            "Heating/Gas Issues",
            "Anti-Social Behaviour",
            "Tenancy Queries",
            "Safeguarding Support",
          ],
          availability:
            "Available 24/7 for residents with emotionally intelligent support",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "Emergency repair assessment",
            "Structured ticket logging",
            "Policy-aligned guidance",
            "De-escalation support",
            "Self-fix troubleshooting",
          ],
          image: "/maya-property-support.png",
        },
      ],
    },
    operations: {
      title: "Operations & Admin",
      color: "from-purple-600 to-pink-600",
      icon: <Settings className="w-6 h-6" />,
      agents: [
        {
          name: "Kaylee",
          role: "Field Engineer Support Specialist",
          description:
            "Kaylee is a voice-based AI assistant built specifically for CityFibre field engineers working in real-world, on-site environments. She's like having your smartest field lead in your ear — talking you through any job, hands-free, so you can work faster and more confidently without needing to touch a screen or read a document.",
          specialties: [
            "SOP Guide Mode",
            "Line Test Mode",
            "Troubleshooting Mode",
            "Onboarding Q&A Mode",
          ],
          availability:
            "Available 24/7 for hands-free field support and technical guidance",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "Step-by-step SOP guidance",
            "VFL and power meter test support",
            "Real-time troubleshooting",
            "Escalation-ready summaries",
            "New engineer onboarding",
          ],
          image: "/kaylee-field-engineer.png",
        },
        {
          name: "Matthew",
          role: "L1 Fault Support Engineer",
          description:
            'Matthew is an AI field engineer who answers, diagnoses, and does the after-call paperwork — in seconds. From first "Hi there" to a neatly logged Jira ticket, Matthew handles the entire L1 fault journey without human hand-offs. More than just a voice agent, he works on systems and performs comprehensive after-call work.',
          specialties: [
            "Greets & Identifies",
            "Instant Data Pull",
            "Smart Diagnostics",
            "Guided Fix",
            "Autonomous After-Call Work",
            "Close & Delight",
          ],
          availability:
            "Available 24/7 with zero wait time for L1 fault resolution",
          phone: "+44 20 4572 XXXX",
          capabilities: [
            "60%+ first-contact resolution",
            "4-minute average handling time",
            "Automated line tests and outage look-ups",
            "Nine proven resolution playbooks",
            "Perfect Jira ticket creation",
            "Scottish lilt voice experience",
          ],
          image: "/matthew-l1-support.png",
        },
      ],
    },
  };

  // Core advantages for section 3
  const coreAdvantages = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Task Completion, Not Just Response",
      description:
        "Our agents don't just answer questions—they book meetings, fill forms, trigger workflows, and complete end-to-end processes like real employees.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Real-Time Availability",
      description:
        "Always-on agents reduce response time to seconds with no wait times, downtime, or burnout. Your business never sleeps.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Omnichannel Consistency",
      description:
        "Single agent experience across voice, chat, WhatsApp, and SMS. No need to build separate flows per channel.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Faster Lead Response = Higher Conversions",
      description:
        "AI agents qualify and follow up within minutes with zero leads missed due to time zones or after-hours availability.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Stats for section 4
  const stats = [
    {
      number: "65%",
      label: "of inbound queries resolved autonomously",
      icon: <Phone className="w-6 h-6" />,
    },
    {
      number: "50%",
      label: "reduction in Average Handle Time",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      number: "70%",
      label: "drop in missed calls",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "3x",
      label: "faster first-response time",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      number: "90%+",
      label: "accuracy in task completion",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "$100K+",
      label: "saved per department annually",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  // Features for section 6
  const coreFeatures = [
    {
      title: "Natural Voice & Accents",
      description:
        "Hyper-realistic voice with human pacing, emotion modulation, and regional accent support",
      icon: <MessageSquare className="w-8 h-8" />,
    },
    {
      title: "Multilingual Agents",
      description:
        "Fluent in 20+ languages with automatic detection and culturally-aware responses",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: "Outbound & Inbound",
      description:
        "Proactive outreach for follow-ups, reminders, and lead nurturing alongside inbound support",
      icon: <Phone className="w-8 h-8" />,
    },
    {
      title: "Omnichannel Support",
      description:
        "Seamless experience across voice calls, chat widgets, WhatsApp, and SMS",
      icon: <Users className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 1. Hero Section - Matching Homepage Style */}
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
            {/* Voice AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-5 bg-pink-500 rounded-full animate-pulse delay-150"></div>
                  <div className="w-1 h-7 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-500"></div>
                </div>
                <span className="text-blue-300 text-sm font-medium">
                  Deploy Your Complete AI Workforce Today
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-12 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Enterprise Ready
              </span>{" "}
              AI Employees
              <br />
              for Every Function
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              className="text-xl sm:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Deploy specialized AI employees across Sales, HR, Customer
              Support, and Operations. Ready to work from day one.
            </motion.p>

            {/* Interactive Benefit Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Zero Setup Time</span>
                </button>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  Deploy in minutes, not months
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>200+ Integrations</span>
                </button>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  Works with your existing tech stack
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Enterprise Security</span>
                </button>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  SOC2, HIPAA, GDPR compliant
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">500+</span>
                <span className="text-gray-400 text-sm">
                  COMPANIES DEPLOYED
                </span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">65%</span>
                <span className="text-gray-400 text-sm">COST REDUCTION</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">24/7</span>
                <span className="text-gray-400 text-sm">AVAILABILITY</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all duration-300 w-[240px] h-[70px] flex items-center justify-center"
                onClick={() =>
                  document
                    .getElementById("agents")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <div className="flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  See Demos
                </div>
              </motion.button>

              <Link href="/contact" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white/10 hover:bg-white/20 border border-white/30 text-white px-12 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 w-[240px] h-[70px] flex items-center justify-center"
                >
                  <div className="flex items-center justify-center">
                    <MessageSquare className="mr-2 w-5 h-5" />
                    Talk to Sales
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Demo of Functions - Enhanced Agent Categories */}
      <section id="agents" className="py-24 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <Bot className="w-4 h-4 mr-2" />
                Interactive AI Workforce Demo
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Meet Your
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                AI Employees
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Each AI employee is a domain expert, trained on thousands of real
              conversations and equipped with advanced reasoning capabilities.
              Call them directly to experience how they handle complex
              scenarios, manage workflows, and deliver exceptional results.
            </motion.p>
          </div>

          {/* Enhanced Category Tabs */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {Object.entries(agentCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => {
                  setActiveAgent(key);
                  setSelectedAgentIndex(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeAgent === key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50"
                } backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * Object.keys(agentCategories).indexOf(key),
                }}
              >
                <div className="mr-3 p-2 rounded-lg bg-white/10">
                  {category.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{category.title}</div>
                  <div className="text-sm opacity-80">
                    {category.agents.length} specialists available
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Agent Carousel */}
          <div className="relative max-w-6xl mx-auto">
            {/* Agent Selection Dots */}
            <div className="flex justify-center gap-4 mb-8">
              {agentCategories[
                activeAgent as keyof typeof agentCategories
              ].agents.map((agent, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedAgentIndex(index)}
                  className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedAgentIndex === index
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 text-sm font-bold">
                    {(agent as any).image ? (
                      <img
                        src={(agent as any).image}
                        alt={agent.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      (agent as any).avatar || agent.name.charAt(0)
                    )}
                  </div>
                  <span className="font-medium">{agent.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Current Agent Card */}
            <motion.div
              key={selectedAgentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-blue-500/20 shadow-2xl overflow-hidden"
            >
              {(() => {
                const currentAgent =
                  agentCategories[activeAgent as keyof typeof agentCategories]
                    .agents[selectedAgentIndex];

                if ((currentAgent as any)?.image) {
                  // Special layout for agents with phone interface images
                  return (
                    <div className="grid grid-cols-3 gap-8 items-start">
                      {/* Left side - Direct Phone Interface Image (1/3 width) */}
                      <div className="flex items-center justify-center p-6">
                        <img
                          src={(currentAgent as any).image}
                          alt={`${currentAgent.name} - ${(currentAgent as any).role}`}
                          className="w-full h-auto object-contain rounded-2xl shadow-xl"
                        />
                      </div>

                      {/* Right side - Agent Details (2/3 width) */}
                      <div className="col-span-2 p-8 space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {currentAgent.name}
                          </h3>
                          <p className="text-xl text-blue-400 mb-4">
                            {(currentAgent as any).role}
                          </p>
                          <div className="flex items-center text-gray-400 text-sm mb-6">
                            <Phone className="w-4 h-4 mr-2" />
                            {currentAgent.phone} • Available 24/7
                          </div>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                          {currentAgent.description}
                        </p>

                        {/* Specialties */}
                        {(currentAgent as any).specialties && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-3">
                              Specialties
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(currentAgent as any).specialties.map(
                                (specialty: any, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                                  >
                                    {specialty}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Core Capabilities */}
                        <div className="space-y-4 mb-6">
                          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                            Core Capabilities
                          </h4>
                          <div className="grid gap-3">
                            {currentAgent.capabilities.map(
                              (capability, capIndex) => (
                                <div
                                  key={capIndex}
                                  className="flex items-center text-gray-300"
                                >
                                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  </div>
                                  <span className="text-sm">{capability}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                          <Button
                            onClick={() => handleVapiCall(currentAgent.name)}
                            disabled={false}
                            className="w-full py-4 text-lg font-semibold shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            {isConnecting === currentAgent.name ? (
                              <>
                                <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Connecting...
                              </>
                            ) : activeCallAgent === currentAgent.name ? (
                              <>
                                <div className="w-5 h-5 mr-3 rounded-full bg-white animate-pulse"></div>
                                End Call
                              </>
                            ) : (
                              <>
                                <Phone className="w-5 h-5 mr-3" />
                                Talk to {currentAgent.name}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  // Standard layout for other agents
                  return (
                    <div className="p-8">
                      <div className="max-w-4xl mx-auto">
                        {/* Agent Header */}
                        <div className="flex items-center mb-8">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                              {(currentAgent as any).avatar ||
                                currentAgent.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <h3 className="text-3xl font-bold text-white mb-2">
                              {currentAgent.name}
                            </h3>
                            <p className="text-xl text-blue-400 mb-2">
                              {(currentAgent as any).role}
                            </p>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Phone className="w-4 h-4 mr-2" />
                              {currentAgent.phone} • Available 24/7
                            </div>
                          </div>
                        </div>

                        {/* Agent Description */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                          {currentAgent.description}
                        </p>

                        {/* Capabilities Grid */}
                        <div className="space-y-4 mb-8">
                          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                            Core Capabilities
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {currentAgent.capabilities.map(
                              (capability, capIndex) => (
                                <div
                                  key={capIndex}
                                  className="flex items-center text-gray-300"
                                >
                                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  </div>
                                  <span className="text-sm">{capability}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            onClick={() => handleVapiCall(currentAgent.name)}
                            disabled={false}
                            className="flex-1 py-4 text-lg font-semibold shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            {isConnecting === currentAgent.name ? (
                              <>
                                <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Connecting...
                              </>
                            ) : activeCallAgent === currentAgent.name ? (
                              <>
                                <X className="w-5 h-5 mr-3" />
                                End Call
                              </>
                            ) : (
                              <>
                                <Phone className="w-5 h-5 mr-3" />
                                Call {currentAgent.name} Now
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Success Metrics */}
                        <div className="mt-8 pt-8 border-t border-gray-600/30">
                          <div className="grid grid-cols-2 gap-8 text-center">
                            <div>
                              <div className="text-3xl font-bold text-blue-400">
                                98%
                              </div>
                              <div className="text-sm text-gray-400">
                                Success Rate
                              </div>
                            </div>
                            <div>
                              <div className="text-3xl font-bold text-green-400">
                                &lt;2s
                              </div>
                              <div className="text-sm text-gray-400">
                                Response Time
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}
            </motion.div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                onClick={() =>
                  setSelectedAgentIndex((prev) =>
                    prev === 0
                      ? agentCategories[
                          activeAgent as keyof typeof agentCategories
                        ].agents.length - 1
                      : prev - 1,
                  )
                }
                className="flex items-center px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full text-gray-300 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous Agent
              </motion.button>

              <motion.button
                onClick={() =>
                  setSelectedAgentIndex((prev) =>
                    prev ===
                    agentCategories[activeAgent as keyof typeof agentCategories]
                      .agents.length -
                      1
                      ? 0
                      : prev + 1,
                  )
                }
                className="flex items-center px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full text-gray-300 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Agent
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 mb-6">
              Ready to see how AI employees can transform your operations?
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-4 text-lg"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Department-Wide Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Advantages - Compact Single Viewport Design */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Competitive Advantages
              </Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Why AI Employees
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Outperform Traditional Solutions
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Enterprise-grade AI that completes workflows, drives outcomes, and
              delivers ROI from day one.
            </motion.p>
          </div>

          {/* Compact Advantages Grid - 6 items in 2 rows */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {coreAdvantages
              .concat([
                {
                  icon: <Database />,
                  title: "Enterprise Security",
                  description:
                    "SOC2, GDPR compliant with zero data retention policies",
                  gradient: "from-slate-600 to-slate-700",
                },
                {
                  icon: <Clock />,
                  title: "Instant Deployment",
                  description:
                    "Go live in 2 weeks with full workflow automation",
                  gradient: "from-slate-600 to-slate-700",
                },
              ])
              .map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 h-full">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${advantage.gradient} flex items-center justify-center text-white`}
                        >
                          {React.cloneElement(
                            advantage.icon as React.ReactElement,
                            { className: "w-5 h-5" },
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {advantage.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-2">
                          {advantage.description}
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {index === 0 &&
                            "Complete API orchestration with real-time decision making across systems"}
                          {index === 1 &&
                            "Zero downtime with 99.9% uptime SLA guarantee and instant failover"}
                          {index === 2 &&
                            "Deploy once, scale infinitely across all departments without limits"}
                          {index === 3 &&
                            "Advanced predictive analytics with autonomous follow-up sequences"}
                          {index === 4 &&
                            "Bank-level encryption with annual penetration testing and compliance audits"}
                          {index === 5 &&
                            "Pre-built integrations and rapid onboarding process with dedicated support"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Enhanced Visual Comparison */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              AI Employees vs. Traditional Solutions
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Traditional Chatbots */}
              <motion.div
                className="relative bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-slate-600/30 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <h4 className="font-bold text-slate-300 mb-4 text-lg">
                  Traditional Chatbots
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start text-sm text-gray-400">
                    <X className="w-4 h-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Script-based responses only</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cannot handle context or nuanced requests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-gray-400">
                    <X className="w-4 h-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Limited to FAQ answers</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Breaks down with complex business scenarios
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-gray-400">
                    <X className="w-4 h-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>No workflow completion</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cannot execute multi-step business processes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-gray-400">
                    <X className="w-4 h-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Requires constant manual updates</p>
                      <p className="text-xs text-gray-500 mt-1">
                        High maintenance overhead for IT teams
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-800/40 rounded-lg border border-slate-600/30">
                  <p className="text-xs text-slate-300">
                    15% success rate for complex queries
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    85% of interactions require human handoff
                  </p>
                </div>
              </motion.div>

              {/* Human Agents */}
              <motion.div
                className="relative bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/40"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <h4 className="font-bold text-amber-400 mb-4 text-lg">
                  Human Agents
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start text-sm text-white">
                    <AlertTriangle className="w-4 h-4 mr-2 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Limited to business hours</p>
                      <p className="text-xs text-gray-400 mt-1">
                        60% of leads contact outside office hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-white">
                    <AlertTriangle className="w-4 h-4 mr-2 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Inconsistent performance</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Quality varies by mood, experience, training
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-white">
                    <AlertTriangle className="w-4 h-4 mr-2 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>High training & turnover costs</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Average 18% annual turnover in customer service
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-white">
                    <AlertTriangle className="w-4 h-4 mr-2 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Difficult to scale quickly</p>
                      <p className="text-xs text-gray-400 mt-1">
                        3-6 months to hire and train new agents
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-600/30">
                  <p className="text-xs text-amber-300">
                    $45K+ annual cost per agent
                  </p>
                  <p className="text-xs text-amber-400/80 mt-1">
                    Plus benefits, training, and infrastructure costs
                  </p>
                </div>
              </motion.div>

              {/* GoZupees AI Employees */}
              <motion.div
                className="relative bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/40"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <h4 className="font-bold text-blue-400 mb-4 text-lg">
                  GoZupees AI Employees
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start text-sm text-white">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Context-aware reasoning</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Understands intent, emotion, and business context
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-white">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>End-to-end task completion</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Executes complete workflows autonomously
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-white">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>24/7 consistent performance</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Same quality every interaction, every time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-white">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Continuous learning & improvement</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Gets smarter with every conversation
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <p className="text-xs text-blue-300">
                    95% task completion rate
                  </p>
                  <p className="text-xs text-blue-400/80 mt-1">
                    $12K annual cost - 75% less than human agents
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Stats - Minimalist Design */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <BarChartIcon className="w-4 h-4 mr-2" />
                Performance Metrics
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Proven Results
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Across Industries
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Real performance data from 500+ companies that have deployed AI
              employees. These metrics represent actual improvements measured
              across sales, support, and operational workflows within the first
              90 days of deployment.
            </motion.p>
          </div>

          {/* Enhanced Performance Metrics with Data Visualizations */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16 lg:items-start">
            {/* Left Side - Key Numbers */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 h-full flex flex-col"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 4).map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30"
                  >
                    <div className="w-10 h-10 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      {React.cloneElement(stat.icon as React.ReactElement, {
                        className: "w-5 h-5",
                      })}
                    </div>
                    <div className="text-2xl font-bold mb-2 text-white">
                      {stat.number}
                    </div>
                    <p className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-600/30">
                      <p className="text-xs text-gray-400">
                        {index === 0 && "500+ companies verified"}
                        {index === 1 && "First 30 days average"}
                        {index === 2 && "vs. business hours only"}
                        {index === 3 && "vs. traditional systems"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Key Metrics */}
              <div className="grid grid-cols-1 gap-4">
                {stats.slice(4).map((stat, index) => (
                  <motion.div
                    key={index + 4}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 4) * 0.1 }}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {React.cloneElement(stat.icon as React.ReactElement, {
                        className: "w-6 h-6",
                      })}
                    </div>
                    <div className="flex-1">
                      <div className="text-xl font-bold mb-1 text-white">
                        {stat.number}
                      </div>
                      <p className="text-gray-300 text-sm">{stat.label}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {index + 4 === 4 && "Validated by independent audits"}
                        {index + 4 === 5 && "Including implementation costs"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Industry Breakdown - Moved from right side */}
              <div className="grid grid-cols-2 gap-4 mt-8 flex-grow">
                <motion.div
                  className="bg-gray-700/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">
                    Financial Services
                  </h4>
                  <p className="text-3xl font-bold text-white mb-2">78%</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Lead conversion improvement
                  </p>
                  <div className="text-xs text-gray-500 space-y-1 text-left">
                    <p>• 24/7 loan qualification</p>
                    <p>• Automated KYC processes</p>
                    <p>• Compliance documentation</p>
                    <p>• Multi-channel support</p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-700/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-green-400 mb-2">
                    Healthcare
                  </h4>
                  <p className="text-3xl font-bold text-white mb-2">89%</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Patient satisfaction increase
                  </p>
                  <div className="text-xs text-gray-500 space-y-1 text-left">
                    <p>• Appointment scheduling</p>
                    <p>• Prescription reminders</p>
                    <p>• Symptom assessment</p>
                    <p>• Insurance verification</p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-700/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">
                    Real Estate
                  </h4>
                  <p className="text-3xl font-bold text-white mb-2">156%</p>
                  <p className="text-xs text-gray-400 mb-3">
                    More qualified leads per month
                  </p>
                  <div className="text-xs text-gray-500 space-y-1 text-left">
                    <p>• Property inquiries</p>
                    <p>• Viewing bookings</p>
                    <p>• Buyer qualification</p>
                    <p>• Market updates</p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-700/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">
                    Insurance
                  </h4>
                  <p className="text-3xl font-bold text-white mb-2">62%</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Reduction in claim processing time
                  </p>
                  <div className="text-xs text-gray-500 space-y-1 text-left">
                    <p>• Claims intake</p>
                    <p>• Policy renewals</p>
                    <p>• Quote generation</p>
                    <p>• Risk assessment</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Data Visualizations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 h-full flex flex-col"
            >
              {/* Performance Comparison Bar Chart */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <h4 className="text-lg font-semibold text-white mb-6">
                  Performance vs Traditional Solutions
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={[
                        {
                          name: "Task Completion",
                          AI: 95,
                          Human: 73,
                          Chatbot: 15,
                        },
                        {
                          name: "Response Time",
                          AI: 92,
                          Human: 45,
                          Chatbot: 35,
                        },
                        {
                          name: "Availability",
                          AI: 100,
                          Human: 40,
                          Chatbot: 85,
                        },
                        { name: "Consistency", AI: 98, Human: 62, Chatbot: 25 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        fontSize={11}
                        tick={{ fill: "#9CA3AF" }}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        fontSize={11}
                        tick={{ fill: "#9CA3AF" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid #374151",
                          borderRadius: "12px",
                          color: "#F9FAFB",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Bar
                        dataKey="AI"
                        fill="#3B82F6"
                        name="AI Employees"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Human"
                        fill="#F59E0B"
                        name="Human Agents"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Chatbot"
                        fill="#6B7280"
                        name="Traditional Chatbots"
                        radius={[4, 4, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Industry Success Pie Chart */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <h4 className="text-lg font-semibold text-white mb-6">
                  Success Rate by Industry
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Financial Services",
                            value: 78,
                            color: "#3B82F6",
                          },
                          { name: "Healthcare", value: 89, color: "#10B981" },
                          { name: "Real Estate", value: 85, color: "#8B5CF6" },
                          { name: "Insurance", value: 82, color: "#F59E0B" },
                          { name: "Other", value: 79, color: "#6B7280" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="#1F2937"
                        strokeWidth={2}
                      >
                        {[
                          { color: "#3B82F6" },
                          { color: "#10B981" },
                          { color: "#8B5CF6" },
                          { color: "#F59E0B" },
                          { color: "#6B7280" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid #374151",
                          borderRadius: "12px",
                          color: "#F9FAFB",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ROI Growth Timeline - Increased height to match left side */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <h4 className="text-lg font-semibold text-white mb-6">
                  ROI Growth Over Time
                </h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Month 1", ROI: 15 },
                        { month: "Month 2", ROI: 45 },
                        { month: "Month 3", ROI: 125 },
                        { month: "Month 6", ROI: 285 },
                        { month: "Month 12", ROI: 385 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#9CA3AF"
                        fontSize={11}
                        tick={{ fill: "#9CA3AF" }}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        fontSize={11}
                        tick={{ fill: "#9CA3AF" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid #374151",
                          borderRadius: "12px",
                          color: "#F9FAFB",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ROI"
                        stroke="#10B981"
                        strokeWidth={4}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 8 }}
                        activeDot={{ r: 10, fill: "#10B981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Strategy Session
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Deploy Your
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {" "}
                  AI Workforce?
                </span>
              </h2>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Get a personalized 45-minute strategy session where we'll map
                out exactly how AI employees can transform your specific
                operations, calculate your ROI, and design a custom
                implementation plan.
              </p>

              {/* Enhanced Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Live AI Employee Demo
                    </h4>
                    <p className="text-gray-400 text-sm">
                      See our agents handle your actual use cases in real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      ROI Analysis & Business Case
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Detailed financial impact assessment for your department
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Custom Implementation Roadmap
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Step-by-step deployment plan with timeline and milestones
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Integration Assessment
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Technical review of your existing systems and tools
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 strategy-session-form"
            >
              <LeadCaptureForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Core Features - Minimalist Design */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
                <Bot className="w-4 h-4 mr-2" />
                AI Agent Capabilities
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              What Your AI Employees
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Can Actually Do
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              From complex conversations to data analysis, appointment booking
              to lead qualification - your AI workforce handles every
              interaction with intelligence and precision.
            </motion.p>
          </div>

          {/* Enhanced Agent Capabilities Grid - 2 rows of 4 features each */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-blue-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  Natural Conversations
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Handles complex, multi-turn conversations with context
                  awareness and emotional intelligence
                </p>
                <div className="text-xs text-orange-400 font-medium">
                  99.2% conversation success
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-purple-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  Smart Scheduling
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Books appointments across time zones, handles rescheduling,
                  and manages complex calendar logic
                </p>
                <div className="text-xs text-green-400 font-medium">
                  24/7 availability
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-green-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  Lead Qualification
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Identifies high-value prospects, qualifies based on custom
                  criteria, and routes to right team
                </p>
                <div className="text-xs text-blue-400 font-medium">
                  89% qualification accuracy
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-orange-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  Data Collection
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Gathers customer information, updates CRM records, and
                  maintains accurate data integrity
                </p>
                <div className="text-xs text-purple-400 font-medium">
                  Real-time CRM sync
                </div>
              </div>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-cyan-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  Multilingual Support
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Fluent in 20+ languages with cultural nuances and
                  region-specific business practices
                </p>
                <div className="text-xs text-green-400 font-medium">
                  20+ languages supported
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-yellow-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  Document Processing
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Analyzes contracts, extracts key information, and generates
                  reports from complex documents
                </p>
                <div className="text-xs text-blue-400 font-medium">
                  95% data extraction accuracy
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-indigo-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  Performance Analytics
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Tracks KPIs, identifies improvement opportunities, and
                  provides actionable business insights
                </p>
                <div className="text-xs text-orange-400 font-medium">
                  Real-time dashboards
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="group"
            >
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-pink-500/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                  Customer Support
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Resolves issues, escalates when needed, and maintains customer
                  satisfaction scores
                </p>
                <div className="text-xs text-green-400 font-medium">
                  94% resolution rate
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA within AI Capabilities Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Deploy These AI Capabilities?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              See how our AI employees can transform your specific operations.
              Get a personalized demo and ROI analysis for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link href="/pricing">
                <motion.button
                  className="border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-gray-700/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Knowledge-Trained & Learning Agents */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-blue-900 text-white min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
                    <Bot className="w-4 h-4 mr-2" />
                    Personalized AI Intelligence
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Trained on Your Knowledge,
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {" "}
                      Learning Every Day
                    </span>
                  </h2>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Our AI employees don't just follow scripts—they're trained on
                  your SOPs, CRM data, past conversations, and success patterns.
                  They learn from every interaction to deliver increasingly
                  personalized customer experiences.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Custom Knowledge Training
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Trained on your SOPs, help docs, CRM logs, and internal
                        processes for context-aware responses.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Continuous Learning
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Adapts and improves based on customer feedback,
                        successful outcomes, and conversation patterns.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Personalized Experiences
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Remembers customer preferences, history, and context for
                        tailored interactions every time.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Performance Dashboard */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Learning Progress
                    </span>
                    <span className="text-sm text-green-400 font-semibold">
                      +15% this week
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">
                          Customer Intent Recognition
                        </span>
                        <span className="text-blue-400 font-semibold">94%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "94%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">
                          Resolution Accuracy
                        </span>
                        <span className="text-green-400 font-semibold">
                          91%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "91%" }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">
                          Personalization Score
                        </span>
                        <span className="text-purple-400 font-semibold">
                          88%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "88%" }}
                          transition={{ duration: 1.5, delay: 0.9 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Knowledge Base Visualization */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-300">
                      Knowledge Sources
                    </span>
                    <span className="text-xs text-blue-400">
                      Real-time sync
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* SOPs */}
                    <motion.div
                      className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            SOPs & Policies
                          </div>
                          <div className="text-xs text-blue-300">
                            347 documents
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400">Synced</div>
                    </motion.div>

                    {/* CRM Data */}
                    <motion.div
                      className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Database className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            CRM History
                          </div>
                          <div className="text-xs text-purple-300">
                            1.2M interactions
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400">Live</div>
                    </motion.div>

                    {/* Help Docs */}
                    <motion.div
                      className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            Help Center
                          </div>
                          <div className="text-xs text-green-300">
                            892 articles
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400">Updated</div>
                    </motion.div>

                    {/* Conversation Logs */}
                    <motion.div
                      className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            Chat Logs
                          </div>
                          <div className="text-xs text-orange-300">
                            Real-time learning
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400">Active</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Multilingual AI Agents */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Global Communication
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              AI Agents That Speak
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Every Language
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Break down language barriers with AI agents that communicate
              naturally in 50+ languages. From native English to fluent Spanish,
              German, and Dutch - your global customers get the same
              professional experience.
            </motion.p>
          </div>

          {/* Language Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                language: "English",
                accent: "British Professional",
                flag: "🇬🇧",
                sample:
                  "Hi, this is Chloe from Smile Clinic. How can I help you today?",
                buttonText: "Talk to Chloe",
                image: "/chloe-english.png",
                agentName: "Chloe English",
              },
              {
                language: "Spanish",
                accent: "Native Spanish",
                flag: "🇪🇸",
                sample:
                  "Hola, soy Chloe de Smile Clinic. ¿En qué puedo ayudarle hoy?",
                buttonText: "Talk to Chloe",
                image: "/chloe-spanish.png",
                agentName: "Chloe Spanish",
              },
              {
                language: "German",
                accent: "Professional German",
                flag: "🇩🇪",
                sample:
                  "Guten Tag. Sie sprechen mit Chloe von Smile Clinic. Wie kann ich Ihnen helfen?",
                buttonText: "Talk to Chloe",
                image: "/chloe-german.png",
                agentName: "Chloe German",
              },
              {
                language: "Dutch",
                accent: "Netherlands Dutch",
                flag: "🇳🇱",
                sample:
                  "Goedemiddag, u spreekt met Chloe van Smile Clinic. Waarmee kan ik u helpen?",
                buttonText: "Talk to Chloe",
                image: "/chloe-dutch.png",
                agentName: "Chloe Dutch",
              },
            ].map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 group"
              >
                {/* Language Header */}
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">{lang.flag}</div>
                  <h3 className="text-lg font-semibold text-white">
                    {lang.language}
                  </h3>
                  <p className="text-sm text-gray-400">{lang.accent}</p>
                </div>

                {/* Real Mobile Phone Interface */}
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-auto">
                    <img
                      src={lang.image}
                      alt={`Chloe speaking ${lang.language}`}
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* Sample Text */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "{lang.sample}"
                  </p>
                </div>

                {/* Talk to Chloe CTA Button */}
                <div className="text-center">
                  <motion.button
                    onClick={() => openCallModal(lang.agentName)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {lang.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features & CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">50+ Languages</h4>
                <p className="text-gray-400 text-sm">
                  Native-level fluency in major global languages
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">
                  Cultural Awareness
                </h4>
                <p className="text-gray-400 text-sm">
                  Understands cultural nuances and business customs
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">
                  Real-Time Translation
                </h4>
                <p className="text-gray-400 text-sm">
                  Instant language switching mid-conversation
                </p>
              </div>
            </div>

            <Link href="/ai-voice-agents/multilingual">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Multilingual Agents
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 9. Compliance & Security */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Security Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Central Security Lock */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Lock className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Security Badges positioned around the lock */}
                <div className="relative w-full h-96">
                  {/* Top */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">HIPAA</div>
                    </div>
                  </div>

                  {/* Top Right */}
                  <div className="absolute top-16 right-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">AICPA</div>
                      <div className="text-xs text-purple-200">SOC 2</div>
                    </div>
                  </div>

                  {/* Left */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">PCI</div>
                      <div className="text-xs text-purple-200">DSS</div>
                    </div>
                  </div>

                  {/* Bottom Left */}
                  <div className="absolute bottom-16 left-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">GDPR</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 mb-6">
                SECURITY
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Enterprise-Level Security
              </h2>

              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                We combine strong compliance, strict data control, and 99.99%
                uptime to meet the demands of enterprise-grade operations —
                without compromising speed or flexibility.
              </p>

              {/* Security Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Strict Guardrails, No Hallucinations
                      </h4>
                      <p className="text-gray-400 text-sm">
                        AI pulls from approved knowledge sources to ensure
                        accurate, brand-safe replies. No guesswork or off-script
                        responses, just clear boundaries.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        SOC2, HIPAA, GDPR-Compliant
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Fully compliant with US & EU data regulations. Your
                        sensitive data is handled securely, with built-in
                        privacy protections across every interaction.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Network className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        200+ Integrations Supported
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Connect phone systems, CRMs, and calendars using SIP or
                        API. Data flows in real time for fast setup and deep
                        sync with your tools.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Data Managed In-House
                      </h4>
                      <p className="text-gray-400 text-sm">
                        All customer data and call logs are encrypted and stored
                        internally. Nothing goes to third parties, ensuring
                        total control and compliance.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        PCI DSS Compliant
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Protect payment and cardholder data with built-in PCI
                        DSS compliance. Ideal for secure workflows like payments
                        or account verification.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Pen Tests & Unit Testing
                      </h4>
                      <p className="text-gray-400 text-sm">
                        We run ongoing security testing to identify and fix
                        vulnerabilities early. Every system is monitored and
                        validated for safe, stable performance.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. Analytics & Monitoring Features - Dark Theme */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real-Time Analytics & AI Coaching
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Monitor performance, coach human agents in real-time, and get
              actionable insights to optimize your entire workforce.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Live Monitoring
                  </h3>
                </div>
                <p className="text-gray-300">
                  Watch AI and human agents in real-time with live transcripts,
                  confidence scoring, and auto-flagging for quality assurance.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">AI Coaching</h3>
                </div>
                <p className="text-gray-300">
                  Real-time guidance for human agents with next-best-action
                  suggestions, tone recommendations, and objection handling
                  prompts.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <BarChartIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Performance Analytics
                  </h3>
                </div>
                <p className="text-gray-300">
                  Track AHT, FCR, conversion rates, and sentiment across all
                  interactions with customizable dashboards and reports.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative overflow-hidden"
            >
              {/* Dashboard Preview with CTA overlay */}
              <div className="relative">
                <h4 className="text-xl font-bold text-white mb-6">
                  Experience Your Dashboard
                </h4>

                {/* Mock Dashboard Elements */}
                <div className="space-y-6 opacity-80">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
                      <div className="text-2xl font-bold text-blue-300">
                        94%
                      </div>
                      <div className="text-sm text-gray-400">
                        First Contact Resolution
                      </div>
                    </div>
                    <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                      <div className="text-2xl font-bold text-green-300">
                        2.3min
                      </div>
                      <div className="text-sm text-gray-400">
                        Avg Handle Time
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-500/20 rounded-xl p-4 border border-gray-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        Agent Performance
                      </span>
                      <span className="text-sm text-green-400">
                        ↑ 12% this week
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Sarah (HR)</span>
                        <span>96%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
                    <div className="text-sm font-medium text-gray-300 mb-2">
                      Real-time Coaching
                    </div>
                    <div className="text-xs text-purple-300">
                      💡 Suggest upsell opportunity detected
                    </div>
                    <div className="text-xs text-green-300">
                      ✅ Objection handled successfully
                    </div>
                  </div>
                </div>

                {/* Interactive CTA Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent flex items-end justify-center pb-8">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-gray-300 mb-4 text-sm">
                      See your business metrics in real-time
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3">
                      <BarChartIcon className="w-4 h-4 mr-2" />
                      Try Dashboard
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 13. Enhanced Final CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Start Your AI Transformation
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Deploy Your Complete
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                AI Workforce
              </span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join 500+ leading companies that have transformed their operations
              with AI employees. Book your strategy session today and see how we
              can automate your workflows, boost conversions, and deliver 24/7
              excellence.
            </p>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 text-lg shadow-2xl"
                onClick={() => {
                  const strategySection = document.querySelector(
                    ".strategy-session-form",
                  );
                  if (strategySection) {
                    strategySection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Calendar className="mr-3 w-6 h-6" />
                Book Strategy Session Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 14. Enhanced Newsletter */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 mb-8">
                <Mail className="w-4 h-4 mr-2" />
                Weekly AI Insights
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get the
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {" "}
                  AI Workforce Playbook
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Join 15,000+ executives getting exclusive insights on AI
                workforce deployment, ROI case studies, and implementation
                strategies. Plus get our complete "AI Employee Deployment Guide"
                free.
              </p>

              <NewsletterForm />

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mt-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Weekly case studies
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  ROI calculators
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Implementation templates
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Unsubscribe anytime
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                Trusted by executives at Fortune 500 companies • No spam, only
                value
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call Management Modal */}
      <CallManagementModal
        isOpen={isCallModalOpen}
        onClose={() => {
          setIsCallModalOpen(false);
          setCurrentModalAgent(null);
        }}
        agentName={currentModalAgent?.name || ""}
        agentId={currentModalAgent?.agentId}
        publicKey={currentModalAgent?.publicKey}
      />
    </div>
  );
}

DummyHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Employees for Enterprise | GoZupees AI Workforce Platform"
      description="Deploy intelligent AI employees across HR, Sales, Support, and Operations. Complete tasks, qualify leads, and deliver 24/7 results with enterprise-grade security."
      canonical="https://gozupees.com"
      ogImage="https://gozupees.com/images/ai-workforce-platform.jpg"
    >
      {page}
    </Layout>
  );
};

export default DummyHome;
