import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Users, Target, Lightbulb, Heart, Shield, Handshake, ArrowUpRight, Calendar, X, Linkedin, Eye, Rocket, Bot, AlertTriangle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Note: These types are not yet defined in schema.ts - using inline types for now
type InsertContactLead = {
  fullName: string;
  email: string;
  company: string;
  message?: string;
  source: string;
};

type TeamMember = {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkedinUrl?: string;
  order: number;
  createdAt: Date;
};
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import LeadFormModal from '../components/ui/LeadFormModal';
import { trackContactFormSubmit } from '../lib/gtm';
import Layout from '../components/layout/Layout';

function About() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<InsertContactLead>({
    // resolver: zodResolver(insertContactLeadSchema), // Temporarily disabled
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      message: '',
      source: 'about_contact',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactLead) => {
      const response = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }
      
      return response.json();
    },
    onSuccess: (_, data) => {
      // Track successful form submission
      trackContactFormSubmit({
        form_source: 'about_contact',
        email: data.email,
        company: data.company
      });
      
      setFormSubmitted(true);
      form.reset();
    },
  });

  const onSubmit = (data: InsertContactLead) => {
    contactMutation.mutate(data);
  };

  const { data: teamMembersData } = useQuery<TeamMember[]>({
    queryKey: ['/api/team-members'],
    queryFn: async () => {
      const response = await fetch('/api/team-members');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      return response.json();
    },
    enabled: false, // Disable until database is ready
  });

  // Fallback team data until database is set up
  const fallbackTeamMembers = [
    {
      id: 1,
      name: "Sandeep Bansal",
      title: "Founder & CEO", 
      description: "With 30+ years of experience in digital marketing and a background in complex data systems, Sandeep leads GoZupees' vision and strategy.",
      imageUrl: "/Sandeep_profile-KdA1SenC.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/sandeepbansal/",
      order: 1,
      createdAt: new Date()
    },
    {
      id: 2,
      name: "Aashi Garg",
      title: "Marketing Strategist",
      description: "Aashi is our lead marketing strategist and has a flair for creative thinking. She is great at orchestrating game-changing ad campaigns, leading high-performing email programs, and delivering impressive results.",
      imageUrl: "/Aashi_profile-BpQRats2.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/aashigarg/",
      order: 2,
      createdAt: new Date()
    },
    {
      id: 3,
      name: "Chirayu Yadav", 
      title: "AI Automation & BI Leader",
      description: "Chirayu leads GoZupees' AI automation and business intelligence initiatives, designing the systems that power our data-driven strategies and technical innovations.",
      imageUrl: "/Chirayu_profile-8jxXyb26.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/chirayuyadav/",
      order: 3,
      createdAt: new Date()
    },

  ];

  const displayTeamMembers = teamMembersData || fallbackTeamMembers;

  const faqData = [
    {
      question: "What makes GoZupees different from other AI development companies?",
      answer: "We specialize exclusively in AI voice agents for sales and marketing teams. While others offer general AI solutions, we focus on transforming business communication through specialized voice technology that delivers measurable results."
    },
    {
      question: "How long has GoZupees been in business?",
      answer: "GoZupees was founded to address the growing need for intelligent business communication solutions. Our team combines decades of experience in AI development, sales automation, and customer experience design."
    },
    {
      question: "What's your company's approach to AI development?",
      answer: "We believe in agentic AI that works alongside human teams, not replaces them. Our development philosophy focuses on creating AI voice agents that enhance human capabilities and improve business outcomes through intelligent automation."
    },
    {
      question: "Do you work with companies of all sizes?",
      answer: "Yes, we work with businesses from startups to enterprise companies. Our AI voice agent solutions are scalable and can be customized for any company size, from small teams to large organizations with complex communication needs."
    },
    {
      question: "What industries does GoZupees serve?",
      answer: "We serve any industry that relies on phone-based sales and customer communication. This includes real estate, insurance, healthcare, financial services, SaaS companies, e-commerce, and professional services."
    },
    {
      question: "How does GoZupees ensure quality in AI voice agent development?",
      answer: "We follow rigorous testing protocols, continuous monitoring, and iterative improvement processes. Our team includes AI specialists, voice technology experts, and business communication professionals who ensure every solution meets high-quality standards."
    },
    {
      question: "What's GoZupees' mission?",
      answer: "Our mission is to transform business communication by making AI voice agents accessible and effective for sales and marketing teams. We're building the future where intelligent voice agents help businesses scale without sacrificing personal connection."
    },
    {
      question: "Does GoZupees offer ongoing support after implementation?",
      answer: "Absolutely. We provide comprehensive ongoing support including performance monitoring, optimization, updates, and strategic guidance to ensure your AI voice agents continue delivering exceptional results as your business grows."
    }
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Performance-Driven",
      description: "We're obsessed with measurable results and only succeed when our clients succeed."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in performance marketing."
    },
    {
      icon: Shield,
      title: "Quality",
      description: "We maintain the highest standards in our media properties, partnerships, and data practices."
    },
    {
      icon: Heart,
      title: "User-Focused",
      description: "We create content and experiences that genuinely serve and benefit our audiences."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "We believe in openness, clear communication, and ethical business practices."
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "We work closely with our partners to achieve shared goals and mutual success."
    }
  ];

  const teamMembers = [
    {
      name: "Sandeep Bansal",
      title: "Founder & CEO",
      description: "With 30+ years of experience in digital marketing and a background in complex data systems, Sandeep leads GoZupees' vision and strategy."
    },
    {
      name: "Aashi Garg",
      title: "Marketing Strategist",
      description: "Aashi is our lead marketing strategist and has a flair for creative thinking. She is great at orchestrating game-changing ad campaigns, leading high-performing email programs, and delivering impressive results."
    },
    {
      name: "Chirayu Yadav",
      title: "AI Automation & BI Leader",
      description: "Chirayu leads GoZupees' AI automation and business intelligence initiatives, designing the systems that power our data-driven strategies and technical innovations."
    },

  ];

  const journeyEvents = [
    {
      year: "1998",
      title: "Humble Beginnings",
      description: "Sandeep started the company as a web development business from his bedroom with one desktop computer - a Pentium P3 with 4MB RAM and 2GB hard disk."
    },
    {
      year: "2000",
      title: "Official Incorporation",
      description: "The company was formally incorporated and our first 2 employees were hired in a 100 sqft facility."
    },
    {
      year: "2002",
      title: "Service Expansion",
      description: "Expanded services to include product development support, and added another office, with the team growing to 12 people."
    },
    {
      year: "2004",
      title: "Gurgaon Office Opened",
      description: "Added a new office in Gurgaon with the team strength now at 25 people."
    },
    {
      year: "2006",
      title: "Broadening Our Scope",
      description: "Moved to a new office with a team of 45 people and expanded to business process outsourcing services."
    },
    {
      year: "2009",
      title: "International Expansion & Zupees Launch",
      description: "Grew to 150 employees, operating 24x5 support for clients in 13 countries. Our first US branch was established and Zupees was officially born as a co-registration platform."
    },
    {
      year: "2011",
      title: "Successful Acquisition",
      description: "After a very successful run of 2 years, Zupees entered into an acquisition agreement and was sold to an investing media company."
    },
    {
      year: "2014",
      title: "New Jersey Expansion",
      description: "Started a new office in New Jersey and began offering media list management services."
    },
    {
      year: "2016",
      title: "Personalized Marketing Solutions",
      description: "We began offering SaaS services that included personalized content solutions across various platforms."
    },
    {
      year: "2018",
      title: "Programmatic Advertising Launch",
      description: "Launched a powerful programmatic advertising platform that integrated audience data, creative assets, and real-time bidding."
    },
    {
      year: "2020",
      title: "AI Transformation Begins",
      description: "Began developing proprietary AI marketing tools to enhance campaign performance and automate repetitive tasks."
    },
    {
      year: "2023",
      title: "Community Media Method™ Launch",
      description: "Formalized our integrated approach combining owned media, community building, and AI-powered optimization."
    },
    {
      year: "2025",
      title: "Next Evolution",
      description: "Continuing to innovate at the intersection of AI, owned media, and community-driven marketing."
    }
  ];

  return (
    <React.Fragment>
      {/* Structured Data Schema - AboutPage with Organization details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About GoZupees',
            description: 'Learn about GoZupees, the leading AI voice agent development company and our expert team.',
            url: 'https://gozupees.com/about',
            mainEntity: {
              '@type': 'Organization',
              name: 'GoZupees',
              description: 'AI voice agent development company specializing in sales and marketing automation',
              url: 'https://gozupees.com',
              founder: {
                '@type': 'Person',
                name: 'Sandeep Bansal',
                jobTitle: 'Founder & CEO'
              },
              employee: [
                {
                  '@type': 'Person',
                  name: 'Sandeep Bansal',
                  jobTitle: 'Founder & CEO'
                },
                {
                  '@type': 'Person',
                  name: 'Aashi Garg',
                  jobTitle: 'Marketing Strategist'
                },
                {
                  '@type': 'Person',
                  name: 'Chirayu Yadav',
                  jobTitle: 'AI Automation & BI Leader'
                },

              ]
            }
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.15]">
                We're an Agentic AI Development Company For{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Sales & Marketing Teams
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
                We help companies unlock growth with AI agents that power sales & other revenue-driving work with speed, precision, and consistency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/ai-voice-agents"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-8 py-4 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  Meet Our Agents
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => {
                    const teamSection = document.getElementById('team-section');
                    teamSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-gray-900 hover:bg-green-500 hover:text-white font-medium px-8 py-4 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  Meet Our Team
                  <Users className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Go AI-First */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Go AI-First
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">We Saw the Gap</h3>
                  <h4 className="text-lg font-medium text-blue-600 mb-3">The Human Limitation</h4>
                  <p className="text-gray-600">
                    After 25+ years building business systems, we realized the biggest bottleneck isn't technology—it's human capacity. Businesses need 24/7 execution, but humans need sleep.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">We Built the Bridge</h3>
                  <h4 className="text-lg font-medium text-purple-600 mb-3">AI + Human Partnership</h4>
                  <p className="text-gray-600">
                    We don't believe AI replaces people. We believe it multiplies them. Our agents handle systematic execution while humans focus on strategy and relationships.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">We Start Practical</h3>
                  <h4 className="text-lg font-medium text-green-600 mb-3">Revenue-First Approach</h4>
                  <p className="text-gray-600">
                    We don't practice theoretical AI. We deploy live agents that generate immediate ROI, such as human-sounding voice agents for appointments and leads.
                  </p>
                </div>
              </div>

              {/* Industry Predictions */}
              <div className="space-y-16 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <img src="https://logo.clearbit.com/gartner.com" alt="Gartner" className="h-16" />
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                    "Agentic AI will autonomously resolve 80% of common customer service issues without human intervention by 2029."
                  </blockquote>
                  <cite className="text-gray-600 font-medium mt-4 block">— Gartner</cite>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <img src="https://logo.clearbit.com/cloudtalk.io" alt="CloudTalk" className="h-16" />
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                    "51% of customers prefer interacting with AI agents over humans for immediate service."
                  </blockquote>
                  <cite className="text-gray-600 font-medium mt-4 block">— CloudTalk</cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Has Changed */}
        <section className="py-20 bg-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-blue-400 font-semibold mb-2">THE NEXT EVOLUTION</p>
                <h2 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Business Communication Has Changed Forever
                  </span>
                </h2>
                <h3 className="text-2xl text-white mb-8">
                  We're Rebuilding It - One Voice Agent At A Time
                </h3>
                <p className="text-gray-300 max-w-4xl mx-auto">
                  The era of missed calls, delayed responses, and manual customer interactions is over. What's coming next isn't a new tool - it's a new way to serve customers: 24/7 AI voice agents that sound human, think smart, and never sleep.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800 rounded-xl p-8 border-l-4 border-red-500">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-red-400">The Problem We Solve</h4>
                  <h5 className="text-lg font-medium text-red-300 mb-3">Business Never Sleeps, But People Do</h5>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Critical calls happen after hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Follow-up gets forgotten in chaos
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Human coordination has natural limits
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Revenue opportunities slip through gaps
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 border-l-4 border-blue-500">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-400">Our Approach</h4>
                  <h5 className="text-lg font-medium text-blue-300 mb-3">AI-First, Human-Guided</h5>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Deploy specialized agents, not generic tools
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Start with immediate ROI functions
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Scale systematically across operations
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Maintain human oversight and strategy
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 border-l-4 border-green-500">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-green-400">Our Vision</h4>
                  <h5 className="text-lg font-medium text-green-300 mb-3">Intelligent Business Operations</h5>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Every business function augmented by AI
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      24/7 execution without human burnout
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Predictable growth through systematic intelligence
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Humans freed to do what they do best
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl text-gray-300 mb-6">Ready to deploy your first AI voice agent?</p>
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-8 py-4 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  Let's Build Your First Voice Agent
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>



        {/* AI Technology Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-blue-500 font-semibold mb-2 px-4 py-1 rounded-full border border-blue-200 inline-block">OUR TECHNOLOGY</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  AI-Powered Solutions for Business Growth
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  At GoZupees, we're reimagining how AI can transform sales and marketing functions by combining human expertise with powerful automation for unprecedented efficiency and results.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-12 shadow-lg mb-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    The Human + AI Partnership
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our AI technology doesn't replace human expertise—it enhances it. While our technology handles repetitive tasks, data analysis, and initial drafts, our human team provides:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <div className="flex items-start mb-4">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Strategic Insight</h4>
                        <p className="text-gray-600 text-sm">Deep industry knowledge and creative problem-solving</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Relationship Building</h4>
                        <p className="text-gray-600 text-sm">Creating authentic connections with clients and communities</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start mb-4">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Emotional Intelligence</h4>
                        <p className="text-gray-600 text-sm">Understanding context and nuance in communications</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Ethical Oversight</h4>
                        <p className="text-gray-600 text-sm">Ensuring AI systems operate ethically and responsibly</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    Interested in exploring how our AI-powered approach can help your business?
                  </p>
                  <button 
                    onClick={() => setIsDemoModalOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-8 py-3 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    Schedule a Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-blue-600 font-semibold mb-2">WHAT DRIVES US</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreValues.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent size={32} className="text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section id="team-section" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-blue-600 font-semibold mb-2">MEET OUR TEAM</p>
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Leadership Team
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {displayTeamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-start">
                      <div className="w-16 h-16 flex-shrink-0 mr-6">
                        {member.imageUrl ? (
                          <img 
                            src={member.imageUrl} 
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            aria-label={`${member.name} LinkedIn Profile`}
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        </div>
                        <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                        <p className="text-gray-600">{member.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-blue-600 font-semibold mb-2">JOIN OUR TEAM</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Work With Us</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  We're always looking for talented individuals who are passionate about building the future of marketing at the intersection of AI, creative strategy, and community building.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Technology</h3>
                  <p className="text-gray-600">
                    AI engineers, full-stack developers, and data scientists who want to build tools that transform how marketing works.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategy</h3>
                  <p className="text-gray-600">
                    Marketing strategists, content creators, and campaign planners who can create data-driven plans that deliver results.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                  <p className="text-gray-600">
                    Community managers, relationship builders, and social media experts who know how to nurture authentic connections.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Careers CTA Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Don't see the right position?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                We're always interested in meeting exceptional people. Send us your resume and tell us why you'd be a great fit for our team.
              </p>
              
              <div className="max-w-lg mx-auto">
                <div className="flex items-center bg-white rounded-md p-2 shadow-lg">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                  />
                  <button 
                    onClick={() => setIsCareersModalOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                  >
                    Contact Us
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Questions & Answers
              </h2>
              
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="text-gray-400 text-xl ml-4">
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-500 mb-4">Still have questions?</p>
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  Contact Our Team
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Careers Modal */}
        {isCareersModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="fixed inset-0 bg-black/80" 
              onClick={() => setIsCareersModalOpen(false)}
            ></div>
            <div className="relative bg-gray-800 border border-gray-700 text-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <button
                onClick={() => setIsCareersModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-6 text-left">
                <h2 className="text-xl font-semibold text-white mb-2 text-left">Join Our Team</h2>
                <p className="text-gray-300 text-sm text-left">
                  Tell us about yourself and why you'd be a great fit for GoZupees.
                </p>
              </div>
              
              {formSubmitted ? (
                <div className="text-center p-4 bg-green-600/20 rounded-lg border border-green-500/30">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Thank you!</h3>
                  <p className="text-green-300 text-sm">We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...form.register('fullName')}
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...form.register('email')}
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...form.register('company')}
                      type="text"
                      placeholder="Current Company (Optional)"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <textarea
                      {...form.register('message')}
                      placeholder="Tell us about yourself and why you'd be a great fit for our team..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-3 rounded-lg transition-all duration-300"
                  >
                    {contactMutation.isPending ? 'Sending...' : 'Send Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Demo Modal */}
        <LeadFormModal 
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          useCase="General Inquiry"
        />
      </main>
    </React.Fragment>
  );
}

// Define custom layout to prevent double Layout wrapping
About.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="About GoZupees - AI Voice Agent Development Company | Expert Team & Mission"
      description="Meet the GoZupees team behind the revolutionary AI voice agents. Learn about our mission to transform sales and marketing with intelligent automation."
      canonical="https://gozupees.com/about"
      ogImage="https://gozupees.com/team-og-image.jpg"
      ogType="website"
    >
      {page}
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};