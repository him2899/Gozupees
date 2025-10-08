import React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function NewsletterSignup() {
  return (
    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-8 sm:p-10">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest insights, trends, and strategies in AI marketing delivered directly to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow"
            required
          />
          <Button className="bg-gradient-to-r from-primary to-secondary text-white">
            Subscribe
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
        </p>
      </div>
    </div>
  );
}