import React, { ReactElement } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Calendar, Users, MessageSquare } from 'lucide-react';
import Layout from '../components/layout/Layout';

function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Main Content */}
      <div className="relative pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full border-2 border-green-500/30">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Thank You!
            </h1>
            
            <div className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Your appointment has been successfully booked
            </div>

            {/* Confirmation Details */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">What's Next?</h3>
                  <p className="text-gray-300 text-sm">
                    Check your email for confirmation details and calendar invite
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Users className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Our Team</h3>
                  <p className="text-gray-300 text-sm">
                    An AI solutions expert will be in touch shortly
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <MessageSquare className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Preparation</h3>
                  <p className="text-gray-300 text-sm">
                    Explore our AI agents below to discuss your specific needs
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                While You Wait, Explore Our AI Voice Agents
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover the specialized AI agents that could transform your business operations. 
                Each agent is designed for specific industries and use cases.
              </p>
              
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Explore AI Voice Agents
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link 
                href="/ai-voice-agents/sales-qualification"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-blue-400 font-semibold mb-2 group-hover:text-blue-300">
                  Sales Qualification
                </div>
                <div className="text-gray-400 text-sm">
                  AI agents that qualify leads and book appointments automatically
                </div>
              </Link>

              <Link 
                href="/ai-voice-agents/customer-service"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-purple-400 font-semibold mb-2 group-hover:text-purple-300">
                  Customer Service
                </div>
                <div className="text-gray-400 text-sm">
                  24/7 customer support with intelligent call routing
                </div>
              </Link>

              <Link 
                href="/ai-voice-agents/receptionist"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
                  Virtual Receptionist
                </div>
                <div className="text-gray-400 text-sm">
                  Professional call handling and appointment scheduling
                </div>
              </Link>

              <Link 
                href="/ai-voice-agents"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-green-400 font-semibold mb-2 group-hover:text-green-300">
                  View All Agents
                </div>
                <div className="text-gray-400 text-sm">
                  Explore our complete collection of specialized AI agents
                </div>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-gray-400">
                Have questions before our meeting? Contact us at{' '}
                <a href="mailto:hello@gozupees.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  hello@gozupees.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define custom layout to prevent double Layout wrapping
ThankYou.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Thank You - Appointment Booked | GoZupees"
      description="Your appointment with GoZupees has been successfully booked. Explore our AI voice agents while you wait for our team to contact you."
      canonical="https://gozupees.com/thankyou"
      ogImage="https://gozupees.com/images/thank-you-og.jpg"
    >
      {page}
    </Layout>
  )
}

export default ThankYou;