import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Phone, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

export default function ReminderCallsSolution() {
  return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-green-100 text-green-900">Reminder Calls Solution</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Reduce No-Shows by 70%
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Automated appointment reminders and follow-up calls that keep your schedule full and your customers engaged.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
                  <Link href="/book-demo">Try Live Demo</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
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
                Transform Your Appointment Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop losing revenue to no-shows with intelligent reminder systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-green-100 rounded-lg w-fit">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">70% Reduction in No-Shows</CardTitle>
                  <CardDescription>
                    Proven track record of dramatically reducing missed appointments through strategic reminder timing and personalization.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-lg w-fit">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Timing</CardTitle>
                  <CardDescription>
                    AI determines optimal reminder timing based on appointment type, customer preferences, and historical data.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-purple-100 rounded-lg w-fit">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Personalized Messages</CardTitle>
                  <CardDescription>
                    Customized reminders that include appointment details, preparation instructions, and easy rescheduling options.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-orange-100 rounded-lg w-fit">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Flexible Rescheduling</CardTitle>
                  <CardDescription>
                    Allow customers to easily reschedule or cancel appointments directly through the reminder call system.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-red-100 rounded-lg w-fit">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Multi-Channel Reminders</CardTitle>
                  <CardDescription>
                    Voice calls, SMS, and email reminders ensure your message reaches customers through their preferred communication method.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-teal-100 rounded-lg w-fit">
                    <CheckCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Automated Follow-up</CardTitle>
                  <CardDescription>
                    Post-appointment follow-up calls for feedback, satisfaction surveys, and booking future appointments.
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
                How Reminder Calls Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Seamless integration with your existing scheduling system
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar Integration</h3>
                    <p className="text-gray-600">
                      Connect your existing appointment system (Google Calendar, Calendly, etc.) to automatically sync appointments and customer information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
                    <p className="text-gray-600">
                      AI analyzes appointment types and customer preferences to determine optimal reminder timing (24 hours, 2 hours, etc.).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Reminders</h3>
                    <p className="text-gray-600">
                      Automated calls include appointment details, location, preparation instructions, and options to confirm or reschedule.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                    <p className="text-gray-600">
                      Changes are automatically synced back to your calendar system, with notifications sent to relevant staff members.
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
                Perfect For These Industries
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                High-impact results across appointment-based businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Healthcare & Medical</CardTitle>
                  <CardDescription>
                    Reduce patient no-shows with appointment reminders, preparation instructions, and easy rescheduling options.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Beauty & Wellness</CardTitle>
                  <CardDescription>
                    Keep your salon, spa, or wellness center fully booked with smart reminder calls and last-minute availability notifications.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Professional Services</CardTitle>
                  <CardDescription>
                    Law firms, accountants, and consultants can ensure important meetings happen as planned with automated reminders.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Home Services</CardTitle>
                  <CardDescription>
                    Contractors, cleaners, and repair services can confirm appointments and provide arrival time updates automatically.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Fitness & Training</CardTitle>
                  <CardDescription>
                    Personal trainers and fitness studios can maximize session attendance with personalized workout reminders.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Automotive Services</CardTitle>
                  <CardDescription>
                    Auto repair shops and dealerships can reduce service appointment no-shows and improve customer satisfaction.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Proven Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real impact on your bottom line
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
                <div className="text-lg font-medium text-gray-900 mb-2">Reduction in No-Shows</div>
                <div className="text-gray-600">Average improvement across all industries</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">$2,500</div>
                <div className="text-lg font-medium text-gray-900 mb-2">Monthly Revenue Recovery</div>
                <div className="text-gray-600">Average for 100 appointments/month business</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-lg font-medium text-gray-900 mb-2">Customer Satisfaction</div>
                <div className="text-gray-600">Appreciate professional reminder service</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop Losing Money to No-Shows
            </h2>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Start reducing no-shows today with intelligent reminder calls that work around the clock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
                <Link href="/book-demo">Book Free Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
                <Link href="/contact">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
  );
}

ReminderCallsSolution.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="AI Reminder Calls Solution | Reduce No-Shows by 70% | GoZupees"
      description="Automated appointment reminders and follow-up calls that reduce no-shows by up to 70%. Smart scheduling with personalized reminders for better customer engagement."
      canonical="https://gozupees.com/ai-voice-agents/reminder-calls"
      ogImage="https://gozupees.com/images/reminder-calls-solution.jpg"
    >
      {page}
    </Layout>
  );
};