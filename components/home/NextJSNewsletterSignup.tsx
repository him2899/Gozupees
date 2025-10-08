'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export default function NextJSNewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Successfully subscribed to newsletter!');
      form.reset();
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6 shadow-sm border border-white/50">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Join 15,000+ Marketing Leaders
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Subscribe to our Newsletter
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get the latest insights, trends, and strategies in AI marketing delivered directly to your inbox.
            </p>
          </div>

          {/* Main newsletter card */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 rounded-3xl"></div>
              
              <div className="relative">
                {/* Newsletter form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
                  <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                    <div className="flex-grow relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-lg shadow-sm transition-all duration-200 hover:border-gray-300"
                        required
                        {...form.register('email')}
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>
                </form>

                {/* Trust indicators */}
                <div className="text-center mb-10">
                  <p className="text-gray-500 text-sm">
                    By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
                  </p>
                </div>

                {/* Benefits grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Exclusive content</h4>
                      <p className="text-sm text-gray-600">Premium insights not available elsewhere</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Early access to webinars</h4>
                      <p className="text-sm text-gray-600">Get first access to our live sessions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Industry reports</h4>
                      <p className="text-sm text-gray-600">Latest trends and market analysis</p>
                    </div>
                  </div>
                </div>

                {/* Social proof */}
                <div className="mt-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Join 15,000+ subscribers</span>
                    <span className="text-gray-400">•</span>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>No spam, unsubscribe anytime</span>
                    <span className="text-gray-400">•</span>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>2 emails per month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}