import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock, Calendar, MessageSquare, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { ReactElement } from 'react';

export default function ReceptionistSolution() {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-900">AI Receptionist Solution</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Never Miss a Call Again
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Your AI-powered receptionist works 24/7 to greet callers, schedule appointments, and handle inquiries with professional excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <Link href="/book-demo">Try Live Demo</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our AI Receptionist?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your customer experience with intelligent call handling that never sleeps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-green-100 rounded-lg w-fit">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">24/7 Availability</CardTitle>
                  <CardDescription>
                    Your AI receptionist never takes breaks, vacations, or sick days. Available around the clock to serve your customers.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-lg w-fit">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Scheduling</CardTitle>
                  <CardDescription>
                    Automatically schedules appointments, checks availability, and sends confirmations directly to your calendar system.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-purple-100 rounded-lg w-fit">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Professional Communication</CardTitle>
                  <CardDescription>
                    Trained to handle calls with the same professionalism as your best human receptionist, maintaining your brand voice.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-orange-100 rounded-lg w-fit">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Call Screening & Routing</CardTitle>
                  <CardDescription>
                    Intelligently screens calls, gathers information, and routes urgent matters to the right person immediately.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-red-100 rounded-lg w-fit">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Data Security</CardTitle>
                  <CardDescription>
                    All conversations are encrypted and secure, with GDPR compliance and strict data protection protocols.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-teal-100 rounded-lg w-fit">
                    <CheckCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Easy Integration</CardTitle>
                  <CardDescription>
                    Connects seamlessly with your existing phone system, CRM, and calendar applications without technical complexity.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple setup, powerful results in just a few steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Setup & Training</h3>
                    <p className="text-gray-600">
                      We configure your AI receptionist with your business information, services, and preferred communication style. Training takes just 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Integration</h3>
                    <p className="text-gray-600">
                      Connect to your existing phone number or get a new one. Your AI receptionist handles all incoming calls automatically.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar Sync</h3>
                    <p className="text-gray-600">
                      Integration with your calendar system allows automatic appointment scheduling and availability checking in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Go Live</h3>
                    <p className="text-gray-600">
                      Your AI receptionist is ready to handle calls, schedule appointments, and provide exceptional customer service 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Perfect For
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industries that benefit most from AI receptionist services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Healthcare Practices</CardTitle>
                  <CardDescription>
                    Handle appointment scheduling, patient inquiries, and emergency routing with medical knowledge and HIPAA compliance.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Professional Services</CardTitle>
                  <CardDescription>
                    Law firms, accounting practices, and consultancies benefit from professional call handling and client scheduling.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Real Estate</CardTitle>
                  <CardDescription>
                    Capture property inquiries, schedule viewings, and qualify leads while agents focus on closing deals.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Beauty & Wellness</CardTitle>
                  <CardDescription>
                    Salon and spa appointment booking with service descriptions, pricing, and availability management.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Home Services</CardTitle>
                  <CardDescription>
                    Contractors, cleaners, and maintenance services can provide quotes and schedule appointments automatically.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Small Business</CardTitle>
                  <CardDescription>
                    Any business that needs professional phone presence without the cost of a full-time receptionist.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Never Miss Another Call?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Start your free trial today and experience the difference a professional AI receptionist makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                <Link href="/book-demo">Book Free Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <Link href="/contact">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
  );
}

ReceptionistSolution.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Receptionist Solution | Never Miss a Call Again"
      description="24/7 AI receptionist that handles calls, schedules appointments, and manages customer inquiries professionally. Never miss a business opportunity again."
      canonical="https://gozupees.com/ai-voice-agents/receptionist"
      ogImage="https://gozupees.com/images/ai-receptionist-solution.jpg"
    >
      {page}
    </Layout>
  );
};