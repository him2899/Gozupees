'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ClientNewsletterSignup() {
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
    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-8 sm:p-10">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest insights, trends, and strategies in AI marketing delivered directly to your inbox.
        </p>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow"
            required
            {...form.register('email')}
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-primary to-secondary text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-accent" />
            <span>Exclusive content</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-accent" />
            <span>Early access to webinars</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-accent" />
            <span>Industry reports</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
        </p>
      </div>
    </div>
  );
}