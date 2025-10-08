'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall, MessageCircle, Calendar, Zap } from 'lucide-react';
import Vapi from '@vapi-ai/web';
// Using the attached real images

interface Agent {
  id: number;
  name: string;
  role: string;
  company: string;
  industry: string;
  description: string;
  profileData: {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
  }[];
  phoneNumber: string;
  image: string;
  gradient: string;
  status: string;
}

const agents: Agent[] = [
  {
    id: 1,
    name: 'Chloe',
    role: 'Appointment Specialist',
    company: 'Smile Dental Clinic',
    industry: 'Healthcare',
    description: 'Your friendly healthcare assistant who makes scheduling appointments as easy as a smile. Always ready to help with your dental care needs.',
    profileData: [
      {
        icon: Calendar,
        label: 'Specialization',
        value: 'Appointment Booking'
      },
      {
        icon: MessageCircle,
        label: 'Response Time',
        value: 'Instant 24/7'
      },
      {
        icon: Phone,
        label: 'Languages',
        value: 'English & Spanish'
      }
    ],
    phoneNumber: '+1 833 939 1441',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    gradient: 'from-blue-500 to-cyan-500',
    status: 'Available now'
  },
  {
    id: 2,
    name: 'Zeno',
    role: 'Sales Representative',
    company: 'PowerGen Solutions',
    industry: 'Industrial Equipment',
    description: 'Your power solutions expert with the wisdom of ancient philosophy and modern sales expertise. Let him energize your business decisions.',
    profileData: [
      {
        icon: Zap,
        label: 'Specialization',
        value: 'Generator Sales'
      },
      {
        icon: MessageCircle,
        label: 'Experience',
        value: '10+ Years'
      },
      {
        icon: Phone,
        label: 'Support Type',
        value: 'Technical & Sales'
      }
    ],
    phoneNumber: '+1 857 228 7620',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    gradient: 'from-orange-500 to-red-500',
    status: 'Available now'
  }
];

interface CallModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

function CallModal({ agent, isOpen, onClose }: CallModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCallRequested, setIsCallRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleDirectCall = () => {
    window.open(`tel:${agent.phoneNumber}`, '_self');
  };

  const handleRequestCall = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/vapi-outbound-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          agentType: agent.name.toLowerCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      console.log('Call requested successfully:', data);
      setIsCallRequested(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsCallRequested(false);
        onClose();
        setPhoneNumber('');
      }, 3000);

    } catch (error) {
      console.error('Error requesting call:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to request call');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="relative mx-auto mb-4">
            <img 
              src={agent.image} 
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover shadow-lg mx-auto"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Talk to {agent.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {agent.role} at {agent.company}
          </p>
        </div>

        {!isCallRequested ? (
          <div className="space-y-6">
            {/* Direct Call Option */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                Talk to an AI Agent
              </h4>
              <motion.button
                onClick={handleDirectCall}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r ${agent.gradient} text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Phone className="w-5 h-5" />
                <span>{agent.phoneNumber}</span>
              </motion.button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 uppercase tracking-wide">
                  Or have it call you!
                </span>
              </div>
            </div>

            {/* Request Call Option */}
            <div className="space-y-3">
              <input
                type="tel"
                placeholder="+1 4007 123456"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                disabled={isLoading}
              />
              
              {errorMessage && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {errorMessage}
                </div>
              )}
              
              <motion.button
                onClick={handleRequestCall}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                disabled={!phoneNumber.trim() || isLoading}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Calling...</span>
                  </>
                ) : (
                  <span>Call me</span>
                )}
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneCall className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Call Requested!
            </h4>
            <p className="text-gray-600">
              {agent.name} will call you at {phoneNumber} shortly.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors duration-200"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
}

export default function LiveVoiceDemoSection() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [activeCallAgent, setActiveCallAgent] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleVapiCall = async (agentName: string) => {
    try {
      // Prevent duplicate requests
      if (isConnecting === agentName) {
        console.log('Call already connecting for', agentName);
        return;
      }

      // If there's already an active call for this agent, end it
      if (activeCallAgent === agentName && vapi) {
        console.log(`Ending VAPI call with ${agentName}`);
        vapi.stop();
        setActiveCallAgent(null);
        setVapi(null);
        setIsConnecting(null);
        return;
      }
      
      // If there's a different agent's call active, end it first
      if (activeCallAgent && vapi) {
        vapi.stop();
        setVapi(null);
        setActiveCallAgent(null);
      }
      
      setIsConnecting(agentName);
      setActiveCallAgent(agentName);
      
      // Fetch VAPI configuration from API
      const configResponse = await fetch('/api/vapi-config');
      if (!configResponse.ok) {
        throw new Error('Failed to fetch VAPI configuration');
      }
      
      const config = await configResponse.json();
      
      if (config.error) {
        console.error('VAPI configuration error:', config.error);
        setActiveCallAgent(null);
        setIsConnecting(null);
        return;
      }

      // Initialize VAPI instance
      const vapiInstance = new Vapi(config.publicKey);
      setVapi(vapiInstance);

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('VAPI call started successfully');
        setIsConnecting(null);
        setActiveCallAgent(agentName);
      });

      vapiInstance.on('call-end', () => {
        console.log('VAPI call ended');
        setActiveCallAgent(null);
        setVapi(null);
        setIsConnecting(null);
      });

      vapiInstance.on('error', (error) => {
        console.error('VAPI error:', error);
        setActiveCallAgent(null);
        setVapi(null);
        setIsConnecting(null);
      });

      // Get the assistant ID based on agent name
      const assistantId = agentName === 'Chloe' 
        ? config.chloeAssistantId 
        : config.zenoAssistantId;
      
      if (!assistantId) {
        console.error('Assistant ID not found for', agentName);
        setActiveCallAgent(null);
        setIsConnecting(null);
        return;
      }
      
      console.log(`Starting VAPI call with ${agentName}`);
      await vapiInstance.start(assistantId);
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setActiveCallAgent(null);
      setVapi(null);
      setIsConnecting(null);
    }
  };

  return (
    <>
      <section id="live-voice-agents" className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Try Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Live Voice Agents</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience real AI conversations. Talk to our agents now or have them call you back.
            </p>
          </motion.div>

          {/* Chat-style Interface */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {agents.map((agent, index) => {
              const profileItems = agent.profileData;
              return (
                <motion.div
                  key={agent.id}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  style={{
                    boxShadow: "0 0 40px rgba(0, 0, 0, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {/* Phone Header */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-white text-sm font-medium">
                        {agent.status}
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="p-6">
                    {/* Agent Profile */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img 
                          src={agent.image} 
                          alt={agent.name}
                          className="w-20 h-20 rounded-full object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                        <p className="text-gray-600 text-sm">{agent.role}</p>
                        <p className="text-gray-500 text-xs">{agent.company}</p>
                      </div>
                    </div>

                    {/* Profile Data Tabs */}
                    <div className="space-y-3 mb-6">
                      {profileItems.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <motion.div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 bg-gradient-to-r ${agent.gradient} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm text-gray-600">{item.label}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Chat Message */}
                    <div className="bg-blue-50 rounded-2xl p-4 mb-6 relative">
                      <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-50 transform rotate-45"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {agent.description}
                      </p>
                      <div className="text-xs text-gray-500 mt-2">
                        Just now
                      </div>
                    </div>

                    {/* Call Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => handleVapiCall(agent.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${agent.gradient} text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <Phone className="w-5 h-5" />
                        <span>
                          {isConnecting === agent.name 
                            ? 'Connecting...' 
                            : activeCallAgent === agent.name 
                              ? 'Call Active - Click to End' 
                              : `Talk to ${agent.name} Now`
                          }
                        </span>
                      </motion.button>

                      <motion.button
                        onClick={() => setSelectedAgent(agent)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all duration-300"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Enter your number and let {agent.name} call you</span>
                      </motion.button>
                    </div>

                    {/* Character Description */}
                    <motion.div
                      className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-gradient-to-b"
                      style={{
                        borderLeftColor: agent.gradient.includes('purple') ? '#a855f7' : 
                                       agent.gradient.includes('blue') ? '#3b82f6' : 
                                       agent.gradient.includes('orange') ? '#f97316' : '#6b7280'
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <p className="text-sm text-gray-700 leading-relaxed italic">
                        {agent.description}
                      </p>
                    </motion.div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call Modal */}
      {selectedAgent && (
        <CallModal
          agent={selectedAgent}
          isOpen={true}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </>
  );
}