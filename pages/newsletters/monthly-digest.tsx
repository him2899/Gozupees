import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Clock, Users, TrendingUp, CheckCircle, Mail } from 'lucide-react';

const subscribeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  monthly_digest: z.literal(true),
});

type FormData = z.infer<typeof subscribeSchema>;

export default function MonthlyDigestNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { monthly_digest: true }
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
        reset({ monthly_digest: true });
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
    'Exclusive product roadmap updates and new feature announcements',
    'Growth experiments and A/B test results from our 500+ client base',
    'Industry trend analysis and predictions for AI automation',
    'Client success stories and implementation case studies',
    'Behind-the-scenes insights from the GoZupees team',
    'Tool recommendations and integrations worth exploring'
  ];

  const recentTopics = [
    'Q4 2024 Product Update: Voice AI 2.0 and Advanced Analytics Dashboard',
    'Growth Experiment Results: How We Increased Client Retention by 34%',
    'The Future of AI Employees: 5 Predictions for 2025',
    'Client Spotlight: How TechCorp Automated 80% of Their Lead Qualification',
    'Team Update: Scaling from 50 to 500+ Clients in 12 Months'
  ];

  return (
    <>
      <Head>
        <title>GoZupees Monthly Digest - Product Updates & Growth Insights | GoZupees</title>
        <meta name="description" content="Monthly insights including product updates, growth experiments, industry trends, and behind-the-scenes content from the GoZupees team." />
        <meta property="og:title" content="GoZupees Monthly Digest - Product Updates & Growth Insights | GoZupees" />
        <meta property="og:description" content="Monthly insights including product updates, growth experiments, industry trends, and behind-the-scenes content from the GoZupees team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozupees.com/newsletters/monthly-digest" />
        <link rel="canonical" href="https://gozupees.com/newsletters/monthly-digest" />
      </Head>

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
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-6">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">GoZupees Monthly Digest</h1>
                    <p className="text-xl text-gray-300">Product updates, experiments & growth leaks</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-8 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Monthly</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>1,200+ subscribers</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <span>10 min read</span>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-8">
                  First Friday of every month, get an inside look at what we're building, learning, 
                  and discovering at GoZupees. Includes product updates, growth experiments, industry 
                  insights, and transparency reports from our journey scaling AI automation.
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-white">Inside this digest:</h3>
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
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Digest Highlights:</h4>
                  <ul className="space-y-2">
                    {recentTopics.map((topic, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
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
                    Get Monthly Insights
                  </h2>
                  
                  {submitStatus === 'success' && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 text-green-300">
                      Welcome to GoZupees Monthly Digest! Check your email for confirmation.
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
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <input type="hidden" {...register('monthly_digest')} />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Get Monthly Updates'}
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
    </>
  );
}