'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MoreHorizontal } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'agent';
  message: string;
  timestamp: string;
}

export default function LiveChatAgentDemoSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentInput, setCurrentInput] = useState('');

  // Placeholder messages - will be replaced with API integration
  const demoMessages: ChatMessage[] = [
    {
      id: 101,
      sender: 'agent',
      message: 'Hi! I am Chloe, your AI dental assistant. How can I help you today?',
      timestamp: '2:30 PM'
    },
    {
      id: 102,
      sender: 'user',
      message: 'Hi, I need to book a cleaning appointment',
      timestamp: '2:31 PM'
    },
    {
      id: 103,
      sender: 'agent',
      message: 'I would be happy to help you schedule a cleaning! What days work best for you this week?',
      timestamp: '2:31 PM'
    },
    {
      id: 104,
      sender: 'user',
      message: 'How about Thursday afternoon?',
      timestamp: '2:32 PM'
    }
  ];

  useEffect(() => {
    // Simulate loading messages one by one
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < demoMessages.length) {
        setMessages(prev => [...prev, demoMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      message: currentInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    const inputValue = currentInput;
    setCurrentInput('');
    setIsTyping(true);

    // Make API call to /api/chat endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          conversationId: 'demo_conversation'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const agentResponse: ChatMessage = {
          id: data.id,
          sender: 'agent',
          message: data.message,
          timestamp: data.timestamp
        };
        setMessages(prev => [...prev, agentResponse]);
      } else {
        // Fallback response if API fails
        const agentResponse: ChatMessage = {
          id: Date.now() + 1,
          sender: 'agent',
          message: 'I can help you with that! Let me check our available slots for Thursday afternoon.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
      }
    } catch (error) {
      // Fallback response if API fails
      const agentResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        message: 'I can help you with that! Let me check our available slots for Thursday afternoon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentResponse]);
    }
    
    setIsTyping(false);
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Try Live Chat Tag */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Try Our Live Chat Agent
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Tablet Chat UI */}
            <motion.div
              className="flex justify-center order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
                {/* Tablet Frame */}
                <div className="bg-gray-800 rounded-3xl p-3 sm:p-6 shadow-2xl transform rotate-1 lg:rotate-2">
                  <div className="bg-white rounded-2xl h-[500px] sm:h-[600px] w-full sm:w-[400px] overflow-hidden flex flex-col">
                    
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">C</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Chloe</h3>
                        <p className="text-white/80 text-xs">Dental Assistant AI</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                      <AnimatePresence>
                        {messages.filter(message => message && message.id).map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'bg-white text-gray-800 shadow-sm border'
                            }`}>
                              <p className="text-sm">{message.message}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-2xl">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-500">Chloe is typing</span>
                              <MoreHorizontal className="w-4 h-4 animate-pulse text-gray-400" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t bg-white">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={currentInput}
                          onChange={(e) => setCurrentInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tablet Shadow/Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 transform scale-110"></div>
              </div>
            </motion.div>

            {/* Right Column - Agent Description */}
            <motion.div
              className="text-gray-800 order-1 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                Meet Chloe Your 24/7 Dental Receptionist
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Chloe helps dental clinics automate front desk tasks booking appointments, 
                answering treatment FAQs, sending reminders, and collecting post-visit feedback 
                all through friendly, natural chat.
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">How can Chloe help you?</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <span>Book and reschedule appointments in real time</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <span>Answer common treatment questions (pricing, timing, pain level)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <span>Collect post-visit feedback</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <span>Send reminders via chat integrations</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 flex justify-center lg:justify-start">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Talk to Chloe on Chat
                </motion.button>
                
                {/* Arrow pointing to the tablet */}
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
                  <svg className="w-12 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 6l-6 6 6 6v-4h8v-4h-8V6z"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}