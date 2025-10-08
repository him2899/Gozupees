import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Phone, Play, Filter, Calendar, Target, MessageSquare, Users, ShoppingCart, Globe, Bot, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaSection from '../components/home/CtaSection';

interface Agent {
  id: number;
  name: string;
  useCaseName: string;
  industry: string;
  language: string;
  function: string;
  country: string;
  audioUrl: string;
  transcript: string;
  duration: number;
  phone?: string;
}

interface AIEmployeesPageProps {
  agents: Agent[];
  selectedUseCase?: string;
}

export default function AIEmployees({ agents, selectedUseCase }: AIEmployeesPageProps) {
  const router = useRouter();
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
  const [activeFilter, setActiveFilter] = useState<string>(selectedUseCase || '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState('');

  const faqData = [
    {
      question: "How do I choose the right AI employee for my business?",
      answer: "Each AI employee is specialized for specific functions. Review their descriptions, listen to sample conversations, and consider your primary business needs. Our team can help you select the best AI employee for your requirements."
    },
    {
      question: "Can I customize an AI employee's personality and responses?",
      answer: "Yes, all our AI employees can be customized to match your brand voice, industry terminology, and specific business processes. During setup, we'll train your AI employee using your knowledge base and communication style."
    },
    {
      question: "How quickly can an AI employee be deployed for my business?",
      answer: "Most AI employees can be deployed within 24-48 hours. This includes initial setup, training with your business information, and integration with your existing systems like CRM, calendar, and phone systems."
    },
    {
      question: "What happens if the AI employee can't handle a customer inquiry?",
      answer: "Our AI employees are designed with intelligent escalation protocols. When they encounter complex issues beyond their scope, they seamlessly transfer the conversation to your human team members while providing a full context summary."
    },
    {
      question: "Do AI employees work 24/7?",
      answer: "Yes, our AI employees work around the clock without breaks, holidays, or sick days. They provide consistent service quality at any time of day or night, ensuring your customers always receive prompt attention."
    },
    {
      question: "How do AI employees integrate with existing business systems?",
      answer: "Our AI employees integrate seamlessly with popular CRM systems, calendars, phone systems, and other business tools. We handle the technical setup and provide ongoing support to ensure smooth operations."
    }
  ];

  // Define sales team employees
  const salesTeam = [
    {
      name: "Tyche",
      role: "Inbound Sales Assistant",
      icon: Target,
      industry: "B2B Services",
      description: "Qualifies leads, schedules demos, and nurtures prospects through the sales funnel.",
      features: ["Lead qualification", "Demo scheduling", "Follow-up automation"]
    },
    {
      name: "Zeno", 
      role: "Generator Sales Rep",
      icon: Phone,
      industry: "Industrial Equipment",
      description: "Handles complex B2B sales calls for technical products and equipment.",
      features: ["Technical consultations", "Quote generation", "Order processing"]
    },
    {
      name: "Nina",
      role: "Real Estate Inbound Sales",
      icon: Users,
      industry: "Real Estate",
      description: "Engages property inquiries, schedules viewings, and qualifies buyers.",
      features: ["Property inquiries", "Viewing bookings", "Buyer qualification"]
    }
  ];

  // Define support team employees
  const supportTeam = [
    {
      name: "Chloe",
      role: "Appointment Specialist",
      icon: Calendar,
      industry: "Healthcare",
      description: "Manages medical appointments, handles patient inquiries, and coordinates schedules.",
      features: ["Appointment booking", "Patient support", "Schedule coordination"]
    },
    {
      name: "Raj",
      role: "Appointment Booking",
      icon: Calendar,
      industry: "Dental Clinic",
      description: "Streamlines dental appointment scheduling and patient communication.",
      features: ["Dental scheduling", "Patient reminders", "Treatment coordination"]
    },
    {
      name: "Carlos",
      role: "Order Support",
      icon: ShoppingCart,
      industry: "E-commerce",
      description: "Handles order tracking, returns, and customer service inquiries.",
      features: ["Order tracking", "Returns processing", "Customer support"]
    }
  ];

  // Define custom builds
  const customBuilds = [
    {
      name: "Translation Agents",
      role: "Multi-Language Support",
      icon: Globe,
      industry: "International Business",
      description: "Custom AI employees fluent in multiple languages for global customer support.",
      features: ["Multi-language support", "Cultural adaptation", "Global coverage"]
    },
    {
      name: "WhatsApp Bots",
      role: "Messaging Automation",
      icon: MessageSquare,
      industry: "Various Industries",
      description: "Coming Monday - Automated WhatsApp customer service and sales support.",
      features: ["WhatsApp integration", "Message automation", "Customer engagement"],
      comingSoon: true
    },
    {
      name: "Industry-Specific Builds",
      role: "Custom Solutions",
      icon: Settings,
      industry: "Any Industry",
      description: "Tailor-made AI employees designed for your specific industry requirements.",
      features: ["Custom training", "Industry expertise", "Specialized workflows"]
    }
  ];

  const uniqueUseCases = Array.from(new Set(agents.map(agent => agent.useCaseName)));

  useEffect(() => {
    if (activeFilter) {
      setFilteredAgents(agents.filter(agent => agent.useCaseName === activeFilter));
    } else {
      setFilteredAgents(agents);
    }
  }, [activeFilter, agents]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/book-demo');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Meet Your{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  AI Employee Directory
                </span>
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              >
                Choose from 20+ ready-made AI employees or commission a custom build for unique requirements
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button 
                  onClick={() => router.push('/book-demo')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Book Free Consultation
                </button>
                <button 
                  onClick={() => document.getElementById('employees-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Browse AI Employees
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Available AI Employees Section */}
        <section id="employees-grid" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Available AI Employees
              </motion.h2>
              <motion.p variants={fadeIn} className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our specialized AI employees are ready to join your team immediately
              </motion.p>
            </motion.div>

            {/* Sales Team */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16"
            >
              <motion.h3 variants={fadeIn} className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Sales Team
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {salesTeam.map((employee, index) => {
                  const IconComponent = employee.icon;
                  return (
                    <motion.div
                      key={employee.name}
                      variants={fadeIn}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-blue-600">{employee.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{employee.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Specialties:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {employee.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Try Demo
                        </button>
                        <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Support Team */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16"
            >
              <motion.h3 variants={fadeIn} className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Users className="w-6 h-6 mr-3 text-green-600" />
                Support Team
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {supportTeam.map((employee, index) => {
                  const IconComponent = employee.icon;
                  return (
                    <motion.div
                      key={employee.name}
                      variants={fadeIn}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-green-600">{employee.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{employee.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Specialties:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {employee.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                          Try Demo
                        </button>
                        <button className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Custom Builds */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16"
            >
              <motion.h3 variants={fadeIn} className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-purple-600" />
                Custom Builds
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {customBuilds.map((employee, index) => {
                  const IconComponent = employee.icon;
                  return (
                    <motion.div
                      key={employee.name}
                      variants={fadeIn}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 ${employee.comingSoon ? 'relative overflow-hidden' : ''}`}
                    >
                      {employee.comingSoon && (
                        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Coming Soon
                        </div>
                      )}
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-purple-600">{employee.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{employee.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Features:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {employee.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            employee.comingSoon 
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                          disabled={employee.comingSoon}
                        >
                          {employee.comingSoon ? 'Coming Soon' : 'Get Quote'}
                        </button>
                        <button className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeIn} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to know about our AI employees
                </p>
              </motion.div>
              
              <motion.div variants={stagger} className="space-y-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                          <ArrowRight className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
  );
}

// Define custom layout to prevent double Layout wrapping
AIEmployees.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="AI Employee Directory - Meet Your Digital Workforce | GoZupees"
      description="Choose from 20+ ready-made AI employees or commission a custom build for unique requirements. Sales, support, and custom AI employees available."
      canonical="https://gozupees.com/ai-employees"
      ogImage="https://gozupees.com/og-ai-employees.jpg"
      ogType="website"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'AI Employee Directory',
        description: 'Choose from 20+ ready-made AI employees or commission a custom build for unique requirements.',
        url: 'https://gozupees.com/ai-employees'
      }}
    >
      {page}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/demos`);
    const agents = await response.json();
    
    const selectedUseCase = context.query.useCase as string || '';
    
    return {
      props: {
        agents,
        selectedUseCase
      }
    };
  } catch (error) {
    console.error('Error fetching agents:', error);
    return {
      props: {
        agents: [],
        selectedUseCase: ''
      }
    };
  }
};