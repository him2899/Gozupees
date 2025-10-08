'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Phone, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { insertAIDemoIndustryLeadSchema, type InsertAIDemoIndustryLead } from '../../shared/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../lib/queryClient';
import { trackDemoRequest } from '../../lib/gtm';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  useCase?: string;
}

export default function LeadFormModal({ isOpen, onClose, useCase = '' }: LeadFormModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<InsertAIDemoIndustryLead>({
    resolver: zodResolver(insertAIDemoIndustryLeadSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      useCase: '',
      source: 'ai_demo_in_industry',
    }
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: InsertAIDemoIndustryLead) => {
      return apiRequest('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (_, data) => {
      // Track successful demo request
      trackDemoRequest({
        source: data.source,
        agent_type: data.useCase || 'Product Demo'
      });
      
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
      // Reset form
      form.reset();
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    },
    onError: (error) => {
      console.error('Failed to submit lead:', error);
      // You could add toast notification here
    }
  });

  const onSubmit = (data: InsertAIDemoIndustryLead) => {
    createLeadMutation.mutate(data);
  };

  const handleClose = () => {
    if (!createLeadMutation.isPending) {
      setIsSubmitted(false);
      form.reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={createLeadMutation.isPending}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Success State */}
          {isSubmitted ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                We'll send you the demo shortly. Our team will contact you within 24 hours.
              </p>
              <div className="text-sm text-gray-500">
                This window will close automatically...
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Try GoZupees Voice Agents</h2>
                  <p className="text-gray-600">
                    Get a personalized demo tailored to your business needs
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...form.register('fullName')}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...form.register('email')}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
                      placeholder="Enter your email"
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...form.register('phoneNumber')}
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {form.formState.errors.phoneNumber && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Use Case */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use Case *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      {...form.register('useCase')}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white text-gray-900"
                    >
                      <option value="">Select your use case</option>
                      <option value="Healthcare - Appointment Scheduling">Healthcare - Appointment Scheduling</option>
                      <option value="Healthcare - Patient Inquiries">Healthcare - Patient Inquiries</option>
                      <option value="Healthcare - Insurance Verification">Healthcare - Insurance Verification</option>
                      <option value="Sales - Lead Qualification">Sales - Lead Qualification</option>
                      <option value="Sales - Product Demos">Sales - Product Demos</option>
                      <option value="Sales - Follow-up Calls">Sales - Follow-up Calls</option>
                      <option value="Support - Customer Service">Support - Customer Service</option>
                      <option value="Support - Technical Support">Support - Technical Support</option>
                      <option value="Support - Order Tracking">Support - Order Tracking</option>
                      <option value="WhatsApp Bot Automation">WhatsApp Bot Automation</option>
                      <option value="Multi-Channel AI (Voice + Chat)">Multi-Channel AI (Voice + Chat)</option>
                      <option value="Other">Other</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {form.formState.errors.useCase && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.useCase.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={createLeadMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {createLeadMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      Request Live Demo
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to be contacted by our team about GoZupees services.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}