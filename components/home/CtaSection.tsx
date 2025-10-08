'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, BarChart3, CheckCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../lib/queryClient';

export default function CtaSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    interest: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const leadData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        interest: data.interest,
        source: "home_bookacall" as const
      };
      return apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(leadData),
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        interest: ''
      });
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
      
      // Auto-close success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#6366f1_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#8b5cf6_0%,transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to find the right AI agents for your business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Book a call with our AI specialists to discover which AI employees will best serve your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Calendar className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      AI Solutions Discovery Call
                    </h3>
                    <p className="text-gray-400">
                      Book a 45-minute consultation to explore which AI agents best fit your business processes and customer engagement goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                    <BarChart3 className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      Business Process Analysis
                    </h3>
                    <p className="text-gray-400">
                      Get a comprehensive evaluation of your current workflows and identify the perfect AI agent solutions to optimize your operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                    <MessageSquare className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      Custom AI Implementation Plan
                    </h3>
                    <p className="text-gray-400">
                      Work with our team to define clear objectives, timelines, and success metrics for your personalized AI agent deployment across your business.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl filter blur-xl opacity-70 transform -rotate-1"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-xl">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                    <p className="text-gray-300 text-lg">You'll hear from our team shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Book a Call
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      What are you interested in?
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" className="bg-gray-900">Select an option</option>
                      <option value="inbound-calls" className="bg-gray-900">Inbound Call Handling</option>
                      <option value="appointment-booking" className="bg-gray-900">Appointment Booking</option>
                      <option value="customer-support" className="bg-gray-900">Customer Support Automation</option>
                      <option value="outbound-sales" className="bg-gray-900">Outbound Sales Calls</option>
                      <option value="lead-qualification" className="bg-gray-900">Lead Qualification</option>
                      <option value="whatsapp-bot" className="bg-gray-900">WhatsApp Bot Automation</option>
                      <option value="multi-channel-ai" className="bg-gray-900">Multi-Channel AI (Voice + Chat)</option>
                      <option value="other" className="bg-gray-900">Other Voice AI Needs</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitMutation.isPending ? 'Booking...' : 'Book a Call'}
                  </button>
                </form>
                    <p className="mt-4 text-xs text-gray-400 text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Use.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}