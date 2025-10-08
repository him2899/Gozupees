import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, Zap, Clock, Users, TrendingUp, CheckCircle, Mail } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const subscribeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  ai_revops: z.literal(true),
});

type FormData = z.infer<typeof subscribeSchema>;

function AIRevOpsNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { ai_revops: true }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset({ ai_revops: true });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    'Daily automation workflows that scale revenue operations',
    'AI-powered lead scoring and qualification systems',
    'Revenue attribution models for multi-touch campaigns',
    'Sales pipeline optimization with predictive analytics',
    'Customer lifecycle automation for retention and upselling',
    'Integration strategies for CRM, marketing automation, and sales tools'
  ];

  const recentTopics = [
    'Building a Lead Scoring Algorithm That Increased Conversions by 47%',
    'Revenue Operations Stack: 12 Tools That Power $100M+ Companies',
    'AI-Powered Sales Forecasting: From Guesswork to Precision',
    'The Complete Guide to Marketing Attribution in a Cookieless World',
    'Automating Customer Success: Retention Strategies That Scale'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark/95 text-white">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/newsletters" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all newsletters
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">AIRevOps OS</h1>
                    <p className="text-xl text-gray-300">Your daily OS for Revenue Automation</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-8 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Daily</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>3,500+ subscribers</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <span>5 min read</span>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-8">
                  Every morning at 7 AM EST, get actionable revenue operations strategies, AI automation workflows, 
                  and growth tactics from companies that have scaled from $1M to $100M+ ARR. No fluff, just 
                  systems you can implement today.
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-white">What you'll learn:</h3>
                  <div className="grid gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Topics:</h4>
                  <ul className="space-y-2">
                    {recentTopics.map((topic, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <TrendingUp className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Signup Form */}
              <div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    Subscribe to AIRevOps OS
                  </h2>
                  
                  {submitStatus === 'success' && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 text-green-300">
                      Welcome to AIRevOps OS! Check your email for confirmation.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <input type="hidden" {...register('ai_revops')} />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Get Daily AI RevOps Insights'}
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                      <span>✓ Free forever</span>
                      <span>✓ Unsubscribe anytime</span>
                      <span>✓ No spam</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  );
}

// Define custom layout to prevent double Layout wrapping
AIRevOpsNewsletter.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="AIRevOps OS - Daily Revenue Automation Newsletter | GoZupees"
      description="Get daily AI-powered revenue operations insights, automation workflows, and strategies from companies scaling $1M to $100M ARR."
      canonical="https://gozupees.com/newsletters/ai-revops"
      ogImage="https://gozupees.com/newsletters/ai-revops-og-image.jpg"
      ogType="website"
    >
      {page}
    </Layout>
  );
};

export default AIRevOpsNewsletter;